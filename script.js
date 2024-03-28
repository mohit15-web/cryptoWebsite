const cryptoContainer = document.getElementById("cryptoContainer");
const inputText = document.getElementById("text");

const url =
  "https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers%5B0%5D=1&orderBy=marketCap&orderDirection=desc&limit=50&offset=0";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "c6b77b25a9msh4fe51e21727aad3p171430jsn50b8fc836df7",
    "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
  },
};

async function fetchData() {
  // if (inputText.value === "") {
  //   alert("Search")
  // }

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
    // console.log(result.data.coins[0].name);
    // slider.innerHTML = "";
    for (let i = 0; i < 50; i++) {
      let cryptoData = result.data.coins[i];
      let cryptoCard = document.createElement("div");
      cryptoCard.className =
        " w-full p-4 bg-gray-500 shadow-lg flex justify-around items-center";

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

inputText.addEventListener("input", (e) => {
  const searchTerm = e.target.value.toLowerCase().trim();
  const allCards = document.querySelectorAll(".cryptoCard");

  allCards.forEach((card) => {
    const cardContent = card.innerText.toLowerCase();
    if (cardContent.includes(searchTerm)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});



fetchData();




