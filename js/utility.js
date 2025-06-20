let storeFetchPets = [];

const spinner = (showOrHide) => {
  const loadingSpinner = document.getElementById("loading-spinner");
  if (showOrHide) {
    loadingSpinner.classList.remove("hidden");
    document.getElementById("all-pets").innerHTML = "";
  } else {
    loadingSpinner.classList.add("hidden");
  }
};

// remove active classes
const removeActiveClasses = () => {
  const removeBtn = document.querySelectorAll(".category");
  for (btn of removeBtn) {
    btn.classList.remove(
      "bg-green-600",
      "rounded-full",
      "text-white",
      "border-black"
    );
    btn.classList.add("rounded-xl");
  }
};

//add active classes
const addActiveClasses = (category) => {
  const addBtn = document.getElementById(`btn-${category}`);
  addBtn.classList.remove("rounded-xl");
  addBtn.classList.add(
    "bg-green-600",
    "rounded-full",
    "text-white",
    "border-black"
  );
};

//show image
const like = (imageUrl) => {
  const imageContainer = document.getElementById("liked-pets");
  const div = document.createElement("div");
  div.innerHTML = `
  <img class="rounded-xl" src="${imageUrl}" />
  `;
  imageContainer.appendChild(div);
};

// short price
const sort = () => {
  spinner(true)
  const storePets = storeFetchPets.sort((a, b) => b.price - a.price);
  setTimeout(() => {
    spinner(false)
    displayPets(storePets);
  }, 200);
};
