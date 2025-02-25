export interface Track {
  track_artist: string;
  track_title: string;
  track_image: string;
  track_played: number;
}

export interface ApiResponse {
  success: boolean;
  result: Track[];
}
