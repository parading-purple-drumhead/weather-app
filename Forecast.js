const key=	'yCRof3ZH9FErWo8wMlABwT5Pps2npuML';

//get forecast
const getForecast = async(id)=>{
    const base="http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/" 
    const query = `${id}?apikey=${key}&metric=true`;

    const response = await fetch(base+query);
    const data = await response.json();

    return data;
}

 //get weather info
const getWeather = async(id)=>{

   const  base="http://dataservice.accuweather.com/currentconditions/v1/"
   const query= `${id}?apikey=${key}&details=true`;

   const response = await fetch(base+query);
   const data = await response.json();

   return data[0]; 
};



//get city info
const getCity =async (city) =>{

    const base ='http://dataservice.accuweather.com/locations/v1/cities/search' ;
    const query=`?apikey=${key}&q=${city}`;

    const response = await fetch (base + query);
    const data =await response.json();

    return (data[0]);

};



