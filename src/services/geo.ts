import axios from "axios";

export interface Coordinates {
  lat: number;
  lon: number;
  city: string;
}

export async function getCoordinatesFromZip(zip: string): Promise<Coordinates> {
  const response = await axios.get(`https://api.zippopotam.us/us/${zip}`);
  const place = response.data.places[0];

  return {
    lat: parseFloat(place.latitude),
    lon: parseFloat(place.longitude),
    city: place["place name"],
  };
}
