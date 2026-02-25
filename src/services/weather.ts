import axios from "axios";

export type Scale = "Fahrenheit" | "Celsius";

export async function getTemperature(
  lat: number,
  lon: number,
  scale: Scale
): Promise<number> {
  // Open-Meteo returns Celsius by default; we request Fahrenheit directly if needed
  const temperatureUnit =
    scale === "Fahrenheit" ? "fahrenheit" : "celsius";

  const response = await axios.get("https://api.open-meteo.com/v1/forecast", {
    params: {
      latitude: lat,
      longitude: lon,
      current_weather: true,
      temperature_unit: temperatureUnit,
    },
  });

  const temp: number = response.data.current_weather.temperature;
  return Math.round(temp);
}