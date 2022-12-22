import React, { useState } from "react";
import '../App.css';

const Weather = () => {  
  
    return (
      <div className="col-md-12">
        <div className="wetherBg">
          <h1 className="heading">Weather App</h1>
  
          <div className="d-grid gap-3 col-4 mt-4">
            <input type="text" className="form-control"
             />
            <button className="btn btn-primary" type="button"
            >Search</button>
          </div>
        </div>
  
        {data && Object.keys(data).length > 0 &&
          <div className="col-md-12 text-center mt-5">
  
            <div className="shadow rounded wetherResultBox">
              <img className="weathorIcon"
                src="https://i.pinimg.com/originals/77/0b/80/770b805d5c99c7931366c2e84e88f251.png" />
  
              <h5 className="weathorCity">
                {data?.name}
              </h5>
              <h6 className="weathorTemp">{((data?.main?.temp) - 273.15).toFixed(2)}°C</h6>
            </div>
          </div>
        }
  
      </div>
    );
}

export default Weather;