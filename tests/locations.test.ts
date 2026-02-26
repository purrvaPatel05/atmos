import request from "supertest";
import app from "../src/index";
import * as geo from "../src/services/geo";
import * as weather from "../src/services/weather";

jest.mock("../src/services/geo");
jest.mock("../src/services/weather");

const mockGetCoordinates = geo.getCoordinatesFromZip as jest.MockedFunction<typeof geo.getCoordinatesFromZip>;
const mockGetTemperature = weather.getTemperature as jest.MockedFunction<typeof weather.getTemperature>;

beforeEach(() => {
  jest.clearAllMocks();
  mockGetCoordinates.mockResolvedValue({ lat: 37.23, lon: -80.41, city: "Blacksburg" });
  mockGetTemperature.mockResolvedValue(43);
});

describe("GET /locations/:zipCode", () => {
  it("returns temperature in Fahrenheit by default", async () => {
    const res = await request(app).get("/locations/24060");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ temperature: 43, scale: "Fahrenheit" });
  });

  it("returns temperature in Fahrenheit when explicitly requested", async () => {
    const res = await request(app).get("/locations/24060?scale=Fahrenheit");
    expect(res.status).toBe(200);
    expect(res.body.scale).toBe("Fahrenheit");
  });

  it("returns temperature in Celsius when requested", async () => {
    mockGetTemperature.mockResolvedValue(6);
    const res = await request(app).get("/locations/24060?scale=Celsius");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ temperature: 6, scale: "Celsius" });
  });

  it("returns 400 for invalid zip code format", async () => {
    const res = await request(app).get("/locations/abcde");
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/invalid zip code/i);
  });

  it("returns 400 for invalid scale value", async () => {
    const res = await request(app).get("/locations/24060?scale=Kelvin");
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/invalid scale/i);
  });

  it("returns 404 when zip code is not found", async () => {
    const error = Object.assign(new Error("Not Found"), { response: { status: 404 } });
    mockGetCoordinates.mockRejectedValue(error);
    const res = await request(app).get("/locations/00000");
    expect(res.status).toBe(404);
    expect(res.body.error).toMatch(/not found/i);
  });

  it("returns 500 on unexpected errors", async () => {
    mockGetCoordinates.mockRejectedValue(new Error("Network error"));
    const res = await request(app).get("/locations/24060");
    expect(res.status).toBe(500);
  });
});