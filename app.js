// document.addEventListener("DOMContentLoaded", function () {
//   const carousel = document.getElementById("carousel");
//   const inner = carousel.querySelector(".carousel-inner");
//   const items = carousel.querySelectorAll(".carousel-item");
//   const prevButton = carousel.querySelector("#prevButton");
//   const nextButton = carousel.querySelector("#nextButton");

//   let currentIndex = 0;

//   function updateCarousel() {
//     const offset = -currentIndex * 100;
//     inner.style.transform = `translateX(${offset}%)`;
//   }

//   prevButton.addEventListener("click", () => {
//     if (currentIndex > 0) {
//       currentIndex--;
//     } else {
//       currentIndex = items.length - 1;
//     }
//     updateCarousel();
//   });

//   nextButton.addEventListener("click", () => {
//     if (currentIndex < items.length - 1) {
//       currentIndex++;
//     } else {
//       currentIndex = 0;
//     }
//     updateCarousel();
//   });
// });

document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.getElementById("carousel");
  const inner = carousel.querySelector(".carousel-inner");
  const items = carousel.querySelectorAll(".carousel-inner > div");
  const prevButton = carousel.querySelector("#prevButton");
  const nextButton = carousel.querySelector("#nextButton");
  const progressBars = [
    document.getElementById("progress1"),
    document.getElementById("progress2"),
    document.getElementById("progress3"),
  ];

  let currentIndex = 0;
  let intervalId;
  let progressIntervalId;
  const slideDuration = 4000; // 4 seconds
  let isAnimating = false;

  // Hover uchun yangi o'zgaruvchilar
  let isPaused = false;
  let remainingTime = slideDuration;
  let hoverStartTime;

  function resetProgressBars() {
    progressBars.forEach((bar) => {
      bar.style.transition = "none";
      bar.style.width = "0%";
      void bar.offsetWidth; // Force reflow
      bar.style.transition = "width 4s linear";
    });
  }

  function updateCarousel(direction = "next") {
    if (isAnimating) return;
    isAnimating = true;

    clearInterval(intervalId);
    clearInterval(progressIntervalId);

    if (direction === "next") {
      currentIndex = (currentIndex + 1) % items.length;
    } else {
      currentIndex = (currentIndex - 1 + items.length) % items.length;
    }

    const offset = -currentIndex * 100;
    inner.style.transform = `translateX(${offset}%)`;

    resetProgressBars();
    progressBars[currentIndex].style.width = "100%";

    intervalId = setTimeout(() => {
      updateCarousel("next");
    }, slideDuration);

    setTimeout(() => {
      isAnimating = false;
    }, 500);
  }

  function nextSlide() {
    updateCarousel("next");
  }

  function prevSlide() {
    updateCarousel("prev");
  }

  // Hover eventlari
  carousel.addEventListener("mouseenter", () => {
    if (isAnimating) return;

    isPaused = true;
    hoverStartTime = Date.now();

    const activeProgressBar = progressBars[currentIndex];
    const computedStyle = window.getComputedStyle(activeProgressBar);
    const parentWidth = activeProgressBar.parentElement.offsetWidth;
    const currentWidth = (parseFloat(computedStyle.width) / parentWidth) * 100;

    remainingTime = slideDuration * (1 - currentWidth / 100);

    clearTimeout(intervalId);
    activeProgressBar.style.transition = "none";
    activeProgressBar.style.width = `${currentWidth}%`;
  });

  carousel.addEventListener("mouseleave", () => {
    if (isAnimating || !isPaused) return;

    isPaused = false;
    const activeProgressBar = progressBars[currentIndex];

    activeProgressBar.style.transition = `width ${remainingTime}ms linear`;
    activeProgressBar.style.width = "100%";

    intervalId = setTimeout(() => {
      updateCarousel("next");
    }, remainingTime);
  });

  // Button eventlari
  prevButton.addEventListener("click", () => {
    prevSlide();
  });

  nextButton.addEventListener("click", () => {
    nextSlide();
  });

  // Touch events
  let touchStartX = 0;
  let touchEndX = 0;

  carousel.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
    },
    { passive: true }
  );

  carousel.addEventListener(
    "touchend",
    (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    },
    { passive: true }
  );

  function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
      nextSlide();
    } else if (touchEndX > touchStartX + 50) {
      prevSlide();
    }
  }

  // Boshlang'ich holat
  resetProgressBars();
  progressBars[currentIndex].style.width = "100%";
  intervalId = setTimeout(() => {
    updateCarousel("next");
  }, slideDuration);
});
function nextSlide() {
  if (!isPaused) {
    updateCarousel("next");
  }
}

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
document.querySelectorAll(".call-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("popupCallback").classList.remove("hidden");
  });
});

// Close popup
document.getElementById("closePopup").addEventListener("click", () => {
  document.getElementById("popupCallback").classList.add("hidden");
});

// Close popup clicking outside the inner content
document.getElementById("popupCallback").addEventListener("click", (e) => {
  if (e.target === e.currentTarget) {
    document.getElementById("popupCallback").classList.add("hidden");
  }
});
