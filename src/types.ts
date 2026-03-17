export type NewsItem = {
    title: string;
    link: string;
    author: string;
    enclosure?: string | undefined;
    description: string;
    pubDate: string;
};

export type RubricItem = {
    title: string;
    link: string;
};

export type Rubrics = RubricItem[];

export type Settings = {
    selectedRubrics: RubricItem["link"][];
};

export type RenderContext = {
    [key: RubricItem["title"]]: NewsItem[]
}


