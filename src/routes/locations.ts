import { Router, Request, Response } from "express";
import { getCoordinatesFromZip } from "../services/geo";
import { getTemperature, Scale } from "../services/weather";

const router = Router();

const VALID_SCALES: Scale[] = ["Fahrenheit", "Celsius"];

router.get("/:zipCode", async (req: Request, res: Response) => {
  const zipCode = req.params.zipCode as string;
  const scaleQuery = req.query.scale as string | undefined;

  // Validate zip code format
  if (!/^\d{5}$/.test(zipCode)) {
    res.status(400).json({ error: "Invalid zip code. Must be a 5-digit US zip code." });
    return;
  }

  // Validate scale query param
  const scale: Scale =
    scaleQuery === "Celsius" ? "Celsius" : "Fahrenheit";

  if (scaleQuery && !VALID_SCALES.includes(scaleQuery as Scale)) {
    res.status(400).json({
      error: `Invalid scale "${scaleQuery}". Must be "Fahrenheit" or "Celsius".`,
    });
    return;
  }

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

export default router;