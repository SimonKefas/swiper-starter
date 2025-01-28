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
    progressBar: false,
    bulletProgress: false,

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

    // Additional defaults for advanced features
    centeredSlides: false,
    slidesPerGroup: 1,
    watchOverflow: true,
    resistanceRatio: 0.85,
    centerInsufficientSlides: false,
    freeMode: false,
  };

  // Merge function to deeply combine default options with instance options
  function mergeOptions(defaults, instance) {
    return deepMerge({}, defaults, instance);

    function deepMerge(target, ...sources) {
      sources.forEach((source) => {
        Object.keys(source).forEach((key) => {
          if (source[key] === null) {
            // remove property if null
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

  // Merge user-defined SwiperDefaults if provided
  if (window.SwiperDefaults) {
    defaultSwiperOptions = mergeOptions(
      defaultSwiperOptions,
      window.SwiperDefaults
    );
  }

  function initSwipers() {
    document.querySelectorAll(".slider-main_component").forEach(function (container) {
      const instanceOptions = getInstanceOptions(container);
      const swiperConfig = mergeOptions(defaultSwiperOptions, instanceOptions);

      // If fade + crossFade
      if (swiperConfig.effect === "fade") {
        swiperConfig.fadeEffect = {
          crossFade: !!swiperConfig.crossFade,
        };
      }

      const swiperElement = container.querySelector(".swiper");
      if (!swiperElement) {
        console.warn("Swiper element not found:", container);
        return;
      }

      const slidesCount = swiperElement.querySelectorAll(".swiper-slide").length;

      // Determine maximum slidesPerView
      let maxSlidesPerView = 1;
      if (typeof swiperConfig.slidesPerView === "number") {
        maxSlidesPerView = swiperConfig.slidesPerView;
      } else if (swiperConfig.slidesPerView === "auto") {
        maxSlidesPerView = slidesCount;
      } else if (swiperConfig.breakpoints) {
        const bpValues = Object.values(swiperConfig.breakpoints);
        const spvValues = bpValues.map((bp) => bp.slidesPerView || 1);
        maxSlidesPerView = Math.max(...spvValues);
      }

      // Disable loop if not enough slides
      if (slidesCount <= maxSlidesPerView) {
        swiperConfig.loop = false;
      }

      // If only one slide, disable nav/pagination/autoplay/touch
      if (slidesCount <= 1) {
        swiperConfig.navigation = false;
        swiperConfig.pagination = false;
        swiperConfig.autoplay = false;
        swiperConfig.allowTouchMove = false;
        if (swiperConfig.keyboard) {
          swiperConfig.keyboard.enabled = false;
        }
      }

      adjustSelectors(swiperConfig, container);

      // Additional custom options
      swiperConfig.customSlider = instanceOptions.customSlider;
      swiperConfig.sliderColor = instanceOptions.sliderColor;
      swiperConfig.autoplayInView = instanceOptions.autoplayInView;
      // bulletProgress is a new option
      swiperConfig.bulletProgress = instanceOptions.bulletProgress;

      // Helper function: Start bullet-based progress for the current realIndex
      function startBulletProgress(swiper) {
        if (!swiper.params.bulletProgress) return; // only if bullet progress is enabled
        const bulletEls = container.querySelectorAll(".swiper-bullet");
        if (!bulletEls || bulletEls.length === 0) return;

        // 1) Reset all bullet progress
        bulletEls.forEach((bullet) => {
          const prog = bullet.querySelector(".bullet-progress");
          if (prog) {
            prog.style.transition = "none";
            prog.style.width = "0%";
            void prog.offsetWidth; // reflow
          }
        });

        // 2) Animate the bullet for the realIndex
        if (swiper.params.autoplay) {
          const realIndex = swiper.realIndex;
          const bullet = bulletEls[realIndex];
          if (bullet) {
            const progBar = bullet.querySelector(".bullet-progress");
            if (progBar) {
              const totalTime = swiper.params.autoplay.delay + swiper.params.speed;
              progBar.style.transition = `width ${totalTime}ms linear`;
              progBar.style.width = "100%";
            }
          }
        }
      }

      // Helper function: Start top-level progress bar for the current slide
      function startTopLevelProgress(swiper) {
        if (!swiper.topLevelProgressBar) return;
        const pb = swiper.topLevelProgressBar;
        pb.style.animation = "none";
        void pb.offsetWidth; // reflow
        const totalTime = swiper.params.autoplay.delay + swiper.params.speed;
        pb.style.animation = `swiper-progress-bar-animation ${totalTime}ms linear 1`;
      }

      // Setup event handlers
      swiperConfig.on = {
        init: function () {
          const swiper = this;

          // Slide height
          if (swiper.params.effect === "fade") {
            adjustSlidesZIndex(swiper);
          }
          if (swiper.params.fullHeight) {
            setSlidesFullHeight(swiper);
          } else {
            adjustSlidesHeight(swiper);
          }

          // Top-level progress bar
          if (swiper.params.progressBar && swiper.params.autoplay) {
            const progressBar = container.querySelector(".swiper-progress-bar");
            if (progressBar) {
              swiper.topLevelProgressBar = progressBar;
            }
          }

          // If bullet progress is enabled, inject .bullet-progress div
          if (swiper.params.bulletProgress && swiper.params.pagination) {
            const bulletEls = container.querySelectorAll(".swiper-bullet");
            bulletEls.forEach((bullet) => {
              if (!bullet.querySelector(".bullet-progress")) {
                const prog = document.createElement("div");
                prog.classList.add("bullet-progress");
                prog.style.width = "0%";
                bullet.appendChild(prog);
              }
            });
          }

          // Custom slider logic
          const customSlider = container.querySelector(".custom-slider");
          const customSliderBar = container.querySelector(".custom-slider-bar");
          if (swiper.params.customSlider && customSlider) {
            const sliderColor = swiper.params.sliderColor || "#007aff";
            customSlider.style.setProperty("--slider-color", sliderColor);

            customSlider.min = 0;
            customSlider.max = slidesCount - 1;
            // Use realIndex for loop sync
            customSlider.value = swiper.realIndex;

            function updateSliderTrack() {
              const min = parseInt(customSlider.min, 10) || 0;
              const max = parseInt(customSlider.max, 10) || (slidesCount - 1);
              const value = parseInt(customSlider.value, 10);
              const percentage = ((value - min) / (max - min)) * 100;
              customSlider.style.setProperty("--value-percent", `${percentage}%`);
            }
            updateSliderTrack();

            customSlider.addEventListener("input", function () {
              // Move to the real index
              swiper.slideTo(parseInt(this.value, 10));
              updateSliderTrack();
            });
            swiper.on("slideChange", function () {
              customSlider.value = swiper.realIndex;
              updateSliderTrack();
            });
          } else if (customSliderBar) {
            // Visual slider bar
            const updateSliderBar = function () {
              const progressPercentage = swiper.progress * 100;
              customSliderBar.style.width = `${progressPercentage}%`;
            };
            updateSliderBar();
            swiper.on("slideChange", updateSliderBar);
            swiper.on("progress", updateSliderBar);
          }

          // Intersection-based autoplay
          if (swiper.params.autoplay && swiper.params.autoplayInView) {
            swiper.autoplay.stop();
            const observer = new IntersectionObserver((entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  swiper.autoplay.start();
                } else {
                  swiper.autoplay.stop();
                }
              });
            }, { threshold: 0.2 });
            observer.observe(container);
          }
        },

        afterInit: function (swiper) {
          // Start bullet or top-level progress from the initial realIndex
          if (swiper.params.progressBar && swiper.params.autoplay && swiper.topLevelProgressBar) {
            startTopLevelProgress(swiper);
          }
          startBulletProgress(swiper);
        },

        slideChangeTransitionStart: function () {
          const swiper = this;

          if (swiper.params.effect === "fade") {
            adjustSlidesZIndex(swiper);
          }

          // Top-level bar
          if (swiper.params.progressBar && swiper.params.autoplay && swiper.topLevelProgressBar) {
            startTopLevelProgress(swiper);
          }

          // Bullet-based progress
          startBulletProgress(swiper);

          // If custom slider, set range to realIndex
          if (swiper.params.customSlider) {
            const customSlider = container.querySelector(".custom-slider");
            if (customSlider) {
              customSlider.value = swiper.realIndex;
              const min = parseInt(customSlider.min, 10) || 0;
              const max = parseInt(customSlider.max, 10) || (slidesCount - 1);
              const value = parseInt(customSlider.value, 10);
              const percentage = ((value - min) / (max - min)) * 100;
              customSlider.style.setProperty("--value-percent", `${percentage}%`);
            }
          } else {
            const customSliderBar = container.querySelector(".custom-slider-bar");
            if (customSliderBar) {
              const progressPercentage = swiper.progress * 100;
              customSliderBar.style.width = `${progressPercentage}%`;
            }
          }
        },

        autoplayStop: function () {
          // If user drags or intersection observer stops autoplay
          const swiper = this;
          if (swiper.topLevelProgressBar) {
            swiper.topLevelProgressBar.style.animationPlayState = "paused";
          }
          if (swiper.params.bulletProgress) {
            const bulletProgs = container.querySelectorAll(".swiper-bullet .bullet-progress");
            bulletProgs.forEach((bp) => {
              bp.style.transition = "none";
            });
          }
        },

        autoplayStart: function () {
          // Next slideChange triggers fresh fill
          const swiper = this;
          if (swiper.topLevelProgressBar) {
            swiper.topLevelProgressBar.style.animationPlayState = "running";
          }
        },
      };

      new Swiper(swiperElement, swiperConfig);
    });
  }

  // Read data attributes
  function getInstanceOptions(container) {
    const options = {};

    if (container.hasAttribute("data-loop-mode")) {
      options.loop = container.getAttribute("data-loop-mode") === "true";
    }

    if (container.hasAttribute("data-slider-duration")) {
      options.speed = parseInt(container.getAttribute("data-slider-duration"), 10);
    }

    if (container.hasAttribute("data-effect")) {
      options.effect = container.getAttribute("data-effect");
    }

    if (container.hasAttribute("data-crossfade")) {
      options.crossFade = container.getAttribute("data-crossfade") === "true";
    }

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

    if (container.hasAttribute("data-full-height")) {
      options.fullHeight = container.getAttribute("data-full-height") === "true";
    }

    // Top-level progress bar
    if (container.hasAttribute("data-progress-bar")) {
      options.progressBar = container.getAttribute("data-progress-bar") === "true";
    }

    // New bullet-based progress attribute
    if (container.hasAttribute("data-bullet-progress")) {
      options.bulletProgress = container.getAttribute("data-bullet-progress") === "true";
    }

    if (container.hasAttribute("data-slides-per-view")) {
      const spv = container.getAttribute("data-slides-per-view");
      if (spv === "auto") {
        options.slidesPerView = "auto";
      } else {
        options.slidesPerView = parseInt(spv, 10);
      }
    }

    if (container.hasAttribute("data-space-between")) {
      options.spaceBetween = parseInt(
        container.getAttribute("data-space-between"),
        10
      );
    }

    if (container.hasAttribute("data-breakpoints")) {
      try {
        options.breakpoints = JSON.parse(container.getAttribute("data-breakpoints"));
      } catch (e) {
        console.error("Invalid JSON in data-breakpoints attribute:", e);
      }
    }

    if (container.hasAttribute("data-single-slide") &&
        container.getAttribute("data-single-slide") === "true") {
      options.slidesPerView = 1;
      options.breakpoints = null;
    }

    if (container.hasAttribute("data-custom-slider")) {
      options.customSlider = container.getAttribute("data-custom-slider") === "true";
    } else {
      options.customSlider = false;
    }

    // Advanced
    if (container.hasAttribute("data-centered-slides")) {
      options.centeredSlides = container.getAttribute("data-centered-slides") === "true";
    }

    if (container.hasAttribute("data-slides-per-group")) {
      options.slidesPerGroup = parseInt(
        container.getAttribute("data-slides-per-group"),
        10
      );
    }

    if (container.hasAttribute("data-watch-overflow")) {
      options.watchOverflow =
        container.getAttribute("data-watch-overflow") === "true";
    }

    if (container.hasAttribute("data-resistance-ratio")) {
      options.resistanceRatio = parseFloat(
        container.getAttribute("data-resistance-ratio")
      );
    }

    if (container.hasAttribute("data-center-insufficient-slides")) {
      options.centerInsufficientSlides =
        container.getAttribute("data-center-insufficient-slides") === "true";
    }

    if (container.hasAttribute("data-free-mode")) {
      options.freeMode = container.getAttribute("data-free-mode") === "true";
    }

    if (container.hasAttribute("data-slider-color")) {
      options.sliderColor = container.getAttribute("data-slider-color");
    }

    if (container.hasAttribute("data-autoplay-inview")) {
      options.autoplayInView =
        container.getAttribute("data-autoplay-inview") === "true";
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
