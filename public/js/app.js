const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

const weatherForm = document.querySelector("form");
weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const search = document.querySelector("input");
  const address = search.value;

  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";

  fetch("/weather?address=" + address).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        // console.log(data.error);
        messageOne.textContent = data.error;
      } else {
        console.log(data.location);
        messageOne.textContent = data.location;
        messageTwo.textContent = data.weatherData;
        console.log(data.weatherData);
      }
    });
  });
});
