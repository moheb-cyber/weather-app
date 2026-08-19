
let currentTimezone = 0;

async function getWeather() {
    try {
        const city = document.getElementById("cityInput").value.trim();

        if (city === "") {
            document.getElementById("errorMessage").textContent =
                "Please enter a city name.";

            return;
        }

        document.getElementById("cityName").textContent = "--";
        document.getElementById("temperature").textContent = "--°C";
        document.getElementById("description").textContent = "--";
        document.getElementById("feelsLike").textContent = "--°C";
        document.getElementById("humidity").textContent = "--%";
        document.getElementById("wind").textContent = "-- km/h";
        document.getElementById("weatherIcon").hidden = true;
        document.getElementById("errorMessage").textContent = "";
        document.getElementById("searchButton").textContent = "Loading...";

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        document.getElementById("searchButton").textContent = "Search";

        document.getElementById("cityName").textContent =
            `${data.name}, ${data.sys.country}`;

        const temperature = Math.round(data.main.temp);

        document.getElementById("temperature").textContent =
            `${temperature}°C`;

        const feelsLike = Math.round(data.main.feels_like);

        document.getElementById("feelsLike").textContent =
            `${feelsLike}°C`;

        document.getElementById("humidity").textContent =
            `${data.main.humidity}%`;

        const windSpeed = (data.wind.speed * 3.6).toFixed(1);

        document.getElementById("wind").textContent =
            `${windSpeed} km/h`;

        const sunrise = new Date(data.sys.sunrise * 1000);
        const sunset = new Date(data.sys.sunset * 1000);

        document.getElementById("sunrise").textContent =
            sunrise.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit"
            });

        document.getElementById("sunset").textContent =
            sunset.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit"
            });

        currentTimezone = data.timezone;

        updateLocalTime();

        const weatherMain = data.weather[0].main;
        const weatherDescription = data.weather[0].description;

        let weatherEmoji = "🌤️";

        if (weatherMain === "Clear") {
            weatherEmoji = "☀️";
        } else if (weatherMain === "Clouds") {
            weatherEmoji = "☁️";
        } else if (weatherMain === "Rain") {
            weatherEmoji = "🌧️";
        } else if (weatherMain === "Drizzle") {
            weatherEmoji = "🌦️";
        } else if (weatherMain === "Thunderstorm") {
            weatherEmoji = "⛈️";
        } else if (weatherMain === "Snow") {
            weatherEmoji = "❄️";
        } else if (weatherMain === "Mist" || weatherMain === "Fog") {
            weatherEmoji = "🌫️";
        }

        document.getElementById("description").textContent =
            `${weatherEmoji} ${weatherDescription}`;

        const now = Math.floor(Date.now() / 1000);

        let dayNight;

        if (now >= data.sys.sunrise && now < data.sys.sunset) {
            dayNight = "☀️ Day";
        } else {
            dayNight = "🌙 Night";
        }

        document.getElementById("dayNight").textContent = dayNight;

        const weatherIcon = data.weather[0].icon;

        document.getElementById("weatherIcon").src =
            `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;

        document.getElementById("weatherIcon").hidden = false;

    } catch (error) {
        document.getElementById("searchButton").textContent = "Search";

        document.getElementById("errorMessage").textContent =
            error.message;
    }
}

function updateLocalTime() {
    const localTime = new Date(
        Date.now() + currentTimezone * 1000
    );

    document.getElementById("localTime").textContent =
        localTime.toUTCString().slice(17, 22);
}

setInterval(updateLocalTime, 1000);

document.getElementById("searchButton").addEventListener("click", getWeather);

document.getElementById("cityInput").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        getWeather();
    }
});