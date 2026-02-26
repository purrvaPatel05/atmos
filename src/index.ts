import express from "express";
import locationsRouter from "./routes/locations";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use("/locations", locationsRouter);   

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

export default app;  // Exporting Express app for testing.