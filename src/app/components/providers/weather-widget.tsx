"use client";
import { useState, useEffect } from "react";
import { FaMapLocationDot } from "react-icons/fa6";
import Divider from "./divs/divider";
import { WeatherData, LOCATION_COORDINATES } from "@/types/weather";
import { UgTime } from "./schedule/schedule";

interface WeatherClass {
  className?: string;
}

const WeatherWidget: React.FC<WeatherClass> = ({ className = "" }) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const locationName = "Mbarara";
  const mararaCoordinates = LOCATION_COORDINATES["Mbarara, Uganda"];

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${mararaCoordinates.lat}&lon=${mararaCoordinates.lon}&units=metric&appid=${API_KEY}`
        );

        if (!response.ok) {
          throw new Error("Weather data fetch failed");
        }

        const data: WeatherData = await response.json();
        setWeatherData(data);
      } catch (err) {
        console.error(
          "Error fetching weather data:",
          err instanceof Error ? err.message : String(err)
        );
      }
    };

    fetchWeather();
  }, [mararaCoordinates.lat, mararaCoordinates.lon]);

  if (!weatherData) return null;

  return (
    <>
      <div className={`w-full max-w-[460px] ${className}`}>
        <div className="p-2 flex items-center justify-between">
          <p className="text-md font-medium">Our briefing</p>
          <div>
            <UgTime />
          </div>
        </div>
        <div className="p-4 bg-gray/5 dark:bg-gray/50 rounded-sm shadow shadow-gray/20 dark:shadow-light/5 opacity-[0.85]">
          <div className="flex items-center justify-between space-x-4">
            <div className="flex items-center">
              <FaMapLocationDot className="mr-2" size={14} />
              <p className="text-sm">{locationName}</p>
            </div>
            <div className="flex items-end justify-center">
              <span className="text-lg font-bold _912cfm">
                {Math.round(weatherData.main.temp)}°C
              </span>
              <span className="ml-2 text-m">
                {weatherData.weather[0].description}
              </span>
            </div>
          </div>
          <Divider className="my-2" />
          <div className="flex items-center justify-between gap-2 text-center text-xs">
            <div className="flex flex-col items-center">
              <span className="">Feels like</span>
              <span className="font-medium">
                {Math.round(weatherData.main.feels_like)}°C
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="">Humidity</span>
              <span className="font-medium">{weatherData.main.humidity}%</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="">Wind</span>
              <span className="font-medium">
                {Math.round(weatherData.wind.speed * 3.6)} km/h
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WeatherWidget;
