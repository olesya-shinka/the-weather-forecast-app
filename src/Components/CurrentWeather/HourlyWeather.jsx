/* eslint-disable react/prop-types */
import moment from "moment";
import "../../css/HourlyWeather.css";
import { useMemo } from "react";
import convertDegrees from "../../service/convertDegrees";

function HourlyWeather({ day, isFahrenheitMode, degreeSymbol }) {
  //создаем URL для значка погоды
  const dayIconUrl = `https://openweathermap.org/img/wn/${day.weather[0]["icon"]}@2x.png`;

  //меморизируем данные чтобы не рендерить повторно
  const formattedTemp = useMemo(
    () =>
      Math.round(
        isFahrenheitMode ? convertDegrees(day.main.temp) : day.main.temp
      ),
    [day.main.temp, isFahrenheitMode]
  );

  return (
    <li className="hourly-weather-items">
      <div>
        <p className="">
          {formattedTemp}
          {degreeSymbol}
        </p>
        <p className="">
          {day.weather[0].main}
          <img src={dayIconUrl} alt="" />
        </p>
        <p className="">{day.weather[0].description}</p>
        <p className="">{moment(day.dt_txt).format("hh:mm a")}</p>
      </div>
    </li>
  );
}

export default HourlyWeather;
