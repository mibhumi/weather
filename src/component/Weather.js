import React, { useState, useEffect } from "react";
import "../App.css";
import axios from "axios";
import {apiKey} from "../api";
import moment from "moment";

const Weather = () => {  
    const [inputCity, setInputCity] = useState("")
    const [data, setData] = useState({})
  
  
    const getWetherDetails = (cityName) => {
      if (!cityName) return
      const apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey
      axios.get(apiURL).then((res) => {
        console.log("response", res.data)
        setData(res.data)
      }).catch((err) => {
        console.log("err", err)
      })
    }
  
    const handleChangeInput = (e) => {
      setInputCity(e.target.value)
    }
  
    const handleSearch = () => {
      getWetherDetails(inputCity)
    }
  
  
    return (
      <div className="col-md-12">
        <div className="wetherBg">
          <h1 className="heading">Weather App</h1>
  
          <div className="d-grid gap-3 col-4 mt-4">
            <input type="text" className="form-control"
              value={inputCity}
              onChange={handleChangeInput} />
            <button className="btn btn-primary" type="button"
              onClick={handleSearch}
            >Search</button>
          </div>
        </div>
  
        {Object.keys(data).length > 0 &&
          <div className="col-md-12 text-center mt-5">
            <div className="shadow rounded wetherResultBox">
              <h5 className="weathorCity">
                {data?.name}
              </h5>
              <h6 className="weathorTemp">{((data?.main?.temp) - 273.15).toFixed(2)}°C</h6>
              <h6 className="weathorTemp">
                      { data?.main?.humidity}
              </h6>
              <h6 className="weathorTemp">
                      { moment.utc(data?.sys?.sunrise,'X').add(data?.timezone,'seconds').format('HH:mm a')}
              </h6>
              <h6 className="weathorTemp">
                      { moment.utc(data?.sys?.sunset,'X').add(data?.timezone,'seconds').format('HH:mm a')}
              </h6>
              <img src={`http://openweathermap.org/img/wn/${data?.weather[0].icon}@2x.png`}/>
            </div>
          </div>
        }
  
      </div>
    );
}

export default Weather;