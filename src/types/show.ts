export interface Show {
    id: string;
    title: string;
    image: string;
    description: string;
    host?: string;
    isFeatured?: boolean;
    recordings?: {
        id: string;
        date: string;
        audio: string;
    }[];
}
