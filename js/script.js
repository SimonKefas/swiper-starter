/*
 * Swiper Starter Kit – v2.0.0
 * =============================================
 * Improvements in this release
 * ---------------------------------------------
 * 1. **Shared IntersectionObserver** – one observer instance for all
 *    autoplay‑in‑view sliders (reduces overhead).
 * 2. **Destroy helpers** – `destroySwipers()` tears down observers & Swiper
 *    instances; sliders can be re‑created on demand.
 * 3. **Breakpoint Disable** – new `data-disable-below` / `data-disable-above`
 *    attributes let you deactivate a slider at specific viewport widths.
 * 4. **Array aware deepMerge** – arrays are now cloned instead of referenced.
 * 5. **Mouse‑wheel fallback** when `allowTouchMove === false`.
 * 6. **Debounced custom range slider** rendering via `requestAnimationFrame`.
 * 7. **Config reference** – each container gets `_swiperConfig` (frozen copy).
 *
 * There are **no breaking changes** for existing markup – all previous data
 * attributes keep working. The new ones are opt‑in. Compile‑to‑ES5 not
 * required; file ships as ES2015 for CDN usage.
 *
 * Author: JS Solutions Expert – May 2025
 */

(function () {
  "use strict";

  const DEBUG = !!window.SWIPER_STARTER_DEBUG;
  function debugLog(...args) {
    if (DEBUG) console.warn("[Swiper Starter]", ...args);
  }

  /* =============================================================
   * 0) Utilities
   * ============================================================= */

  /**
   * Very small deep‑merge helper.  Now clones arrays so they don't share
   * reference with defaults.  If a property in `source` is null, the key is
   * deleted from the target ("null‑to‑delete" convention).
   */
  function deepMerge(target = {}, ...sources) {
    sources.forEach((source) => {
      if (!source) return;
      Object.keys(source).forEach((key) => {
        const srcVal = source[key];
        if (srcVal === null) {
          delete target[key];
          return;
        }
        if (Array.isArray(srcVal)) {
          target[key] = srcVal.slice(); // shallow clone array
          return;
        }
        if (typeof srcVal === "object" && srcVal !== null) {
          if (!target[key] || typeof target[key] !== "object") target[key] = {};
          deepMerge(target[key], srcVal);
        } else {
          target[key] = srcVal;
        }
      });
    });
    return target;
  }

  /** Simple debounce helper. */
  function debounce(fn, wait = 200) {
    let t;
    return function () {
      clearTimeout(t);
      t = setTimeout(() => fn.apply(this, arguments), wait);
    };
  }

  /* =============================================================
   * 1) Default Swiper configuration
   * ============================================================= */
  let defaultSwiperOptions = {
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
      bulletElement: "button", // accessibility
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

    centeredSlides: false,
    slidesPerGroup: 1,
    watchOverflow: true,
    resistanceRatio: 0.85,
    centerInsufficientSlides: false,
    freeMode: false,

    // custom extensions
    intersectionThreshold: 0.2,
  };

  /* -------------------------------------------------------------
   * Optional global overrides via window.SwiperDefaults
   * ----------------------------------------------------------- */
  if (window.SwiperDefaults) {
    defaultSwiperOptions = deepMerge({}, defaultSwiperOptions, window.SwiperDefaults);
  }

  /* =============================================================
   * 2) Slider registry & shared resources
   * ============================================================= */
  // Map<HTMLElement, { swiper: Swiper|null, destroyFns: Function[] }>
  const sliderRegistry = new Map();

  // Single shared IntersectionObserver for all autoplay‑in‑view sliders
  let sharedIO = null;
  function getSharedObserver(threshold) {
    if (sharedIO) return sharedIO;
    sharedIO = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const container = entry.target;
        const record = sliderRegistry.get(container);
        if (!record || !record.swiper) return;
        if (entry.isIntersecting) {
          record.swiper.autoplay?.start();
        } else {
          record.swiper.autoplay?.stop();
        }
      });
    }, { threshold });
    return sharedIO;
  }

  /* =============================================================
   * 3) Initialiser & destroyer
   * ============================================================= */

  /**
   * Determine if the slider should be active for the current viewport width,
   * based on optional data‑disable-below / data-disable-above attributes.
   */
  function isSliderEnabledNow(container) {
    const belowAttr = container.getAttribute("data-disable-below");
    const aboveAttr = container.getAttribute("data-disable-above");

    const vp = window.innerWidth;
    if (belowAttr && vp < parseInt(belowAttr, 10)) return false;
    if (aboveAttr && vp > parseInt(aboveAttr, 10)) return false;
    return true;
  }

  /** Collect all instance‑level options from data attributes. */
  function getInstanceOptions(container) {
    const o = {};
    const d = container.dataset; // shortcut

    if (d.loopMode) o.loop = d.loopMode === "true";
    if (d.sliderDuration) o.speed = parseInt(d.sliderDuration, 10);
    if (d.effect) o.effect = d.effect;
    if (d.crossfade) o.crossFade = d.crossfade === "true";
    if (d.autoplay) {
      if (d.autoplay === "false") {
        o.autoplay = false;
      } else {
        const delay = parseInt(d.autoplay, 10);
        if (!isNaN(delay)) o.autoplay = { delay, disableOnInteraction: false };
      }
    }
    if (d.fullHeight) o.fullHeight = d.fullHeight === "true";
    if (d.progressBar) o.progressBar = d.progressBar === "true";
    if (d.bulletProgress) o.bulletProgress = d.bulletProgress === "true";
    if (d.slidesPerView) {
      if (d.slidesPerView === "auto") o.slidesPerView = "auto";
      else o.slidesPerView = parseInt(d.slidesPerView, 10);
      if (!d.breakpoints) o.breakpoints = null; // user overrides completely
    }
    if (d.spaceBetween) o.spaceBetween = parseInt(d.spaceBetween, 10);
    if (d.breakpoints) {
      try {
        o.breakpoints = JSON.parse(d.breakpoints.replace(/'/g, '"'));
      } catch (err) {
        console.error("Invalid JSON in data-breakpoints", err);
      }
    }
    if (d.singleSlide === "true") {
      o.slidesPerView = 1;
      o.breakpoints = null;
    }
    o.customSlider = d.customSlider === "true";

    if (d.centeredSlides) o.centeredSlides = d.centeredSlides === "true";
    if (d.slidesPerGroup) o.slidesPerGroup = parseInt(d.slidesPerGroup, 10);
    if (d.watchOverflow) o.watchOverflow = d.watchOverflow === "true";
    if (d.resistanceRatio) o.resistanceRatio = parseFloat(d.resistanceRatio);
    if (d.centerInsufficientSlides) o.centerInsufficientSlides = d.centerInsufficientSlides === "true";
    if (d.freeMode) o.freeMode = d.freeMode === "true";
    if (d.sliderColor) o.sliderColor = d.sliderColor;
    if (d.autoplayInview) o.autoplayInView = d.autoplayInview === "true";
    if (d.intersectionThreshold) o.intersectionThreshold = parseFloat(d.intersectionThreshold);
    if (d.disableNavigation === "true") o.navigation = false;
    if (d.disablePagination === "true") o.pagination = false;
    if (d.disableTouch === "true") o.allowTouchMove = false;
    if (d.observer === "true") {
      o.observer = true;
      o.observeParents = true;
    }

    return o;
  }

  /**
   * Adjust config selectors so that each slider only looks inside its own
   * container.
   */
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

  /** Initialise a *single* Swiper instance inside its container. */
  function createSwiper(container) {
    const instanceOptions = getInstanceOptions(container);
    const userDefinedLoop = Object.prototype.hasOwnProperty.call(instanceOptions, "loop");
    const userDefinedWatchOverflow = Object.prototype.hasOwnProperty.call(
      instanceOptions,
      "watchOverflow"
    );

    const swiperConfig = deepMerge({}, defaultSwiperOptions, instanceOptions);

    // user may fully override breakpoints
    if (instanceOptions.breakpoints) {
      swiperConfig.breakpoints = instanceOptions.breakpoints;
    }

    // fade crossFade support
    if (swiperConfig.effect === "fade") {
      swiperConfig.fadeEffect = { crossFade: !!swiperConfig.crossFade };
    }

    const swiperEl = container.querySelector(".swiper");
    if (!swiperEl) {
      debugLog(".swiper element not found", container);
      container.setAttribute("data-swiper-disabled", "");
      return null;
    }

    const wrapperEl = swiperEl.querySelector(".swiper-wrapper");
    const slidesCount = wrapperEl ? wrapperEl.querySelectorAll(".swiper-slide").length : 0;
    if (!wrapperEl || slidesCount === 0) {
      debugLog("no slides found", container);
      container.setAttribute("data-swiper-disabled", "");
      return null;
    }

    // determine max slidesPerView to decide auto loop off
    const spvCandidates = [];
    if (typeof swiperConfig.slidesPerView === "number") {
      spvCandidates.push(swiperConfig.slidesPerView);
    } else if (swiperConfig.slidesPerView === "auto") {
      spvCandidates.push(slidesCount);
    }

    if (swiperConfig.breakpoints) {
      Object.values(swiperConfig.breakpoints).forEach((bp) => {
        const spv = bp?.slidesPerView;
        if (typeof spv === "number") {
          spvCandidates.push(spv);
        } else if (spv === "auto") {
          spvCandidates.push(slidesCount);
        }
      });
    }

    let maxSpv = spvCandidates.length ? Math.max(...spvCandidates) : 1;
    if (!userDefinedLoop && slidesCount <= maxSpv) {
      swiperConfig.loop = false;
    }

    // If loop is enabled, ensure watchOverflow doesn't disable it—unless the user explicitly set it.
    if (swiperConfig.loop && !userDefinedWatchOverflow) {
      swiperConfig.watchOverflow = false;
    }

    if (slidesCount <= 1) {
      swiperConfig.navigation = false;
      swiperConfig.pagination = false;
      swiperConfig.autoplay = false;
      swiperConfig.allowTouchMove = false;
      if (swiperConfig.keyboard) swiperConfig.keyboard.enabled = false;
    }

    // keep mouse‑wheel even when touch disabled
    if (swiperConfig.allowTouchMove === false) {
      swiperConfig.mousewheel = swiperConfig.mousewheel || { forceToAxis: true };
    }

    adjustSelectors(swiperConfig, container);

    // expose some custom parameters for later helpers
    swiperConfig.customSlider = instanceOptions.customSlider;
    swiperConfig.sliderColor = instanceOptions.sliderColor;
    swiperConfig.autoplayInView = instanceOptions.autoplayInView;
    swiperConfig.bulletProgress = instanceOptions.bulletProgress;

    // --------------------- Event handlers ---------------------
    swiperConfig.on = {
      init() {
        const swiper = this;
        // z‑index for fade
        if (swiper.params.effect === "fade") adjustSlidesZIndex(swiper);
        // height helpers
        if (swiper.params.fullHeight) setSlidesFullHeight(swiper);
        else adjustSlidesHeight(swiper);

        // store reference for top‑level progress bar if present
        if (swiper.params.progressBar && swiper.params.autoplay) {
          const bar = container.querySelector(".swiper-progress-bar");
          if (bar) swiper.topLevelProgressBar = bar;
        }

        // bullet progress DOM injection
        if (swiper.params.bulletProgress && swiper.params.pagination) {
          container.querySelectorAll(".swiper-bullet").forEach((b) => {
            if (!b.querySelector(".bullet-progress")) {
              const prog = document.createElement("div");
              prog.className = "bullet-progress";
              prog.style.width = "0%";
              b.appendChild(prog);
            }
          });
        }

        setupCustomSlider(swiper, container, slidesCount);

        // autoplay‑in‑view using shared observer
        if (swiper.params.autoplay && swiper.params.autoplayInView) {
          swiper.autoplay.stop();
          const t = swiper.params.intersectionThreshold || 0.2;
          getSharedObserver(t).observe(container);
          // add cleanup to registry record later
        }
      },

      afterInit(swiper) {
        if (swiper.params.progressBar && swiper.params.autoplay && swiper.topLevelProgressBar) {
          startTopLevelProgress(swiper);
        }
        startBulletProgress(swiper, container);
      },

      slideChangeTransitionStart() {
        const swiper = this;
        if (swiper.params.effect === "fade") adjustSlidesZIndex(swiper);
        if (swiper.params.progressBar && swiper.params.autoplay && swiper.topLevelProgressBar) startTopLevelProgress(swiper);
        startBulletProgress(swiper, container);
        syncCustomSlider(swiper, container);
      },

      autoplayStop() {
        const swiper = this;
        if (swiper.topLevelProgressBar) swiper.topLevelProgressBar.style.animationPlayState = "paused";
        if (swiper.params.bulletProgress) {
          container.querySelectorAll(".swiper-bullet .bullet-progress").forEach((bp) => {
            bp.style.transition = "none";
          });
        }
      },

      autoplayStart() {
        const swiper = this;
        if (swiper.topLevelProgressBar) swiper.topLevelProgressBar.style.animationPlayState = "running";
      },
    };

    // observer is opt‑in via data‑observer="true"
    if (instanceOptions.observer) {
      swiperConfig.observer = true;
      swiperConfig.observeParents = true;
    }

    let swiperInstance;
    try {
      swiperInstance = new Swiper(swiperEl, swiperConfig);
    } catch (err) {
      debugLog("Swiper instantiation failed", err);
      container.setAttribute("data-swiper-disabled", "");
      return null;
    }

    // attach references
    container._swiperInstance = swiperInstance;
    container._swiperConfig = Object.freeze(deepMerge({}, swiperConfig));
    container.removeAttribute("data-swiper-disabled");

    return swiperInstance;
  }

  /** Destroy the Swiper instance *and* disconnect any observers for that container. */
  function destroySwiper(container) {
    const record = sliderRegistry.get(container);
    if (!record || !record.swiper) return;

    // stop observing autoplay‑in‑view
    if (sharedIO) sharedIO.unobserve(container);

    // clean up custom slider events (they were anonymous lambdas, easiest is to clone node ↓)
    const range = container.querySelector(".custom-slider");
    if (range) {
      const clone = range.cloneNode(true);
      range.parentNode?.replaceChild(clone, range);
    }

    record.swiper.destroy(true, true);
    record.swiper = null;
    container._swiperInstance = null;
    container.setAttribute("data-swiper-disabled", "");
  }

  /** Walk all registered sliders and destroy them.  Optionally filter by selector. */
  function destroySwipers(selector) {
    sliderRegistry.forEach((_rec, container) => {
      if (!selector || container.matches(selector)) {
        destroySwiper(container);
        sliderRegistry.delete(container);
      }
    });
  }
  window.destroySwipers = destroySwipers;

  /** Main initialiser – (re)creates sliders that are enabled for current BP. */
  function initSwipers() {
    // prefers‑reduced‑motion: disable autoplay globally by mutating defaults once
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      defaultSwiperOptions.autoplay = false;
    }

    document.querySelectorAll(".slider-main_component").forEach((container) => {
      const enabledNow = isSliderEnabledNow(container);
      if (!sliderRegistry.has(container)) {
        sliderRegistry.set(container, { swiper: null });
      }
      const record = sliderRegistry.get(container);

      if (enabledNow && !record.swiper) {
        try {
          record.swiper = createSwiper(container);
        } catch (err) {
          debugLog("initialisation failed", container, err);
          record.swiper = null;
          container.setAttribute("data-swiper-disabled", "");
        }
      } else if (!enabledNow) {
        if (record.swiper) destroySwiper(container);
        else container.setAttribute("data-swiper-disabled", "");
      }
    });
  }
  window.initSwipers = initSwipers;
  function recalcSwipers() { initSwipers(); }
  window.recalcSwipers = recalcSwipers;
  
  // run once at doc ready
  document.addEventListener("DOMContentLoaded", initSwipers);

  // handle responsive (re)activation
  window.addEventListener("resize", debounce(initSwipers, 250));
  window.addEventListener("orientationchange", debounce(initSwipers, 250));

  /* =============================================================
   * 4) Helper fns (height / z‑index / progress logic)
   * ============================================================= */
  function adjustSlidesHeight(swiper) {
    const maxH = Math.max(...Array.from(swiper.slides).map((s) => s.offsetHeight));
    swiper.slides.forEach((s) => (s.style.height = `${maxH}px`));
  }
  function setSlidesFullHeight(swiper) {
    swiper.slides.forEach((s) => (s.style.height = "100%"));
  }
  function adjustSlidesZIndex(swiper) {
    swiper.slides.forEach((slide, i) => {
      slide.style.zIndex = i === swiper.activeIndex ? 2 : 1;
      slide.style.pointerEvents = i === swiper.activeIndex ? "auto" : "none";
    });
  }

  // ---------- progress bars ----------
  function startBulletProgress(swiper, container) {
    if (!swiper.params.bulletProgress) return;
    const bullets = container.querySelectorAll(".swiper-bullet");
    if (!bullets.length) return;
    bullets.forEach((b) => {
      const prog = b.querySelector(".bullet-progress");
      if (prog) {
        prog.style.transition = "none";
        prog.style.width = "0%";
        void prog.offsetWidth; // reset
      }
    });
    if (swiper.params.autoplay) {
      const active = bullets[swiper.realIndex];
      const prog = active?.querySelector(".bullet-progress");
      if (prog) {
        const total = swiper.params.autoplay.delay + swiper.params.speed;
        prog.style.transition = `width ${total}ms linear`;
        prog.style.width = "100%";
      }
    }
  }
  function startTopLevelProgress(swiper) {
    if (!swiper.topLevelProgressBar) return;
    const bar = swiper.topLevelProgressBar;
    bar.style.animation = "none";
    void bar.offsetWidth;
    const total = swiper.params.autoplay.delay + swiper.params.speed;
    bar.style.animation = `swiper-progress-bar-animation ${total}ms linear 1`;
  }

  // ---------- custom range slider ----------
  function setupCustomSlider(swiper, container, slidesCount) {
    const input = container.querySelector(".custom-slider");
    const bar = container.querySelector(".custom-slider-bar");

    if (swiper.params.customSlider && input) {
      const color = swiper.params.sliderColor || "#007aff";
      input.style.setProperty("--slider-color", color);
      input.min = 0;
      input.max = slidesCount - 1;
      input.value = `${swiper.realIndex}`;

      let rafId = 0;
      const updateTrack = () => {
        const min = parseInt(input.min, 10) || 0;
        const max = parseInt(input.max, 10) || slidesCount - 1;
        const val = parseInt(input.value, 10);
        const pct = ((val - min) / (max - min)) * 100;
        input.style.setProperty("--value-percent", `${pct}%`);
      };
      updateTrack();

      const onInput = () => {
        swiper.slideTo(parseInt(input.value, 10));
        if (!rafId) {
          rafId = requestAnimationFrame(() => {
            updateTrack();
            rafId = 0;
          });
        }
      };
      input.addEventListener("input", onInput);
      swiper.on("slideChange", () => {
        input.value = `${swiper.realIndex}`;
        updateTrack();
      });

      // add cleanup reference
      const record = sliderRegistry.get(container);
      if (record) {
        record.destroyFns = record.destroyFns || [];
        record.destroyFns.push(() => input.removeEventListener("input", onInput));
      }
    } else if (bar) {
      const updateBar = () => {
        bar.style.width = `${swiper.progress * 100}%`;
      };
      updateBar();
      swiper.on("slideChange", updateBar);
      swiper.on("progress", updateBar);
    }
  }
  function syncCustomSlider(swiper, container) {
    const input = container.querySelector(".custom-slider");
    if (swiper.params.customSlider && input) {
      input.value = `${swiper.realIndex}`;
      const min = parseInt(input.min, 10) || 0;
      const max = parseInt(input.max, 10) || swiper.slides.length - 1;
      const pct = ((swiper.realIndex - min) / (max - min)) * 100;
      input.style.setProperty("--value-percent", `${pct}%`);
    } else {
      const bar = container.querySelector(".custom-slider-bar");
      if (bar) bar.style.width = `${swiper.progress * 100}%`;
    }
  }
})();
