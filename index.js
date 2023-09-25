const cardContainer = document.getElementById("cardContainer");
const searchInput = document.getElementById("searchInput");
const phcheckbox = document.getElementById("phCheckbox");
const srmcheckbox = document.getElementById("srm");

const slider1 = document.getElementById("phSlider");
const slider2 = document.getElementById("srmSlider");

slider1.disabled = true;
slider2.disabled = true;

phcheckbox.addEventListener("change", function () {
  slider1.disabled = false;
});

srmcheckbox.addEventListener("change", function () {
  slider2.disabled = false;
});

let page = 1;
let allBeers = [];

const FetchBeerData = async (page) => {
    try {
      const api = `https://api.punkapi.com/v2/beers?page=${page}&per_page=10`;
      const response = await fetch(api);
      const data = await response.json();
      allBeers = data;
      const filteredBeers = allBeers.filter(
        (beer) =>
          beer.attenuation_level ===
          parseInt(document.getElementById("firstSlider").value)
      );
      console.log(filteredBeers);
      cardContainer.innerHTML = "";
  
      showBeerCards(allBeers);
      showBeerCards(filteredBeers);
    } catch (err) {
      console.log("Error:", err);
    }
  };
  
  FetchBeerData(1);




function showBeerCards(beers) {
  beers.map((ele) => {
    //  console.log(ele.name);
    const beerCard = document.createElement("div");
    beerCard.classList.add("beerCard");
    const imageDiv = document.createElement("div");
    imageDiv.classList.add("img-div");

    const image = document.createElement("img");
    image.src = ele.image_url;
    // console.log(ele.image_url);
    const titleDiv = document.createElement("div");
    titleDiv.classList.add("title-div");
    const name = document.createElement("h2");
    name.classList.add("name");
    name.innerText = ele.name;
    // console.log(name)
    const first_brewed = document.createElement("p");
    first_brewed.classList.add("first_brewed");
    first_brewed.innerText = ele.first_brewed;
    // console.log(first_brewed);
    beerCard.appendChild(imageDiv);
    imageDiv.appendChild(image);
    beerCard.appendChild(titleDiv);
    titleDiv.appendChild(name);
    beerCard.appendChild(first_brewed);
    cardContainer.appendChild(beerCard);
  });
}

searchInput.addEventListener("keyup", () => {
  const searchTerm = searchInput.value;
  const filteredBeers = filterBeerName(searchTerm);

  cardContainer.innerHTML = "";
  showBeerCards(filteredBeers);
});

function filterByAttenuation(filterType) {
    let filteredBeers = [];
    const attenuationValue = parseInt(
      document.getElementById("firstSlider").value
    );
  
    if (filterType === "greater") {
      filteredBeers = allBeers.filter(
        (beer) => beer.attenuation_level > attenuationValue
      );
    } else if (filterType === "lower") {
      filteredBeers = allBeers.filter(
        (beer) => beer.attenuation_level < attenuationValue
      );
    } else {
      filteredBeers = allBeers;
    }
  
    cardContainer.innerHTML = "";
    showBeerCards(filteredBeers);
  }
  
  function filterBeerName(searchName) {
    return allBeers.filter((beer) =>
      beer.name.toLowerCase().includes(searchName.toLowerCase())
    );
  }

function prevButton() {
  if (page > 1) {
    page--;
    FetchBeerData(page);
    window.scrollTo(0, 0);
  }
}

function nextButton() {
  if (page >= 6) {
    return;
  }
  page++;
  FetchBeerData(page);
  window.scrollTo(0, 0);
}
document.getElementById("prevButton").addEventListener("click", prevButton);
document.getElementById("nextButton").addEventListener("click", nextButton);

slider1.addEventListener("input", function () {
  const phValue = parseFloat(slider1.value);
  filterByPH(phValue);
});

slider2.addEventListener("input", function () {
  const srmValue = parseFloat(slider2.value);
  filterBySRM(srmValue);
});

function filterByPH(phValue) {
  const filteredBeers = allBeers.filter((beer) => beer.ph === phValue);
  cardContainer.innerHTML = "";
  showBeerCards(filteredBeers);
}

function filterBySRM(srmValue) {
  const filteredBeers = allBeers.filter((beer) => beer.srm >= srmValue);
  cardContainer.innerHTML = "";
  showBeerCards(filteredBeers);
}

function resetCards() {
  cardContainer.innerHTML = "";
  showBeerCards(allBeers);
  searchInput.value = "";
  firstSlider.value = 0;
  slider1.disabled = true;
  slider1.value = 0;
  slider2.disabled = true;
  slider2.value = 0;
  phcheckbox;
}
