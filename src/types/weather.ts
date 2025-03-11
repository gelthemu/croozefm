export interface WeatherCoordinates {
  lat: number;
  lon: number;
}

export interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface WeatherMain {
  temp: number;
  feels_like: number;
  temp_min?: number;
  temp_max?: number;
  pressure?: number;
  humidity: number;
}

export interface WeatherWind {
  speed: number;
  deg: number;
  gust?: number;
}

export interface WeatherSys {
  country?: string;
  sunrise?: number;
  sunset?: number;
}

export interface WeatherData {
  name: string;
  weather: WeatherCondition[];
  main: WeatherMain;
  wind: WeatherWind;
  sys?: WeatherSys;
  clouds?: { all: number };
  visibility?: number;
  dt?: number;
  timezone?: number;
  cod?: number;
}

export const LOCATION_COORDINATES: Record<string, WeatherCoordinates> = {
  "Mbarara, Uganda": { lat: -0.6066, lon: 30.6566 },
};
