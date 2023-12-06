apiKey = 'b25cdbec0d224f2a975190533231611';

const searchForm = document.querySelector('.search');

async function handeFetch() {
  try {
    const response = await fetch(
      'https://api.weatherapi.com/v1/forecast.json?key=b25cdbec0d224f2a975190533231611&q=germany&days=7'
    );
    const json = await response.json();
    console.log(json);
    updateUI(json);
  } catch (error) {
    console.log(error);
  }
}

handeFetch();

async function handleSubmit(e) {
  e.preventDefault();
  const inputCity = document.querySelector('#inCity').value;

  // if (inputCity.length === 0) {
  //   console.log("Insira uma localização válida");
  // } else {
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${inputCity}&days=7`
    );
    const json = await response.json();
    console.log(json);
    updateUI(json);
  } catch (error) {
    console.log(error);
  }

  searchForm.reset();
  // }
}

// update ui with returns from json
function updateUI(json) {
  if (json && json.location && json.current) {
    getLocalTime();
    changeCalendar(json);
    changeCelciusActual(json);
    changeLocation(json);
    changeIconDay(json);
    changeMinMax(json);
    changeInforFooter(json);
  } else {
    console.log('teste');
  }
}

// Change the date
function changeCalendar(json) {
  const dateFromHTML = document.querySelector('.date');
  const jsonDate = json.location.localtime;
  const locationDate = new Date(jsonDate);

  // week days
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  // months of year
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  // get date from location
  const dayOfWeek = days[locationDate.getDay()];
  const dayOfMonth = locationDate.getDate();
  const month = months[locationDate.getMonth()];
  const year = locationDate.getFullYear();
  let hours = locationDate.getHours();
  let minutes = locationDate.getMinutes();

  const formattedDayOfMonth = dayOfMonth <= 9 ? '0' + dayOfMonth : dayOfMonth;

  // convert from 24h to 12h
  const timePeriod = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;

  // format to get two digits for minutes always
  minutes = minutes < 10 ? '0' + minutes : minutes;

  // output
  const date = `${dayOfWeek} ${month} ${formattedDayOfMonth} ${year}`;
  const time = `${hours}:${minutes} ${timePeriod}`;

  dateFromHTML.innerHTML = `${date} | ${time}`;
}

// change the celcius from location in day
function changeCelciusActual(json) {
  const tempFromHtml = document.querySelector('.temp');
  const temp = json.current.temp_c;
  tempFromHtml.innerHTML = `${temp}° C`;
}

function changeLocation(json) {
  const cityFromHtml = document.querySelector('.city');
  const city = json.location.name;
  const country = json.location.country;
  cityFromHtml.innerHTML = `${city} (${country})`;
}

function changeIconDay(json) {
  const iconDay = document.querySelector('.icon-day');
  const icon = json.current.condition.icon;
  const linkDivided = icon.split('/');
  const linkLength = linkDivided.length;
  iconDay.src = `./assets/img/icons/${linkDivided[linkLength - 2]}/${
    linkDivided[linkLength - 1]
  }`;
}

function changeMinMax(json) {
  const minFromHtml = document.querySelector('.min');
  const maxFromHtml = document.querySelector('.max');

  const min = json.forecast.forecastday[0].day.mintemp_c;
  const max = json.forecast.forecastday[0].day.maxtemp_c;

  minFromHtml.innerHTML = `Min: ${min}°`;
  maxFromHtml.innerHTML = `Max: ${max}°`;
}

function changeInforFooter(json) {
  const feelsFromHtml = document.querySelector('.feels');
  const rainFromHtml = document.querySelector('.rain');
  const visibilityFromHtml = document.querySelector('.visibility');
  const humidityFromHtml = document.querySelector('.humidity');
  const windSpeedFromHtml = document.querySelector('.wind-speed');
  const gustWindFromHtml = document.querySelector('.gust-wind');
  const cloudinessFromHtml = document.querySelector('.cloudiness');

  const feels = json.current.feelslike_c;
  const rain = json.forecast.forecastday[0].day.daily_chance_of_rain;
  const visibility = json.current.vis_km;
  const humidity = json.current.humidity;
  const windSpeed = json.current.wind_kph;
  const gustWind = json.current.gust_kph;
  const cloudiness = json.current.cloud;

  feelsFromHtml.innerHTML = `${feels}° C`;
  rainFromHtml.innerHTML = `${rain}%`;
  visibilityFromHtml.innerHTML = `${visibility} KM/H`;
  humidityFromHtml.innerHTML = `${humidity}%`;
  windSpeedFromHtml.innerHTML = `${windSpeed} KM/H`;
  gustWindFromHtml.innerHTML = `${gustWind} KM/H`;
  cloudinessFromHtml.innerHTML = `${cloudiness}%`;
}

function getLocalTime() {
  const localTimeFromHtml = document.querySelector('.time');
  const localDate = new Date();

  // week days
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  let hours = localDate.getHours();
  let minutes = localDate.getMinutes();
  const dayOfWeek = days[localDate.getDay()];

  // convert from 24h to 12h
  const timePeriod = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;

  localTimeFromHtml.innerHTML = `Local time: ${dayOfWeek}, ${hours}:${minutes} ${timePeriod}`;
}

searchForm.addEventListener('submit', handleSubmit);
