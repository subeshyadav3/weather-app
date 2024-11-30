import { useEffect } from 'preact/hooks';
import { useState } from 'react';

export function Api() {
    const [city, setCity] = useState("Kathmandu");
    const [data, setData] = useState(null);  
    const [show,setShow]=useState(null);
    
    const [cities,setCities]=useState([]);

    useEffect(() => {
        getWeather(); //for default 
        const getRecord = JSON.parse(localStorage.getItem("cities"));
        
        Object.values(getRecord).forEach(value => {
            cities.push(value);
            
             
        });
        
        
    }, []);
    async function getWeather() {
        setShow(city)
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=fc724fc1382669595cfbe6798cca3cb6`);
            const result = await response.json();
            
            if(result.cod=="404"){
                setData(null)
            }
            else{
                setData(result)
                    if(!(cities[0]==city)){
                                // records of searched city
                        const updatedCities=[city,...cities];
                        setCities(updatedCities);
                        localStorage.setItem("cities",JSON.stringify(updatedCities));
                    }
                    
            }

            
        } catch (error) {
            console.error("Error fetching weather data: ", error);
        }

        setTimeout(() => {
            loadCities(); // Call after 1 second
        }, 1000);
     

    
    
    }

    function loadCities() {
        return (
            <>  
            <p className='text-blue-400 text-2xl'>Previous Searches</p>
                {cities.map((e, index) => (
                    index>8?"":<p key={index}>{e}</p>
                ))}
            </>
        );
    }
    return (
        <div className='flex flex-col justify-center items-center'>
            <div className='w-full p-5 flex flex-row justify-center items-center gap-1 mt-5'>
                <input
                    type="text"
                    className='w-[400px] rounded-xl h-10 text-black p-2'
                    onChange={(e) => {
                        setCity(e.target.value)
                        
                    }}
                    // value={city}
                    placeholder='Enter City Name ex: Kathmandu'
                />
                <button
                    className='rounded-xl bg-orange-500 m-5 w-20 h-10 text-xl'
                    onClick={getWeather}
                >
                    Search
                </button>
            </div>
            <div className='m-2 pl-10 h-10 text-2xl w-full flex flex-row'>
                <p>{data?"Showing Result For ":"No Data Available, Type Valid City and Search "}</p>
                <p className='ml-2 text-green-700'>{show}</p>
            </div>
            <div className='p-5 w-full flex flex-row'>
                <div className='w-1/2'>
                    
                    {data ? (
                        <div>
                            <p>Location: {data.name}, {data.sys.country}</p>
                            <p>Temperature: {((data.main.temp)-273.15).toFixed(2)} °C</p> 
                            <p>Min Temperature: {(data.main.temp_min-273.15).toFixed(2)} °C</p> 
                            <p>Max Temperature: {(data.main.temp_max-273.15).toFixed(2)} °C</p> 
                            <p>Sunrise At {new Date(data.sys.sunrise * 1000).toLocaleTimeString()}</p>
                            <p>Sunset At {new Date(data.sys.sunset * 1000).toLocaleTimeString()}</p>


                            <p>Weather: {data.weather[0].description}</p>
                            <p>Humidity: {data.main.humidity}</p>
                            <p>Speed: {data.wind.speed} </p>
                        
                        </div>
                    ) : <div></div>}
                    </div>
                       
                    <div>
                    {loadCities()}
                    </div>
            </div>
        </div>
    );
}
