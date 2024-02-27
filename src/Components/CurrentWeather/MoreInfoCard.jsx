/* eslint-disable react/prop-types */

function MoreInfoCard({ data }) {
  const { formattedData, degreeSymbol, main, clouds } = data;

  return (
    <div className="more-info">
      <p className="">
        Ощущается:{" "}
        <span>
          {formattedData.feels_like}
          {degreeSymbol}
        </span>
      </p>

      <p className="">
        Влажность: <span>{main.humidity}%</span>
      </p>

      <p className="">
        Облачность: <span>{clouds.all}%</span>
      </p>

      <p className="">
        Min темп:{" "}
        <span>
          {formattedData.temp_min}
          {degreeSymbol}
        </span>
      </p>

      <p className="">
        Max темп:{" "}
        <span>
          {formattedData.temp_max}
          {degreeSymbol}
        </span>
      </p>

      <p className="">
        Скорость ветра:{" "}
        <span>
          {formattedData.wind && formattedData.wind.speed !== undefined
            ? formattedData.wind.speed.toFixed(2) + " м/с"
            : "N/A"}
        </span>
      </p>
    </div>
  );
}

export default MoreInfoCard;
