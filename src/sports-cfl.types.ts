// https://app.quicktype.io/

export type SportsCfl = {
  id: string;
  eventGrouping: string;
  leagueId: number;
  season: number;
  eventGroupingType: string;
  order: null;
  seasonType: null;
  isActiveDate: null;
  events: Event[];
  competition: null;
  adPlacement: null;
};

export type Event = {
  id: string;
  eventId: number;
  sportId: number;
  globalId: number;
  status: Status;
  date: Date;
  statusID: number;
  season: number;
  seasonTypeId: number;
  venue: string;
  venueId: number;
  seasonType: SeasonType;
  seoIdentifier: string;
  seoIdentifierFr: string;
  homeCompetitorId: number;
  awayCompetitorId: number;
  association: null;
  week: number;
  dateET: Date;
  dateGMT: Date;
  makeupDateET: null;
  endTime: Date | null;
  gameStatus: string;
  gameStatusFr: string;
  eventTitle: string;
  eventTitleFr: string;
  deleted: boolean;
  noTimeSet: boolean;
  eventBroadcastStations: EventBroadcastStation[] | null;
  arEventId: null;
  nextGenGameId: number;
  round: null;
  section: null;
  sectionId: null;
  slot: null;
  advanceSlot: null;
  updateTime: Date | null;
  eventStatusSettings: null;
  homeEventResult: EventResult;
  awayEventResult: EventResult;
  eventSpecificData: EventSpecificData | null;
  resultsPageData: null;
  scoringSummary: null;
  penaltySummary: null;
  shotsSummary: null;
  playByPlay: null;
  seriesStatus: string;
  seriesStatusFr: string;
  postSeasonGameNumber: null;
  competition: null;
  competitionFr: null;
  eventOdds: EventOdds | null;
  periodTitle: PeriodTitle;
  periodTitleFr: PeriodTitle;
  seriesOver: boolean;
};

export type EventResult = {
  score: number | null;
  shootoutScore: null;
  outcome: Outcome | null;
  seriesWins: null;
  seriesLosses: null;
  competitor: Competitor;
  teamStats: TeamStats | null;
  playerEventStatsList: null;
  scoreByPeriod: ScoreByPeriod[] | null;
  eventCompetitorResultSpecificData: null;
};

export type Competitor = {
  id: string;
  competitorId: number;
  name: string;
  clubFR: string;
  shortName: string;
  shortNameFR: string;
  points: number;
  club: string;
  recordOverall: string;
  streak: Streak;
  ranking: string;
  rankingFr: string;
  seoIdentifier: string;
  seoIdentifierFr: string;
  place: number;
  location: string;
  locationFR: string;
  primaryColor: string;
};

export enum Streak {
  L1 = "L1",
  L2 = "L2",
  L4 = "L4",
  W1 = "W1",
  W2 = "W2",
  W5 = "W5",
}

export enum Outcome {
  Loss = "Loss",
  Tie = "Tie",
  Win = "Win",
}

export type ScoreByPeriod = {
  period: number;
  periodTitle: string;
  periodTitleFr: string;
  score: string;
  shots: number | null;
  teamFouls: number | null;
  penaltyMinutes: number;
  hasHammer: null;
  errors: null;
  hits: null;
};

export type TeamStats = {
  statsList: StatsList;
};

export type StatsList = {
  firstDowns: string;
  fumbles: string;
  passingAttempts: string;
  passingAverageYards: string;
  passingCompletions: string;
  passingFirstDowns: string;
  passingInterceptions: string;
  passingYardsLost: string;
  passingYards: string;
  penaltiesYards: string;
  penalties: string;
  penaltyFirstDowns: string;
  possessionMinutes: string;
  possessionSeconds: string;
  rushingAttempts: string;
  rushingAverageYards: string;
  rushingFirstDowns: string;
  rushingYards: string;
  totalPlays: string;
  totalYards: string;
  turnovers: string;
  yardsPerPlay: string;
};

export type EventBroadcastStation = {
  callLetters: CallLetters;
  name: CallLetters;
};

export enum CallLetters {
  RDS = "RDS",
  Rds2 = "RDS2",
  Tsn = "TSN",
}

export type EventOdds = {
  lineType: string;
};

export type EventSpecificData = {
  possessionCompetitorId: null;
  fieldPosition: null;
  downAndDistance: string;
  downAndDistanceFr: string;
  downAndDistanceShort: string;
  downAndDistanceShortFr: string;
  redZone: boolean;
  homeTimeouts: null;
  awayTimeouts: null;
};

export enum PeriodTitle {
  Empty = "",
  Final = "Final",
}

export enum SeasonType {
  Exhibition = "Exhibition",
  RegularSeason = "Regular Season",
}

export enum Status {
  Final = "Final",
  PreGame = "Pre-Game",
}
