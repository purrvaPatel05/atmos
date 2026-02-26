import axios from "axios";

export type Scale = "Fahrenheit" | "Celsius"; 

export async function getTemperature(
  lat: number,  //latitude
  lon: number,  //longitude
  scale: Scale  
): Promise<number> {
  // Open-Meteo returns Celsius by default; we request Fahrenheit directly if needed
  const temperatureUnit =
    scale === "Fahrenheit" ? "fahrenheit" : "celsius";   // Open-Meteo API endpoint for current weather

  //Making the API call to Open-Meteo to get the current weather. 
  const response = await axios.get("https://api.open-meteo.com/v1/forecast", {
    params: {
      latitude: lat,
      longitude: lon,
      current_weather: true,
      temperature_unit: temperatureUnit,
    },
  });

  // Rounding the temperature to nearest whole number after exptracting it from the API response.
  const temp: number = response.data.current_weather.temperature;
  return Math.round(temp);
}