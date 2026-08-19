const express = require("express");
const dotenv = require("dotenv");
const axios = require("axios");
const cors = require("cors");

dotenv.config();

const app = express();

app.use(cors());

const PORT = 3000;

app.get("/", (req, res) => {
    res.send("Weather API Server is running");
});

app.get("/weather", async (req, res) => {

    try {

        const city = req.query.city;

        if (!city) {
            return res.status(400).json({
                error: "City name is required"
            });
        }

        const response = await axios.get(
            "https://api.openweathermap.org/data/2.5/weather",
            {
                params: {
                    q: city,
                    appid: process.env.OPENWEATHER_API_KEY,
                    units: "metric"
                }
            }
        );

        res.json(response.data);

    } catch (error) {

        res.status(404).json({
            error: "City not found"
        });

    }

});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});