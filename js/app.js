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
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${appId}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.cod === "404") {
        showError("City not found");
      }
    });
}
