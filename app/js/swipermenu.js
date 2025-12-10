class Controls {
  constructor(source, instance) {
    this.prev = source.querySelector("#prevSlide");
    this.next = source.querySelector("#nextSlide");

    this.instance = instance;

    this.init();
  }

  init() {
    this.prev.addEventListener("click", () => {
      this.instance.slidePrev();
    });

    this.next.addEventListener("click", () => {
      this.instance.slideNext();
    });
  }

  update() {
    const {isBeginning, isEnd} = this.instance;

    isBeginning
      ? this.prev.classList.add("disabled")
      : this.prev.classList.remove("disabled");
    isEnd
      ? this.next.classList.add("disabled")
      : this.next.classList.remove("disabled");
  }
}

class Pagination {
  constructor(source) {
    this.slides = source.querySelectorAll(
      ".swiper-slide:not(.swiper-slide-duplicate)"
    );
    this.current = source.querySelector(
      '.pagination-item[data-item="current"]'
    );
    this.total = source.querySelector('.pagination-item[data-item="total"]');

    this.length = this.slides.length;

    this.init();
  }

  init() {
    this.total.textContent = this.length.toString().padStart(2, "0");
  }

  update(index) {
    this.current.classList.add("fade-out");

    setTimeout(() => {
      this.current.textContent = (index + 1).toString().padStart(2, "0");
      this.current.classList.remove("fade-out");
    }, 300);
  }
}

class Backdrop {
  constructor(source, instance) {
    this.instance = instance;
    this.slides = source.querySelectorAll(
      ".swiper-slide:not(.swiper-slide-duplicate)"
    );

    this.images, this.items;

    this.init();
  }

  init() {
    this.images = [...this.slides].map((slide) => slide.dataset.background);

    this.items = this.images.map((src, index) => {
      const element = document.createElement("div");

      element.className = "background-item";
      element.style.backgroundImage = `url(${src})`;

      if (index === 0) element.classList.add("active");

      this.instance.appendChild(element);

      return element;
    });
  }

  update(index) {
    const prev = this.items.find((item) => item.classList.contains("active"));
    const next = this.items[index];

    if (prev === next) return;

    if (prev) {
      prev.classList.remove("active");
      prev.classList.add("fade-out");
    }

    next.classList.add("active", "fade-in");

    setTimeout(() => {
      if (prev) prev.classList.remove("fade-out");

      next.classList.remove("fade-in");
    }, 1000);
  }
}

class Content {
  constructor(source, instance) {
    this.source = source;
    this.instance = instance;
    this.slides = source.querySelectorAll(
      ".swiper-slide:not(.swiper-slide-duplicate)"
    );
  }

  update(index, direction = true) {
    const prev = this.source.querySelector(".data-item.active");

    const element = document.createElement("div");

    element.className = "data-item";
    element.innerHTML = `
            <h3 class="data-title">${this.slides[index].dataset.title}</h3>
            <p class="data-text">${this.slides[index].dataset.text}</p>
        `;
    element.style.transform = `translateY(${direction ? "100%" : "-100%"})`;

    this.instance.appendChild(element);

    requestAnimationFrame(() => {
      if (prev) {
        prev.style.transform = `translateY(${direction ? "-100%" : "100%"})`;
        prev.style.opacity = "0";
        prev.classList.remove("active");
      }

      element.style.transform = "translateY(0)";
      element.style.opacity = "1";
      element.classList.add("active");
    });

    setTimeout(() => {
      if (prev && prev.parentNode) prev.remove();
    }, 600);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector("#slider");
  const background = slider.querySelector(".background");
  const data = slider.querySelector(".data");

  // Swiper Instances

  const swiper = new Swiper(slider, {
    allowTouchMove: false,
    simulateTouch: false,
    keyboard: false,
    slidesPerView: 1,
    speed: 500
  });

  const controls = new Controls(slider, swiper);

  swiper.on("init", function () {
    controls.update();
  });
  swiper.on("slideChange", function () {
    controls.update();
  });

  const pagination = new Pagination(slider);
  const backdrop = new Backdrop(slider, background);
  const content = new Content(slider, data);

  // Slider Animation

  let itteration = swiper.realIndex;

  swiper.on("slideChangeTransitionStart", function () {
    const slides = document.querySelectorAll(".swiper-slide");

    const current = itteration;
    const updated = this.realIndex;

    const direction = updated > current;

    pagination.update(updated);
    backdrop.update(updated);
    content.update(updated, direction);

    const prev = slides[current];
    const next = slides[updated];

    slides.forEach((slide) =>
      slide.classList.remove("enter", "enter-active", "exit", "exit-active")
    );

    next.classList.add("enter");
    requestAnimationFrame(() => next.classList.add("enter-active"));

    prev.classList.add("exit");
    requestAnimationFrame(() => prev.classList.add("exit-active"));

    itteration = updated;
  });

  // Initialization

  const slide = document.querySelector(".swiper-slide-active");

  if (slide) {
    slide.classList.add("enter");
    requestAnimationFrame(() => slide.classList.add("enter-active"));

    pagination.update(0);
    backdrop.update(0);
    content.update(0);
  }
});
