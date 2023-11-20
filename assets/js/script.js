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
      `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${inputCity}&days=7`
    );
    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.log(error);
  }

  searchForm.reset();
  // }
}

searchForm.addEventListener("submit", handleSubmit);
