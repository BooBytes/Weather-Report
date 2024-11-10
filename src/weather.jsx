import { useState } from "react";
import axios from "axios";

function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState("");
  const [temp, setTemp] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle the input field change
  function handleCity(event) {
    setCity(event.target.value);
  }

  // Fetch the weather data
  function getWeather() {
    if (!city) {
      setError("Please enter a city name");
      return;
    }

    setLoading(true);
    setError(""); // Reset error message
    setWeather("");
    setTemp("");
    setDesc("");

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ea4b9d229ea051ff7cbda9772115da80&units=metric`
      )
      .then(function (success) {
        setWeather(success.data.weather[0].main);
        setTemp(success.data.main.temp);
        setDesc(success.data.weather[0].description);
        setLoading(false);
      })
      .catch(function (error) {
        setError("City not found. Please check your input.");
        setLoading(false);
      });
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center py-10 bg-cover bg-center"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1561553590-267fc716698a?q=80&w=1792&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
      }}
    >
      {/* Background blur effect */}
      <div className="absolute inset-0 bg-black opacity-50 backdrop-blur-md"></div>

      <div className="relative bg-transparent shadow-lg rounded-lg p-8 w-full max-w-lg z-10">
        <h1 className="text-3xl font-semibold text-center text-white-800 mb-4">
          Weather Report
        </h1>
        <p className="text-center text-white-600 mb-6">
          Enter a city to get the current weather information.
        </p>

        {/* Input and Button */}
        <div className="mb-4">
          <input
            onChange={handleCity}
            type="text"
            value={city}
            placeholder="Enter your city name"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={getWeather}
          className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200"
        >
          {loading ? "Loading..." : "Get Weather Report"}
        </button>

        {/* Error or Weather Data */}
        {error && (
          <div className="mt-4 text-center text-red-600">
            <p>{error}</p>
          </div>
        )}

        {weather && !loading && (
          <div className="mt-6 text-center text-white-800">
            <h2 className="text-2xl font-semibold mb-2">Weather: {weather}</h2>
            <p className="text-lg">
              <b>Temperature:</b> {temp}°C
            </p>
            <p className="text-lg">
              <b>Description:</b> {desc}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Weather;
