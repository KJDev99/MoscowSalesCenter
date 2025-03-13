document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.getElementById("carousel");
  const inner = carousel.querySelector(".carousel-inner");
  const items = carousel.querySelectorAll(".carousel-item");
  const prevButton = carousel.querySelector("#prevButton");
  const nextButton = carousel.querySelector("#nextButton");

  let currentIndex = 0;

  function updateCarousel() {
    const offset = -currentIndex * 100;
    inner.style.transform = `translateX(${offset}%)`;
  }

  prevButton.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      currentIndex = items.length - 1;
    }
    updateCarousel();
  });

  nextButton.addEventListener("click", () => {
    if (currentIndex < items.length - 1) {
      currentIndex++;
    } else {
      currentIndex = 0;
    }
    updateCarousel();
  });
});

const catalogButton = document.getElementById("catalogButton");
const catalogModal = document.getElementById("catalogModal");
const arrowIcon = document.getElementById("arrowIcon");

catalogButton.addEventListener("click", () => {
  const isOpen = catalogModal.classList.contains("block");

  if (isOpen) {
    catalogModal.classList.replace("block", "hidden");
    catalogModal.classList.replace("scale-100", "scale-95");
    arrowIcon.classList.remove("rotate-180");
  } else {
    catalogModal.classList.replace("hidden", "block");
    catalogModal.classList.replace("scale-95", "scale-100");
    arrowIcon.classList.add("rotate-180");
  }
});

document.addEventListener("click", (event) => {
  if (
    !catalogButton.contains(event.target) &&
    !catalogModal.contains(event.target)
  ) {
    catalogModal.classList.replace("block", "hidden");
    catalogModal.classList.replace("scale-100", "scale-95");
    arrowIcon.classList.remove("rotate-180");
  }
});

catalogModal.querySelectorAll("li").forEach((item) => {
  item.addEventListener("click", () => {
    catalogModal.classList.replace("block", "hidden");
    catalogModal.classList.replace("scale-100", "scale-95");
    arrowIcon.classList.remove("rotate-180");
  });
});

document.addEventListener("DOMContentLoaded", function () {
  function initializeSlider(sliderId, indicatorsId) {
    const slider = document.getElementById(sliderId);
    const indicatorsContainer = document.getElementById(indicatorsId);
    const images = slider.querySelectorAll("img");

    let currentIndex = 1;

    images.forEach((_, index) => {
      const indicator = document.createElement("div");
      indicator.classList.add("indicator");
      if (index === currentIndex) {
        indicator.classList.add("active");
      }
      indicator.addEventListener("click", () => {
        currentIndex = index;
        updateSlider();
        updateIndicators();
      });
      indicatorsContainer.appendChild(indicator);
    });

    function updateSlider() {
      slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    function updateIndicators() {
      const indicators = indicatorsContainer.querySelectorAll(".indicator");
      indicators.forEach((indicator, index) => {
        if (index === currentIndex) {
          indicator.classList.add("active");
        } else {
          indicator.classList.remove("active");
        }
      });
    }
  }

  initializeSlider("slider1", "indicators1");
  initializeSlider("slider2", "indicators2");
  initializeSlider("slider3", "indicators3");
  initializeSlider("slider4", "indicators4");
  initializeSlider("slider5", "indicators5");
  initializeSlider("slider6", "indicators6");
  initializeSlider("slider7", "indicators7");
  initializeSlider("slider8", "indicators8");
  initializeSlider("slider9", "indicators9");
});

let menuOpen = document.querySelector(".menuOpen");
let closeMenu = document.querySelector(".closeMenu");

menuOpen.addEventListener("click", function () {
  document.querySelector("nav").classList.add("showMenu");
});

closeMenu.addEventListener("click", function () {
  document.querySelector("nav").classList.remove("showMenu");
});

function toggleView(view) {
  const container = document.getElementById("productContainer");
  container.className =
    view === "grid" ? "grid grid-cols-3 gap-4" : "flex flex-col gap-4";

  document
    .getElementById("gridIconActive")
    .classList.toggle("hidden", view !== "grid");
  document
    .getElementById("gridIcon")
    .classList.toggle("hidden", view === "grid");
  document
    .getElementById("listIconActive")
    .classList.toggle("hidden", view !== "list");
  document
    .getElementById("listIcon")
    .classList.toggle("hidden", view === "list");
}

function toggleAccordion(id, arrowId) {
  const element = document.getElementById(id);
  const arrow = document.getElementById(arrowId);
  if (element.classList.contains("hidden")) {
    element.classList.remove("hidden");
    setTimeout(() => {
      element.classList.remove("opacity-0");
    }, 10);
  } else {
    element.classList.add("opacity-0");
    setTimeout(() => {
      element.classList.add("hidden");
    }, 300);
  }
  arrow.classList.toggle("rotate-180");
}

function toggleFilter() {
  const filterPanel = document.getElementById("filterPanel");
  const productList = document.getElementById("productList");
  if (filterPanel.classList.contains("max-md:hidden")) {
    filterPanel.classList.remove("max-md:hidden");
    productList.classList.add("max-md:hidden");
  } else {
    productList.classList.remove("max-md:hidden");
    filterPanel.classList.add("max-md:hidden");
  }
}

function updateFileName() {
  const input = document.getElementById("file-input");
  const label = document.getElementById("file-label");
  if (input.files.length > 0) {
    label.textContent = input.files[0].name;
  }
}

function changeImage(element) {
  document.getElementById("mainImage").src = element.src;
}

document.querySelectorAll(".color-btn").forEach((button) => {
  button.addEventListener("click", () => {
    document
      .querySelectorAll(".color-btn")
      .forEach((btn) => btn.classList.remove("btn_linear"));
    button.classList.add("btn_linear");
    document.getElementById("selectedColor").textContent = button.dataset.color;
  });
});

document.querySelectorAll(".memory-btn").forEach((button) => {
  button.addEventListener("click", () => {
    document
      .querySelectorAll(".memory-btn")
      .forEach((btn) => btn.classList.remove("btn_linear"));
    button.classList.add("btn_linear");
    document.getElementById("selectedMemory").textContent =
      button.dataset.memory;
  });
});

document.querySelectorAll(".tab-btn").forEach((button) => {
  button.addEventListener("click", () => {
    document
      .querySelectorAll(".tab-content")
      .forEach((content) => content.classList.add("hidden"));

    document.getElementById(button.dataset.tab).classList.remove("hidden");

    document.querySelectorAll(".tab-btn").forEach((btn) => {
      btn.classList.remove("text-black", "border-black");
      btn.classList.add("text-gray-500", "border-transparent");
    });
    button.classList.remove("text-gray-500", "border-transparent");
    button.classList.add("text-black", "border-black");
  });
});
