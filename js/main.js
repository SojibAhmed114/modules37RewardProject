// btn categories section start
const loadCategory = async () =>{
  const res = await fetch('https://openapi.programming-hero.com/api/peddy/categories');
  const data = await res.json();
  displayBtnCategory(data.categories);
};

const displayBtnCategory = (categories) => {
  const btnContainer = document.getElementById('btn-container');
  categories.forEach(element => {
    const div  = document.createElement('div');
    div.classList = "text-center";
    div.innerHTML =`
      <button id="btn-${element.id}" onclick="displayCategoryAnimal('${element.category}')" class="btn px-12 font-bold bg-white w-40 border-2 rounded-lg"> <span class="flex justify-center items-center gap-2 text-xl"> <img class="h-8 w-full" src="${element.category_icon}" alt="photo"> ${element.category} </span> </button>
    `;
    btnContainer.appendChild(div)
  });
};
// btn categories section end

// showCategoryAnimal section start 
const showCategoryAnimal = async (searchId) =>{
  document.getElementById('loading-spinner').style.display ="none";
  const response = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${searchId}`);
  const singleAnimal = await response.json();
  console.log(singleAnimal);
  displayAllAnimalLoad(singleAnimal.data);
};


const displayCategoryAnimal = async (id) =>{
  document.getElementById('loading-spinner').style.display ="block";
  setTimeout(() =>{
    showCategoryAnimal(id)
  },2000);
};
// showCategoryAnimal section start 

// display all animal show start hero
const loadDisplayAllAnimal =async ()=>{
  document.getElementById('loading-spinner').style.display ="none";
  const res = await fetch('https://openapi.programming-hero.com/api/peddy/pets');
  const allPets = await res.json();
  displayAllAnimalLoad(allPets.pets);
};

const displayAllAnimalLoad =(pets) =>{
  const animalSection = document.getElementById('animal-section');
  animalSection.innerHTML = "";

  if (pets.length == 0){
    animalSection.classList.remove('grid');
    animalSection.innerHTML = `
    <div class="w-full h-[700px] bg-gray-100 rounded-lg flex flex-col gap-6 justify-center items-center">
    <img src="../images/error.webp" alt="photo">
    <h2 class="font-black text-4xl md:text-6xl lg:text-7xl ">No Information Available</h2>
    <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at 
      its layout. The point of using Lorem Ipsum is that it has a.</p>
  </div>
    `;
    return;
  } else{
    animalSection.classList.add('grid');
  }
  pets.forEach(pet => {
    const {pet_name,breed,date_of_birth,gender,price,image,petId} = pet;
    const div = document.createElement('div');
    div.classList = "card  border mb-3";
    div.innerHTML =`
    <figure class="px-1 pt-1">
    <img src="${image}" alt="Shoes" class="w-full rounded-xl object-cover" />
  </figure>
  <div class="card-body px-4">
    <h2 class="card-title">${pet_name}</h2>
    <p><i class="fa-solid fa-dice-four"></i> breed: ${breed ? breed :"not available"}</p>
    <p><i class="fa-regular fa-calendar"></i> birth: ${date_of_birth ? date_of_birth : 'not available'}</p>
    <p><i class="fa-solid fa-mercury"></i> gender: ${gender ? gender : "not available"}</p>
    <p><i class="fa-solid fa-dollar-sign"></i> price: ${price ? price : 'not available'}</p>
    <div class="card-actions flex justify-between border-t pt-5">
      <button onclick="sideViewShowImage('${image}')"  class="btn btn-outline btn-accent"><i class="fa-regular fa-thumbs-up"></i></button>
      <button onclick="CondDownModalLoad()" class="btn btn-outline btn-accent">Adopt</button>
      <button onclick="ModalLoad('${petId}')" class="btn btn-outline btn-accent">Details</button>
    </div>
  </div>
    `;
  animalSection.appendChild(div);
  });
};
//CondDownModalLoad

const CondDownModalLoad =() => {
  const condDownModalContainer = document.getElementById('condDownModalContainer');
  condDownModalContainer.innerHTML = `
  <dialog id="my_modal_1" class="modal">
  
  </div>
</dialog>
  `;

  my_modal_1.showModal()

  let yourNumber = 3;
const displays = document.getElementById('second');
  const clockId = setInterval(() =>{
    yourNumber--;
    if (yourNumber <= 0) {
      clearInterval(clockId);
    };
  displays.textContent = yourNumber;
  }, 1000);

  setTimeout(() => {
    condDownModalContainer.innerHTML = "";
  }, 3000);
};

// show modal section start 
const ModalLoad =async (petId) =>{
  const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`);
  const data = await res.json();
  const dataItem = data.petData;
  const {image,pet_name,gender,price,date_of_birth,vaccinated_status,pet_details,breed} = dataItem;

  const modalContent = document.getElementById('modalContainer');
  modalContent.innerHTML = `
  <dialog id="my_modal_5" class="modal modal-bottom sm:modal-middle">
  <div class="modal-box">
    <div class="card">
<figure class="px-1 pt-1">
    <img src="${image}" alt="Shoes" class="w-full rounded-xl object-cover" />
  </figure>
  <div class="card-body px-4">
    <h2 class="card-title">${pet_name}</h2>
    <div class="flex gap-5">
    <div> 
       <p><i class="fa-solid fa-dice-four"></i> breed: ${breed ? breed : 'N/A'} </p>
      <p><i class="fa-solid fa-mercury"></i> gender: ${gender ? gender : 'N/A'}</p>
      <p><i class="fa-solid fa-mercury"></i> gender: ${vaccinated_status}</p>
    </div>
    <div>
    <p><i class="fa-regular fa-calendar"></i> birth: ${date_of_birth ? date_of_birth : 'N/A'}</p>
    <p><i class="fa-solid fa-dollar-sign"></i> price: ${price === null ? 'N/A' : price} </p>
    </div>
    </div>
    <div class="card-actions flex justify-between border-t pt-5">
      <p class="font-bold">Details Information </p>
      <p><i class="fa-solid fa-dollar-sign"></i> price: ${pet_details}</p>
    </div>
  </div>
</div>
    <div class="modal-action  grid grid-cols-1">
      <form method="dialog">
        <button class="btn btn-outline w-full bg-green-100">Cancel</button>
      </form>
    </div>
  </div>
</dialog>
  `;

  my_modal_5.showModal();
}
// show modal section end

const sideViewShowImage = (image) =>{
  const sideViewPhoto = document.getElementById('sideViewPhoto');
  const div = document.createElement('div');
  div.classList = "mb-3";
  div.innerHTML = `
    <img src="${image}" alt="photo" class="rounded-xl object-cover" />
  `;
  sideViewPhoto.appendChild(div);
};

const displayAllAnimal = () =>{
  document.getElementById('loading-spinner').style.display ="block";
  setTimeout(() => {
    loadDisplayAllAnimal();
  }, 2000);
};
// display all animal show end hero



loadCategory()
displayAllAnimal()

