export interface ISong {
    songId: string;
    songTitle: string;
    artist: string;
    album: string;
    year: number;
    comment: string;
    genre: string;
    submittedOn: Date;
    submittedBy: String;
    numberOfRatings: number;
    averageRating:number;
}
