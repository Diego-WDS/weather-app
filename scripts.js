const apikey = "3265874a2c77ae4a04bb96236a642d2f";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

const url = (city) => `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`



// Get info
const getWeatherByLocation = async (city)=>{
    const resp = await fetch(url(city), { origin: "cors" });
    const respData = await resp.json();

    addWeatherToPage(respData)
}


// Add info DOM
const addWeatherToPage= (data)=> {
    const temp = kToC(data.main.temp);

    const weather = document.createElement('div');
    weather.classList.add('weather');

    weather.innerHTML = `
    <p>La temperatura es</p>
    <h2>${temp}°C <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /></h2>
    <small class="state">${data.weather[0].main}</small></br>
    <small class="city">${search.value}</small>
    
    `;
    
    // CleanUp
    main.innerHTML= '';

    main.appendChild(weather);
}


// Kelvin to Celsius function

const kToC = (k)=>{
    return Math.floor(k - 273.15);
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();

    const city = search.value;

    if(city){
        getWeatherByLocation(city)
    }
});