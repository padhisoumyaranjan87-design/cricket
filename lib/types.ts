export type MatchStatus = "LIVE" | "UPCOMING" | "COMPLETED" | "ABANDONED" | "INNINGS_BREAK" | "RAIN_DELAY";
export type MatchFormat = "T20" | "ODI" | "TEST" | "T20I";
export type EventType = 
  | "WICKET" 
  | "FOUR" 
  | "SIX" 
  | "FIFTY" 
  | "HUNDRED" 
  | "FIVE_WICKET" 
  | "PARTNERSHIP_MILESTONE" 
  | "BOWLING_CHANGE" 
  | "REVIEW" 
  | "INJURY" 
  | "RAIN_DELAY" 
  | "INNINGS_BREAK" 
  | "STRATEGIC_TIMEOUT" 
  | "TOSS" 
  | "MATCH_START" 
  | "MATCH_END";

export interface Team {
  id: string;
  name: string;
  shortName: string;
  code: string; // e.g. "IND", "PAK", "AUS", "ENG"
  logo: string;
  country: string;
  iccRankings: {
    t20: number;
    odi: number;
    test: number;
  };
  captain: string;
  coach: string;
  recentForm: ("W" | "L" | "NR")[];
  homeVenue: string;
  primaryColor: string;
}

export interface Player {
  id: string;
  name: string;
  shortName: string;
  teamId: string;
  teamCode: string;
  country: string;
  photo: string;
  role: "Batter" | "Bowler" | "All-Rounder" | "Wicket-Keeper";
  battingStyle: "Right-hand bat" | "Left-hand bat";
  bowlingStyle: string;
  isCaptain?: boolean;
  isKeeper?: boolean;
  stats: {
    t20: PlayerFormatStats;
    odi: PlayerFormatStats;
    test: PlayerFormatStats;
  };
  recentForm: {
    batting: number[]; // Last 5 scores e.g. [82, 14, 67, 102, 45]
    bowling?: string[]; // e.g. ["3/24", "2/18", "0/31", "4/22", "2/27"]
  };
}

export interface PlayerFormatStats {
  matches: number;
  runs: number;
  battingAverage: number;
  strikeRate: number;
  hundreds: number;
  fifties: number;
  highestScore: string;
  fours: number;
  sixes: number;
  boundaryPercentage: number;
  dotBallPercentage: number;
  wickets: number;
  bowlingAverage: number;
  economy: number;
  bestBowling: string;
  fourWickets: number;
  fiveWickets: number;
  catches: number;
  stumpings: number;
}

export interface BatterScorecard {
  playerId: string;
  name: string;
  runs: number;
  balls: number;
  fours: number;
  sixes: number;
  strikeRate: number;
  dismissal: string; // e.g. "c Babar b Shaheen" or "not out"
  isOnStrike?: boolean;
}

export interface BowlerScorecard {
  playerId: string;
  name: string;
  overs: number;
  maidens: number;
  runs: number;
  wickets: number;
  economy: number;
  dotBalls: number;
  isCurrent?: boolean;
}

export interface FallOfWicket {
  wicketNumber: number;
  score: number;
  over: number;
  playerName: string;
}

export interface Extras {
  wides: number;
  noBalls: number;
  byes: number;
  legByes: number;
  penalty: number;
  total: number;
}

export interface BallDelivery {
  id: string;
  overNumber: number;
  ballNumber: number; // 1 to 6 (or beyond for extras)
  displayOver: string; // e.g. "18.4"
  runs: number;
  isWicket: boolean;
  isBoundary: boolean;
  isSix: boolean;
  isDot: boolean;
  isWide?: boolean;
  isNoBall?: boolean;
  isLegBye?: boolean;
  isBye?: boolean;
  isReview?: boolean;
  bowlerName: string;
  batsmanName: string;
  nonStrikerName: string;
  speedKmph?: number;
  shortDesc: string; // e.g. "FOUR" or "WICKET" or "1 run"
  commentary: string; // Detailed narrative
  event?: EventType;
}

export interface MatchEvent {
  id: string;
  timestamp: string;
  over: string;
  eventType: EventType;
  player: string;
  team: string;
  title: string;
  description: string;
  importance: "HIGH" | "MEDIUM" | "LOW";
}

export interface Innings {
  inningsNumber: number;
  battingTeamId: string;
  bowlingTeamId: string;
  runs: number;
  wickets: number;
  overs: number;
  maxOvers: number;
  isDeclared?: boolean;
  isCompleted?: boolean;
  batting: BatterScorecard[];
  bowling: BowlerScorecard[];
  extras: Extras;
  fallOfWickets: FallOfWicket[];
  runsPerOver: { over: number; runs: number; wickets: number }[];
}

export interface WinProbability {
  teamAId: string;
  teamBId: string;
  teamAWinPercentage: number;
  teamBWinPercentage: number;
  tiePercentage?: number;
  trend: "RISING" | "FALLING" | "STEADY";
  history: { over: number; teamAPercentage: number; teamBPercentage: number }[];
  modelNote: string;
}

export interface MatchSituationAnalysis {
  situation: string;
  momentum: "BATTER_DOMINANCE" | "BALANCED" | "BOWLER_DOMINANCE";
  battingAnalysis: {
    currentRunRate: number;
    requiredRunRate?: number;
    boundaryPercentage: number;
    dotBallPercentage: number;
    strikeRotationRate: number;
    powerplayPerformance: string;
    deathOverScoring: string;
  };
  bowlingAnalysis: {
    economy: number;
    dotBallPercentage: number;
    boundariesConceded: number;
    keyMatchup: string;
  };
  keyFactors: string[];
}

export interface Match {
  id: string;
  slug: string;
  tournamentName: string;
  tournamentId: string;
  matchNumber: string; // e.g. "Match 24, Super 8" or "Final"
  format: MatchFormat;
  status: MatchStatus;
  statusText: string; // e.g. "India need 26 runs in 10 balls"
  startTime: string; // ISO 8601
  venue: Venue;
  teamA: Team;
  teamB: Team;
  toss: {
    winnerTeamId: string;
    decision: "BAT" | "BOWL";
  };
  innings: Innings[];
  currentInningsIndex: number;
  target?: number;
  currentBatters: [BatterScorecard, BatterScorecard];
  currentBowler: BowlerScorecard;
  recentDeliveries: BallDelivery[];
  commentary: BallDelivery[];
  events: MatchEvent[];
  winProbability: WinProbability;
  aiAnalysis: MatchSituationAnalysis;
  ticketInfo?: TicketInfo;
  oddsPreview?: OddsComparisonItem[];
}

export interface Venue {
  id: string;
  name: string;
  city: string;
  country: string;
  capacity: number;
  pitchType: "Batting Friendly" | "Pace & Bounce" | "Spin Friendly" | "Balanced";
  avgFirstInnings: number;
  avgSecondInnings: number;
  highestTotal: string;
  lowestTotal: string;
  tossWinBatFirstPercentage: number;
  tossWinChasePercentage: number;
  description: string;
  image: string;
}

export interface Tournament {
  id: string;
  name: string;
  shortName: string;
  logo: string;
  format: MatchFormat;
  startDate: string;
  endDate: string;
  hostCountry: string;
  teamsCount: number;
  totalMatches: number;
  completedMatches: number;
}

export interface PointsTableEntry {
  position: number;
  teamId: string;
  team: Team;
  played: number;
  won: number;
  lost: number;
  tied: number;
  noResult: number;
  points: number;
  netRunRate: number;
  recentForm: ("W" | "L" | "NR")[];
  qualificationStatus?: "QUALIFIED" | "IN_CONTENTION" | "ELIMINATED";
}

export interface TicketInfo {
  id: string;
  matchId: string;
  tournament: string;
  matchTitle: string;
  venueName: string;
  date: string;
  time: string;
  availability: "AVAILABLE" | "SELLING_FAST" | "LIMITED" | "SOLD_OUT";
  currency: string;
  minPrice: number;
  maxPrice: number;
  officialProvider: string;
  officialUrl: string;
  authorizedBadge: boolean;
  disclaimer: string;
}

export interface OddsComparisonItem {
  providerName: string;
  providerLogo?: string;
  marketName: string;
  teamAOdds: number;
  teamBOdds: number;
  lastUpdated: string;
  trend: "UP" | "DOWN" | "STABLE";
}

export interface OddsMovementPoint {
  timestamp: string;
  overOrTime: string;
  teamAOdds: number;
  teamBOdds: number;
}

export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  category: "Match News" | "Tactical Analysis" | "Injuries" | "Team News" | "Records" | "Tournament News";
  author: string;
  source: string;
  publishedAt: string;
  readingTimeMinutes: number;
  imageUrl: string;
  relatedTeams?: string[];
  relatedPlayers?: string[];
}

export interface NotificationSetting {
  matchStart: boolean;
  toss: boolean;
  wickets: boolean;
  milestones: boolean;
  sixes: boolean;
  matchResult: boolean;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: "LIVE_EVENT" | "MATCH_START" | "MILESTONE" | "NEWS";
  matchId?: string;
}
