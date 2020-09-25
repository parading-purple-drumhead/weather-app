const prevBtn = document.querySelector("#prev-slide");
const nextBtn = document.querySelector("#next-slide");
const search = document.querySelector('#searchBtn');



// vue instance-1
const cityContainer = new Vue({
    el: "#city-container",
    data: {
        cityname: '',
        date: '',
    },
    methods: {
        async searchCity() {
            const cityName = document.querySelector('#city-name');
            this.cityname = cityName.value.trim();
            console.log(this.cityname);
            weatherInfo.getweatherInfo(this.cityname);
            var modal = document.querySelector("#city-modal");
            M.Modal.getInstance(modal).close();
            cityName.value = '';
        },
        calcDatetime(d) {
            const year = d.slice(0,4);
            const monthIndex = parseInt(d.slice(5,7));
            var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
            const month = months[monthIndex-1];
            const day = d.slice(8,10);
            const time = d.slice(11,16)
            this.date = time + ' ' + month + ' ' + day + ', ' + year;
        }
    },
    mounted() {
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
    data: {
        temp: '',
        mintemp: '',
        maxtemp: '',
        temparray: [],
        Wicon: '',
        weather: '',
        feels: '',
    },
    methods: {
        async getweatherInfo(city) {
            const cityDets = await getCity(city);
            console.log(cityDets)
            const weather = await getWeather(cityDets.Key);
            console.log(weather);
            this.backgroundSet(weather.IsDayTime, weather.HasPrecipitation);
            cityContainer.calcDatetime(weather.LocalObservationDateTime)
            this.temp = Math.round(weather.Temperature.Metric.Value);
            this.feels = Math.round(weather.RealFeelTemperature.Metric.Value);
            this.mintemp = Math.round(weather.TemperatureSummary.Past12HourRange.Maximum.Metric.Value);
            this.maxtemp = Math.round(weather.TemperatureSummary.Past12HourRange.Minimum.Metric.Value);
            this.weather = weather.WeatherText;
            const forecasts = await getForecast(cityDets.Key);
            console.log(forecasts);
            let i = 0;
            let arrayname = [];
            forecasts.every(forecast => {
                var datetime = forecast.DateTime;
                var time = datetime.slice(11, 16);
                arrayname.push({
                    temp: Math.round(forecast.Temperature.Value),
                    datetime: time
                })
                i++;
                if (i == 6) { return false; }
                else { return true; }
            });
            this.temparray = arrayname;
            console.log(this.temparray);
        },
        prevSlide() {
            var carousel = document.querySelector(".carousel")
            var instance = M.Carousel.getInstance(carousel)
            instance.prev();
        },
        nextSlide() {
            var carousel = document.querySelector(".carousel")
            var instance = M.Carousel.getInstance(carousel)
            instance.next();
        },
        backgroundSet(isDay, isRain) {
            if (!isRain) {
                if (isDay) {
                    document.body.style.backgroundImage = "url('images/warm.jpg')"
                }
                else {
                    document.body.style.backgroundImage = "url('images/night.jpg')"
                }
            }
            else {
                document.body.style.backgroundImage = "url('images/rainy.jpg')"
            }
        }
    },

    mounted() {

    }


});

