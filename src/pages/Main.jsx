/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useMemo, useState } from "react";
import { RiCelsiusFill, RiFahrenheitFill } from "react-icons/ri";
import { TbMoon, TbSearch, TbSun } from "react-icons/tb";
import "../App.css";

import TodayCardWeatherInfo from "../Components/CurrentWeather/TodayCardWeatherInfo";
import HourlyWeather from "../Components/CurrentWeather/HourlyWeather";
import Astronaut from "../asset/not-found.svg";
import SearchPlace from "../asset/pikSearch.svg";
import TitleApp from "../Components/Styles/TitleApp";
import Forecast from "../Components/Foreсast";

function Main() {
  const API_KEY = "3352fcd37ab6257f7e760829d605bf42";
  const [searchTerm, setSearchTerm] = useState("");
  const [weatherData, setWeatherData] = useState([]);
  const [city, setCity] = useState();
  const [weatherIcon, setWeatherIcon] = useState("");
  const [currentLanguage, setLanguage] = useState(() => {
    return localStorage.getItem("language") || "en";
  });
  const [noData, setNoData] = useState();

  const [loading, setLoading] = useState(false);
  const [isFahrenheitMode, setIsFahrenheitMode] = useState(false);
  const degreeSymbol = useMemo(
    () => (isFahrenheitMode ? "\u00b0F" : "\u00b0C"),
    [isFahrenheitMode]
  );
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDark]);

  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setIsDark(true);
    }

    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (event) => {
        setIsDark(event.matches);
      });
  }, [setIsDark]);

  const toggleDark = () => {
    setIsDark((prev) => !prev);
  };

  const toggleFahrenheit = () => {
    setIsFahrenheitMode(!isFahrenheitMode);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    // Обрезаем пробелы из поискового запроса и проверяем, пусто ли оно
    const trimmedSearchTerm = searchTerm.trim();
    if (trimmedSearchTerm === "") {
      // оповещения о пустом поиске
      window.alert("Пожалуйста, введите название города...");
      return;
    }

    // продолжить получение данных о погоде
    getWeather(trimmedSearchTerm);
  };

  const getWeather = async (location) => {
    setLoading(true);
    setWeatherData([]);
    let how_to_search =
      typeof location === "string"
        ? `q=${location}`
        : `lat=${location[0]}&lon=${location[1]}`;

    const url = "https://api.openweathermap.org/data/2.5/forecast?";
    try {
      let res = await fetch(
        `${url}${how_to_search}&appid=${API_KEY}&units=metric&cnt=5&exclude=hourly,minutely`
      );
      let data = await res.json();
      if (data.cod !== "200") {
        setNoData("Location Not Found");
        setCity("Unknown Location");
        setTimeout(() => {
          setLoading(false);
        }, 500);
        return;
      }
      setWeatherData(data);
      setTimeout(() => {
        setLoading(false);
      }, 500);
      setCity(`${data.city.name}, ${data.city.country}`);
      setWeatherIcon(
        `${
          "https://openweathermap.org/img/wn/" + data.list[0].weather[0]["icon"]
        }@4x.png`
      );
    } catch (error) {
      setLoading(true);
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(myIP);
  }, []);

  const myIP = (location) => {
    const { latitude, longitude } = location.coords;
    getWeather([latitude, longitude]);
  };
  return (
    <div className="container">
      <div
        className="blur"
        style={{
          top: "-10%",
          right: "0",
        }}
      ></div>
      <div
        className="blur"
        style={{
          top: "36%",
          left: "-6rem",
        }}
      ></div>

      <div className="content">
        <div className="form-container">
          <div className="name">
            <TitleApp />
            <div className="toggle-container">
              <input
                type="checkbox"
                className="checkbox"
                id="checkbox"
                checked={isDark}
                onChange={toggleDark}
              />
              <label htmlFor="checkbox" className="label">
                <TbMoon style={{ color: "#a6ddf0" }} />
                <TbSun style={{ color: "#f5c32c" }} />
                <div className="ball" />
              </label>
            </div>
          </div>

          <div className="search">
            <h2
              style={{
                color: `${isDark ? "#fff" : "#333"}`,
              }}
            ></h2>

            <hr
              style={{
                borderBottom: `${
                  isDark ? "3px solid  #fff" : "3px solid #333"
                }`,
              }}
            />

            <form className="search-bar" noValidate onSubmit={submitHandler}>
              <input
                placeholder="Введите город"
                onChange={(e) => setSearchTerm(e.target.value)}
                required
                className="input_search"
              />

              <button className="s-icon">
                <TbSearch
                  onClick={() => {
                    navigator.geolocation.getCurrentPosition(myIP);
                  }}
                />
              </button>
            </form>
          </div>
        </div>
        <div className="info-container">
          <div className="info-inner-container">
            <div className="toggle-container">
              <input
                type="checkbox"
                className="checkbox"
                id="fahrenheit-checkbox"
                onChange={toggleFahrenheit}
              />
              <label htmlFor="fahrenheit-checkbox" className="label">
                <RiFahrenheitFill />
                <RiCelsiusFill />
                <div className="ball" />
              </label>
            </div>
          </div>
          {loading ? (
            <div className="loader"></div>
          ) : (
            <div className="weather-data-details">
              {weatherData.length === 0 ? (
                <div className="nodata">
                  {noData === "Location Not Found" ? (
                    <>
                      <img
                        src={Astronaut}
                        alt="an astronaut lost in the space"
                      />
                      <p>Не можем найти такой город... Проверьте название!</p>
                    </>
                  ) : (
                    <>
                      <img
                        src={SearchPlace}
                        alt="a person thinking about what place to find"
                      />
                      <p style={{ padding: "20px" }}>
                        Looking for weather information? <br /> Just type your
                        location here.
                      </p>
                    </>
                  )}
                </div>
              ) : (
                <>
                  <TodayCardWeatherInfo
                    weather_icon={weatherIcon}
                    data={weatherData}
                    isFahrenheitMode={isFahrenheitMode}
                    degreeSymbol={degreeSymbol}
                  />

                  <h1 className="title-container centerTextOnMobile"></h1>
                  <ul className="summary">
                    {weatherData.list.map((days, index) => (
                      <HourlyWeather
                        key={index}
                        day={days}
                        isFahrenheitMode={isFahrenheitMode}
                        degreeSymbol={degreeSymbol}
                      />
                    ))}
                  </ul>
                  <h1 className="title-container centerTextOnMobile"></h1>

                  <div>
                    <Forecast
                      city={city}
                      weatherData={weatherData}
                      weatherIcon={weatherIcon}
                      loading={loading}
                      degreeSymbol={degreeSymbol}
                      isFahrenheitMode={isFahrenheitMode}
                    />
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default Main;
