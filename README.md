# Swiper Starter Kit v2 – Complete Documentation

> A zero‑config, attribute‑driven wrapper around [Swiper 11+](https://swiperjs.com/), rebuilt for performance, scalability, and modern workflow needs.

**[📖 Live Examples](test.html)** – Interactive demo showcasing all features

---

## Table of Contents

1. [What's new in v2](#whats-new-in-v2)
2. [Features](#features)
3. [Quick start](#quick-start)
   3.1 [Prerequisites](#prerequisites)
   3.2 [Installation](#installation)
   3.3 [Basic HTML skeleton](#basic-html-skeleton)
4. [Global defaults](#global-defaults)
5. [Data‑attribute reference](#data-attribute-reference)
   5.1 [Core attributes](#core-attributes)
   5.2 [Advanced attributes](#advanced-attributes)
6. [JS API for custom effects](#js-api-for-custom-effects)
7. [Runtime helpers](#runtime-helpers)
8. [Debug mode](#debug-mode)
9. [Disabling a slider at break‑points](#disabling-a-slider-at-break-points)
10. [Examples](#examples)
11. [CSS snippets](#css-snippets)
12. [Performance & edge cases](#performance--edge-cases)
13. [Changelog](#changelog)
14. [License](#license)

---

## What's new in v2

| Enhancement                                   | Details                                                                                                                                                                                     |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **One shared `IntersectionObserver`**         | All `data-autoplay-inview="true"` sliders now share a single observer for lower memory/CPU.                                                                                                 |
| **Break‑point disabling**                     | `data-disable-below="768"` or `data-disable-above="991"` cleanly destroy or re‑create sliders on `resize`.                                                                                  |
| **Destroy & recalc helpers**                  | <br>• `window.destroySwipers()` – disconnects observers and destroys all instances.<br>• `window.recalcSwipers()` – (re)creates or destroys sliders based on current viewport / attributes. |
| **Mouse‑wheel preserved when touch disabled** | If you set `data-disable-touch="true"`, users can still scroll with a wheel or trackpad.                                                                                                    |
| **Deep‑merge‑with‑arrays**                    | Arrays are now cloned instead of carrying references across instances.                                                                                                                      |
| **Config exposure**                           | Every container now has `_swiperConfig` (frozen copy) next to `_swiperInstance`.                                                                                                            |
| **Custom‑slider repaint throttle**            | Smoother range‑slider scrubbing via `requestAnimationFrame`.                                                                                                                                |
| **Smart loop cloning** *(v2.2)*               | Loop mode now auto-clones slides when there aren't enough for the viewport, ensuring smooth infinite scroll.                                                                                |
| **Debug mode & resilient init**               | Optional `SWIPER_STARTER_DEBUG` flag logs broken sliders; invalid ones are skipped so others still run.                                                                                     |

**No breaking changes** – existing sliders continue to work unless you add the new attributes.

---

## Features

* Global + per‑instance config merge (`window.SwiperDefaults` + `data-*`)
* Optional **top‑level** or **bullet‑level** progress bars
* Custom `<input type="range">` navigation slider
* Autoplay gated by **Intersection Observer**
* Prefers‑reduced‑motion handling (opt‑in)
* Mutation observer support (`data-observer="true"`)
* Automatic single‑slide fall‑backs
* Fade / cross‑fade effect
* **Smart loop cloning** – auto-duplicates slides for smooth loop when needed
* **Disable‑at‑break‑point** logic
* Destroy / recalc helpers
* **JS API** for custom effects and behaviors
* Optional console debugging via `SWIPER_STARTER_DEBUG`

---

## Quick start

### Prerequisites

* Swiper 11 or 12
* Modern browser (Intersection Observer is now 96 %+ supported)

### Installation

```html
<!-- Swiper core -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"/>
<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
```

```html
<!-- Swiper Starter Kit -->
<script src="https://cdn.jsdelivr.net/gh/SimonKefas/swiper-starter@latest/js/script.js"></script>
```

> **Tip:** Pin to a tag (`@v2.2.0`) or commit hash to avoid surprises.

### Basic HTML skeleton

```html
<div class="slider-main_component" data-autoplay="3000">
  <div class="swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide">Slide 1</div>
      <div class="swiper-slide">Slide 2</div>
    </div>
  </div>

  <!-- Optional controls -->
  <div class="swiper-controls">
    <button class="swiper-prev"></button>
    <div class="swiper-bullet-wrapper"></div>
    <button class="swiper-next"></button>
  </div>

  <!-- Optional progress bar -->
  <div class="swiper-progress-bar-wrapper">
    <div class="swiper-progress-bar"></div>
  </div>

  <!-- Optional custom range slider -->
  <div class="custom-slider-wrapper">
    <input type="range" class="custom-slider"/>
  </div>
</div>
```

Sliders auto‑initialise on `DOMContentLoaded`.

---

## Global defaults

Override once per page:

```html
<script>
  window.SwiperDefaults = {
    loop: true,
    speed: 500,
    autoplay: { delay: 4000, disableOnInteraction: false },
    // anything from Swiper's API or the custom flags below
  };
</script>
```

---

## Data‑attribute reference

### Core attributes

| Attribute                     | Values                    | Description                            |
| ----------------------------- | ------------------------- | -------------------------------------- |
| `data-loop-mode`              | `"true"` / `"false"`      | Enable Swiper looping.                 |
| `data-autoplay`               | `"false"` \| number (ms)  | Autoplay delay or disable.             |
| `data-slider-duration`        | number (ms)               | Transition speed.                      |
| `data-effect`                 | `"slide"`, `"fade"`, etc. | Swiper effect module.                  |
| `data-crossfade`              | `"true"`                  | Only for `data-effect="fade"`.         |
| `data-slides-per-view`        | number \| `"auto"`        |                                        |
| `data-space-between`          | number (px)               |                                        |
| `data-breakpoints`            | JSON string               | Full Swiper breakpoint object.         |
| `data-progress-bar`           | `"true"`                  | Top‑level progress fill.               |
| `data-bullet-progress`        | `"true"`                  | Per‑bullet timed fills.                |
| `data-custom-slider`          | `"true"`                  | Enable `<input type="range">` control. |
| `data-autoplay-inview`        | `"true"`                  | Starts autoplay only when visible.     |
| `data-intersection-threshold` | float (0‑1)               | Optional threshold override.           |

### All/advanced attributes

| Attribute                             | Type / Example                      | Description                                   |
| ------------------------------------- | ----------------------------------- | --------------------------------------------- |
| **Layout / sizing**                   |                                     |                                               |
| `data-full-height`                    | `"true"`                            | Force each slide to `height:100%`.            |
| `data-single-slide`                   | `"true"`                            | Forces 1 slide; disables break-points.        |
| `data-slides-per-view`                | `3` \| `"auto"`                     | Swiper's `slidesPerView`.                     |
| `data-space-between`                  | `16`                                | Gap between slides (px).                      |
| `data-breakpoints`                    | `{ "768": { "slidesPerView": 2 } }` | Full breakpoint JSON.                         |
| `data-centered-slides`                | `"true"`                            | Enable Swiper's centred mode.                 |
| `data-center-insufficient-slides`     | `"true"`                            | Centre when slide count < visible count.      |
| **Navigation & interaction**          |                                     |                                               |
| `data-loop-mode`                      | `"true"`                            | Enable looping.                               |
| `data-autoplay`                       | `4000` (ms) \| `"false"`            | Autoplay delay or disable.                    |
| `data-slider-duration`                | `600` (ms)                          | Transition speed.                             |
| `data-effect` / `data-crossfade`      | `"fade"` / `"true"`                 | Swiper effect + crossfade.                    |
| `data-slides-per-group`               | `2`                                 | Advance this many slides per nav step.        |
| `data-free-mode`                      | `"true"`                            | Enable free‑scroll.                           |
| `data-watch-overflow`                 | `"true"`                            | Hide nav when not scrollable.                 |
| `data-resistance-ratio`               | `0.85`                              | Drag resistance.                              |
| **Progress UI**                       |                                     |                                               |
| `data-progress-bar`                   | `"true"`                            | Top‑level progress bar.                       |
| `data-bullet-progress`                | `"true"`                            | Timed fills in bullets.                       |
| `data-slider-color`                   | `"#FF6B00"`                         | Colour for progress UI / custom slider.       |
| `data-custom-slider`                  | `"true"`                            | Adds a draggable `<input type="range">`.      |
| **Autoplay visibility control**       |                                     |                                               |
| `data-autoplay-inview`                | `"true"`                            | Start/stop autoplay via IntersectionObserver. |
| `data-intersection-threshold`         | `0.5`                               | Override default `0.2` threshold.             |
| **Mutation / observers**              |                                     |                                               |
| `data-observer`                       | `"true"`                            | Enable Swiper `observer` + `observeParents`.  |
| **Per‑instance feature toggles**      |                                     |                                               |
| `data-disable-navigation`             | `"true"`                            | Hide next/prev arrows in this slider.         |
| `data-disable-pagination`             | `"true"`                            | Hide bullet pagination.                       |
| `data-disable-touch`                  | `"true"`                            | Disable drag / swipe (wheel remains).         |
| **Break‑point disabling**             |                                     |                                               |
| `data-disable-below`                  | `768`                               | Don't instantiate when `viewport < 768 px`.   |
| `data-disable-above`                  | `991`                               | Don't instantiate when `viewport > 991 px`.   |

*(Put multiple attributes together as needed; the script merges them with global defaults.)*

---

## JS API for custom effects

Every slider exposes its Swiper instance for advanced customization. This enables creative effects like position-based scaling, synced sliders, or custom animations.

### Accessing the instance

```js
const container = document.querySelector('.slider-main_component');
const swiper = container._swiperInstance;   // Swiper API
const config = container._swiperConfig;     // frozen config copy
```

### Example: 3D Scale effect with position classes

Add custom classes based on each slide's distance from the active slide:

```js
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const container = document.querySelector('#my-slider');
    const swiper = container._swiperInstance;
    if (!swiper) return;

    function updatePositionClasses() {
      const slides = container.querySelectorAll('.swiper-slide');
      const activeIndex = swiper.activeIndex;

      slides.forEach((slide, i) => {
        // Remove all position classes
        slide.classList.remove(
          'pos-active', 'pos-prev-1', 'pos-prev-2',
          'pos-next-1', 'pos-next-2'
        );

        // Add class based on distance from active
        const diff = i - activeIndex;
        if (diff === 0) slide.classList.add('pos-active');
        else if (diff === -1) slide.classList.add('pos-prev-1');
        else if (diff === 1) slide.classList.add('pos-next-1');
        else if (diff === -2) slide.classList.add('pos-prev-2');
        else if (diff === 2) slide.classList.add('pos-next-2');
      });
    }

    updatePositionClasses();
    swiper.on('slideChange', updatePositionClasses);
  }, 100);
});
```

Then style with CSS:

```css
.my-slider .swiper-slide {
  opacity: 0.4;
  transform: scale(0.75);
  transition: all 0.4s ease;
}

.my-slider .swiper-slide.pos-prev-1,
.my-slider .swiper-slide.pos-next-1 {
  opacity: 0.7;
  transform: scale(0.85);
}

.my-slider .swiper-slide.pos-active {
  opacity: 1;
  transform: scale(1.1);
  z-index: 10;
}
```

### Other use cases

```js
// Sync two sliders
slider1._swiperInstance.on('slideChange', () => {
  slider2._swiperInstance.slideTo(slider1._swiperInstance.activeIndex);
});

// Pause autoplay on hover
container.addEventListener('mouseenter', () => swiper.autoplay.stop());
container.addEventListener('mouseleave', () => swiper.autoplay.start());

// Add slide dynamically
swiper.appendSlide('<div class="swiper-slide">New slide</div>');
swiper.update();
```

---

## Runtime helpers

### Programmatic control

```js
swiper.slideNext();
swiper.slideTo(2);
swiper.update();  // if you added slides dynamically
```

### Destroy / rebuild

```js
window.initSwipers();    // (re)calculate which sliders should run now
window.recalcSwipers();  // alias of the line above
window.destroySwipers(); // clean‑up everything
```

---

## Debug mode

Enable verbose console warnings by setting a global flag **before** loading the script. Sliders missing required markup are skipped so other sliders can still initialise.

```html
<script>
  window.SWIPER_STARTER_DEBUG = true;
</script>
<script src="js/script.js"></script>
```

---

## Disabling a slider at break‑points

```html
<!-- Only load on tablets & up -->
<div class="slider-main_component" data-disable-below="768">
  …
</div>

<!-- Only load on mobile -->
<div class="slider-main_component" data-disable-above="767">
  …
</div>
```

Behaviour:

1. On page load the script checks viewport width against the attribute.
2. If the slider is disabled, it is **not** instantiated.
3. A debounced `resize` listener calls `window.recalcSwipers()`, so when you cross the boundary the instance is created or destroyed seamlessly.

---

## Examples

See **[test.html](test.html)** for interactive examples of all features.

### Bullet progress + disable on desktop

```html
<div
  class="slider-main_component"
  data-autoplay="3500"
  data-bullet-progress="true"
  data-disable-above="991"
>
  …
</div>
```

### Hero slider, autoplay only in view, mobile off

```html
<div
  class="slider-main_component"
  data-autoplay="3000"
  data-progress-bar="true"
  data-autoplay-inview="true"
  data-disable-below="480"
>
  …
</div>
```

### Fade effect with crossfade

```html
<div
  class="slider-main_component"
  data-effect="fade"
  data-crossfade="true"
  data-single-slide="true"
>
  …
</div>
```

### Free mode with variable widths

```html
<div
  class="slider-main_component"
  data-slides-per-view="auto"
  data-free-mode="true"
  data-space-between="16"
>
  <div class="swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" style="width: 400px">Wide</div>
      <div class="swiper-slide" style="width: 250px">Medium</div>
      <div class="swiper-slide" style="width: 180px">Narrow</div>
    </div>
  </div>
</div>
```

---

## CSS snippets

CSS from v1 still applies. (see CSS file)  Additions:

```css
/* Hide bullets / arrows in disabled state (optional) */
.slider-main_component[data-swiper-disabled] .swiper-bullet-wrapper,
.slider-main_component[data-swiper-disabled] .swiper-next,
.slider-main_component[data-swiper-disabled] .swiper-prev { display:none; }
```

*(The script toggles `data-swiper-disabled` on the container when an instance is torn down.)*

---

## Performance & edge cases

| Scenario               | Advice                                                                                                                                |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| Many images            | Use Swiper's `lazy` module or native `loading="lazy"`.                                                                                |
| 1 slide only           | By default nav/pagination/autoplay/touch are off. Remove that block in the script if you prefer otherwise.                           |
| 100+ bullets           | Consider disabling `bulletProgress` or using CSS‑only animations to avoid forced reflows.                                            |
| Frequent DOM mutations | `data-observer="true"` lets Swiper auto‑update, but large dynamic lists may benefit from manual `swiper.update()` to avoid thrashing.|
| Loop with few slides   | The script auto-clones slides when loop mode needs more slides than available. No action required.                                   |

---

## Changelog

### 2.2.0 – 2025‑05‑25

* **Smart loop cloning** – Loop mode now auto-duplicates slides when there aren't enough for smooth infinite scroll
* **Improved touch handling** – Auto-disables touch when slides don't overflow to prevent clunky snap-back
* **JS API documentation** – Added comprehensive section on hooking into Swiper instances for custom effects
* **Interactive examples page** – New `test.html` with live demos and code snippets for all features

### 2.1.0

* Minor bug fixes and stability improvements

### 2.0.0 – 2025‑05‑06

* Shared IntersectionObserver
* Break‑point disable logic (`data-disable-below/above`)
* Global destroy / recalc helpers
* Mouse‑wheel retained when touch disabled
* Deep‑merge array handling
* Config exposure (`_swiperConfig`)
* Throttled custom‑slider painting
* TypeScript‑ready JSDoc comments

---

## License

[MIT](LICENSE)
