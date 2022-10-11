let resultContainer = document.querySelector(".result");
let searchInput = document.querySelector("#search-inp");
let searchBtn = document.querySelector(".search-btn");

searchBtn.addEventListener("click", async function () {
  let countryName = searchInput.value.replace(/^\s+|\s+$/g, ""); // you can use trim ☺.
  resultContainer.innerHTML = "";
  searchInput.value = "";
  try {
    let url = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;
    let response = await fetch(url);
    let data = await response.json();
    let flagImg = data[0].flags.svg;
    let name = data[0].name.common;
    let continent = data[0].continents[0];
    let population = data[0].population;
    let currency = data[0].currencies[Object.keys(data[0].currencies)].name;
    let language = Object.values(data[0].languages)
      .toString()
      .split(",")
      .join(", ");
    resultContainer.innerHTML = `
        <img src=${flagImg} class='flag-img' />
        <h2>${name}</h2>
        <div class="data-wrapper">
            <h3>Continent: <span>${continent}</span></h3>
            <h3>Population: <span>${population}</span></h3>
            <h3>Currency: <span>${currency}</span></h3>
            <h3>Common Language: <span>${language}</span></h3>
        </div>
    `;
  } catch (error) {
    if (!countryName) {
      resultContainer.innerHTML =
        "<h3 class='error'>The input field cannot be empty</h3>";
    } else {
      resultContainer.innerHTML =
        "<h3 class='error'>Please enter a vaild country name</h3>";
    }
  }
});
