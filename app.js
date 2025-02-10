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
  const isOpen = catalogModal.classList.contains("opacity-100");

  if (isOpen) {
    catalogModal.classList.replace("opacity-100", "opacity-0");
    catalogModal.classList.replace("scale-100", "scale-95");
    arrowIcon.classList.remove("rotate-180");
  } else {
    catalogModal.classList.replace("opacity-0", "opacity-100");
    catalogModal.classList.replace("scale-95", "scale-100");
    arrowIcon.classList.add("rotate-180");
  }
});

document.addEventListener("click", (event) => {
  if (
    !catalogButton.contains(event.target) &&
    !catalogModal.contains(event.target)
  ) {
    catalogModal.classList.replace("opacity-100", "opacity-0");
    catalogModal.classList.replace("scale-100", "scale-95");
    arrowIcon.classList.remove("rotate-180");
  }
});

catalogModal.querySelectorAll("li").forEach((item) => {
  item.addEventListener("click", () => {
    catalogModal.classList.replace("opacity-100", "opacity-0");
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

  // Har bir slider uchun funksiyani chaqirish
  initializeSlider("slider1", "indicators1");
  initializeSlider("slider2", "indicators2");
});

let menuOpen = document.querySelector(".menuOpen");
let closeMenu = document.querySelector(".closeMenu");

menuOpen.addEventListener("click", function () {
  document.querySelector("nav").classList.add("showMenu");
});

closeMenu.addEventListener("click", function () {
  document.querySelector("nav").classList.remove("showMenu");
});
