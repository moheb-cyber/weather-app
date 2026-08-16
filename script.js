const apiKey = "4cc70d52ad9646d8c7062459c86c12f8";

async function getWeather() {
    try {
        const city = document.getElementById("cityInput").value.trim();

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );
        if (!response.ok) {
    throw new Error("City not found");
}

        const data = await response.json();

        document.getElementById("cityName").textContent = data.name;

document.getElementById("temperature").textContent =
    `${data.main.temp}°C`;

document.getElementById("feelsLike").textContent =
    `${data.main.feels_like}°C`;

document.getElementById("humidity").textContent =
    `${data.main.humidity}%`;

document.getElementById("wind").textContent =
    `${data.wind.speed} m/s`;

document.getElementById("description").textContent =
    data.weather[0].description;
} catch (error) {
    document.getElementById("errorMessage").textContent = error.message;
}
}

document.getElementById("searchButton").addEventListener("click", getWeather);