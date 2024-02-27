/* eslint-disable react/prop-types */
import moment from "moment";

function TodayCardWeather({ data }) {
  // для доступа к данным
  const { formattedData, degreeSymbol, weather, weather_icon } = data;

  return (
    <div className="today-card-current">
      <p className="celsius">
        {formattedData.temp}
        {degreeSymbol}
      </p>

      <div className="today-card-current-icon">
        {weather[0].main}
        <img src={weather_icon} className="" alt="" />
      </div>

      <p className="des">
        <span>{weather[0].description}</span>
      </p>

      <p className="time">
        <span>{moment().format("Do MMM, YYYY")}</span>
      </p>
    </div>
  );
}

export default TodayCardWeather;
