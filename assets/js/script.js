apiKey = "b25cdbec0d224f2a975190533231611";

const searchForm = document.querySelector(".search");

async function handleSubmit(e) {
  e.preventDefault();
  const inputCity = document.querySelector("#inCity").value;

  // if (inputCity.length === 0) {
  //   console.log("Insira uma localização válida");
  // } else {
  try {
    const response = await fetch(
      // `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${inputCity}&days=7`
      "http://api.weatherapi.com/v1/forecast.json?key=b25cdbec0d224f2a975190533231611&q=germany&days=7"
    );
    const json = await response.json();
    console.log(json);
    changeDate(json);
    changeCelciusActual(json);
    changeLocation(json);
    changeCountry(json);
    changeMinMax(json);
  } catch (error) {
    console.log(error);
  }

  searchForm.reset();
  // }
}

// Change the date
function changeDate(json) {
  const dateFromHTML = document.querySelector(".date");
  const jsonDate = json.location.localtime;
  const locationDate = new Date(jsonDate);

  // week days
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // months of year
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // get date from location
  const dayOfWeek = days[locationDate.getDay()];
  const dayOfMonth = locationDate.getDate();
  const month = months[locationDate.getMonth()];
  const year = locationDate.getFullYear();
  let hours = locationDate.getHours();
  let minutes = locationDate.getMinutes();

  // convert from 24h to 12h
  const timePeriod = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;

  // format to get two digits for minutes always
  minutes = minutes < 10 ? "0" + minutes : minutes;

  // output
  const date = `${dayOfWeek} ${month} ${dayOfMonth} ${year}`;
  const time = `${hours}:${minutes} ${timePeriod}`;

  dateFromHTML.innerHTML = `${date} | ${time}`;
}

// change the celcius from location in day
function changeCelciusActual(json) {
  const tempFromHtml = document.querySelector(".temp");
  const temp = json.current.temp_c;
  tempFromHtml.innerHTML = `${temp}°`;
}

function changeLocation(json) {
  const cityFromHtml = document.querySelector(".city");
  const city = json.location.name;
  cityFromHtml.innerHTML = `${city}`;
}

function changeCountry(json) {
  const countryFromHtml = document.querySelector(".country");
  const country = json.location.country;
  countryFromHtml.innerHTML = `${country}`;
}

function changeMinMax(json) {
  const minFromHtml = document.querySelector(".min");
  const maxFromHtml = document.querySelector(".max");

  const min = json.forecast.forecastday[0].day.mintemp_c;
  const max = json.forecast.forecastday[0].day.maxtemp_c;

  minFromHtml.innerHTML = `Min: ${min}°`;
  maxFromHtml.innerHTML = `Max: ${max}°`;
}

searchForm.addEventListener("submit", handleSubmit);
