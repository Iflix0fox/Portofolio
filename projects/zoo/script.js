let animals = [
  { name: "kissa", type: "nisäkas" },
  { name: "koira", type: "nisäkas" },
  { name: "rupikonna", type: "sammakkoelain" },
  { name: "kurki", type: "lintu" },
  { name: "särki", type: "matelija" },
  { name: "närhi", type: "lintu" },
  { name: "papukaija", type: "lintu" },
  { name: "kissa", type: "nisäkas" },
];

const animallist = document.getElementById("animalList");
const addButton = document.getElementById("addAnimal");
const newNameInput = document.getElementById("newAnimalName");
const newTypeSelect = document.getElementById("newAnimalType");
const filterSelect = document.getElementById("filterType");
const sortButton = document.getElementById("sortAnimals");
const searchInput = document.getElementById("searchAnimal");
console.log("hi", sortButton);

function renderList() {
  animallist.innerHTML = "";
  //taulokko johon suodataan eläimet
  let filtered = [];
  let filterType = filterSelect.value;
  let searchTerm = searchInput.value.trim().toLowerCase();

  for (let i = 0; i < animals.length; i++) {
    const a = animals[i];
    console.log("hwkki");
    // jos toinen ehdoista täytyy, silmukan kierros päättyy tähän
    if (filterType !== "kaikki" && a.type !== filterType) {
      continue;
    }

    if (!a.name.toLocaleLowerCase().includes(searchTerm)) {
      continue;
    }

    //jos tapahtui "continue", tätä ei suoriteta
    filtered.push(a); //lisää elämien flitered taulukkoon
  }

  //näyteään ehdoist suodatetut eläimet
  filtered.forEach((animal) => {
    let li = document.createElement("li");

    li.innerHTML = `
    <span class="animal-name">${animal.name}</span> 
     <span class="animal-type">${animal.type}</span>`;

    animallist.appendChild(li);
  });

  addButton.addEventListener("click", (event) => {
    event.preventDefault();
    let name = newNameInput.value.trim().toLowerCase();
    let type = newTypeSelect.value;

    if (name) {
      animals.push({ name, type });
      newNameInput.value = "";
      renderList();
    }
  });
}

sortButton.addEventListener("click", () => {
  console.log("GG");

  animals.sort((a, b) => a.name.localeCompare(b.name));
  renderList();
});

filterSelect.addEventListener("change", renderList);
searchInput.addEventListener("input", renderList);

renderList();
