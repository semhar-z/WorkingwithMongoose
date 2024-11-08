import express from "express";
import connectToDb  from "./db/conn.mjs"; // Import the DB connection
import grades from "./routes/grades.mjs";
import grades_agg from "./routes/grades_agg.mjs";

const PORT = 3000;
const app = express();

// Connect to MongoDB
connectToDb().then(() => {
  app.use(express.json());

  app.get("/", (req, res) => {
    res.send("Welcome to the API.");
  });

  // Use the grades and grades_agg routes
  app.use("/grades", grades); 
  app.use("/grades", grades_agg); 

  // Global error handling
  app.use((err, _req, res, next) => {
    console.error(err);
    res.status(500).send("Seems like we messed up somewhere...");
  });

  // Start the Express server
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
}).catch(err => {
  console.error("Failed to connect to MongoDB, server not started.");
});
