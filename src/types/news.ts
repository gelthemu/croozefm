export interface News {
    id: number;
    aired: {
        date: string;
        time: string;
    };
    anchor: string;
    profileImg: string;
    audio: string;
}
