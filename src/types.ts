export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export type Time = `${number}:${number}`;

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

export type RenderContext = {
    [key: RubricItem["title"]]: NewsItem[]
}

export type Rubrics = {
    rubrics: RubricItem[];
};

export type Settings = {
    selectedRubrics: RubricItem["link"][];
};
