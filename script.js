const cryptoContainer = document.getElementById("cryptoContainer");
const coinSearchBtn = document.getElementById("coinSearchBtn");
const coinResetBtn = document.getElementById("coinResetBtn");

async function fetchData(searchTerm = "") {
  const url = `https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers%5B0%5D=1&orderBy=marketCap&search=${searchTerm}&orderDirection=desc&limit=200&offset=0`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "c6b77b25a9msh4fe51e21727aad3p171430jsn50b8fc836df7",
      "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);

    for (let i = 0; i < 150; i++) {
      let cryptoData = result.data.coins[i];
      let cryptoCard = document.createElement("div");
      cryptoCard.className =
        "cryptoCard w-10/12 m-auto p-4 bg-gray-500 shadow-lg flex justify-around items-center rounded-lg";

      cryptoCard.innerHTML = `

          <h3 class="text-xl font-semibold">${cryptoData.rank}</h3>

          <div class="flex justify-center items-center gap-3">

          <img src=${cryptoData.iconUrl} class="w-10" />
          <h3 class="text-xl font-semibold">${cryptoData.symbol}</h3>
          </div>

              <h3 class="text-xl font-semibold">${cryptoData.name}</h3>

              <h3 class="text-xl">$${cryptoData.price}</h3>

              <h3 class="text-xl">$${cryptoData.marketCap}</h3>

          <a href="./data.html" class="px-4 py-2 bg-gray-900 text-white rounded-lg cursor-pointer" target="_blank">More Info</a>
      `;
      cryptoContainer.appendChild(cryptoCard);
    }
  } catch (error) {
    console.error(error);
  }
}
fetchData();

coinSearchBtn.addEventListener("click", (e) => {
  e.preventDefault(); // Prevent the default form submission behavior

  const searchTerm = document.getElementById("text").value.trim(); // Get the search term entered by the user

  cryptoContainer.innerHTML = ""; // Clear the content of the cryptoContainer

  fetchData(searchTerm); // Fetch data based on the search term
});


coinResetBtn.addEventListener("click", (e) => {
  e.preventDefault(); // Prevent the default form submission behavior
  cryptoContainer.innerHTML = ""; // Clear the content of the cryptoContainer
  fetchData(); // Fetch data based on the search term
});
