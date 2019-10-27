import "../styles/index.scss";

const form = document.querySelector(
  "#city-form",
  addEventListener("submit", e => showWeatherResults(e))
);

const showWeatherResults = async e => {
  e.preventDefault();
  const cityInput = document.querySelector("#city-form input");

  if (!cityInput.value) return alert("Please, insert a city.");

  // Formats the input result to array - London, UK => ["london", "uk"]
  const formattedCity = cityInput.value.split(",").map(item => item.trim());

  try {
    const response = await fetch(
      `${process.env.WEATHERBIT_API_URL}?city=${formattedCity[0]}&country=${
        formattedCity[1]
      }&lang=en&key=${process.env.WEATHERBIT_API_KEY}`
    );
    const requestCityWeather = await response.json();
    const {
      city_name,
      country_code,
      ob_time,
      sunrise,
      sunset,
      wind_spd,
      wind_dir,
      temp,
      app_temp,
      rh,
      clouds,
      solar_rad,
      weather
    } = requestCityWeather.data[0];

    console.log(
      city_name,
      country_code,
      ob_time,
      sunrise,
      sunset,
      wind_spd,
      wind_dir,
      temp,
      app_temp,
      rh,
      solar_rad,
      weather
    );

    // Select DOM elements

    let sectionB = document.querySelector("#section-b");
    sectionB.style.opacity = 0;

    // info1

    let cityInfo = document.querySelector(".cityInfo");
    let cityInfoCountry = document.querySelector(".cityInfo span");
    let cityIcon = document.querySelector(".cityIcon");
    let cityTemp = document.querySelector(".cityTemp");
    let cityWeatherDesc = document.querySelector(".cityWeatherDesc");

    // info2
    let cityObsTime = document.querySelector(".cityObsTime");
    let citySunrise = document.querySelector(".citySunrise");
    let citySunset = document.querySelector(".citySunset");

    // info3
    let cityFeelsLike = document.querySelector(".cityFeelsLike");
    let cityWindSpeed = document.querySelector(".cityWindSpeed");
    let cityWindDir = document.querySelector(".cityWindDir");

    // info3
    let cityClouds = document.querySelector(".cityClouds");
    let cityRelaHumi = document.querySelector(".cityRelaHumi");
    let citySolarRad = document.querySelector(".citySolarRad");

    // Set API results values

    // info1
    cityInfo.innerHTML = city_name;
    cityTemp.innerHTML = `${temp} ºC`;
    cityWeatherDesc.innerHTML = `<span>${weather.description}</span>`;

    // info2
    cityObsTime.innerHTML = `Last Observation Time: <span>${ob_time}<span>`;
    citySunrise.innerHTML = `Sunrise: <span>${sunrise}</span>`;
    citySunset.innerHTML = `Sunset: <span>${sunset}</span>`;

    // info3
    cityFeelsLike.innerHTML = `Feels like: <span>${app_temp} ºC</span>`;
    cityWindSpeed.innerHTML = `Wind speed: <span>${wind_spd.toFixed(
      2
    )} m/s</span>`;
    cityWindDir.innerHTML = `Wind direction: <span>${wind_dir} º</span>`;
    // info4
    cityClouds.innerHTML = `Cloud coverage: <span>${clouds}%</span>`;
    cityRelaHumi.innerHTML = `Relative humidity: <span>${rh}%</span>`;
    citySolarRad.innerHTML = ` Estimated solar radiation: <span>${solar_rad.toFixed(
      2
    )} W/m^2</span>`;

    sectionB.style.opacity = 1;
    sectionB.style.zIndex = 1;
  } catch (error) {
    console.error(error);
  }
};
