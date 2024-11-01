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
    progressBar: false, // New option added
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

  // Define mergeOptions function before using it
  function mergeOptions(defaults, instance) {
    return deepMerge({}, defaults, instance);

    function deepMerge(target, ...sources) {
      sources.forEach((source) => {
        Object.keys(source).forEach((key) => {
          if (source[key] === null) {
            // If source[key] is null, delete target[key]
            delete target[key];
          } else if (
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

  // Merge user-defined SwiperDefaults into defaultSwiperOptions
  if (window.SwiperDefaults) {
    defaultSwiperOptions = mergeOptions(
      defaultSwiperOptions,
      window.SwiperDefaults
    );
  }

  function initSwipers() {
    document
      .querySelectorAll(".slider-main_component")
      .forEach(function (container) {
        const instanceOptions = getInstanceOptions(container);
        const swiperConfig = mergeOptions(defaultSwiperOptions, instanceOptions);

        const swiperElement = container.querySelector(".swiper");
        if (!swiperElement) {
          console.warn("Swiper element not found:", container);
          return;
        }

        const slidesCount = swiperElement.querySelectorAll(".swiper-slide").length;

        // Determine the maximum slidesPerView
        let maxSlidesPerView = 1;
        if (typeof swiperConfig.slidesPerView === 'number') {
          maxSlidesPerView = swiperConfig.slidesPerView;
        } else if (swiperConfig.slidesPerView === 'auto') {
          maxSlidesPerView = slidesCount; // Assume max
        } else if (swiperConfig.breakpoints) {
          // Get maximum slidesPerView from breakpoints
          const breakpointValues = Object.values(swiperConfig.breakpoints);
          const spvValues = breakpointValues.map(bp => bp.slidesPerView || 1);
          maxSlidesPerView = Math.max(...spvValues);
        }

        // Disable loop mode if not enough slides
        if (slidesCount <= maxSlidesPerView) {
          swiperConfig.loop = false;
        }

        // Disable navigation and other features if only one slide
        if (slidesCount <= 1) {
          swiperConfig.navigation = false;
          swiperConfig.pagination = false;
          swiperConfig.autoplay = false;
          swiperConfig.allowTouchMove = false;
          swiperConfig.keyboard.enabled = false;
        }

        adjustSelectors(swiperConfig, container);

        // Adjust 'on' handlers based on the effect, fullHeight, and progressBar
        swiperConfig.on = {
          init: function () {
            const swiper = this;

            // Existing code for height adjustments
            if (swiper.params.effect === "fade") {
              adjustSlidesZIndex(swiper);
            }

            if (swiper.params.fullHeight) {
              setSlidesFullHeight(swiper);
            } else {
              adjustSlidesHeight(swiper);
            }

            // Progress bar functionality
            if (swiper.params.progressBar && swiper.params.autoplay) {
              const progressBar = container.querySelector(".swiper-progress-bar");
              if (progressBar) {
                swiper.progressBar = progressBar;
                const delay = swiper.params.autoplay.delay + swiper.params.speed;

                // Set animation properties individually
                progressBar.style.animationName = "swiper-progress-bar-animation";
                progressBar.style.animationDuration = `${delay}ms`;
                progressBar.style.animationTimingFunction = "linear";
                progressBar.style.animationIterationCount = "infinite";
                progressBar.style.animationPlayState = "running";
              }
            }
          },
          slideChangeTransitionStart: function () {
            const swiper = this;

            if (swiper.params.effect === "fade") {
              adjustSlidesZIndex(swiper);
            }

            // Reset progress bar animation
            if (swiper.params.progressBar && swiper.params.autoplay) {
              const progressBar = swiper.progressBar;
              if (progressBar) {
                // Pause and reset the animation
                progressBar.style.animationPlayState = "paused";
                progressBar.style.animationName = "none";

                // Trigger reflow
                void progressBar.offsetWidth;

                const delay = swiper.params.autoplay.delay + swiper.params.speed;

                // Restart the animation
                progressBar.style.animationName = "swiper-progress-bar-animation";
                progressBar.style.animationDuration = `${delay}ms`;
                progressBar.style.animationTimingFunction = "linear";
                progressBar.style.animationIterationCount = "infinite";
                progressBar.style.animationPlayState = "running";
              }
            }
          },
          autoplayStop: function () {
            const swiper = this;
            if (swiper.params.progressBar && swiper.progressBar) {
              swiper.progressBar.style.animationPlayState = "paused";
            }
          },
          autoplayStart: function () {
            const swiper = this;
            if (swiper.params.progressBar && swiper.progressBar) {
              swiper.progressBar.style.animationPlayState = "running";
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

    // Get progressBar setting from data attribute
    if (container.hasAttribute("data-progress-bar")) {
      options.progressBar = container.getAttribute("data-progress-bar") === "true";
    }

    // Get slidesPerView setting from data attribute
    if (container.hasAttribute("data-slides-per-view")) {
      const spv = container.getAttribute("data-slides-per-view");
      if (spv === "auto") {
        options.slidesPerView = "auto";
      } else {
        options.slidesPerView = parseInt(spv, 10);
      }
    }

    // Get spaceBetween setting from data attribute
    if (container.hasAttribute("data-space-between")) {
      options.spaceBetween = parseInt(
        container.getAttribute("data-space-between"),
        10
      );
    }

    // Get breakpoints setting from data attribute
    if (container.hasAttribute("data-breakpoints")) {
      try {
        options.breakpoints = JSON.parse(container.getAttribute("data-breakpoints"));
      } catch (e) {
        console.error("Invalid JSON in data-breakpoints attribute:", e);
      }
    }

    // If data-single-slide is true, set slidesPerView to 1 and remove breakpoints
    if (
      container.hasAttribute("data-single-slide") &&
      container.getAttribute("data-single-slide") === "true"
    ) {
      options.slidesPerView = 1;
      options.breakpoints = null; // Set to null to remove breakpoints
    }

    return options;
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
