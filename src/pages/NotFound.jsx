import { Link } from "react-router-dom";
import Astronaut from "../asset/not-found.svg";
import "../App.css";

function NotFound() {
  return (
    <div className="not-found-container">
      <img
        src={Astronaut}
        alt="an astronaut lost in the space"
        style={{ width: 700, height: 700 }}
      />
      <h4>Такой страницы нет!</h4>
      <Link to={`/`}>
        <button className="not-found-btn">НА ГЛАВНУЮ</button>
      </Link>
    </div>
  );
}
export default NotFound;
