/**
 * @typedef {Object} Movie
 * @property {string} url - The URL.
 * @property {string} name - The name.
 * @property {number} duration - The duration in minutes.
 * @property {string} contentRating - The content rating.
 * @property {string} genre - The genre.
 * @property {string} thumbnailUrl - The thumbnail URL.
 */
/**
 * @typedef {Object} MovieLocation
 * @property {number} identifier - The identifier.
 * @property {string} name - The name.
 */
/**
 * @typedef {Object} MovieScreening
 * @property {string} videoFormat - The video format.
 * @property {Array.<{startDate: string}>} subEvent - The sub events.
 */
/**
 * @typedef {Object} MovieScreenings
 * @property {Movie} movie - The movie.
 * @property {Array.<MovieScreening>} screeningEvents - The screening events.
 */
/**
 * Get the screening summary for today by location
 */
export declare const moviesLandmark: (keepAll?: boolean) => Promise<any>;
/**
 * Get the screening summary for today by location
 * @param {number} locationId
 * @return {Promise<{location: MovieLocation, movies: MovieScreenings[]}>}
 */
export declare const moviesCineplex: (locationId: any) => Promise<{
    location: {
        identifier: any;
        name: any;
    };
    movies: any;
}>;
