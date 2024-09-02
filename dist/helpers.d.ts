export declare const delay: (ms: number) => Promise<unknown>;
export type XboxGamePassGame = {
    id: string;
    img: string;
    releaseDate: string;
    title: string;
    url: string;
};
export declare const metaCriticGames: () => Promise<any[]>;
export declare const xboxGamePassIds: () => Promise<any>;
export declare const xboxGamePassCatalogUrls: () => Promise<string[]>;
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
export declare const xboxGamePassGames: () => Promise<any>;
export declare const xboxGamePassGamesPuppeteer: () => Promise<XboxGamePassGame[]>;
export declare const puppeteerGetHtml: (url: string) => Promise<string>;
