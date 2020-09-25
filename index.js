const prevBtn = document.querySelector("#prev-slide");
const nextBtn = document.querySelector("#next-slide");
const search = document.querySelector('#searchBtn');



// vue instance-1
const cityContainer = new Vue({
    el: "#city-container",
    data: {
        cityname: '',
        date: '',
        // time:'',

    },
    methods: {
        async searchCity() {
            const cityName = document.querySelector('#city-name');
            this.cityname = cityName.value.trim();
            console.log(this.cityname);
            // const cityDets = await getCity(this.cityname);
            // console.log(cityDets);
            weatherInfo.getweatherInfo(this.cityname);
            var modal = document.querySelector("#city-modal");
            M.Modal.getInstance(modal).close();
            cityName.value = '';
            
            
        }

    },
    mounted() {
        const d = new Date();
        const mon = d.toLocaleString('default', { month: 'short' });
        const yr = d.getFullYear();
        const day = d.getDate();
        let hr = d.getHours();
        if (hr < 10) {
            hr = '0' + hr;
        }
        const min = d.getMinutes();

        this.date = hr + ':' + min + ' ' + mon + ' ' + day + ',' + ' ' + yr;
    }
});

prevBtn.addEventListener('click', e => {
    e.preventDefault();
    var carousel = document.querySelector(".carousel")
    var instance = M.Carousel.getInstance(carousel)
    instance.prev();
})

nextBtn.addEventListener('click', e => {
    e.preventDefault();
    var carousel = document.querySelector(".carousel")
    var instance = M.Carousel.getInstance(carousel)
    instance.next();
})


//vue instance -2
const weatherInfo = new Vue({
    el: "#weatherInfo",
    data:{
        temp:'',
        mintemp:'',
        maxtemp:'',
        temparray :[],
        Wicon:'',
        weather:'',
        feels:'',
    },
    methods:{
        async getweatherInfo(city){
            const cityDets = await getCity(city);
            console.log(cityDets)
            const weather = await getWeather(cityDets.Key);
            console.log(weather);
            this.temp=Math.round (  weather.Temperature.Metric.Value) ;
            this.feels = Math.round(weather.RealFeelTemperature.Metric.Value);
            this.mintemp = Math.round(weather.TemperatureSummary.Past12HourRange.Maximum.Metric.Value);
            this.maxtemp = Math.round(weather.TemperatureSummary.Past12HourRange.Minimum.Metric.Value);
            this.weather = weather.WeatherText;
            const forecasts = await getForecast(cityDets.Key);
            console.log(forecasts);
            let i=0;
            let arrayname = [];
            forecasts.every(forecast =>{
                var datetime = forecast.DateTime;
                var time = datetime.slice(11,16);
                arrayname.push ({
                    temp: Math.round(forecast.Temperature.Value),
                    datetime : time
                })
                i++;
                if (i==6) {return false;}
                else {return true;}
                    

            });
            this.temparray= arrayname;
            console.log(this.temparray);
            
        }
    },

mounted(){
    
}


});

