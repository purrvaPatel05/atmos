import { Router, Request, Response } from "express";
import { getCoordinatesFromZip } from "../services/geo";
import { getTemperature, Scale } from "../services/weather";

const router = Router();

const VALID_SCALES: Scale[] = ["Fahrenheit", "Celsius"];


// GET /locations/:zipCode
router.get("/:zipCode", async (req: Request, res: Response) => {
  const zipCode = req.params.zipCode as string;
  const scaleQuery = req.query.scale as string | undefined; // Optional query parameter for temperature in Celsius

  // Validating zip code format
  if (!/^\d{5}$/.test(zipCode)) {
    res.status(400).json({ error: "Invalid zip code. Must be a 5-digit US zip code." });
    return;
  }

  // Validating scale query param
  const scale: Scale =
    scaleQuery === "Celsius" ? "Celsius" : "Fahrenheit";

  //If the scale query is not valid, a 400 error message is returned  
  if (scaleQuery && !VALID_SCALES.includes(scaleQuery as Scale)) {
    res.status(400).json({
      error: `Invalid scale "${scaleQuery}". Must be "Fahrenheit" or "Celsius".`,
    });
    return;
  }

  // Fetching the coordinates from the inputted xip code by the user.
  try {
    const coordinates = await getCoordinatesFromZip(zipCode);
    const temperature = await getTemperature(coordinates.lat, coordinates.lon, scale);

    res.status(200).json({ temperature, scale });
  } catch (err: any) {
    // Zippopotam returns 404 for unknown zip codes
    if (err.response?.status === 404) {
      res.status(404).json({ error: `Zip code "${zipCode}" not found.` });
      return;
    }
    console.error("Unexpected error:", err.message);
    res.status(500).json({ error: "Failed to retrieve weather data. Please try again." });
  }
});

export default router;   //Exporting the router to be used in the index.ts file. 