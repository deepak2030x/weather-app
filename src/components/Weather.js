import { useEffect, useReducer, useRef } from "react";
const headStyle = { textAlign: "center" };
const fontStyle = { fontSize: `${25}px` };

let initial = true;
let isBtnClicked = false;
console.log("firsttime");

function Weather() {
  const searchRef = useRef();
  function weatherReducer(state, action) {
    if (action.type === "CITY") {
      return {
        cityName: action.payload.city,
        statusCode: action.payload.status,
        temp: action.payload.temp,
        icon: action.payload.icon,
        desc: action.payload.desc,
      };
    }
    if (action.type === "TEMP") {
      //   console.log(action.payload.icon);
      return {
        cityName: state.cityName,
        temp: action.payload.temp,
        statusCode: action.payload.status,
        icon: action.payload.icon,
        desc: action.payload.desc,
      };
    }
    if (action.type === "ERROR") {
      return {
        cityName: state.cityName,
        icon: 0,
        desc: "",
        temp: action.payload.temp,
        statusCode: action.payload.status,
      };
    }
    return state;
  }
  const [weatherState, dispatchWeather] = useReducer(weatherReducer, {
    cityName: "",
    temp: "",
    statusCode: 0,
    icon: 0,
    desc: "",
  });

  useEffect(() => {
    if (initial === true || weatherState.cityName === "") {
      initial = false;
      return;
    }
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${weatherState.cityName}
        &appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
        );
        const data = await res.json();
        if (data.cod !== 200) {
          throw new Error(data.cod);
        }
        // console.log(data.weather[0]);
        dispatchWeather({
          type: "TEMP",
          payload: {
            temp: data.main.temp,
            status: data.cod,
            icon: data.weather[0].icon,
            desc: data.weather[0].description,
          },
        });
      } catch (e) {
        // console.log(typeof e.message);
        dispatchWeather({
          type: "ERROR",
          payload: {
            temp: "",
            status: Number(e.message),
          },
        });
      }
    };
    fetchWeather();
    // console.log("hello");
  }, [weatherState.cityName, isBtnClicked]);

  function searchHandler(e) {
    e.preventDefault();
    // console.log(typeof searchRef.current.value);
    dispatchWeather({
      type: "CITY",
      payload: {
        city: searchRef.current.value.trim(),
        temp: "0",
        status: 0,
        icon: 0,
        desc: "",
      },
    });
    isBtnClicked = !isBtnClicked;
    searchRef.current.value = "";
    // settemp("");
  }

  return (
    <div style={headStyle}>
      <h3 style={fontStyle}>
        <label htmlFor="location">Enter location name:</label>
        <input
          type="search"
          id="location"
          ref={searchRef}
          required={true}
          style={{ marginLeft: `${20}px` }}
        ></input>
      </h3>

      <div style={{ marginTop: `${5}px` }}>
        <button
          type="submit"
          onClick={searchHandler}
          style={{ fontSize: `${20}px` }}
        >
          Search
        </button>
      </div>
      {weatherState.statusCode !== 200 && weatherState.statusCode !== 0 && (
        <h2>City not found.</h2>
      )}
      {weatherState.statusCode === 200 && (
        <div>
          <h2>
            The weather at {weatherState.cityName} is {weatherState.temp} degree
            celcius.
          </h2>
          <div>
            <h3>{weatherState.desc}</h3>
            <img
              src={`https://openweathermap.org/img/wn/${weatherState.icon}@2x.png`}
              alt="cloudy sky"
              width={`${200}px`}
              height={`${200}px`}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Weather;
