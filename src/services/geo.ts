import axios from "axios";  // Importing axios for making the HTTP requests to Zippopotam and Open-Meteo.

export interface Coordinates {
  lat: number;
  lon: number;
  city: string;
}

export async function getCoordinatesFromZip(zip: string): Promise<Coordinates> {
  // Making API call to Zippopotam to get coordinates 
  const response = await axios.get(`https://api.zippopotam.us/us/${zip}`);

  //Extracting the coordinates 
  const place = response.data.places[0];

  // Returnign the coordinates as an object
  return {
    lat: parseFloat(place.latitude),
    lon: parseFloat(place.longitude),
    city: place["place name"],
  };
}
