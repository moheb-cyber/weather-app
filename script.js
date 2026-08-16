const apiKey = "4cc70d52ad9646d8c7062459c86c12f8";

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

        document.getElementById("cityName").textContent = data.name;

document.getElementById("temperature").textContent =
    `${data.main.temp}°C`;

document.getElementById("feelsLike").textContent =
    `${data.main.feels_like}°C`;

document.getElementById("humidity").textContent =
    `${data.main.humidity}%`;

const windSpeed = (data.wind.speed * 3.6).toFixed(1);

document.getElementById("wind").textContent =
    `${windSpeed} km/h`;

document.getElementById("description").textContent =
    data.weather[0].description;
    const weatherIcon = data.weather[0].icon;

document.getElementById("weatherIcon").src =
    `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
    document.getElementById("weatherIcon").hidden = false;
}catch (error) {
    document.getElementById("searchButton").textContent = "Search";

    document.getElementById("errorMessage").textContent =
        error.message;
}
}

document.getElementById("searchButton").addEventListener("click", getWeather);
document.getElementById("cityInput").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        getWeather();
    }
});