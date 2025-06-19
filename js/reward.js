const loadCategory = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/peddy/categories"
  );
  const data = await res.json();
  displayBtnCategory(data.categories);
};

const loadAllPets = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/peddy/pets"
  );
  const data = await res.json();
  displayPets(data.pets);
};

const 
const displayBtnCategory = (categories) => {
  const btnContainer = document.getElementById("btn-container");
  categories.forEach((element) => {
    const div = document.createElement("div");
    div.classList = "text-center";
    div.innerHTML = `
    <button id="btn-${element.id}"  class="btn px-12  font-bold bg-white w-40 border-2 rounded-xl"> <span class="flex justify-center items-center gap-2 text-xl"> <img class="h-8 w-full" src="${element.category_icon}" alt="photo"> ${element.category} </span> </button>
    `;
    btnContainer.appendChild(div);
  });
};

const displayPets = (data) => {
  const petContainer = document.getElementById("all-pets");
  data.forEach((pet) => {
    const {  breed, date_of_birth, gender, price, image, petId } = pet;
    const div = document.createElement("div");
    div.classList.add(
      "flex",
      "flex-col",
      "gap-2",
      "p-4",
      "border",
      "rounded-xl"
    );
    div.innerHTML = `
    <img class="object-cover h-36 w-full rounded-xl" src="${
      pet.image
    }" alt="photo" />
    <p class="text-xl">${pet.pet_name}</p>
    <p><i class="fa-solid fa-dice-four"></i> breed: ${
      breed ? breed : "not available"
    }</p>
    <p><i class="fa-regular fa-calendar"></i> birth: ${
      date_of_birth ? date_of_birth : "not available"
    }</p>
    <p><i class="fa-solid fa-mercury"></i> gender: ${
      gender ? gender : "not available"
    }</p>
    <p><i class="fa-solid fa-dollar-sign"></i> price: ${
      price ? price : "not available"
    }</p>
    <div class="flex justify-between border-t pt-5">
      <button class="btn btn-outline btn-accent"><i class="fa-regular fa-thumbs-up"></i></button>
      <button class="btn btn-outline btn-accent">Adopt</button>
      <button class="btn btn-outline btn-accent">Details</button>
    </div>
    `;
    petContainer.appendChild(div)
  });
};
loadCategory();
loadAllPets();
