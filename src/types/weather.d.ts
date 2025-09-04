export interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
    temp_min: number;
    temp_max: number;
    feels_like: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
  };
  sys: {
    sunrise: number;
    sunset: number;
    country:string;
  };
}

export interface weatherCity {
  location: string;
}

export interface SavedCity {
  name: string;
  temp: number;
  description: string;
  icon: string;
}