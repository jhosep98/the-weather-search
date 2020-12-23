const container = document.querySelector(".container");
const result = document.querySelector("#resultado");
const form = document.querySelector("#formulario");

window.addEventListener("load", () => {
  form.addEventListener("submit", searchWeather);
});

const searchWeather = (e) => {
  e.preventDefault();

  // validate form
  const city = document.querySelector("#ciudad").value;
  const country = document.querySelector("#pais").value;

  if (city === "" || country === "") {
    showError("Both fields are required");
    return;
  }
  // consult API
  consultApi(city, country);
};

function showError(message) {
  const alertM = document.querySelector(".bg-red-100");
  if (!alertM) {
    const warningMessage = document.createElement("div");
    warningMessage.classList.add(
      "bg-red-100",
      "border-red-400",
      "text-red-700",
      "px-4",
      "py-3",
      "rounded",
      "max-w-md",
      "mx-auto",
      "mt-6",
      "text-center"
    );
    warningMessage.innerHTML = `
      <strong class="font-bold">Error!</strong>
      <span class="block">${message}</span>
    `;
    container.appendChild(warningMessage);

    // Remove alert after 5 seconds
    setTimeout(() => {
      warningMessage.remove();
    }, 3000);
  }
}

function consultApi(city, country) {
  const appId = "d951f33616f0224c149c2fee35776c59";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${appId}`;

  Spinner();

  setTimeout(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        cleanHTML(); // clean html
        if (data.cod === "404") {
          showError("City not found");
          return;
        }
        // print the answer in the HTML
        showWeather(data);
      });
  }, 1000);
}

function showWeather(data) {
  const {
    name,
    main: { temp, temp_max, temp_min },
  } = data;

  const celsius = kelvinToCelsius(temp);
  const tempMax = kelvinToCelsius(temp_max);
  const tempMin = kelvinToCelsius(temp_min);

  const cityName = document.createElement("p");
  cityName.textContent = `wheater in ${name}`;
  cityName.classList.add("font-bold", "text-2xl");

  const current = document.createElement("p");
  current.innerHTML = `${celsius} &#8451`;
  current.classList.add("font-bold", "text-6xl");

  const tempMaxElement = document.createElement("p");
  tempMaxElement.innerHTML = `Max: ${tempMax} &#8451`;
  tempMaxElement.classList.add("text-xl");

  const tempMinElement = document.createElement("p");
  tempMinElement.innerHTML = `Min: ${tempMin} &#8451`;
  tempMinElement.classList.add("text-xl");

  const resultDiv = document.createElement("div");
  resultDiv.classList.add("text-center", "text-white");

  resultDiv.appendChild(cityName);
  resultDiv.appendChild(current);
  resultDiv.appendChild(tempMaxElement);
  resultDiv.appendChild(tempMinElement);

  result.appendChild(resultDiv);
}

function cleanHTML() {
  while (result.firstChild) {
    result.removeChild(result.firstChild);
  }
}

function Spinner() {
  cleanHTML();
  const divSpinner = document.createElement("div");
  divSpinner.classList.add("sk-cube-grid");

  divSpinner.innerHTML = `
  <div class="sk-cube sk-cube1"></div>
  <div class="sk-cube sk-cube2"></div>
  <div class="sk-cube sk-cube3"></div>
  <div class="sk-cube sk-cube4"></div>
  <div class="sk-cube sk-cube5"></div>
  <div class="sk-cube sk-cube6"></div>
  <div class="sk-cube sk-cube7"></div>
  <div class="sk-cube sk-cube8"></div>
  <div class="sk-cube sk-cube9"></div>
    `;

  result.appendChild(divSpinner);
}

// helpers
const kelvinToCelsius = (grades) => (grades - 273.15).toFixed(1);
