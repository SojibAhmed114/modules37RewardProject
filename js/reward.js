const loadCategory = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/peddy/categories"
  );
  const data = await res.json();
  displayBtnCategory(data.categories);
};

const loadAllPets = async () => {
  spinner(true);
  const res = await fetch(
    "https://openapi.programming-hero.com/api/peddy/pets"
  );
  const data = await res.json();
  setTimeout(() => {
    spinner(false);
    displayPets(data.pets);
    storeFetchPets = data.pets;
  }, 500);
};

const loadPetsByCategory = async (category) => {
  removeActiveClasses();
  addActiveClasses(category);
  spinner(true);
  const res = await fetch(
    `https://openapi.programming-hero.com/api/peddy/category/${category}`
  );
  const data = await res.json();
  setTimeout(() => {
    spinner(false);
    displayPets(data.data);
    storeFetchPets = data.data;
  }, 500);
};


const displayBtnCategory = (categories) => {
  const btnContainer = document.getElementById("btn-container");
  categories.forEach((element) => {
    const div = document.createElement("div");
    div.classList = "text-center";
    div.innerHTML = `
    <button id="btn-${element.category}" onclick="loadPetsByCategory('${element.category}')"  class="btn category px-12  font-bold bg-white w-40 border-2 rounded-xl"> <span class="flex justify-center items-center gap-2 text-xl"> <img class="h-8 w-full" src="${element.category_icon}" alt="photo"> ${element.category} </span> </button>
    `;
    btnContainer.appendChild(div);
  });
};

const displayPets = (data) => {
  const petContainer = document.getElementById("all-pets");
  if(data.length ===0){
    petContainer.classList.remove("grid");
    petContainer.innerHTML = `
    <div class="bg-green-200 p-20 text-center text-xl rounded-xl mx-auto">
      <p>No Data Available</p>
    </div>
    `;
    return
  }else{
    petContainer.classList.add("grid");
  }
  data.forEach((pet) => {
    const { breed, date_of_birth, gender, price, image, petId } = pet;
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
      <button onclick="like('${image}')" class="btn btn-outline btn-accent"><i class="fa-regular fa-thumbs-up"></i></button>
      <button onclick="adoptButton(this)" class="btn btn-outline btn-accent">Adopt</button>
      <button onclick="petDetails(${petId})" class="btn btn-outline btn-accent">Details</button>
    </div>
    `;
    petContainer.appendChild(div);
  });
};

//adopt button function
const adoptButton = (e) => {
  let count = 3;
  const countContainer = document.getElementById("countdown-container");
  countContainer.innerText = count;
  my_modal_5.showModal();
  const interval = setInterval(() => {
    count--;
    if (count !== 0) countContainer.innerText = count;
    if (count < 1) {
      clearInterval(interval);
      my_modal_5.close();
      e.textContent = "Adopted";
      e.disabled = true;
    }
  }, 1000);
};


loadCategory();
loadAllPets();
