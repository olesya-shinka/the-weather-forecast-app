import WeatherIcon from "../../asset/logo.png";

const TitleApp = () => {
  return (
    <div className="logo">
      <img
        src={WeatherIcon}
        alt="Icon"
        className="icon"
        style={{ width: "40px", height: "40px", marginRight: 10 }}
      />
      The weather forecast
    </div>
  );
};

export default TitleApp;
