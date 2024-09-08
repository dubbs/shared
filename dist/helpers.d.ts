/**
 * Delay
 * @function
 * @param {function} ms - The time to wait
 * @return {Promise<unknown>}
 */
export declare const delay: (ms: number) => Promise<unknown>;
/**
 * Meta Critic Games
 * @async
 * @function
 * @return {Promise<unknown>}
 */
export declare const metaCriticGames: () => Promise<unknown>;
/**
 * Get a list of Xbox gamepass ids
 * @async
 * @function
 * @return {Promise<string[]>}
 */
export declare const xboxGamePassIds: () => Promise<string[]>;
/**
 * Gamepass Catalog Urls
 * @async
 * @function
 * @return {Promise<string[]>}
 */
export declare const xboxGamePassCatalogUrls: () => Promise<string[]>;
/**
 * Xbox Game Pass Game
 * @function
 * @param {XboxGameRemote} game
 * @return {XboxGameLocal}
 */
export declare const xboxGamePassGame: (game: any) => {
    id: any;
    category: any;
    title: any;
    description: any;
    publisher: any;
    compatible: any;
    releaseDate: any;
    url: string;
    score: any;
    scoreCount: any;
    images: any;
};
/**
 * Xbox Game Pass Games
 */
export declare const xboxGamePassGames: () => Promise<any>;
/**
 * Xbox Game Pass Games Puppeteer
 */
export declare const xboxGamePassGamesPuppeteer: () => Promise<any>;
/**
 *
 * @param {string} url - The URL to fetch
 * @return {Promise<string>}
 */
export declare const puppeteerGetHtml: (url: string) => Promise<string>;
