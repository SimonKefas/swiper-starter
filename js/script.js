(function () {
  // Default configurations
  var defaultSwiperOptions = {
    loop: false,
    autoplay: { delay: 2500, disableOnInteraction: false },
    speed: 300,
    effect: "slide",
    crossFade: false,
    slidesPerView: 1,
    spaceBetween: 10,
    fullHeight: false,
    breakpoints: {
      480: { slidesPerView: 1, spaceBetween: 10 },
      768: { slidesPerView: 2, spaceBetween: 16 },
      992: { slidesPerView: 3, spaceBetween: 16 },
      1200: { slidesPerView: 4, spaceBetween: 16 },
    },
    pagination: {
      el: ".swiper-bullet-wrapper",
      bulletActiveClass: "is-active",
      bulletClass: "swiper-bullet",
      bulletElement: "button",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-next",
      prevEl: ".swiper-prev",
      disabledClass: "is-disabled",
    },
    scrollbar: {
      el: ".swiper-drag-wrapper",
      draggable: true,
      dragClass: "swiper-drag",
      snapOnRelease: true,
    },
    keyboard: { enabled: true, onlyInViewport: false },
    mousewheel: { forceToAxis: true },
    observer: false,
    observeParents: false,
    slideActiveClass: "is-active",
    slideDuplicateActiveClass: "is-active",
  };

  // Merge user-defined SwiperDefaults into defaultSwiperOptions
  if (window.SwiperDefaults) {
    defaultSwiperOptions = mergeOptions(defaultSwiperOptions, window.SwiperDefaults);
  }

  function initSwipers() {
    document.querySelectorAll(".slider-main_component").forEach(function (container) {
      const instanceOptions = getInstanceOptions(container);
      const swiperConfig = mergeOptions(defaultSwiperOptions, instanceOptions);

      const swiperElement = container.querySelector(".swiper");
      if (!swiperElement) {
        console.warn("Swiper element not found:", container);
        return;
      }

      const slidesCount = swiperElement.querySelectorAll(".swiper-slide").length;

      if (slidesCount <= 1) {
        swiperConfig.navigation = false;
        swiperConfig.pagination = false;
        swiperConfig.autoplay = false;
        swiperConfig.allowTouchMove = false;
        swiperConfig.keyboard.enabled = false;
      }

      adjustSelectors(swiperConfig, container);

      // Adjust 'on' handlers based on the effect and fullHeight
      swiperConfig.on = {
        init: function () {
          if (this.params.effect === "fade") {
            adjustSlidesZIndex(this);
          }

          if (this.params.fullHeight) {
            setSlidesFullHeight(this);
          } else {
            adjustSlidesHeight(this);
          }
        },
        slideChangeTransitionStart: function () {
          if (this.params.effect === "fade") {
            adjustSlidesZIndex(this);
          }
        },
      };

      new Swiper(swiperElement, swiperConfig);
    });
  }

  function getInstanceOptions(container) {
    const options = {};

    if (container.hasAttribute("data-loop-mode")) {
      options.loop = container.getAttribute("data-loop-mode") === "true";
    }

    if (container.hasAttribute("data-slider-duration")) {
      options.speed = parseInt(container.getAttribute("data-slider-duration"), 10);
    }

    // Get effect from data attribute
    if (container.hasAttribute("data-effect")) {
      options.effect = container.getAttribute("data-effect");
    }

    // Get autoplay setting from data attribute
    if (container.hasAttribute("data-autoplay")) {
      const autoplayValue = container.getAttribute("data-autoplay");
      if (autoplayValue === "false") {
        options.autoplay = false;
      } else {
        const delay = parseInt(autoplayValue, 10);
        if (!isNaN(delay)) {
          options.autoplay = { delay, disableOnInteraction: false };
        }
      }
    }

    // Get fullHeight setting from data attribute
    if (container.hasAttribute("data-full-height")) {
      options.fullHeight = container.getAttribute("data-full-height") === "true";
    }

    return options;
  }

  function mergeOptions(defaults, instance) {
    return deepMerge({}, defaults, instance);

    function deepMerge(target, ...sources) {
      sources.forEach((source) => {
        Object.keys(source).forEach((key) => {
          if (
            source[key] &&
            typeof source[key] === "object" &&
            !Array.isArray(source[key])
          ) {
            if (!target[key]) target[key] = {};
            deepMerge(target[key], source[key]);
          } else {
            target[key] = source[key];
          }
        });
      });
      return target;
    }
  }

  function adjustSelectors(config, container) {
    if (config.pagination && config.pagination.el) {
      config.pagination.el = container.querySelector(config.pagination.el);
    }
    if (config.navigation) {
      if (config.navigation.nextEl) {
        config.navigation.nextEl = container.querySelector(config.navigation.nextEl);
      }
      if (config.navigation.prevEl) {
        config.navigation.prevEl = container.querySelector(config.navigation.prevEl);
      }
    }
    if (config.scrollbar && config.scrollbar.el) {
      config.scrollbar.el = container.querySelector(config.scrollbar.el);
    }
  }

  function adjustSlidesHeight(swiper) {
    const maxHeight = Math.max(
      ...Array.from(swiper.slides).map((slide) => slide.offsetHeight)
    );
    swiper.slides.forEach((slide) => {
      slide.style.height = `${maxHeight}px`;
    });
  }

  function setSlidesFullHeight(swiper) {
    swiper.slides.forEach((slide) => {
      slide.style.height = "100%";
    });
  }

  function adjustSlidesZIndex(swiper) {
    swiper.slides.forEach((slide, index) => {
      slide.style.zIndex = index === swiper.activeIndex ? 2 : 1;
      slide.style.pointerEvents = index === swiper.activeIndex ? "auto" : "none";
    });
  }

  document.addEventListener("DOMContentLoaded", initSwipers);
})();
