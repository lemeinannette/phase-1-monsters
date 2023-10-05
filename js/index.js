const monsterContainer = document.querySelector("#monster-container");

const buttonContainer = document.querySelector("#create-monster");
const backButton = document.querySelector("#back");
const forwardButton = document.querySelector("#forward");

function fetchMonsters() {
  fetch("http://localhost:3000/monsters")
    .then((response) => response.json())
    .then((data) => displayMonsters(data))
    .catch((error) => console.error("Error fetching monsters:", error));
}

function displayMonsters(monsters) {
  const monsterContainer = document.querySelector("#monster-container");

  monsters.forEach((monster) => {
    //a div element for the monster card
    const monsterCard = document.createElement("div");
    monsterCard.classList.add("monster-card");

    //an h2 element for the monster name
    const monsterName = document.createElement("h2");
    monsterName.textContent = monster.name;

    const monsterAge = document.createElement("p");
    monsterAge.textContent = monster.age;

    //a p element for the monster description
    const monsterDescription = document.createElement("p");
    monsterDescription.textContent = monster.description;

    //name and description to the monster card
    monsterCard.appendChild(monsterName);
    monsterCard.appendChild(monsterAge);
    monsterCard.appendChild(monsterDescription);
    //Append the monster card to the monster container
    monsterContainer.appendChild(monsterCard);
  });

  // Create monster in form
  const monsterForm = document.querySelector("#monster-form");
  monsterForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const age = event.target.age.value;
    const description = event.target.description.value;
    const monster = {
      name: name,
      age: age,
      description: description,
    };
    monsterForm.reset();

    // Update the Database with the new monster
    fetch("http://localhost:3000/monsters", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(monster),
    })
      .then((response) => response.json())
      .then((monster) => {
        const monsterCard = createCard(monster);
        monsterContainer.appendChild(monsterCard);
      });
  });
}
//Call the fetchMonsters function to retrieve and display monsters
fetchMonsters();
