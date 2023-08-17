import React, { useEffect, useState } from 'react'
import "./style.css"
import Weathercard from './weathercard';

const Temp = () => {

    const [searchValue, setSearchValue] = useState("ghaziabad");
    const [tempInfo, setTempInfo] = useState({})


    const getWeatherInfo = async() => {
        try{

            let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=379bf53839bd822b5f445f82f3917761`
            const res = await fetch(url);
            const data = await res.json();
            const {temp, humidity, pressure} = data.main
            const {main: weathermood} = data.weather[0]
            const { name} = data;
            const {speed} = data.wind;
            const {country,sunset} = data.sys

            const myNewWeatherInfo = {
                temp, 
                humidity, 
                pressure, 
                weathermood, 
                name, 
                speed, 
                country,
                sunset,
            };

            // console.log(myNewWeatherInfo);
            setTempInfo(myNewWeatherInfo)

        }catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        getWeatherInfo();
    },[])

  return (
    <>
    <div className="wrap">
        <div className="search">
            <input type="search" placeholder='search....' autoFocus id='search' className='searchTerm' value={searchValue} onChange={(e)=> setSearchValue(e.target.value)} />
            <button className="searchButton" type='button' onClick={getWeatherInfo}>Search</button>
        </div>

        <Weathercard tempInfo={tempInfo}/>
    </div>
    </>
  )
}

export default Temp