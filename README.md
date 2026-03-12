# Swiper Starter Kit v2.5 – Complete Documentation

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
| **Static slider toggle** *(v2.3)*             | `data-static-slider="true"` disables all interaction/controls in one flag—ideal for marquee or hero strips.                                                                                |
| **All slides active** *(v2.4)*                | `data-all-slides-active="true"` dynamically calculates trailing offset so every slide—including the last—can become the active (leftmost) slide. Works with `auto` and numeric `slidesPerView`. |
| **Manual offset attributes** *(v2.4)*         | `data-slides-offset-after` / `data-slides-offset-before` for manual pixel offsets when you need precise control.                                                                            |
| **Video auto-pause** *(v2.5)*                 | Videos automatically pause when their slide becomes inactive. Supports native `<video>`, YouTube, Vimeo, and Webflow background videos. Enabled by default; opt-out with `data-video-pause="false"`. |

**No breaking changes**

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
* **Static slider toggle** (`data-static-slider`) for non-interactive marquee strips
* **All slides active** (`data-all-slides-active`) – dynamic offset so every slide can be leftmost/active
* **Manual offset** (`data-slides-offset-after` / `data-slides-offset-before`) for fine-tuned control
* **Video auto-pause** – automatically pauses videos on inactive slides (native video, YouTube, Vimeo, Webflow)

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
| `data-static-slider`                  | `"true"`                            | Disable touch/nav/pagination/mousewheel/keyboard in one flag. |
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
| `data-disable-mousewheel`            | `"true"`                            | Disable trackpad / mousewheel navigation.     |
| **Slide offset & active control**     |                                     |                                               |
| `data-all-slides-active`             | `"true"`                            | Dynamic trailing offset so every slide can become active (leftmost). |
| `data-slides-offset-after`           | `200` (px)                          | Manual trailing space after last slide.       |
| `data-slides-offset-before`          | `200` (px)                          | Manual leading space before first slide.      |
| **Break‑point disabling**             |                                     |                                               |
| `data-disable-below`                  | `768`                               | Don't instantiate when `viewport < 768 px`.   |
| `data-disable-above`                  | `991`                               | Don't instantiate when `viewport > 991 px`.   |
| **Video control**                     |                                     |                                               |
| `data-video-pause`                    | `"true"` (default) / `"false"`      | Pause videos on inactive slides. Enabled by default. |
| `data-video-autoplay`                 | `"true"` / `"false"` (default)      | Auto-play videos when their slide becomes active. Disabled by default. |
| `data-video-persist` *(on slide)*     | attribute presence                  | Keep video playing when this specific slide becomes inactive. |
| `data-video-autoplay` *(on slide)*    | attribute presence                  | Auto-play video on this specific slide when it becomes active. |

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

### Version check

```js
console.log(SwiperStarterKit.version); // "2.4.0"
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

### Timeline / history slider where every slide can be active

```html
<div
  class="slider-main_component"
  data-slides-per-view="auto"
  data-space-between="40"
  data-all-slides-active="true"
  data-autoplay="false"
>
  <div class="swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" style="width: 30%">2005</div>
      <div class="swiper-slide" style="width: 30%">2010</div>
      <div class="swiper-slide" style="width: 30%">2015</div>
      <div class="swiper-slide" style="width: 30%">2020</div>
      <div class="swiper-slide" style="width: 30%">2025</div>
    </div>
  </div>
  <button class="swiper-prev"></button>
  <button class="swiper-next"></button>
</div>
```

Notes:
- The offset is calculated dynamically from the container width, last slide width, and gap — no hardcoded values needed.
- Recalculates automatically on resize.
- Works with both `slidesPerView: "auto"` (CSS-driven widths) and numeric values like `3` or `4`.

### Video slider with auto-pause and auto-play

Videos automatically pause when navigating away from their slide. Optionally, videos can auto-play when their slide becomes active.

```html
<div class="slider-main_component" data-autoplay="false" data-video-autoplay="true">
  <div class="swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide">
        <video src="video1.mp4" controls muted></video>
      </div>
      <div class="swiper-slide">
        <iframe src="https://www.youtube.com/embed/VIDEO_ID?enablejsapi=1"></iframe>
      </div>
      <div class="swiper-slide">
        <iframe src="https://player.vimeo.com/video/VIDEO_ID"></iframe>
      </div>
    </div>
  </div>
  <button class="swiper-prev"></button>
  <button class="swiper-next"></button>
</div>
```

Notes:
- **Pause is enabled by default** – videos pause when leaving a slide.
- **Auto-play is opt-in** – add `data-video-autoplay="true"` on the container.
- **Slider autoplay pauses while video plays** – when `data-video-autoplay` is enabled, the slider won't advance while a video is playing. It resumes when the video pauses or ends.
- Add `data-video-autoplay` on individual slides to enable auto-play only for specific slides.
- Add `data-video-persist` on slides to keep their videos playing when navigating away.
- YouTube embeds require `enablejsapi=1` in the URL for play/pause commands to work.
- Native videos should have `muted` attribute for auto-play to work reliably (browser policy).

### Continuous, non-interactive marquee with random tilt

```html
<div
  class="slider-main_component slider-gallery"
  data-slides-per-view="auto"
  data-space-between="22"
  data-loop-mode="true"
  data-autoplay="1"
  data-slider-duration="14000"
  data-free-mode="true"
  data-resistance-ratio="0"
  data-static-slider="true"
>
  <div class="swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide"><img src="..." alt="Gallery 1"></div>
      <div class="swiper-slide"><img src="..." alt="Gallery 2"></div>
      <!-- more slides -->
    </div>
  </div>
</div>
```

Notes:
- `data-static-slider="true"` switches off touch, nav, pagination, mousewheel, and keyboard.
- Use `data-slider-duration` + `data-autoplay="1"` for steady marquee pace; add `transition-timing-function: linear` to the wrapper if you want perfectly uniform motion.
- The example in `test.html` also randomises a per-card `--tilt` / `--lift` for a polaroid wall vibe.

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

### 2.5.2 – 2026‑03‑12

* **Slider pauses for video playback** – When `data-video-autoplay` is enabled, slider autoplay automatically pauses while a video is playing and resumes when the video pauses or ends.
* Works with native `<video>`, YouTube iframes, and Vimeo iframes.

### 2.5.1 – 2026‑03‑12

* **Video auto-play** – New `data-video-autoplay="true"` attribute to auto-play videos when their slide becomes active.
* Can be set on container (all slides) or individual slides.
* Works with native `<video>`, YouTube, Vimeo, and Webflow background videos.
* Note: Browser policies may require videos to be muted for auto-play to work.

### 2.5.0

* **Video auto-pause** – Videos on inactive slides are automatically paused when navigating. Supports native HTML5 `<video>`, YouTube iframes, Vimeo iframes, and Webflow background videos.
* Enabled by default; opt-out globally with `data-video-pause="false"` on the container.
* Exempt individual slides with `data-video-persist` attribute.

### 2.4.0

* **All slides active** – New `data-all-slides-active="true"` attribute dynamically calculates `slidesOffsetAfter` based on container width, slide width, and gap so every slide (including the last) can become the active (leftmost) slide. Recalculates on resize. Works with `slidesPerView: "auto"` and numeric values.
* **Manual offset attributes** – `data-slides-offset-after` and `data-slides-offset-before` for precise manual control of trailing/leading space (supports px values and CSS variables).

### 2.3.3 – 2026‑02‑24

* **Fix static slider trackpad bypass** – `data-static-slider="true"` now correctly blocks two-finger trackpad / mousewheel navigation. The mousewheel-fallback logic no longer overrides an explicit `mousewheel: false`.
* **Reduced trackpad sensitivity** – Added `mousewheel.thresholdDelta` (10) and `mousewheel.thresholdTime` (500 ms) defaults to prevent accidental multi-slide scrolling from trackpad gestures.
* **New `data-disable-mousewheel`** – Disables trackpad / mousewheel navigation while keeping touch drag enabled.
* **Version API** – `SwiperStarterKit.version` exposes the current kit version at runtime.

### 2.3.0 – 2025‑12‑11

* **Static slider toggle** – `data-static-slider="true"` disables all interaction/controls in one flag for marquee/hero strips.
* **Continuous gallery example** – Added a marquee-style demo with linear motion and random per-card rotation (`test.html`).
* **Linear marquee** – Gallery wrapper now uses a linear timing function for constant speed, plus zero resistance for smoother movement.

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
