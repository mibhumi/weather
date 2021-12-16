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
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Your Weather Destination</h1>
  
          <div className="d-grid gap-3 col-4 mt-4">
            <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-48 p-2.5 dark:bg-gray-700 dark:border-grey-600 dark:placeholder-white-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={inputCity}
              onChange={handleChangeInput} />
            <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded m-5 w-36" type="button"
              onClick={handleSearch}
            >Search</button>
          </div>
        </div>
  
        {Object.keys(data).length > 0 &&
          <div className="flex flex-col items-center">
            <img src={`http://openweathermap.org/img/wn/${data?.weather[0].icon}@2x.png`}/>
            <h5 className="text-white">
            {data?.name}
            </h5>
            <h6 className="text-white">{((data?.main?.temp) - 273.15).toFixed(2)}°C</h6>
            <div className="flex flex-row">
                <img src="https://www.svgrepo.com/show/276666/sunrise-morning.svg" className="w-8" />
                <h6 className="text-white">
                    { moment.utc(data?.sys?.sunrise,'X').add(data?.timezone,'seconds').format('HH:mm a')}
                </h6>
            </div>
            <div className="flex flex-row">
                <img src="https://www.svgrepo.com/show/37753/sunset.svg" className="w-8" />
                <h6 className="text-white">
                      { moment.utc(data?.sys?.sunset,'X').add(data?.timezone,'seconds').format('HH:mm a')}
                </h6>
            </div>
            <h6 className="text-white">
            Humidity: { data?.main?.humidity} %
            </h6>
            <h6 className="text-white">
            Visibility: {data?.visibility}
            </h6>
            <h6 className="text-white">
            Wind Speed: {data?.wind?.speed} metre/sec
            </h6>
          </div>
        }
  
      </div>
    );
}

export default Weather;