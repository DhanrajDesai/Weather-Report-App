/*c5bbbeff7d59d7b1c23c2320e9ecde32
api.openweathermap.org/data/2.5/weather?q={city_name} & appid={API key}*/
const weather_api={
    key:'c5bbbeff7d59d7b1c23c2320e9ecde32',
    url:'https://api.openweathermap.org/data/2.5/weather'
}


document.addEventListener('DOMContentLoaded', () => 
{
    const input_box=document.getElementById('input-box');

    input_box.addEventListener('keypress',(event)=>{
    
    fetch('https://restcountries.com/v3.1/all').then(res=>{
        return res.json();
    }).then(data=>{
        let show_op="";
        data.forEach(country => {
            show_op +=`${country.name}`;
        });
        input_box.innerHTML=show_op;
        console.log(data);
    })
   
   
   
   
    if(event.keyCode == 13)
    {
    console.log(event.target.value);
    get_weather_report(input_box.value);
    }
});
});


function get_weather_report(city){
    fetch(`${weather_api.url}?q=${city}&appid=${weather_api.key}&units=metric`).then(
        weather =>{
            return weather.json();

        }
    ).then(show_weather_report);
}

function show_weather_report(weather){
    let city =document.getElementById('city');
    city.innerText=`${weather.name},${weather.sys.country}`;

    let temp =document.getElementById('temp');
    temp.innerHTML=`${Math.round(weather.main.temp)}&deg;C`;

    let min_max =document.getElementById('min-max');
    min_max.innerHTML=`${Math.floor(weather.main.temp_min)}&deg;C (min)/${Math.ceil(weather.main.temp_max)}&deg;C (min)`;

    let weatherType =document.getElementById('weather');
    weatherType.innerText=`${weather.weather[0].main}`;

    let date =document.getElementById('date');
    let today_date=new Date();
    date.innerText=dateManage(today_date);

    if(weatherType.textContent == 'Clear') {
        document.body.style.backgroundImage = "url('clear_weather.jpg')";
        
    } else if(weatherType.textContent == 'Clouds') {

        document.body.style.backgroundImage = "url('cloudy.jpg')";
        
    } else if(weatherType.textContent == 'Haze') {

        document.body.style.backgroundImage = "url('haze.jpg')";
        
    }     else if(weatherType.textContent == 'Rain') {
        
        document.body.style.backgroundImage = "url('rain.jpg')";
        
    } else if(weatherType.textContent == 'Snow') {
        
        document.body.style.backgroundImage = "url('snow.jpg')";
    
    } else if(weatherType.textContent == 'Thunderstorm') {
    
        document.body.style.backgroundImage = "url('thunder.jpg')";
        
    } 
    else if(weatherType.textContent == 'Smoke') {
    
        document.body.style.backgroundImage = "url('smoke.jpg')";
        
    } 

}
function dateManage(date_arg){
    let days=["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let months=["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];        

    let year = date_arg.getFullYear();
    let month = months[date_arg.getMonth()];
    let date = date_arg.getDate();
    let day = days[date_arg.getDay()];

    return `${date} ${month} (${day}), ${year}`;

}