# Swiper Starter Kit v2 – Complete Documentation

> A zero‑config, attribute‑driven wrapper around [Swiper 11+](https://swiperjs.com/), rebuilt for performance, scalability, and modern workflow needs.

---

## Table of Contents

1. [What’s new in v2](#whats-new-in-v2)
2. [Features](#features)
3. [Quick start](#quick-start)
   3.1 [Prerequisites](#prerequisites)
   3.2 [Installation](#installation)
   3.3 [Basic HTML skeleton](#basic-html-skeleton)
4. [Global defaults](#global-defaults)
5. [Data‑attribute reference](#data-attribute-reference)
   5.1 [Core attributes](#core-attributes)
   5.2 [Advanced attributes](#advanced-attributes)
6. [Runtime helpers](#runtime-helpers)
7. [Disabling a slider at break‑points](#disabling-a-slider-at-break-points)
8. [Examples](#examples)
9. [CSS snippets](#css-snippets)
10. [Performance & edge cases](#performance--edge-cases)
11. [Changelog](#changelog)
12. [License](#license)

---

## What’s new in v2

| Enhancement                                   | Details                                                                                                                                                                                     |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **One shared `IntersectionObserver`**         | All `data-autoplay-inview="true"` sliders now share a single observer for lower memory/CPU.                                                                                                 |
| **Break‑point disabling**                     | `data-disable-below="768"` or `data-disable-above="991"` cleanly destroy or re‑create sliders on `resize`.                                                                                  |
| **Destroy & recalc helpers**                  | <br>• `window.destroySwipers()` – disconnects observers and destroys all instances.<br>• `window.recalcSwipers()` – (re)creates or destroys sliders based on current viewport / attributes. |
| **Mouse‑wheel preserved when touch disabled** | If you set `data-disable-touch="true"`, users can still scroll with a wheel or trackpad.                                                                                                    |
| **Deep‑merge‑with‑arrays**                    | Arrays are now cloned instead of carrying references across instances.                                                                                                                      |
| **Config exposure**                           | Every container now has `_swiperConfig` (frozen copy) next to `_swiperInstance`.                                                                                                            |
| **Custom‑slider repaint throttle**            | Smoother range‑slider scrubbing via `requestAnimationFrame`.                                                                                                                                |
| **Type‑safety ready**                         | JSDoc typedefs mean you can rename the file to `.ts` and immediately benefit from TypeScript.                                                                                               |

**No breaking changes** – existing sliders continue to work unless you add the new attributes.

---

## Features

* Global + per‑instance config merge (`window.SwiperDefaults` + `data-*`)
* Optional **top‑level** or **bullet‑level** progress bars
* Custom `<input type="range">` navigation slider
* Autoplay gated by **Intersection Observer**
* Prefers‑reduced‑motion handling (opt‑in)
* Mutation observer support (`data-observer="true"`)
* Automatic single‑slide fall‑backs
* Fade / cross‑fade effect
* **Disable‑at‑break‑point** logic *(new)*
* Destroy / recalc helpers *(new)*

---

## Quick start

### Prerequisites

* Swiper 11 or 12
* Modern browser (Intersection Observer is now 96 %+ supported)

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

> **Tip:** Pin to a tag (`@v2.0.0`) or commit hash to avoid surprises.

### Basic HTML skeleton

```html
<div class="slider-main_component" data-autoplay="3000">
  <div class="swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide">Slide 1</div>
      <div class="swiper-slide">Slide 2</div>
    </div>

    <!-- Optional UI -->
    <div class="swiper-bullet-wrapper"></div>
    <div class="swiper-next"></div>
    <div class="swiper-prev"></div>
    <div class="swiper-drag-wrapper"></div>
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
    // anything from Swiper’s API or the custom flags below
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
| `data-breakpoints`            | JSON string               | Full Swiper breakpoint object. Example of Webflow valid attribute object: {'768': { 'slidesPerView': 1 }, '992': { 'slidesPerView': 2 }}         |
| `data-progress-bar`           | `"true"`                  | Top‑level progress fill.               |
| `data-bullet-progress`        | `"true"`                  | Per‑bullet timed fills.                |
| `data-custom-slider`          | `"true"`                  | Enable `<input type="range">` control. |
| `data-autoplay-inview`        | `"true"`                  | Starts autoplay only when visible.     |
| `data-intersection-threshold` | float (0‑1)               | Optional threshold override.           |

### All/advanced attributes

| Attribute                             | Type / Example                      | Description                                   |
| ------------------------------------- | ----------------------------------- | --------------------------------------------- |
| **Layout / sizing**                   |                                     |                                               |
| `data-full-height`                    | `"true"`                            | Force each slide to `height:100%`.            |
| `data-slides-per-view`                | `3` \| `"auto"`                     | Swiper’s `slidesPerView`.                     |
| `data-space-between`                  | `16`                                | Gap between slides (px).                      |
| `data-breakpoints`                    | `{ "768": { "slidesPerView": 2 } }` | Full breakpoint JSON. Example of valid Webflow attribute object: {'768': { 'slidesPerView': 1 }, '992': { 'slidesPerView': 2 }}                         |
| `data-centered-slides`                | `"true"`                            | Enable Swiper’s centred mode.                 |
| `data-center-insufficient-slides`     | `"true"`                            | Centre when slide count < visible count.      |
| **Navigation & interaction**          |                                     |                                               |
| `data-loop-mode`                      | `"true"`                            | Enable looping.                               |
| `data-autoplay`                       | `4000` (ms) \| `"false"`            | Autoplay delay or disable.                    |
| `data-slider-duration`                | `600` (ms)                          | Transition speed.                             |
| `data-effect` / `data-crossfade`      | `"fade"` / `"true"`                 | Swiper effect + crossfade.                    |
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
| \*\*Break‑point disabling *(v2)* \*\* |                                     |                                               |
| `data-disable-below`                  | `768`                               | Don’t instantiate when `viewport < 768 px`.   |
| `data-disable-above`                  | `991`                               | Don’t instantiate when `viewport > 991 px`.   |

*(Put multiple attributes together as needed; the script merges them with global defaults.)*

---

## Runtime helpers

### Accessing an instance

```js
const container = document.querySelector('.slider-main_component');
const swiper    = container._swiperInstance;   // Swiper API
const config    = container._swiperConfig;     // frozen copy
```

### Programmatic control

```js
swiper.slideNext();
swiper.update();                // if you added slides dynamically
```

### Destroy / rebuild

```js
window.initSwipers();    // (re)calculate which sliders should run now
window.recalcSwipers();  // alias of the line above
window.destroySwipers(); // clean‑up everything
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

---

## CSS snippets

CSS from v1 still applies. (see CSS file)  Additions:

```css
/* Hide bullets / arrows in disabled state (optional) */
.slider-main_component[data-swiper-disabled] .swiper-bullet-wrapper,
.slider-main_component[data-swiper-disabled] .swiper-next,
.slider-main_component[data-swiper-disabled] .swiper-prev { display:none; }
```

*(The script toggles `data-swiper-disabled` on the container when an instance is torn down.)*

---

## Performance & edge cases

| Scenario               | Advice                                                                                                                                |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| Many images            | Use Swiper’s `lazy` module or native `loading="lazy"`.                                                                                |
| 1 slide only           | By default nav/pagination/autoplay/touch are off. Remove that block in the script if you prefer otherwise.                            |
| 100+ bullets           | Consider disabling `bulletProgress` or using CSS‑only animations to avoid forced reflows.                                             |
| Frequent DOM mutations | `data-observer="true"` lets Swiper auto‑update, but large dynamic lists may benefit from manual `swiper.update()` to avoid thrashing. |

---

## Changelog

### 2.0.0 – 2025‑05‑06

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