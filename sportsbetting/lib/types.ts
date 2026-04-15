export interface Team {
  name: string;
  abbreviation: string;
  record: string;
  logo?: string;
}

export interface Game {
  id: string;
  sport: string;
  league: string;
  homeTeam: Team;
  awayTeam: Team;
  date: string;
  time: string;
  homeSpread: number;
  awaySpread: number;
  homeML: number;
  awayML: number;
  total: number;
  overOdds: number;
  underOdds: number;
  status: 'upcoming' | 'live' | 'final';
  homeScore?: number;
  awayScore?: number;
}

export interface SportsbookOdds {
  book: string;
  logo: string;
  homeSpread: number;
  homeSpreadOdds: number;
  awaySpread: number;
  awaySpreadOdds: number;
  homeML: number;
  awayML: number;
  total: number;
  overOdds: number;
  underOdds: number;
}

export interface LineMovement {
  timestamp: string;
  spread: number;
  total: number;
  homeML: number;
}

export interface PlayerProp {
  id: string;
  player: string;
  team: string;
  opponent: string;
  sport: string;
  market: string;
  line: number;
  overOdds: number;
  underOdds: number;
  projection: number;
  edge: number;
  position: string;
  gameTime: string;
}

export interface Pick {
  id: string;
  sport: string;
  league: string;
  game: string;
  pick: string;
  market: string;
  odds: number;
  units: number;
  confidence: number;
  analysis: string;
  analyst: string;
  record: string;
  date: string;
  result?: 'win' | 'loss' | 'push' | 'pending';
}

export interface Bet {
  id: string;
  date: string;
  game: string;
  pick: string;
  market: string;
  odds: number;
  units: number;
  book: string;
  result: 'win' | 'loss' | 'push' | 'pending';
  profit: number;
  sport: string;
  league: string;
  tags: string[];
}

export interface PricingPlan {
  name: string;
  price: number;
  billingPeriod: string;
  description: string;
  features: string[];
  highlighted: boolean;
  cta: string;
}
