# Weather App

A responsive weather application built with HTML, CSS, JavaScript, Node.js, and the OpenWeather API.

## About

This project started as a frontend weather application and was later upgraded with a Node.js backend to keep the OpenWeather API key out of the frontend code.

The backend works as a secure intermediary between the frontend and the OpenWeather API.

## Features

* Search weather by city
* Current temperature
* Feels-like temperature
* Humidity
* Wind speed
* Sunrise and sunset time
* Day and night detection
* Weather descriptions and icons
* Responsive design
* Node.js backend
* Secure API key handling with environment variables

## Technologies

* HTML5
* CSS3
* JavaScript
* Node.js
* Express.js
* Axios
* dotenv
* OpenWeather API
* Git
* GitHub

## Project Structure

```text
weather-app/
│
├── index.html
├── style.css
├── script.js
├── server.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

## How It Works

The frontend sends the city name to the Node.js backend.

The backend then requests weather data from the OpenWeather API using the API key stored in an environment variable.

The weather data is returned to the frontend and displayed to the user.

```text
Frontend
    ↓
Node.js / Express Backend
    ↓
Environment Variable
    ↓
OpenWeather API
    ↓
Weather Data
    ↓
Frontend
```

## API Key Security

The OpenWeather API key is not included in the public repository.

The key is stored in a `.env` file:

```env
OPENWEATHER_API_KEY=YOUR_API_KEY
```

The `.env` file is excluded from Git using `.gitignore`.

## Getting Started

Clone the repository:

```bash
git clone YOUR_REPOSITORY_URL
```

Open the project folder:

```bash
cd weather-app
```

Install the dependencies:

```bash
npm install
```

Create a `.env` file in the root directory:

```env
OPENWEATHER_API_KEY=YOUR_API_KEY
```

Start the backend:

```bash
node server.js
```

Then open the frontend using VS Code Live Server.

## Important

The API key is not provided with this project.

To run the application locally, create your own OpenWeather API key and add it to the `.env` file.

## Project Status

Completed frontend and backend weather application.

## Author

Moheb
