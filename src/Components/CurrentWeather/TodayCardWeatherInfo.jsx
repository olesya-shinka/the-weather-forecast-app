/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useMemo } from "react";
import "../../css/TodayCardWeatherInfo.css";
import convertDegrees from "../../service/convertDegrees";
import TodayCardWeather from "./TodayCardWeather";
import MoreInfoCard from "./MoreInfoCard";

function TodayCardWeatherInfo({ weather_icon, data, isFahrenheitMode, degreeSymbol }) {
  //деструктурируем соответствующие данные из свойства data
  const { clouds, main, weather } = data.list[0];

  // мемоизируем данные, чтобы избежать ненужных вычислений при повторной визуализации
  const formattedData = useMemo(() => {
    return {
      temp: Math.round(
        isFahrenheitMode ? convertDegrees(main.temp) : main.temp
      ),
      feels_like: Math.round(
        isFahrenheitMode
          ? convertDegrees(main.feels_like)
          : main.feels_like
      ),
      temp_min: Math.round(
        isFahrenheitMode ? convertDegrees(main.temp_max) : main.temp_max
      ),
      temp_max: Math.round(
        isFahrenheitMode ? convertDegrees(main.temp_min) : main.temp_min
      ),
      wind: {
        speed: data.list[0].wind.speed,
        deg: data.list[0].wind.deg,
      },
    };
  }, [
    isFahrenheitMode,
    main.feels_like,
    main.temp,
    main.temp_max,
    main.temp_min,
  ]);

  return (
    <div className="content-weather">
      <TodayCardWeather
        data={{ formattedData, degreeSymbol, weather, weather_icon }}
      />
      <MoreInfoCard data={{ formattedData, degreeSymbol, main, clouds }} />
    </div>
  );
}

export default TodayCardWeatherInfo;
