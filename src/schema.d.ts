export type SportsEvent = {
  url?: string;
  name?: string;
  image?: string;
  audience: {
    audienceType: string;
  };
  startDate: string;
  sport: string;
  awayTeam: {
    name: string;
    logo?: string;
  };
  homeTeam: {
    name: string;
    logo?: string;
  };
  awayScore: number;
  homeScore: number;
  description: string;
  location: {
    /*
     * The venue
     */
    description: string;
    /*
     * The Province/State
     */
    addressRegion: string;
    /*
     * The City
     */
    addressLocality: string;
  };
};
