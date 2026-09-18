import { Match, BallDelivery, MatchEvent } from "./types";

export interface SimulationOutcome {
  runs: number;
  isWicket: boolean;
  isBoundary: boolean;
  isSix: boolean;
  isDot: boolean;
  isWide?: boolean;
  isNoBall?: boolean;
  shortDesc: string;
  commentaryText: string;
  speedKmph: number;
}

export class MatchSimulator {
  private match: Match;
  private listeners: ((match: Match) => void)[] = [];

  constructor(initialMatch: Match) {
    // Deep clone match so we don't mutate original reference directly
    this.match = JSON.parse(JSON.stringify(initialMatch));
  }

  public getMatch(): Match {
    return this.match;
  }

  public subscribe(callback: (match: Match) => void): () => void {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(l => l !== callback);
    };
  }

  private notify() {
    const cloned = JSON.parse(JSON.stringify(this.match));
    this.listeners.forEach(l => l(cloned));
  }

  public stepBall(forcedOutcome?: Partial<SimulationOutcome>): Match {
    if (this.match.status !== "LIVE") return this.match;

    const innings = this.match.innings[this.match.currentInningsIndex];
    if (!innings || innings.isCompleted) return this.match;

    const [striker, nonStriker] = this.match.currentBatters;
    const bowler = this.match.currentBowler;

    // Calculate current ball in over
    const currentBallsInOver = Math.round((innings.overs % 1) * 10);
    const nextBallNumber = currentBallsInOver + 1;
    const currentOverNumber = Math.floor(innings.overs);

    // Pick realistic outcome if not forced
    const outcome = this.generateOutcome(forcedOutcome, striker.name, bowler.name);

    const isLegalDelivery = !outcome.isWide && !outcome.isNoBall;
    let nextOvers = innings.overs;

    if (isLegalDelivery) {
      if (nextBallNumber >= 6) {
        nextOvers = currentOverNumber + 1.0;
      } else {
        nextOvers = Number(`${currentOverNumber}.${nextBallNumber}`);
      }
    }

    const displayOver = `${currentOverNumber}.${nextBallNumber <= 6 ? nextBallNumber : 6}`;

    // Create delivery record
    const delivery: BallDelivery = {
      id: `ball-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      overNumber: currentOverNumber,
      ballNumber: nextBallNumber,
      displayOver,
      runs: outcome.runs,
      isWicket: outcome.isWicket,
      isBoundary: outcome.isBoundary,
      isSix: outcome.isSix,
      isDot: outcome.isDot,
      isWide: outcome.isWide,
      isNoBall: outcome.isNoBall,
      bowlerName: bowler.name,
      batsmanName: striker.name,
      nonStrikerName: nonStriker.name,
      speedKmph: outcome.speedKmph,
      shortDesc: outcome.shortDesc,
      commentary: outcome.commentaryText,
    };

    // Update Innings score
    innings.runs += outcome.runs;
    if (outcome.isWicket) {
      innings.wickets += 1;
      innings.fallOfWickets.push({
        wicketNumber: innings.wickets,
        score: innings.runs,
        over: nextOvers,
        playerName: striker.name,
      });

      // Add high-priority match event
      const wicketEvent: MatchEvent = {
        id: `ev-${Date.now()}`,
        timestamp: `${displayOver} ov`,
        over: displayOver,
        eventType: "WICKET",
        player: striker.name,
        team: this.match.teamA.name,
        title: `WICKET! ${striker.name} b ${bowler.name} ${striker.runs} (${striker.balls})`,
        description: outcome.commentaryText,
        importance: "HIGH",
      };
      this.match.events.unshift(wicketEvent);
    }

    innings.overs = nextOvers;

    // Update striker stats
    if (isLegalDelivery) {
      striker.balls += 1;
    }
    striker.runs += (outcome.isWide || outcome.isNoBall) ? Math.max(0, outcome.runs - 1) : outcome.runs;
    if (outcome.isBoundary && !outcome.isSix) striker.fours += 1;
    if (outcome.isSix) striker.sixes += 1;
    striker.strikeRate = Number(((striker.runs / Math.max(1, striker.balls)) * 100).toFixed(2));

    if (outcome.isWicket) {
      striker.dismissal = `c Sub b ${bowler.name}`;
      // In realistic sim, introduce incoming batter
      striker.name = "R. Jadeja";
      striker.runs = 0;
      striker.balls = 0;
      striker.fours = 0;
      striker.sixes = 0;
      striker.strikeRate = 0;
      striker.dismissal = "not out";
    }

    // Update bowler stats
    if (outcome.isWicket) bowler.wickets += 1;
    bowler.runs += outcome.runs;
    if (outcome.isDot) bowler.dotBalls += 1;
    if (isLegalDelivery) {
      const bOverInt = Math.floor(bowler.overs);
      const bBallInt = Math.round((bowler.overs % 1) * 10) + 1;
      if (bBallInt >= 6) {
        bowler.overs = bOverInt + 1.0;
      } else {
        bowler.overs = Number(`${bOverInt}.${bBallInt}`);
      }
    }
    const totalBowlerBalls = Math.floor(bowler.overs) * 6 + Math.round((bowler.overs % 1) * 10);
    bowler.economy = Number(((bowler.runs / Math.max(1, totalBowlerBalls)) * 6).toFixed(2));

    // Handle strike rotation (single, three, or over completion)
    const oddRuns = outcome.runs % 2 === 1;
    const isOverEnd = isLegalDelivery && nextBallNumber >= 6;
    let shouldSwap = oddRuns;
    if (isOverEnd) {
      shouldSwap = !shouldSwap;
    }
    if (shouldSwap && !outcome.isWicket) {
      this.match.currentBatters = [nonStriker, striker];
    }

    // Prepend to commentary & recent deliveries
    this.match.commentary.unshift(delivery);
    this.match.recentDeliveries.push(delivery);
    if (this.match.recentDeliveries.length > 6) {
      this.match.recentDeliveries.shift();
    }

    // Recalculate target / chasing status
    if (this.match.target) {
      const remainingRuns = this.match.target - innings.runs;
      const ballsRemaining = Math.max(0, (innings.maxOvers * 6) - (Math.floor(innings.overs) * 6 + Math.round((innings.overs % 1) * 10)));
      
      if (remainingRuns <= 0) {
        this.match.status = "COMPLETED";
        this.match.statusText = `${this.match.teamA.name} won by ${10 - innings.wickets} wickets!`;
        this.match.events.unshift({
          id: `win-${Date.now()}`,
          timestamp: `${displayOver} ov`,
          over: displayOver,
          eventType: "MATCH_END",
          player: striker.name,
          team: this.match.teamA.name,
          title: `Champions! ${this.match.teamA.name} lift the World Cup Trophy!`,
          description: "A monumental run chase completed under stadium floodlights!",
          importance: "HIGH",
        });
        this.match.winProbability.teamAWinPercentage = 100;
        this.match.winProbability.teamBWinPercentage = 0;
      } else if (ballsRemaining === 0 || innings.wickets >= 10) {
        this.match.status = "COMPLETED";
        this.match.statusText = `${this.match.teamB.name} won by ${remainingRuns} runs!`;
        this.match.winProbability.teamAWinPercentage = 0;
        this.match.winProbability.teamBWinPercentage = 100;
      } else {
        const reqRate = ((remainingRuns / ballsRemaining) * 6).toFixed(2);
        this.match.statusText = `${this.match.teamA.name} need ${remainingRuns} runs in ${ballsRemaining} balls (RRR: ${reqRate})`;
        
        // Update live win probability dynamically
        this.updateWinProbability(remainingRuns, ballsRemaining, innings.wickets);
      }
    }

    this.notify();
    return this.match;
  }

  private updateWinProbability(remainingRuns: number, ballsRemaining: number, wicketsLost: number) {
    const requiredRunRate = (remainingRuns / Math.max(1, ballsRemaining)) * 6;
    const wicketsInHand = 10 - wicketsLost;

    // Realistic analytical estimate formula
    let prob = 50;
    if (requiredRunRate <= 6) prob = 85;
    else if (requiredRunRate <= 9) prob = 70;
    else if (requiredRunRate <= 12) prob = 58;
    else if (requiredRunRate <= 16) prob = 42;
    else if (requiredRunRate <= 20) prob = 22;
    else prob = 8;

    // Adjust for wickets in hand
    prob += (wicketsInHand - 5) * 4;
    prob = Math.min(96, Math.max(4, Math.round(prob)));

    const prevProb = this.match.winProbability.teamAWinPercentage;
    this.match.winProbability.teamAWinPercentage = prob;
    this.match.winProbability.teamBWinPercentage = 100 - prob;
    this.match.winProbability.trend = prob > prevProb ? "RISING" : prob < prevProb ? "FALLING" : "STEADY";

    const currentOver = Math.floor(this.match.innings[this.match.currentInningsIndex].overs);
    this.match.winProbability.history.push({
      over: currentOver,
      teamAPercentage: prob,
      teamBPercentage: 100 - prob,
    });
  }

  private generateOutcome(forced: Partial<SimulationOutcome> | undefined, batterName: string, bowlerName: string): SimulationOutcome {
    if (forced && forced.runs !== undefined) {
      return {
        runs: forced.runs,
        isWicket: !!forced.isWicket,
        isBoundary: !!forced.isBoundary,
        isSix: !!forced.isSix,
        isDot: forced.runs === 0 && !forced.isWicket,
        isWide: forced.isWide,
        isNoBall: forced.isNoBall,
        shortDesc: forced.shortDesc || `${forced.runs} runs`,
        commentaryText: forced.commentaryText || `${forced.runs} runs scored off ${bowlerName}.`,
        speedKmph: forced.speedKmph || 143.5,
      };
    }

    // Weighted random distribution for high tension death over
    const rand = Math.random();
    const speed = +(138 + Math.random() * 12).toFixed(1);

    if (rand < 0.22) {
      return {
        runs: 1,
        isWicket: false,
        isBoundary: false,
        isSix: false,
        isDot: false,
        shortDesc: "1 run",
        commentaryText: `Fired in full on the pads, nudged past square leg for a sharp single. Strike rotated to ${batterName}.`,
        speedKmph: speed,
      };
    } else if (rand < 0.42) {
      return {
        runs: 2,
        isWicket: false,
        isBoundary: false,
        isSix: false,
        isDot: false,
        shortDesc: "2 runs",
        commentaryText: `Pushed softly into the expansive outfield gap at deep backward point. Superb athletic sprint converts the single into a comfortable two!`,
        speedKmph: speed,
      };
    } else if (rand < 0.62) {
      return {
        runs: 4,
        isWicket: false,
        isBoundary: true,
        isSix: false,
        isDot: false,
        shortDesc: "FOUR",
        commentaryText: `CRACKED AWAY FOR FOUR! Short of length, ${batterName} stands tall and hammers a destructive pull stroke piercing the mid-wicket boundary!`,
        speedKmph: speed,
      };
    } else if (rand < 0.78) {
      return {
        runs: 6,
        isWicket: false,
        isBoundary: true,
        isSix: true,
        isDot: false,
        shortDesc: "SIX",
        commentaryText: `THAT IS OUT OF THE GROUND! Into the night sky! Clean bat swing over long-on, sailing 94 meters into the delirium of the supporters!`,
        speedKmph: speed,
      };
    } else if (rand < 0.90) {
      return {
        runs: 0,
        isWicket: false,
        isBoundary: false,
        isSix: false,
        isDot: true,
        shortDesc: "Dot ball",
        commentaryText: `Sensational yorker right on the base of off-stump! Jams the bat down at the last split second. Pure dot-ball gold for the fielding side!`,
        speedKmph: speed,
      };
    } else {
      return {
        runs: 0,
        isWicket: true,
        isBoundary: false,
        isSix: false,
        isDot: true,
        shortDesc: "WICKET",
        commentaryText: `IN THE AIR AND TAKEN! High drama! Tried to clear long-off, miscues it off the toe-end, and the fielder settles underneath with steady hands! Massive breakthrough!`,
        speedKmph: speed,
      };
    }
  }

  public resetMatch(cleanMatch: Match) {
    this.match = JSON.parse(JSON.stringify(cleanMatch));
    this.notify();
  }
}
