import { Match, Team, Player, Venue, Tournament, PointsTableEntry, TicketInfo, OddsComparisonItem, NewsArticle } from "./types";

export const TEAMS: Record<string, Team> = {
  IND: {
    id: "IND",
    name: "India",
    shortName: "India",
    code: "IND",
    logo: "/logos/ind.svg",
    country: "India",
    iccRankings: { t20: 1, odi: 1, test: 2 },
    captain: "Rohit Sharma",
    coach: "Gautam Gambhir",
    recentForm: ["W", "W", "W", "L", "W"],
    homeVenue: "Narendra Modi Stadium",
    primaryColor: "#00B0FF",
  },
  PAK: {
    id: "PAK",
    name: "Pakistan",
    shortName: "Pakistan",
    code: "PAK",
    logo: "/logos/pak.svg",
    country: "Pakistan",
    iccRankings: { t20: 6, odi: 4, test: 6 },
    captain: "Babar Azam",
    coach: "Jason Gillespie",
    recentForm: ["W", "L", "W", "W", "L"],
    homeVenue: "Gaddafi Stadium, Lahore",
    primaryColor: "#00E676",
  },
  AUS: {
    id: "AUS",
    name: "Australia",
    shortName: "Australia",
    code: "AUS",
    logo: "/logos/aus.svg",
    country: "Australia",
    iccRankings: { t20: 2, odi: 2, test: 1 },
    captain: "Pat Cummins",
    coach: "Andrew McDonald",
    recentForm: ["W", "W", "L", "W", "W"],
    homeVenue: "Melbourne Cricket Ground",
    primaryColor: "#FFD600",
  },
  ENG: {
    id: "ENG",
    name: "England",
    shortName: "England",
    code: "ENG",
    logo: "/logos/eng.svg",
    country: "England",
    iccRankings: { t20: 3, odi: 5, test: 3 },
    captain: "Jos Buttler",
    coach: "Brendon McCullum",
    recentForm: ["L", "W", "W", "L", "W"],
    homeVenue: "Lord's Cricket Ground",
    primaryColor: "#FF3D71",
  },
  SA: {
    id: "SA",
    name: "South Africa",
    shortName: "South Africa",
    code: "SA",
    logo: "/logos/sa.svg",
    country: "South Africa",
    iccRankings: { t20: 5, odi: 3, test: 4 },
    captain: "Aiden Markram",
    coach: "Rob Walter",
    recentForm: ["W", "W", "L", "W", "L"],
    homeVenue: "Wanderers Stadium",
    primaryColor: "#10B981",
  },
  NZ: {
    id: "NZ",
    name: "New Zealand",
    shortName: "New Zealand",
    code: "NZ",
    logo: "/logos/nz.svg",
    country: "New Zealand",
    iccRankings: { t20: 4, odi: 6, test: 5 },
    captain: "Mitchell Santner",
    coach: "Gary Stead",
    recentForm: ["L", "W", "L", "W", "W"],
    homeVenue: "Eden Park, Auckland",
    primaryColor: "#94A3B8",
  },
  CSK: {
    id: "CSK",
    name: "Chennai Super Kings",
    shortName: "CSK",
    code: "CSK",
    logo: "/logos/csk.svg",
    country: "India (IPL)",
    iccRankings: { t20: 1, odi: 0, test: 0 },
    captain: "Ruturaj Gaikwad",
    coach: "Stephen Fleming",
    recentForm: ["W", "W", "L", "W", "W"],
    homeVenue: "M. A. Chidambaram Stadium, Chennai",
    primaryColor: "#F59E0B",
  },
  MI: {
    id: "MI",
    name: "Mumbai Indians",
    shortName: "MI",
    code: "MI",
    logo: "/logos/mi.svg",
    country: "India (IPL)",
    iccRankings: { t20: 2, odi: 0, test: 0 },
    captain: "Hardik Pandya",
    coach: "Mahela Jayawardene",
    recentForm: ["L", "W", "W", "L", "W"],
    homeVenue: "Wankhede Stadium, Mumbai",
    primaryColor: "#0284C7",
  }
};

export const VENUES: Record<string, Venue> = {
  mcg: {
    id: "mcg",
    name: "Melbourne Cricket Ground",
    city: "Melbourne",
    country: "Australia",
    capacity: 100024,
    pitchType: "Pace & Bounce",
    avgFirstInnings: 168,
    avgSecondInnings: 154,
    highestTotal: "273/2 (Australia)",
    lowestTotal: "74 (India)",
    tossWinBatFirstPercentage: 48,
    tossWinChasePercentage: 52,
    description: "The colosseum of world cricket. Generous drop-in wicket offering true bounce and pace with massive boundary dimensions.",
    image: "/stadiums/mcg.jpg"
  },
  ahmedabad: {
    id: "ahmedabad",
    name: "Narendra Modi Stadium",
    city: "Ahmedabad",
    country: "India",
    capacity: 132000,
    pitchType: "Balanced",
    avgFirstInnings: 182,
    avgSecondInnings: 165,
    highestTotal: "234/4 (Gujarat Titans)",
    lowestTotal: "66 (New Zealand)",
    tossWinBatFirstPercentage: 54,
    tossWinChasePercentage: 46,
    description: "The largest cricket stadium in the world. Features both red and black soil pitches with exceptional LED sports lighting.",
    image: "/stadiums/ahmedabad.jpg"
  },
  lords: {
    id: "lords",
    name: "Lord's Cricket Ground",
    city: "London",
    country: "England",
    capacity: 31100,
    pitchType: "Pace & Bounce",
    avgFirstInnings: 160,
    avgSecondInnings: 148,
    highestTotal: "199/4 (West Indies)",
    lowestTotal: "93 (England)",
    tossWinBatFirstPercentage: 58,
    tossWinChasePercentage: 42,
    description: "The Home of Cricket with its famous natural slope across the field, historic Victorian pavilion, and the legendary Long Room.",
    image: "/stadiums/lords.jpg"
  },
  wankhede: {
    id: "wankhede",
    name: "Wankhede Stadium",
    city: "Mumbai",
    country: "India",
    capacity: 33108,
    pitchType: "Batting Friendly",
    avgFirstInnings: 194,
    avgSecondInnings: 182,
    highestTotal: "240/3 (India)",
    lowestTotal: "67 (Kolkata Knight Riders)",
    tossWinBatFirstPercentage: 42,
    tossWinChasePercentage: 58,
    description: "Red-soil batting paradise alongside the Arabian Sea. Dew in second innings often heavily rewards chasing sides.",
    image: "/stadiums/wankhede.jpg"
  },
  kensington: {
    id: "kensington",
    name: "Kensington Oval",
    city: "Bridgetown",
    country: "Barbados",
    capacity: 28000,
    pitchType: "Pace & Bounce",
    avgFirstInnings: 164,
    avgSecondInnings: 149,
    highestTotal: "224/5 (West Indies)",
    lowestTotal: "80 (Afghanistan)",
    tossWinBatFirstPercentage: 51,
    tossWinChasePercentage: 49,
    description: "The spiritual home of Caribbean cricket with consistent trade winds and carrying bounce.",
    image: "/stadiums/kensington.jpg"
  }
};

export const PLAYERS: Record<string, Player> = {
  "virat-kohli": {
    id: "virat-kohli",
    name: "Virat Kohli",
    shortName: "V. Kohli",
    teamId: "IND",
    teamCode: "IND",
    country: "India",
    photo: "/players/kohli.jpg",
    role: "Batter",
    battingStyle: "Right-hand bat",
    bowlingStyle: "Right-arm medium",
    stats: {
      t20: {
        matches: 125,
        runs: 4188,
        battingAverage: 48.69,
        strikeRate: 137.04,
        hundreds: 1,
        fifties: 38,
        highestScore: "122*",
        fours: 369,
        sixes: 124,
        boundaryPercentage: 58.2,
        dotBallPercentage: 31.4,
        wickets: 4,
        bowlingAverage: 51.0,
        economy: 8.05,
        bestBowling: "1/13",
        fourWickets: 0,
        fiveWickets: 0,
        catches: 54,
        stumpings: 0,
      },
      odi: {
        matches: 295,
        runs: 13906,
        battingAverage: 58.18,
        strikeRate: 93.54,
        hundreds: 50,
        fifties: 72,
        highestScore: "183",
        fours: 1302,
        sixes: 151,
        boundaryPercentage: 52.1,
        dotBallPercentage: 42.0,
        wickets: 5,
        bowlingAverage: 130.0,
        economy: 6.22,
        bestBowling: "1/15",
        fourWickets: 0,
        fiveWickets: 0,
        catches: 152,
        stumpings: 0,
      },
      test: {
        matches: 115,
        runs: 8947,
        battingAverage: 48.89,
        strikeRate: 55.56,
        hundreds: 29,
        fifties: 30,
        highestScore: "254*",
        fours: 1004,
        sixes: 26,
        boundaryPercentage: 46.8,
        dotBallPercentage: 66.2,
        wickets: 0,
        bowlingAverage: 0,
        economy: 3.12,
        bestBowling: "0/1",
        fourWickets: 0,
        fiveWickets: 0,
        catches: 111,
        stumpings: 0,
      }
    },
    recentForm: {
      batting: [82, 47, 68, 102, 35],
    }
  },
  "jasprit-bumrah": {
    id: "jasprit-bumrah",
    name: "Jasprit Bumrah",
    shortName: "J. Bumrah",
    teamId: "IND",
    teamCode: "IND",
    country: "India",
    photo: "/players/bumrah.jpg",
    role: "Bowler",
    battingStyle: "Right-hand bat",
    bowlingStyle: "Right-arm fast",
    stats: {
      t20: {
        matches: 70,
        runs: 28,
        battingAverage: 7.0,
        strikeRate: 68.3,
        hundreds: 0,
        fifties: 0,
        highestScore: "7",
        fours: 2,
        sixes: 0,
        boundaryPercentage: 28.5,
        dotBallPercentage: 62.0,
        wickets: 89,
        bowlingAverage: 17.74,
        economy: 6.27,
        bestBowling: "3/7",
        fourWickets: 0,
        fiveWickets: 0,
        catches: 14,
        stumpings: 0,
      },
      odi: {
        matches: 89,
        runs: 85,
        battingAverage: 8.5,
        strikeRate: 62.5,
        hundreds: 0,
        fifties: 0,
        highestScore: "16",
        fours: 8,
        sixes: 1,
        boundaryPercentage: 35.0,
        dotBallPercentage: 58.0,
        wickets: 149,
        bowlingAverage: 23.55,
        economy: 4.59,
        bestBowling: "6/19",
        fourWickets: 6,
        fiveWickets: 2,
        catches: 23,
        stumpings: 0,
      },
      test: {
        matches: 38,
        runs: 280,
        battingAverage: 11.2,
        strikeRate: 46.1,
        hundreds: 0,
        fifties: 0,
        highestScore: "35",
        fours: 31,
        sixes: 7,
        boundaryPercentage: 44.0,
        dotBallPercentage: 72.0,
        wickets: 165,
        bowlingAverage: 20.35,
        economy: 2.74,
        bestBowling: "6/27",
        fourWickets: 8,
        fiveWickets: 10,
        catches: 16,
        stumpings: 0,
      }
    },
    recentForm: {
      batting: [4, 1, 0, 8, 2],
      bowling: ["3/24", "2/14", "4/22", "1/19", "3/16"]
    }
  },
  "babar-azam": {
    id: "babar-azam",
    name: "Babar Azam",
    shortName: "B. Azam",
    teamId: "PAK",
    teamCode: "PAK",
    country: "Pakistan",
    photo: "/players/babar.jpg",
    role: "Batter",
    battingStyle: "Right-hand bat",
    bowlingStyle: "Right-arm off-break",
    isCaptain: true,
    stats: {
      t20: {
        matches: 123,
        runs: 4145,
        battingAverage: 41.03,
        strikeRate: 129.08,
        hundreds: 3,
        fifties: 36,
        highestScore: "122",
        fours: 440,
        sixes: 69,
        boundaryPercentage: 54.6,
        dotBallPercentage: 35.2,
        wickets: 0,
        bowlingAverage: 0,
        economy: 0,
        bestBowling: "-",
        fourWickets: 0,
        fiveWickets: 0,
        catches: 48,
        stumpings: 0,
      },
      odi: {
        matches: 117,
        runs: 5729,
        battingAverage: 56.72,
        strikeRate: 88.75,
        hundreds: 19,
        fifties: 32,
        highestScore: "158",
        fours: 524,
        sixes: 58,
        boundaryPercentage: 48.0,
        dotBallPercentage: 45.0,
        wickets: 0,
        bowlingAverage: 0,
        economy: 0,
        bestBowling: "-",
        fourWickets: 0,
        fiveWickets: 0,
        catches: 51,
        stumpings: 0,
      },
      test: {
        matches: 55,
        runs: 3962,
        battingAverage: 45.02,
        strikeRate: 54.8,
        hundreds: 9,
        fifties: 26,
        highestScore: "196",
        fours: 448,
        sixes: 23,
        boundaryPercentage: 46.0,
        dotBallPercentage: 68.0,
        wickets: 2,
        bowlingAverage: 82.0,
        economy: 3.8,
        bestBowling: "1/2",
        fourWickets: 0,
        fiveWickets: 0,
        catches: 41,
        stumpings: 0,
      }
    },
    recentForm: {
      batting: [71, 32, 54, 18, 86]
    }
  },
  "shaheen-afridi": {
    id: "shaheen-afridi",
    name: "Shaheen Shah Afridi",
    shortName: "S. Afridi",
    teamId: "PAK",
    teamCode: "PAK",
    country: "Pakistan",
    photo: "/players/shaheen.jpg",
    role: "Bowler",
    battingStyle: "Left-hand bat",
    bowlingStyle: "Left-arm fast",
    stats: {
      t20: {
        matches: 70,
        runs: 165,
        battingAverage: 12.6,
        strikeRate: 135.2,
        hundreds: 0,
        fifties: 0,
        highestScore: "28*",
        fours: 12,
        sixes: 10,
        boundaryPercentage: 64.0,
        dotBallPercentage: 40.0,
        wickets: 96,
        bowlingAverage: 20.82,
        economy: 7.74,
        bestBowling: "4/22",
        fourWickets: 2,
        fiveWickets: 0,
        catches: 19,
        stumpings: 0,
      },
      odi: {
        matches: 53,
        runs: 180,
        battingAverage: 13.8,
        strikeRate: 88.2,
        hundreds: 0,
        fifties: 0,
        highestScore: "25",
        fours: 14,
        sixes: 8,
        boundaryPercentage: 48.0,
        dotBallPercentage: 54.0,
        wickets: 104,
        bowlingAverage: 23.36,
        economy: 5.51,
        bestBowling: "6/35",
        fourWickets: 5,
        fiveWickets: 3,
        catches: 17,
        stumpings: 0,
      },
      test: {
        matches: 31,
        runs: 350,
        battingAverage: 14.5,
        strikeRate: 51.0,
        hundreds: 0,
        fifties: 0,
        highestScore: "32",
        fours: 38,
        sixes: 10,
        boundaryPercentage: 50.0,
        dotBallPercentage: 65.0,
        wickets: 115,
        bowlingAverage: 27.08,
        economy: 3.12,
        bestBowling: "6/51",
        fourWickets: 5,
        fiveWickets: 4,
        catches: 12,
        stumpings: 0,
      }
    },
    recentForm: {
      batting: [12, 0, 18, 4, 1],
      bowling: ["2/38", "3/29", "1/41", "4/30", "2/25"]
    }
  },
  "travis-head": {
    id: "travis-head",
    name: "Travis Head",
    shortName: "T. Head",
    teamId: "AUS",
    teamCode: "AUS",
    country: "Australia",
    photo: "/players/head.jpg",
    role: "Batter",
    battingStyle: "Left-hand bat",
    bowlingStyle: "Right-arm off-break",
    stats: {
      t20: {
        matches: 38,
        runs: 1098,
        battingAverage: 34.31,
        strikeRate: 159.13,
        hundreds: 0,
        fifties: 6,
        highestScore: "91",
        fours: 124,
        sixes: 49,
        boundaryPercentage: 66.8,
        dotBallPercentage: 32.0,
        wickets: 1,
        bowlingAverage: 45.0,
        economy: 8.9,
        bestBowling: "1/10",
        fourWickets: 0,
        fiveWickets: 0,
        catches: 18,
        stumpings: 0,
      },
      odi: {
        matches: 65,
        runs: 2393,
        battingAverage: 42.73,
        strikeRate: 103.54,
        hundreds: 6,
        fifties: 15,
        highestScore: "152",
        fours: 275,
        sixes: 48,
        boundaryPercentage: 58.0,
        dotBallPercentage: 44.0,
        wickets: 18,
        bowlingAverage: 47.2,
        economy: 5.7,
        bestBowling: "2/21",
        fourWickets: 0,
        fiveWickets: 0,
        catches: 30,
        stumpings: 0,
      },
      test: {
        matches: 49,
        runs: 3173,
        battingAverage: 41.75,
        strikeRate: 64.8,
        hundreds: 7,
        fifties: 16,
        highestScore: "175",
        fours: 410,
        sixes: 22,
        boundaryPercentage: 54.0,
        dotBallPercentage: 62.0,
        wickets: 14,
        bowlingAverage: 58.0,
        economy: 3.8,
        bestBowling: "4/10",
        fourWickets: 1,
        fiveWickets: 0,
        catches: 34,
        stumpings: 0,
      }
    },
    recentForm: {
      batting: [89, 12, 114, 45, 62]
    }
  },
  "jos-buttler": {
    id: "jos-buttler",
    name: "Jos Buttler",
    shortName: "J. Buttler",
    teamId: "ENG",
    teamCode: "ENG",
    country: "England",
    photo: "/players/buttler.jpg",
    role: "Wicket-Keeper",
    battingStyle: "Right-hand bat",
    bowlingStyle: "None",
    isCaptain: true,
    isKeeper: true,
    stats: {
      t20: {
        matches: 124,
        runs: 3264,
        battingAverage: 35.86,
        strikeRate: 146.3,
        hundreds: 1,
        fifties: 24,
        highestScore: "101*",
        fours: 310,
        sixes: 137,
        boundaryPercentage: 63.4,
        dotBallPercentage: 33.1,
        wickets: 0,
        bowlingAverage: 0,
        economy: 0,
        bestBowling: "-",
        fourWickets: 0,
        fiveWickets: 0,
        catches: 62,
        stumpings: 12,
      },
      odi: {
        matches: 181,
        runs: 5022,
        battingAverage: 39.54,
        strikeRate: 117.11,
        hundreds: 11,
        fifties: 26,
        highestScore: "162*",
        fours: 440,
        sixes: 170,
        boundaryPercentage: 60.5,
        dotBallPercentage: 38.0,
        wickets: 0,
        bowlingAverage: 0,
        economy: 0,
        bestBowling: "-",
        fourWickets: 0,
        fiveWickets: 0,
        catches: 215,
        stumpings: 35,
      },
      test: {
        matches: 57,
        runs: 2907,
        battingAverage: 31.94,
        strikeRate: 54.2,
        hundreds: 2,
        fifties: 18,
        highestScore: "152",
        fours: 340,
        sixes: 21,
        boundaryPercentage: 48.0,
        dotBallPercentage: 67.0,
        wickets: 0,
        bowlingAverage: 0,
        economy: 0,
        bestBowling: "-",
        fourWickets: 0,
        fiveWickets: 0,
        catches: 153,
        stumpings: 1,
      }
    },
    recentForm: {
      batting: [83, 24, 51, 107, 19]
    }
  }
};

export const TOURNAMENTS: Tournament[] = [
  {
    id: "t20-world-cup-2026",
    name: "ICC Men's T20 World Cup 2026",
    shortName: "T20 World Cup",
    logo: "/tournaments/t20wc.svg",
    format: "T20I",
    startDate: "2026-09-01",
    endDate: "2026-10-04",
    hostCountry: "India & Sri Lanka",
    teamsCount: 20,
    totalMatches: 55,
    completedMatches: 51,
  },
  {
    id: "ipl-2026",
    name: "Indian Premier League 2026",
    shortName: "IPL 2026",
    logo: "/tournaments/ipl.svg",
    format: "T20",
    startDate: "2026-03-22",
    endDate: "2026-05-28",
    hostCountry: "India",
    teamsCount: 10,
    totalMatches: 74,
    completedMatches: 42,
  },
  {
    id: "ashes-2025-26",
    name: "The Ashes 2025-26",
    shortName: "The Ashes",
    logo: "/tournaments/ashes.svg",
    format: "TEST",
    startDate: "2025-11-20",
    endDate: "2026-01-18",
    hostCountry: "Australia",
    teamsCount: 2,
    totalMatches: 5,
    completedMatches: 3,
  },
  {
    id: "champions-trophy-2026",
    name: "ICC Champions Trophy 2026",
    shortName: "Champions Trophy",
    logo: "/tournaments/ct.svg",
    format: "ODI",
    startDate: "2026-10-15",
    endDate: "2026-11-05",
    hostCountry: "Pakistan & UAE",
    teamsCount: 8,
    totalMatches: 15,
    completedMatches: 0,
  }
];

export const POINTS_TABLE_T20WC: PointsTableEntry[] = [
  {
    position: 1,
    teamId: "IND",
    team: TEAMS.IND,
    played: 5,
    won: 5,
    lost: 0,
    tied: 0,
    noResult: 0,
    points: 10,
    netRunRate: +1.875,
    recentForm: ["W", "W", "W", "W", "W"],
    qualificationStatus: "QUALIFIED"
  },
  {
    position: 2,
    teamId: "PAK",
    team: TEAMS.PAK,
    played: 5,
    won: 4,
    lost: 1,
    tied: 0,
    noResult: 0,
    points: 8,
    netRunRate: +0.942,
    recentForm: ["W", "L", "W", "W", "W"],
    qualificationStatus: "QUALIFIED"
  },
  {
    position: 3,
    teamId: "AUS",
    team: TEAMS.AUS,
    played: 5,
    won: 3,
    lost: 2,
    tied: 0,
    noResult: 0,
    points: 6,
    netRunRate: +0.650,
    recentForm: ["W", "W", "L", "W", "L"],
    qualificationStatus: "ELIMINATED"
  },
  {
    position: 4,
    teamId: "ENG",
    team: TEAMS.ENG,
    played: 5,
    won: 2,
    lost: 3,
    tied: 0,
    noResult: 0,
    points: 4,
    netRunRate: -0.210,
    recentForm: ["L", "W", "L", "L", "W"],
    qualificationStatus: "ELIMINATED"
  },
  {
    position: 5,
    teamId: "SA",
    team: TEAMS.SA,
    played: 5,
    won: 1,
    lost: 4,
    tied: 0,
    noResult: 0,
    points: 2,
    netRunRate: -0.980,
    recentForm: ["L", "L", "W", "L", "L"],
    qualificationStatus: "ELIMINATED"
  },
  {
    position: 6,
    teamId: "NZ",
    team: TEAMS.NZ,
    played: 5,
    won: 0,
    lost: 5,
    tied: 0,
    noResult: 0,
    points: 0,
    netRunRate: -2.140,
    recentForm: ["L", "L", "L", "L", "L"],
    qualificationStatus: "ELIMINATED"
  }
];

// Featured LIVE Match 1: India vs Pakistan Chase Thriller
export const MATCH_IND_VS_PAK: Match = {
  id: "ind-vs-pak-t20wc-final",
  slug: "india-vs-pakistan-t20-world-cup-final-2026",
  tournamentName: "ICC Men's T20 World Cup 2026",
  tournamentId: "t20-world-cup-2026",
  matchNumber: "Grand Final",
  format: "T20I",
  status: "LIVE",
  statusText: "India need 26 runs in 10 balls",
  startTime: "2026-09-18T14:30:00Z",
  venue: VENUES.mcg,
  teamA: TEAMS.IND,
  teamB: TEAMS.PAK,
  toss: {
    winnerTeamId: "IND",
    decision: "BOWL"
  },
  target: 210,
  currentInningsIndex: 1,
  currentBatters: [
    {
      playerId: "virat-kohli",
      name: "Virat Kohli",
      runs: 82,
      balls: 48,
      fours: 6,
      sixes: 4,
      strikeRate: 170.83,
      dismissal: "not out",
      isOnStrike: true,
    },
    {
      playerId: "hardik-pandya",
      name: "Hardik Pandya",
      runs: 40,
      balls: 26,
      fours: 2,
      sixes: 3,
      strikeRate: 153.85,
      dismissal: "not out",
      isOnStrike: false,
    }
  ],
  currentBowler: {
    playerId: "shaheen-afridi",
    name: "Shaheen Shah Afridi",
    overs: 3.2,
    maidens: 0,
    runs: 38,
    wickets: 2,
    economy: 11.40,
    dotBalls: 6,
    isCurrent: true,
  },
  innings: [
    {
      inningsNumber: 1,
      battingTeamId: "PAK",
      bowlingTeamId: "IND",
      runs: 209,
      wickets: 7,
      overs: 20.0,
      maxOvers: 20,
      isCompleted: true,
      batting: [
        { playerId: "babar-azam", name: "Babar Azam", runs: 68, balls: 44, fours: 7, sixes: 2, strikeRate: 154.55, dismissal: "c Jadeja b Bumrah" },
        { playerId: "rizwan", name: "Mohammad Rizwan", runs: 49, balls: 35, fours: 5, sixes: 1, strikeRate: 140.00, dismissal: "b Arshdeep" },
        { playerId: "fakhar", name: "Fakhar Zaman", runs: 34, balls: 18, fours: 3, sixes: 3, strikeRate: 188.89, dismissal: "c Axar b Pandya" },
        { playerId: "iflikhar", name: "Iftikhar Ahmed", runs: 28, balls: 14, fours: 1, sixes: 3, strikeRate: 200.00, dismissal: "c & b Bumrah" },
        { playerId: "shadab", name: "Shadab Khan", runs: 12, balls: 6, fours: 1, sixes: 1, strikeRate: 200.00, dismissal: "run out (Kohli)" },
        { playerId: "nawaz", name: "Mohammad Nawaz", runs: 7, balls: 3, fours: 1, sixes: 0, strikeRate: 233.33, dismissal: "b Arshdeep" },
        { playerId: "shaheen", name: "Shaheen Afridi", runs: 5, balls: 2, fours: 1, sixes: 0, strikeRate: 250.00, dismissal: "not out" },
        { playerId: "haris", name: "Haris Rauf", runs: 0, balls: 1, fours: 0, sixes: 0, strikeRate: 0.00, dismissal: "c Rahul b Bumrah" }
      ],
      bowling: [
        { playerId: "jasprit-bumrah", name: "Jasprit Bumrah", overs: 4.0, maidens: 0, runs: 28, wickets: 3, economy: 7.00, dotBalls: 12 },
        { playerId: "arshdeep", name: "Arshdeep Singh", overs: 4.0, maidens: 0, runs: 42, wickets: 2, economy: 10.50, dotBalls: 7 },
        { playerId: "hardik-pandya", name: "Hardik Pandya", overs: 4.0, maidens: 0, runs: 39, wickets: 1, economy: 9.75, dotBalls: 6 },
        { playerId: "axar", name: "Axar Patel", overs: 4.0, maidens: 0, runs: 46, wickets: 0, economy: 11.50, dotBalls: 5 },
        { playerId: "kuldeep", name: "Kuldeep Yadav", overs: 4.0, maidens: 0, runs: 50, wickets: 0, economy: 12.50, dotBalls: 4 },
      ],
      extras: { wides: 3, noBalls: 1, byes: 0, legByes: 2, penalty: 0, total: 6 },
      fallOfWickets: [
        { wicketNumber: 1, score: 84, over: 9.2, playerName: "Mohammad Rizwan" },
        { wicketNumber: 2, score: 142, over: 14.1, playerName: "Babar Azam" },
        { wicketNumber: 3, score: 168, over: 16.3, playerName: "Fakhar Zaman" },
        { wicketNumber: 4, score: 189, over: 18.2, playerName: "Iftikhar Ahmed" },
        { wicketNumber: 5, score: 198, over: 19.1, playerName: "Shadab Khan" },
        { wicketNumber: 6, score: 204, over: 19.4, playerName: "Mohammad Nawaz" },
        { wicketNumber: 7, score: 209, over: 20.0, playerName: "Haris Rauf" },
      ],
      runsPerOver: [
        { over: 1, runs: 8, wickets: 0 }, { over: 2, runs: 11, wickets: 0 }, { over: 3, runs: 9, wickets: 0 },
        { over: 4, runs: 14, wickets: 0 }, { over: 5, runs: 7, wickets: 0 }, { over: 6, runs: 12, wickets: 0 },
        { over: 7, runs: 8, wickets: 0 }, { over: 8, runs: 10, wickets: 0 }, { over: 9, runs: 7, wickets: 0 },
        { over: 10, runs: 15, wickets: 1 }, { over: 11, runs: 11, wickets: 0 }, { over: 12, runs: 9, wickets: 0 },
        { over: 13, runs: 13, wickets: 0 }, { over: 14, runs: 8, wickets: 1 }, { over: 15, runs: 16, wickets: 0 },
        { over: 16, runs: 12, wickets: 0 }, { over: 17, runs: 15, wickets: 1 }, { over: 18, runs: 10, wickets: 0 },
        { over: 19, runs: 9, wickets: 2 }, { over: 20, runs: 5, wickets: 2 }
      ]
    },
    {
      inningsNumber: 2,
      battingTeamId: "IND",
      bowlingTeamId: "PAK",
      runs: 184,
      wickets: 5,
      overs: 18.2,
      maxOvers: 20,
      isCompleted: false,
      batting: [
        { playerId: "rohit", name: "Rohit Sharma", runs: 18, balls: 11, fours: 2, sixes: 1, strikeRate: 163.64, dismissal: "c Babar b Shaheen" },
        { playerId: "jaiswal", name: "Yashasvi Jaiswal", runs: 12, balls: 8, fours: 2, sixes: 0, strikeRate: 150.00, dismissal: "c Rizwan b Naseem" },
        { playerId: "virat-kohli", name: "Virat Kohli", runs: 82, balls: 48, fours: 6, sixes: 4, strikeRate: 170.83, dismissal: "not out", isOnStrike: true },
        { playerId: "sky", name: "Suryakumar Yadav", runs: 15, balls: 10, fours: 2, sixes: 0, strikeRate: 150.00, dismissal: "c Shadab b Rauf" },
        { playerId: "pant", name: "Rishabh Pant", runs: 10, balls: 7, fours: 1, sixes: 0, strikeRate: 142.86, dismissal: "b Shadab" },
        { playerId: "dube", name: "Shivam Dube", runs: 1, balls: 2, fours: 0, sixes: 0, strikeRate: 50.00, dismissal: "b Rauf" },
        { playerId: "hardik-pandya", name: "Hardik Pandya", runs: 40, balls: 26, fours: 2, sixes: 3, strikeRate: 153.85, dismissal: "not out", isOnStrike: false }
      ],
      bowling: [
        { playerId: "shaheen", name: "Shaheen Afridi", overs: 3.2, maidens: 0, runs: 38, wickets: 2, economy: 11.40, dotBalls: 6, isCurrent: true },
        { playerId: "naseem", name: "Naseem Shah", overs: 4.0, maidens: 0, runs: 34, wickets: 1, economy: 8.50, dotBalls: 9 },
        { playerId: "haris", name: "Haris Rauf", overs: 4.0, maidens: 0, runs: 41, wickets: 2, economy: 10.25, dotBalls: 8 },
        { playerId: "shadab", name: "Shadab Khan", overs: 4.0, maidens: 0, runs: 39, wickets: 1, economy: 9.75, dotBalls: 7 },
        { playerId: "nawaz", name: "Mohammad Nawaz", overs: 3.0, maidens: 0, runs: 28, wickets: 0, economy: 9.33, dotBalls: 4 }
      ],
      extras: { wides: 4, noBalls: 0, byes: 0, legByes: 2, penalty: 0, total: 6 },
      fallOfWickets: [
        { wicketNumber: 1, score: 21, over: 2.1, playerName: "Yashasvi Jaiswal" },
        { wicketNumber: 2, score: 32, over: 3.4, playerName: "Rohit Sharma" },
        { wicketNumber: 3, score: 58, over: 6.2, playerName: "Suryakumar Yadav" },
        { wicketNumber: 4, score: 79, over: 8.5, playerName: "Rishabh Pant" },
        { wicketNumber: 5, score: 82, over: 9.3, playerName: "Shivam Dube" }
      ],
      runsPerOver: [
        { over: 1, runs: 6, wickets: 0 }, { over: 2, runs: 12, wickets: 0 }, { over: 3, runs: 5, wickets: 1 },
        { over: 4, runs: 9, wickets: 1 }, { over: 5, runs: 8, wickets: 0 }, { over: 6, runs: 11, wickets: 0 },
        { over: 7, runs: 7, wickets: 1 }, { over: 8, runs: 12, wickets: 0 }, { over: 9, runs: 6, wickets: 1 },
        { over: 10, runs: 5, wickets: 1 }, { over: 11, runs: 9, wickets: 0 }, { over: 12, runs: 14, wickets: 0 },
        { over: 13, runs: 11, wickets: 0 }, { over: 14, runs: 12, wickets: 0 }, { over: 15, runs: 16, wickets: 0 },
        { over: 16, runs: 14, wickets: 0 }, { over: 17, runs: 13, wickets: 0 }, { over: 18, runs: 11, wickets: 0 },
        { over: 19, runs: 3, wickets: 0 } // Over in progress: 18.1 (1 run), 18.2 (2 runs)
      ]
    }
  ],
  recentDeliveries: [
    { id: "b1", overNumber: 17, ballNumber: 4, displayOver: "17.4", runs: 2, isWicket: false, isBoundary: false, isSix: false, isDot: false, bowlerName: "Haris Rauf", batsmanName: "Hardik Pandya", nonStrikerName: "Virat Kohli", speedKmph: 148.2, shortDesc: "2 runs", commentary: "Whipped off the hips through deep square leg for a sharp brace." },
    { id: "b2", overNumber: 17, ballNumber: 5, displayOver: "17.5", runs: 4, isWicket: false, isBoundary: true, isSix: false, isDot: false, bowlerName: "Haris Rauf", batsmanName: "Hardik Pandya", nonStrikerName: "Virat Kohli", speedKmph: 145.6, shortDesc: "FOUR", commentary: "GLORIOUS! Full outside off, Hardik creams this over extra cover for a scorching boundary!" },
    { id: "b3", overNumber: 17, ballNumber: 6, displayOver: "17.6", runs: 1, isWicket: false, isBoundary: false, isSix: false, isDot: false, bowlerName: "Haris Rauf", batsmanName: "Hardik Pandya", nonStrikerName: "Virat Kohli", speedKmph: 149.1, shortDesc: "1 run", commentary: "Dug in short, steered down to third man to retain strike." },
    { id: "b4", overNumber: 18, ballNumber: 1, displayOver: "18.1", runs: 1, isWicket: false, isBoundary: false, isSix: false, isDot: false, bowlerName: "Shaheen Afridi", batsmanName: "Hardik Pandya", nonStrikerName: "Virat Kohli", speedKmph: 142.4, shortDesc: "1 run", commentary: "Yorker right in the blockhole, squeezed out towards mid-wicket for a single. Kohli on strike!" },
    { id: "b5", overNumber: 18, ballNumber: 2, displayOver: "18.2", runs: 2, isWicket: false, isBoundary: false, isSix: false, isDot: false, bowlerName: "Shaheen Afridi", batsmanName: "Virat Kohli", nonStrikerName: "Hardik Pandya", speedKmph: 144.1, shortDesc: "2 runs", commentary: "Slower cutter outside off, pushed into the gap at deep cover. Sensational running between the wickets!" }
  ],
  commentary: [
    { id: "c1", overNumber: 18, ballNumber: 2, displayOver: "18.2", runs: 2, isWicket: false, isBoundary: false, isSix: false, isDot: false, bowlerName: "Shaheen Afridi", batsmanName: "Virat Kohli", nonStrikerName: "Hardik Pandya", speedKmph: 144.1, shortDesc: "2 runs", commentary: "Slower off-cutter from Shaheen, Kohli waits on it and slices it softly through deep backward point. Pandya charges back for the second with high energy. 2 runs taken comfortably." },
    { id: "c2", overNumber: 18, ballNumber: 1, displayOver: "18.1", runs: 1, isWicket: false, isBoundary: false, isSix: false, isDot: false, bowlerName: "Shaheen Afridi", batsmanName: "Hardik Pandya", nonStrikerName: "Virat Kohli", speedKmph: 142.4, shortDesc: "1 run", commentary: "Targeting the toes from over the wicket, toe-crushing yorker. Hardik jams the bat down right in the nick of time, ball scampers to long-on for a quick single." },
    { id: "c3", overNumber: 17, ballNumber: 6, displayOver: "17.6", runs: 1, isWicket: false, isBoundary: false, isSix: false, isDot: false, bowlerName: "Haris Rauf", batsmanName: "Hardik Pandya", nonStrikerName: "Virat Kohli", speedKmph: 149.1, shortDesc: "1 run", commentary: "149 clicks! Heavy ball into the deck, pushed off the backfoot towards deep backward square. India take 11 runs off Rauf's over." },
    { id: "c4", overNumber: 17, ballNumber: 5, displayOver: "17.5", runs: 4, isWicket: false, isBoundary: true, isSix: false, isDot: false, bowlerName: "Haris Rauf", batsmanName: "Hardik Pandya", nonStrikerName: "Virat Kohli", speedKmph: 145.6, shortDesc: "FOUR", commentary: "FOUR RUNS! Overpitched outside off, Hardik frees his arms and lofts it cleanly over mid-off. The MCG erupts into thunderous roar!" },
    { id: "c5", overNumber: 17, ballNumber: 4, displayOver: "17.4", runs: 2, isWicket: false, isBoundary: false, isSix: false, isDot: false, bowlerName: "Haris Rauf", batsmanName: "Hardik Pandya", nonStrikerName: "Virat Kohli", speedKmph: 148.2, shortDesc: "2 runs", commentary: "Whipped off the hips through deep square leg. Electric sprint by both Kohli and Pandya turns one into two." }
  ],
  events: [
    { id: "e1", timestamp: "18.2 ov", over: "18.2", eventType: "PARTNERSHIP_MILESTONE", player: "Virat Kohli & Hardik Pandya", team: "India", title: "100-run Partnership", description: "Unbelievable rescue act! 102 runs off 53 balls between Kohli (62*) and Pandya (40*) after 82/5.", importance: "HIGH" },
    { id: "e2", timestamp: "16.1 ov", over: "16.1", eventType: "FIFTY", player: "Virat Kohli", team: "India", title: "Fifty for Virat Kohli (52 off 37 balls)", description: "Raises bat under immense pressure. 4 boundaries and 2 sixes in a trademark masterclass chase.", importance: "HIGH" },
    { id: "e3", timestamp: "9.3 ov", over: "9.3", eventType: "WICKET", player: "Shivam Dube", team: "India", title: "WICKET! Dube b Rauf 1 (2)", description: "150 kph thunderbolt cleans up off-stump. India reeling at 82/5.", importance: "HIGH" },
    { id: "e4", timestamp: "8.5 ov", over: "8.5", eventType: "WICKET", player: "Rishabh Pant", team: "India", title: "WICKET! Pant b Shadab 10 (7)", description: "Misses the leg-break completely attempting a reverse sweep.", importance: "MEDIUM" },
    { id: "e5", timestamp: "Innings Break", over: "20.0", eventType: "INNINGS_BREAK", player: "Pakistan", team: "Pakistan", title: "Pakistan 209/7 (20 Overs)", description: "Target set at 210. Babar Azam top scores with 68, Bumrah picks 3/28.", importance: "HIGH" }
  ],
  winProbability: {
    teamAId: "IND",
    teamBId: "PAK",
    teamAWinPercentage: 64,
    teamBWinPercentage: 36,
    trend: "RISING",
    history: [
      { over: 0, teamAPercentage: 55, teamBPercentage: 45 },
      { over: 3, teamAPercentage: 35, teamBPercentage: 65 },
      { over: 6, teamAPercentage: 30, teamBPercentage: 70 },
      { over: 10, teamAPercentage: 18, teamBPercentage: 82 },
      { over: 14, teamAPercentage: 38, teamBPercentage: 62 },
      { over: 16, teamAPercentage: 52, teamBPercentage: 48 },
      { over: 18, teamAPercentage: 64, teamBPercentage: 36 }
    ],
    modelNote: "Model-based match outlook: Analytical estimate based on live match state, venue death-over chase history, and active partnership data. Not a guaranteed outcome."
  },
  aiAnalysis: {
    situation: "India require 26 runs from the final 10 deliveries (RRR: 15.60) in one of the most electric T20 World Cup finals in history. Virat Kohli (82*) has anchored a 102-run stand with Hardik Pandya (40*) after a disastrous 82/5 collapse. Shaheen Afridi is bowling the 19th over, with Haris Rauf set to bowl the 20th.",
    momentum: "BATTER_DOMINANCE",
    battingAnalysis: {
      currentRunRate: 10.04,
      requiredRunRate: 15.60,
      boundaryPercentage: 64.2,
      dotBallPercentage: 24.1,
      strikeRotationRate: 81.5,
      powerplayPerformance: "Poor (38/3 in first 6 overs, lost Rohit and Jaiswal)",
      deathOverScoring: "Exceptional (Scoring at 13.4 RPO since over 15)"
    },
    bowlingAnalysis: {
      economy: 10.04,
      dotBallPercentage: 28.5,
      boundariesConceded: 21,
      keyMatchup: "Shaheen Afridi vs Virat Kohli: Kohli strikes at 162.5 against left-arm pace at MCG death overs."
    },
    keyFactors: [
      "Kohli & Hardik partnership scoring at 11.5 RPO over the last 6 overs",
      "India require 2.6 runs per remaining legal ball to lift the World Cup",
      "Shaheen Afridi conceding 11.40 RPO today with dew affecting seam grip",
      "Babar Azam having to manage field restrictions with fine leg up"
    ]
  },
  ticketInfo: {
    id: "tkt-ind-pak-final",
    matchId: "ind-vs-pak-t20wc-final",
    tournament: "ICC Men's T20 World Cup 2026",
    matchTitle: "Final: India vs Pakistan",
    venueName: "Melbourne Cricket Ground, Melbourne",
    date: "2026-09-18",
    time: "19:00 AEST",
    availability: "SOLD_OUT",
    currency: "AUD",
    minPrice: 120,
    maxPrice: 850,
    officialProvider: "ICC Official Ticketing & Ticketek",
    officialUrl: "https://tickets.t20worldcup.com",
    authorizedBadge: true,
    disclaimer: "Ticket availability and pricing are managed solely by official authorized providers. Verify current status directly on the official ticketing portal."
  },
  oddsPreview: [
    { providerName: "Bet365 (Licensed UK/EU)", marketName: "Match Winner", teamAOdds: 1.55, teamBOdds: 2.45, lastUpdated: "2 mins ago", trend: "DOWN" },
    { providerName: "SkyBet (Licensed UK)", marketName: "Match Winner", teamAOdds: 1.57, teamBOdds: 2.40, lastUpdated: "1 min ago", trend: "DOWN" },
    { providerName: "Betway (Licensed MGA)", marketName: "Match Winner", teamAOdds: 1.53, teamBOdds: 2.50, lastUpdated: "Just now", trend: "DOWN" },
    { providerName: "Unibet (Licensed EU)", marketName: "Match Winner", teamAOdds: 1.56, teamBOdds: 2.42, lastUpdated: "3 mins ago", trend: "STABLE" },
  ]
};

// LIVE Match 2: The Ashes Test Match
export const MATCH_AUS_VS_ENG: Match = {
  id: "aus-vs-eng-ashes-mcg",
  slug: "australia-vs-england-the-ashes-4th-test-2025-26",
  tournamentName: "The Ashes 2025-26",
  tournamentId: "ashes-2025-26",
  matchNumber: "4th Test - Day 4",
  format: "TEST",
  status: "LIVE",
  statusText: "Day 4: Session 3 — England need 6 wickets, Australia lead by 276 runs",
  startTime: "2026-09-15T00:30:00Z",
  venue: VENUES.mcg,
  teamA: TEAMS.AUS,
  teamB: TEAMS.ENG,
  toss: {
    winnerTeamId: "AUS",
    decision: "BAT"
  },
  currentInningsIndex: 2,
  currentBatters: [
    { playerId: "travis-head", name: "Travis Head", runs: 74, balls: 88, fours: 9, sixes: 1, strikeRate: 84.09, dismissal: "not out", isOnStrike: true },
    { playerId: "alex-carey", name: "Alex Carey", runs: 28, balls: 46, fours: 3, sixes: 0, strikeRate: 60.87, dismissal: "not out", isOnStrike: false }
  ],
  currentBowler: {
    playerId: "jofra-archer",
    name: "Jofra Archer",
    overs: 16.4,
    maidens: 3,
    runs: 54,
    wickets: 2,
    economy: 3.24,
    dotBalls: 68,
    isCurrent: true,
  },
  innings: [
    {
      inningsNumber: 1,
      battingTeamId: "AUS",
      bowlingTeamId: "ENG",
      runs: 340,
      wickets: 10,
      overs: 98.4,
      maxOvers: 450,
      isCompleted: true,
      batting: [
        { playerId: "usman", name: "Usman Khawaja", runs: 91, balls: 210, fours: 11, sixes: 0, strikeRate: 43.33, dismissal: "c Root b Woakes" },
        { playerId: "head", name: "Travis Head", runs: 114, balls: 135, fours: 14, sixes: 2, strikeRate: 84.44, dismissal: "c Buttler b Archer" }
      ],
      bowling: [
        { playerId: "archer", name: "Jofra Archer", overs: 22.0, maidens: 5, runs: 68, wickets: 4, economy: 3.09, dotBalls: 88 },
        { playerId: "woakes", name: "Chris Woakes", overs: 24.4, maidens: 6, runs: 72, wickets: 3, economy: 2.91, dotBalls: 96 }
      ],
      extras: { wides: 4, noBalls: 2, byes: 4, legByes: 6, penalty: 0, total: 16 },
      fallOfWickets: [
        { wicketNumber: 1, score: 32, over: 11.2, playerName: "David Warner" },
        { wicketNumber: 2, score: 180, over: 54.0, playerName: "Usman Khawaja" }
      ],
      runsPerOver: []
    },
    {
      inningsNumber: 2,
      battingTeamId: "ENG",
      bowlingTeamId: "AUS",
      runs: 284,
      wickets: 10,
      overs: 74.2,
      maxOvers: 450,
      isCompleted: true,
      batting: [
        { playerId: "buttler", name: "Jos Buttler", runs: 78, balls: 112, fours: 8, sixes: 2, strikeRate: 69.64, dismissal: "c Carey b Starc" },
        { playerId: "brook", name: "Harry Brook", runs: 62, balls: 72, fours: 7, sixes: 1, strikeRate: 86.11, dismissal: "b Cummins" }
      ],
      bowling: [
        { playerId: "cummins", name: "Pat Cummins", overs: 18.2, maidens: 4, runs: 64, wickets: 4, economy: 3.49, dotBalls: 70 },
        { playerId: "starc", name: "Mitchell Starc", overs: 16.0, maidens: 2, runs: 58, wickets: 3, economy: 3.62, dotBalls: 62 }
      ],
      extras: { wides: 2, noBalls: 3, byes: 2, legByes: 4, penalty: 0, total: 11 },
      fallOfWickets: [],
      runsPerOver: []
    },
    {
      inningsNumber: 3,
      battingTeamId: "AUS",
      bowlingTeamId: "ENG",
      runs: 220,
      wickets: 4,
      overs: 62.4,
      maxOvers: 450,
      isCompleted: false,
      batting: [
        { playerId: "travis-head", name: "Travis Head", runs: 74, balls: 88, fours: 9, sixes: 1, strikeRate: 84.09, dismissal: "not out", isOnStrike: true },
        { playerId: "alex-carey", name: "Alex Carey", runs: 28, balls: 46, fours: 3, sixes: 0, strikeRate: 60.87, dismissal: "not out", isOnStrike: false }
      ],
      bowling: [
        { playerId: "jofra-archer", name: "Jofra Archer", overs: 16.4, maidens: 3, runs: 54, wickets: 2, economy: 3.24, dotBalls: 68, isCurrent: true }
      ],
      extras: { wides: 1, noBalls: 2, byes: 1, legByes: 4, penalty: 0, total: 8 },
      fallOfWickets: [],
      runsPerOver: []
    }
  ],
  recentDeliveries: [
    { id: "ab1", overNumber: 62, ballNumber: 4, displayOver: "62.4", runs: 0, isWicket: false, isBoundary: false, isSix: false, isDot: true, bowlerName: "Jofra Archer", batsmanName: "Travis Head", nonStrikerName: "Alex Carey", speedKmph: 147.2, shortDesc: "Dot ball", commentary: "Bouncer at helmet height! Head sways out of the line cleanly." }
  ],
  commentary: [
    { id: "ac1", overNumber: 62, ballNumber: 4, displayOver: "62.4", runs: 0, isWicket: false, isBoundary: false, isSix: false, isDot: true, bowlerName: "Jofra Archer", batsmanName: "Travis Head", nonStrikerName: "Alex Carey", speedKmph: 147.2, shortDesc: "Dot ball", commentary: "Fierce bouncer testing Head's helmet grill, ducked underneath with precision." }
  ],
  events: [
    { id: "ae1", timestamp: "58.2 ov", over: "58.2", eventType: "FIFTY", player: "Travis Head", team: "Australia", title: "Fifty for Travis Head (52 off 64 balls)", description: "Counter-attacking half-century puts Australia in command.", importance: "HIGH" }
  ],
  winProbability: {
    teamAId: "AUS",
    teamBId: "ENG",
    teamAWinPercentage: 78,
    teamBWinPercentage: 14,
    tiePercentage: 8,
    trend: "RISING",
    history: [
      { over: 0, teamAPercentage: 50, teamBPercentage: 50 },
      { over: 30, teamAPercentage: 62, teamBPercentage: 30 },
      { over: 60, teamAPercentage: 78, teamBPercentage: 14 }
    ],
    modelNote: "Test Match Projection: Australian lead of 276 with 6 wickets in hand and 4 sessions remaining makes an Aussie victory highly probable."
  },
  aiAnalysis: {
    situation: "Australia lead by 276 runs with 6 wickets in hand on Day 4. Head (74*) has taken the game away with rapid scoring. A declaration before stumps tonight is on the cards.",
    momentum: "BATTER_DOMINANCE",
    battingAnalysis: {
      currentRunRate: 3.51,
      boundaryPercentage: 52.0,
      dotBallPercentage: 68.0,
      strikeRotationRate: 32.0,
      powerplayPerformance: "Solid top order foundation",
      deathOverScoring: "N/A"
    },
    bowlingAnalysis: {
      economy: 3.51,
      dotBallPercentage: 68.0,
      boundariesConceded: 24,
      keyMatchup: "Archer's short-pitch barrage vs Head's pull shot."
    },
    keyFactors: [
      "Australia lead by 276 runs, historic 4th innings target average is 154 at MCG",
      "Pitch displaying variable bounce with widening cracks outside off-stump"
    ]
  }
};

// LIVE Match 3: IPL Clash CSK vs MI
export const MATCH_CSK_VS_MI: Match = {
  id: "csk-vs-mi-ipl-2026",
  slug: "chennai-super-kings-vs-mumbai-indians-ipl-2026",
  tournamentName: "Indian Premier League 2026",
  tournamentId: "ipl-2026",
  matchNumber: "Match 43",
  format: "T20",
  status: "LIVE",
  statusText: "CSK need 57 runs in 35 balls",
  startTime: "2026-09-18T19:30:00Z",
  venue: VENUES.wankhede,
  teamA: TEAMS.CSK,
  teamB: TEAMS.MI,
  toss: {
    winnerTeamId: "CSK",
    decision: "BOWL"
  },
  target: 199,
  currentInningsIndex: 1,
  currentBatters: [
    { playerId: "ruturaj", name: "Ruturaj Gaikwad", runs: 64, balls: 41, fours: 7, sixes: 2, strikeRate: 156.10, dismissal: "not out", isOnStrike: true },
    { playerId: "dube-ipl", name: "Shivam Dube", runs: 32, balls: 18, fours: 2, sixes: 3, strikeRate: 177.78, dismissal: "not out", isOnStrike: false }
  ],
  currentBowler: {
    playerId: "bumrah-mi",
    name: "Jasprit Bumrah",
    overs: 2.1,
    maidens: 0,
    runs: 14,
    wickets: 1,
    economy: 6.46,
    dotBalls: 6,
    isCurrent: true
  },
  innings: [
    {
      inningsNumber: 1,
      battingTeamId: "MI",
      bowlingTeamId: "CSK",
      runs: 198,
      wickets: 5,
      overs: 20.0,
      maxOvers: 20,
      isCompleted: true,
      batting: [
        { playerId: "rohit-mi", name: "Rohit Sharma", runs: 68, balls: 42, fours: 8, sixes: 3, strikeRate: 161.90, dismissal: "c Dhoni b Pathirana" }
      ],
      bowling: [
        { playerId: "pathirana", name: "Matheesha Pathirana", overs: 4.0, maidens: 0, runs: 36, wickets: 3, economy: 9.00, dotBalls: 9 }
      ],
      extras: { wides: 5, noBalls: 1, byes: 0, legByes: 3, penalty: 0, total: 9 },
      fallOfWickets: [],
      runsPerOver: []
    },
    {
      inningsNumber: 2,
      battingTeamId: "CSK",
      bowlingTeamId: "MI",
      runs: 142,
      wickets: 3,
      overs: 14.1,
      maxOvers: 20,
      isCompleted: false,
      batting: [
        { playerId: "ruturaj", name: "Ruturaj Gaikwad", runs: 64, balls: 41, fours: 7, sixes: 2, strikeRate: 156.10, dismissal: "not out", isOnStrike: true },
        { playerId: "dube-ipl", name: "Shivam Dube", runs: 32, balls: 18, fours: 2, sixes: 3, strikeRate: 177.78, dismissal: "not out", isOnStrike: false }
      ],
      bowling: [
        { playerId: "bumrah-mi", name: "Jasprit Bumrah", overs: 2.1, maidens: 0, runs: 14, wickets: 1, economy: 6.46, dotBalls: 6, isCurrent: true }
      ],
      extras: { wides: 3, noBalls: 0, byes: 1, legByes: 2, penalty: 0, total: 6 },
      fallOfWickets: [],
      runsPerOver: []
    }
  ],
  recentDeliveries: [
    { id: "mi1", overNumber: 14, ballNumber: 1, displayOver: "14.1", runs: 1, isWicket: false, isBoundary: false, isSix: false, isDot: false, bowlerName: "Jasprit Bumrah", batsmanName: "Ruturaj Gaikwad", nonStrikerName: "Shivam Dube", speedKmph: 144.8, shortDesc: "1 run", commentary: "Laser-guided yorker on the off-pole, squirted away through point for a single." }
  ],
  commentary: [
    { id: "mic1", overNumber: 14, ballNumber: 1, displayOver: "14.1", runs: 1, isWicket: false, isBoundary: false, isSix: false, isDot: false, bowlerName: "Jasprit Bumrah", batsmanName: "Ruturaj Gaikwad", nonStrikerName: "Shivam Dube", speedKmph: 144.8, shortDesc: "1 run", commentary: "Bumrah returns into the attack. Yorker at 144.8 kph, Gaikwad digs it out." }
  ],
  events: [
    { id: "mie1", timestamp: "12.3 ov", over: "12.3", eventType: "FIFTY", player: "Ruturaj Gaikwad", team: "CSK", title: "Fifty for Ruturaj Gaikwad (50 off 34 balls)", description: "Captain's knock anchoring the chase.", importance: "HIGH" }
  ],
  winProbability: {
    teamAId: "CSK",
    teamBId: "MI",
    teamAWinPercentage: 58,
    teamBWinPercentage: 42,
    trend: "RISING",
    history: [
      { over: 0, teamAPercentage: 48, teamBPercentage: 52 },
      { over: 6, teamAPercentage: 45, teamBPercentage: 55 },
      { over: 10, teamAPercentage: 52, teamBPercentage: 48 },
      { over: 14, teamAPercentage: 58, teamBPercentage: 42 }
    ],
    modelNote: "IPL Chase Projection: CSK require 57 runs from 35 balls with 7 wickets remaining. Heavy dew favors batters."
  },
  aiAnalysis: {
    situation: "CSK need 57 off 35 deliveries. Dew is setting in at the Wankhede, giving the chasing team a significant boundary-hitting advantage.",
    momentum: "BALANCED",
    battingAnalysis: {
      currentRunRate: 10.02,
      requiredRunRate: 9.77,
      boundaryPercentage: 62.0,
      dotBallPercentage: 27.0,
      strikeRotationRate: 78.0,
      powerplayPerformance: "54/2",
      deathOverScoring: "11.2 RPO expected"
    },
    bowlingAnalysis: {
      economy: 10.02,
      dotBallPercentage: 27.0,
      boundariesConceded: 18,
      keyMatchup: "Bumrah's remaining 11 deliveries will decide the outcome."
    },
    keyFactors: [
      "Heavy dew makes gripping the white ball difficult for MI spinners",
      "Gaikwad and Dube have put on 64 runs in just 38 balls"
    ]
  }
};

// UPCOMING Matches
export const UPCOMING_MATCHES: Match[] = [
  {
    id: "sa-vs-nz-t20wc-semi",
    slug: "south-africa-vs-new-zealand-t20-world-cup-2026",
    tournamentName: "ICC Men's T20 World Cup 2026",
    tournamentId: "t20-world-cup-2026",
    matchNumber: "Semi-Final 1",
    format: "T20I",
    status: "UPCOMING",
    statusText: "Starts tomorrow at 19:00 IST",
    startTime: "2026-09-20T13:30:00Z",
    venue: VENUES.ahmedabad,
    teamA: TEAMS.SA,
    teamB: TEAMS.NZ,
    toss: { winnerTeamId: "", decision: "BAT" },
    currentInningsIndex: 0,
    currentBatters: [
      { playerId: "", name: "TBA", runs: 0, balls: 0, fours: 0, sixes: 0, strikeRate: 0, dismissal: "" },
      { playerId: "", name: "TBA", runs: 0, balls: 0, fours: 0, sixes: 0, strikeRate: 0, dismissal: "" }
    ],
    currentBowler: { playerId: "", name: "TBA", overs: 0, maidens: 0, runs: 0, wickets: 0, economy: 0, dotBalls: 0 },
    innings: [],
    recentDeliveries: [],
    commentary: [],
    events: [],
    winProbability: {
      teamAId: "SA",
      teamBId: "NZ",
      teamAWinPercentage: 54,
      teamBWinPercentage: 46,
      trend: "STEADY",
      history: [],
      modelNote: "Pre-match statistical projection based on head-to-head records and recent form."
    },
    aiAnalysis: {
      situation: "High stakes knockout encounter. Both sides have aggressive top orders and pace attacks well-suited to Ahmedabad's bouncy surface.",
      momentum: "BALANCED",
      battingAnalysis: { currentRunRate: 0, boundaryPercentage: 0, dotBallPercentage: 0, strikeRotationRate: 0, powerplayPerformance: "", deathOverScoring: "" },
      bowlingAnalysis: { economy: 0, dotBallPercentage: 0, boundariesConceded: 0, keyMatchup: "Kagiso Rabada vs Devon Conway" },
      keyFactors: ["Ahmedabad average first innings score is 182", "South Africa won 3 of the last 4 T20I meetings"]
    },
    ticketInfo: {
      id: "tkt-sa-nz",
      matchId: "sa-vs-nz-t20wc-semi",
      tournament: "ICC Men's T20 World Cup 2026",
      matchTitle: "Semi-Final: South Africa vs New Zealand",
      venueName: "Narendra Modi Stadium, Ahmedabad",
      date: "2026-09-20",
      time: "19:00 IST",
      availability: "LIMITED",
      currency: "INR",
      minPrice: 1500,
      maxPrice: 12000,
      officialProvider: "BookMyShow (Official ICC Partner)",
      officialUrl: "https://in.bookmyshow.com/cricket",
      authorizedBadge: true,
      disclaimer: "Ticket information may change. Verify availability and pricing with the official ticket provider."
    }
  },
  {
    id: "eng-vs-aus-odi-lords",
    slug: "england-vs-australia-odi-lords-2026",
    tournamentName: "Australia Tour of England 2026",
    tournamentId: "ashes-2025-26",
    matchNumber: "1st ODI",
    format: "ODI",
    status: "UPCOMING",
    statusText: "Starts Friday at 15:30 BST",
    startTime: "2026-09-22T10:30:00Z",
    venue: VENUES.lords,
    teamA: TEAMS.ENG,
    teamB: TEAMS.AUS,
    toss: { winnerTeamId: "", decision: "BAT" },
    currentInningsIndex: 0,
    currentBatters: [
      { playerId: "", name: "TBA", runs: 0, balls: 0, fours: 0, sixes: 0, strikeRate: 0, dismissal: "" },
      { playerId: "", name: "TBA", runs: 0, balls: 0, fours: 0, sixes: 0, strikeRate: 0, dismissal: "" }
    ],
    currentBowler: { playerId: "", name: "TBA", overs: 0, maidens: 0, runs: 0, wickets: 0, economy: 0, dotBalls: 0 },
    innings: [],
    recentDeliveries: [],
    commentary: [],
    events: [],
    winProbability: {
      teamAId: "ENG",
      teamBId: "AUS",
      teamAWinPercentage: 48,
      teamBWinPercentage: 52,
      trend: "STEADY",
      history: [],
      modelNote: "Historical match prediction based on Lord's venue trends."
    },
    aiAnalysis: {
      situation: "England host world champions Australia at Lord's. The pitch has visible grass covering which will assist early swing bowling.",
      momentum: "BALANCED",
      battingAnalysis: { currentRunRate: 0, boundaryPercentage: 0, dotBallPercentage: 0, strikeRotationRate: 0, powerplayPerformance: "", deathOverScoring: "" },
      bowlingAnalysis: { economy: 0, dotBallPercentage: 0, boundariesConceded: 0, keyMatchup: "Mitchell Starc vs Jos Buttler" },
      keyFactors: ["Teams batting first win 58% of ODIs at Lord's"]
    },
    ticketInfo: {
      id: "tkt-eng-aus-lords",
      matchId: "eng-vs-aus-odi-lords",
      tournament: "Australia Tour of England 2026",
      matchTitle: "1st ODI: England vs Australia",
      venueName: "Lord's Cricket Ground, London",
      date: "2026-09-22",
      time: "11:00 BST",
      availability: "SELLING_FAST",
      currency: "GBP",
      minPrice: 65,
      maxPrice: 220,
      officialProvider: "Lord's MCC Official Ticketing",
      officialUrl: "https://tickets.lords.org",
      authorizedBadge: true,
      disclaimer: "Ticket information may change. Verify availability and pricing with the official ticket provider."
    }
  }
];

// COMPLETED Matches
export const COMPLETED_MATCHES: Match[] = [
  {
    id: "ind-vs-aus-3rd-t20i",
    slug: "india-vs-australia-3rd-t20i-2026",
    tournamentName: "ICC Men's T20 World Cup 2026",
    tournamentId: "t20-world-cup-2026",
    matchNumber: "Super 8 - Match 12",
    format: "T20I",
    status: "COMPLETED",
    statusText: "India won by 6 wickets (with 5 balls remaining)",
    startTime: "2026-09-14T14:00:00Z",
    venue: VENUES.kensington,
    teamA: TEAMS.IND,
    teamB: TEAMS.AUS,
    toss: { winnerTeamId: "IND", decision: "BOWL" },
    target: 187,
    currentInningsIndex: 1,
    currentBatters: [
      { playerId: "virat-kohli", name: "Virat Kohli", runs: 74, balls: 47, fours: 7, sixes: 3, strikeRate: 157.45, dismissal: "not out" },
      { playerId: "hardik-pandya", name: "Hardik Pandya", runs: 28, balls: 14, fours: 2, sixes: 2, strikeRate: 200.00, dismissal: "not out" }
    ],
    currentBowler: { playerId: "starc", name: "Mitchell Starc", overs: 4.0, maidens: 0, runs: 44, wickets: 1, economy: 11.00, dotBalls: 7 },
    innings: [
      {
        inningsNumber: 1,
        battingTeamId: "AUS",
        bowlingTeamId: "IND",
        runs: 186,
        wickets: 7,
        overs: 20.0,
        maxOvers: 20,
        isCompleted: true,
        batting: [
          { playerId: "travis-head", name: "Travis Head", runs: 76, balls: 43, fours: 9, sixes: 4, strikeRate: 176.74, dismissal: "c Rohit b Bumrah" }
        ],
        bowling: [
          { playerId: "jasprit-bumrah", name: "Jasprit Bumrah", overs: 4.0, maidens: 0, runs: 21, wickets: 2, economy: 5.25, dotBalls: 13 }
        ],
        extras: { wides: 3, noBalls: 0, byes: 1, legByes: 2, penalty: 0, total: 6 },
        fallOfWickets: [],
        runsPerOver: []
      },
      {
        inningsNumber: 2,
        battingTeamId: "IND",
        bowlingTeamId: "AUS",
        runs: 188,
        wickets: 4,
        overs: 19.1,
        maxOvers: 20,
        isCompleted: true,
        batting: [
          { playerId: "virat-kohli", name: "Virat Kohli", runs: 74, balls: 47, fours: 7, sixes: 3, strikeRate: 157.45, dismissal: "not out" }
        ],
        bowling: [
          { playerId: "cummins", name: "Pat Cummins", overs: 4.0, maidens: 0, runs: 32, wickets: 2, economy: 8.00, dotBalls: 8 }
        ],
        extras: { wides: 4, noBalls: 1, byes: 0, legByes: 1, penalty: 0, total: 6 },
        fallOfWickets: [],
        runsPerOver: []
      }
    ],
    recentDeliveries: [],
    commentary: [],
    events: [
      { id: "e-fin", timestamp: "19.1 ov", over: "19.1", eventType: "MATCH_END", player: "Virat Kohli", team: "India", title: "India Seal Semi-Final Spot", description: "Kohli lofts Cummins over long-off to seal a clinical 6-wicket win.", importance: "HIGH" }
    ],
    winProbability: {
      teamAId: "IND",
      teamBId: "AUS",
      teamAWinPercentage: 100,
      teamBWinPercentage: 0,
      trend: "STEADY",
      history: [],
      modelNote: "Match completed. Final statistical model confirmed."
    },
    aiAnalysis: {
      situation: "India successfully chased down 187 with 5 deliveries to spare.",
      momentum: "BATTER_DOMINANCE",
      battingAnalysis: { currentRunRate: 9.81, boundaryPercentage: 61.0, dotBallPercentage: 29.0, strikeRotationRate: 75.0, powerplayPerformance: "48/1", deathOverScoring: "12.8 RPO" },
      bowlingAnalysis: { economy: 9.81, dotBallPercentage: 29.0, boundariesConceded: 20, keyMatchup: "Bumrah conceded only 21 runs in his 4 overs." },
      keyFactors: ["Bumrah's economy of 5.25 restricted Australia by 25-30 runs", "Kohli 74* masterclass chase"]
    }
  }
];

export const ALL_MATCHES: Match[] = [
  MATCH_IND_VS_PAK,
  MATCH_AUS_VS_ENG,
  MATCH_CSK_VS_MI,
  ...UPCOMING_MATCHES,
  ...COMPLETED_MATCHES
];

export const TICKETS: TicketInfo[] = [
  MATCH_IND_VS_PAK.ticketInfo!,
  UPCOMING_MATCHES[0].ticketInfo!,
  UPCOMING_MATCHES[1].ticketInfo!,
  {
    id: "tkt-ipl-final",
    matchId: "csk-vs-mi-ipl-2026",
    tournament: "Indian Premier League 2026",
    matchTitle: "Match 43: CSK vs MI",
    venueName: "Wankhede Stadium, Mumbai",
    date: "2026-09-18",
    time: "19:30 IST",
    availability: "LIMITED",
    currency: "INR",
    minPrice: 1200,
    maxPrice: 9500,
    officialProvider: "Paytm Insider (Official MI Partner)",
    officialUrl: "https://insider.in/ipl",
    authorizedBadge: true,
    disclaimer: "Ticket information may change. Verify availability and pricing with the official ticket provider."
  },
  {
    id: "tkt-ct-2026",
    matchId: "ct-pak-ind-2026",
    tournament: "ICC Champions Trophy 2026",
    matchTitle: "Group A: Pakistan vs India",
    venueName: "Dubai International Stadium, UAE",
    date: "2026-10-18",
    time: "18:00 GST",
    availability: "AVAILABLE",
    currency: "AED",
    minPrice: 150,
    maxPrice: 1200,
    officialProvider: "Platinumlist (Official Partner)",
    officialUrl: "https://dubai.platinumlist.net",
    authorizedBadge: true,
    disclaimer: "Ticket information may change. Verify availability and pricing with the official ticket provider."
  }
];

export const BETTING_ODDS_COMPARISON: OddsComparisonItem[] = [
  { providerName: "Bet365 (Licensed UK/EU)", marketName: "Match Winner (India vs Pakistan)", teamAOdds: 1.55, teamBOdds: 2.45, lastUpdated: "1 min ago", trend: "DOWN" },
  { providerName: "SkyBet (Licensed UK)", marketName: "Match Winner (India vs Pakistan)", teamAOdds: 1.57, teamBOdds: 2.40, lastUpdated: "Just now", trend: "DOWN" },
  { providerName: "Betway (Licensed MGA)", marketName: "Match Winner (India vs Pakistan)", teamAOdds: 1.53, teamBOdds: 2.50, lastUpdated: "2 mins ago", trend: "DOWN" },
  { providerName: "Unibet (Licensed EU)", marketName: "Match Winner (India vs Pakistan)", teamAOdds: 1.56, teamBOdds: 2.42, lastUpdated: "4 mins ago", trend: "STABLE" },
  { providerName: "Bet365 (Licensed UK/EU)", marketName: "Top India Batter (Kohli vs Hardik)", teamAOdds: 1.18, teamBOdds: 4.50, lastUpdated: "3 mins ago", trend: "DOWN" },
  { providerName: "SkyBet (Licensed UK)", marketName: "Total Sixes in Match (Over 18.5)", teamAOdds: 1.83, teamBOdds: 1.95, lastUpdated: "2 mins ago", trend: "UP" }
];

export const ODDS_MOVEMENT_HISTORY = [
  { timestamp: "Toss (14:00)", overOrTime: "Toss", teamAOdds: 1.85, teamBOdds: 1.95 },
  { timestamp: "10.0 ov (Pak 84/1)", overOrTime: "Pak 10 ov", teamAOdds: 2.15, teamBOdds: 1.70 },
  { timestamp: "20.0 ov (Pak 209/7)", overOrTime: "Innings Break", teamAOdds: 2.30, teamBOdds: 1.62 },
  { timestamp: "9.3 ov (Ind 82/5)", overOrTime: "Ind 9.3 ov", teamAOdds: 4.80, teamBOdds: 1.18 },
  { timestamp: "15.0 ov (Ind 142/5)", overOrTime: "Ind 15 ov", teamAOdds: 2.60, teamBOdds: 1.50 },
  { timestamp: "17.0 ov (Ind 170/5)", overOrTime: "Ind 17 ov", teamAOdds: 1.90, teamBOdds: 1.90 },
  { timestamp: "18.2 ov (Ind 184/5)", overOrTime: "Current", teamAOdds: 1.55, teamBOdds: 2.45 }
];

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    id: "news-1",
    title: "Masterclass Chase: How Kohli and Pandya Revived India From 82/5 in T20 World Cup Final",
    slug: "kohli-pandya-partnership-revival-t20-world-cup-final",
    summary: "A tactical breakdown of Virat Kohli's death-over strike manipulation and Hardik Pandya's fearless boundary-hitting under pressure at the MCG.",
    content: "The MCG roared as Virat Kohli and Hardik Pandya orchestrated what could go down as one of the most remarkable rescue acts in T20 international cricket. Trailing well behind the required run rate after losing 5 wickets for 82 runs, the duo focused on rotating the strike before unleashing against Haris Rauf and Shaheen Afridi...",
    category: "Tactical Analysis",
    author: "Arjun Sen",
    source: "CricPulse Analytics Desk",
    publishedAt: "2026-09-18T16:45:00Z",
    readingTimeMinutes: 5,
    imageUrl: "/news/kohli-pandya.jpg",
    relatedTeams: ["IND", "PAK"],
    relatedPlayers: ["virat-kohli", "hardik-pandya"]
  },
  {
    id: "news-2",
    title: "MCG Pitch Report & Day 5 Forecast: Widening Cracks Offer England Last Chance",
    slug: "mcg-pitch-report-day-5-forecast-ashes-4th-test",
    summary: "As Australia lead by 276 runs, curator Matt Page notes increasing rough outside off-stump for English spinners.",
    content: "Day 4 at the Melbourne Cricket Ground has highlighted subtle deterioration in the drop-in surface. English bowlers will need to exploit uneven bounce if they are to restrict Australia's mounting lead...",
    category: "Match News",
    author: "Jonathan Agnew",
    source: "Cricket Australia & BBC Sport",
    publishedAt: "2026-09-18T15:20:00Z",
    readingTimeMinutes: 4,
    imageUrl: "/news/mcg-pitch.jpg",
    relatedTeams: ["AUS", "ENG"]
  },
  {
    id: "news-3",
    title: "Bumrah's Death Bowling Evolution: Sub-6 Economy in Modern T20 Cricket",
    slug: "bumrah-death-bowling-evolution-sub-6-economy",
    summary: "Statistical analysis reveals Jasprit Bumrah's unique release point makes yorkers 43% harder to detect under stadium floodlights.",
    content: "In an era where 200 is routinely surpassed in franchise and international T20s, Jasprit Bumrah continues to operate in an orbit of his own. His 3/28 in today's final was another testament to surgical discipline...",
    category: "Records",
    author: "Sarah Taylor",
    source: "ICC Data Insights",
    publishedAt: "2026-09-18T14:10:00Z",
    readingTimeMinutes: 6,
    imageUrl: "/news/bumrah-spell.jpg",
    relatedPlayers: ["jasprit-bumrah"]
  },
  {
    id: "news-4",
    title: "ICC Releases Final Round Tickets for 2026 Semi-Finals in Ahmedabad and Mumbai",
    slug: "icc-releases-final-tickets-semi-finals-ahmedabad-mumbai",
    summary: "Official authorized ticket window opens on BookMyShow with strict anti-scalping digital barcodes.",
    content: "The International Cricket Council has announced a limited release of Category 1 and 2 tickets for the upcoming knockout stages across India. Fans are reminded to only purchase via official authorized partners...",
    category: "Tournament News",
    author: "Media Release",
    source: "ICC Official Communications",
    publishedAt: "2026-09-18T11:00:00Z",
    readingTimeMinutes: 3,
    imageUrl: "/news/tickets-release.jpg"
  }
];
