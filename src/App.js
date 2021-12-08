import { useState, useEffect, useReducer } from "react";
import "./App.css";
import Search from "./componant/Search";
import Layout from "./componant/Layout";
import Card from "./componant/Card";
import Cardx from "./componant/Cardx";
import wicon from "../src/images/wicon.png";
import moment from "moment";

function App() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState("");
  const [lat, setLat] = useState([]);
  const [lon, setLon] = useState([]);
  const [location, setLocation] = useState("");
  const [time, setTime] = useState();

  const fetchApiData = async (search) => {
    const _url = `http://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${process.env.REACT_APP_API_KEY}&units=metric`;
    const res = await fetch(_url);
    const data = await res.json();
    return setWeather(data);
  };

  useEffect(() => {
    fetchApiData(search);
    return () => {
      fetchApiData();
    };
  }, []);

  useEffect(() => {
    let storage = localStorage.getItem("input");
    fetchApiData(storage);
    setSearch(storage);
  }, []);

  useEffect(() => {
    setInterval(() => {
      setTime(moment().format("Do MMMM YYYY, h:mm:ss"));
    }, 1000);
    return () => {};
  }, []);

  useEffect(() => {
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}&units=metric`;
    const location = async () => {
      const res = await fetch(url);
      const data = await res.json();
      return setLocation(data);
    };
    location();
    return () => {
      location();
    };
  }, [lat, lon]);

  useEffect(() => {
    if (typeof navigator.geolocation !== "undefined") {
      navigator.geolocation.getCurrentPosition((pos) => {
        setLat(pos.coords.latitude);
        setLon(pos.coords.longitude);
      });
    } else {
      console.log("No Location enabled");
    }
    return () => {
      return;
    };
  }, []);

  const onchange = (e) => {
    setSearch(e.target.value);
    localStorage.setItem("input", e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    fetchApiData(search);
  };

  return (
    <Layout>
      <div className="container">
        <div className="aside">
          <div className="search ">
            {/* search bar */}
            <Search onChange={onchange} search={search} onClick={onSubmit} />

            {/* side bar [start] */}
            {typeof weather.main !== "undefined" ? (
              <div className="show--weather">
                <div className="show--weather-icon">
                  <div className="icon">
                    <img className="wicon" src={wicon} />
                  </div>
                </div>

                <div className="show--temp-today">
                  <span className="temp--today">
                    {Math.floor(weather.main.temp)}
                  </span>
                  <span className="deg"> &deg; </span>{" "}
                  <span className="centi">C</span>
                </div>

                {/* show date */}
                <div className="show--date">
                  <span className="date">{time}</span>
                </div>

                <div className="show--date">
                  <span className="date"></span>
                </div>

                {/* show weather status*/}
                <div className="show--weather-status">
                  <span className="weather--status">
                    {weather.weather[0].description}
                  </span>
                </div>

                {/* show weather status*/}
                <div className="show--city-name">
                  <span className="city--name">
                    {weather.name}, {weather.sys.country}
                  </span>
                </div>

                {/* show city photo*/}
                <div className="show--city-photo">
                  <span className="city-photo"></span>
                </div>
              </div>
            ) : (
              <div>
                {search !== "" && typeof search !== "undefined" ? (
                  <div>Searching</div>
                ) : (
                  <p className="warring-text">Please enter your city</p>
                )}
              </div>
            )}
          </div>
        </div>
        {/* side bar [END] */}


        {/* weekly data [start] */}
        <div
          className={
            search !== "undefined" && search !== "" ? "aside-right" : "hide-cl"
          }
        >
          {typeof weather.main !== "undefined" &&
          typeof location.daily !== "undefined" ? (
            <div>
              <h3 className="headline">Week's data</h3>
              <div className="cards flex">
                {location.daily.slice(0, 7).map((e) => {
                  return <Card title="Temp" mValue={e.temp.day} mHour={e.dt} />;
                })}
              </div>
            </div>
          ) : (
            <div></div>
          )}
          {typeof weather.main !== "undefined" ? (
            <div>
              <h3 className="headline">Todays Highlight</h3>

              <div className="cardx inline--data">
                <Cardx
                  title="Sunrise & Sunset"
                  mValue={`sunrise: ${moment
                    .unix(weather.sys.sunrise)
                    .format("LT")}`}
                  lValue={`sunset: ${moment
                    .unix(weather.sys.sunset)
                    .format("LT")}`}
                />
                <Cardx
                  title="Wind Speed"
                  mValue={
                    <span className="card-text">
                      {weather.wind.speed} <span className="deg">Kmph</span>
                    </span>
                  }
                />
                <Cardx
                  title="Humidity"
                  mValue={
                    <span className="card-text">
                      {weather.main.humidity + "%"}
                    </span>
                  }
                />
              </div>
              <div className="cardx inline--data">
                <Cardx
                  title="Visibility"
                  mValue={
                    <span className="card-text">
                      {weather.visibility / 1000 + "KM"}
                    </span>
                  }
                />
                <Cardx
                  title="Pressure"
                  mValue={
                    <span className="card-text">
                      {weather.main.pressure} <span className="deg">ATM</span>
                    </span>
                  }
                />

                <Cardx
                  title="Cloudiness"
                  mValue={
                    <span className="card-text">
                      {weather.clouds.all + "%"}
                    </span>
                  }
                />
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default App;
