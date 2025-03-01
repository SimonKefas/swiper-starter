# Swiper Starter Kit (Revamped)

A feature-rich [Swiper](https://swiperjs.com/) slider initializer script, extended for:

- **Global & Per-Instance Configuration**  
- **Optional Progress Bars (Top-Level or Bullet-Based)**  
- **Custom Draggable Range Sliders**  
- **Responsive Breakpoints**  
- **Intersection-Based Autoplay** *(Autoplay only in view)*  
- **`prefers-reduced-motion`** Handling (Optional)  
- **Observer/Mutation Support**  
- **Single Slide Mode**  
- **Fade + CrossFade**  

All via **data attributes** on each slider container, plus **optional global defaults**.

---

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
  - [1. Include Swiper’s CSS and JS](#1-include-swipers-css-and-js)
  - [2. Include the Script](#2-include-the-script)
  - [3. Basic HTML Structure](#3-basic-html-structure)
  - [4. Optional Global Configuration](#4-optional-global-configuration)
  - [5. Integration](#5-integration)
- [Data Attributes](#data-attributes)
  - [Key Attributes](#key-attributes)
  - [Advanced Attributes](#advanced-attributes)
- [Additional Features & Notes](#additional-features--notes)
  - [Single-Slide Scenario](#single-slide-scenario)
  - [Intersection Observer Threshold](#intersection-observer-threshold)
  - [Disable Features per Instance](#disable-features-per-instance)
  - [Observer & Observe Parents](#observer--observe-parents)
  - [Storing Swiper Instance](#storing-swiper-instance)
  - [Reduced Motion Handling (Optional)](#reduced-motion-handling-optional)
  - [Allow Loop With Fewer Slides](#allow-loop-with-fewer-slides)
- [Examples](#examples)
  - [Basic Slider](#basic-slider)
  - [Progress Bar Slider](#progress-bar-slider)
  - [Bullet-Based Progress Slider](#bullet-based-progress-slider)
  - [Custom Draggable Range Slider](#custom-draggable-range-slider)
  - [Autoplay Only in View](#autoplay-only-in-view)
  - [Fade + CrossFade](#fade--crossfade)
  - [Observer/Mutation Example](#observermutation-example)
- [CSS Snippets](#css-snippets)
  - [Top-Level Progress Bar](#top-level-progress-bar)
  - [Bullet-Based Progress Bars](#bullet-based-progress-bars)
  - [Custom Range Slider](#custom-range-slider)
- [Edge Cases & Performance Tips](#edge-cases--performance-tips)
- [License](#license)

---

## Introduction

This **Swiper Starter Kit** script initializes multiple Swiper instances at once, each governed by **data attributes** and optional **global defaults**. It includes features like:

- **Intersection-based autoplay** (start autoplay only when the slider is scrolled into view).  
- **Bullet-based progress bars** (each bullet animates per slide).  
- **Top-level progress bar** (animated each autoplay cycle).  
- **Custom range input** for navigation.  
- **Single-slide detection** (automatically disables nav/pagination/autoplay).  
- **Prefers-reduced-motion** snippet (optional) to respect user OS settings.

---

## Features

1. **Global & Per-Instance Config**  
   - Merge user’s `window.SwiperDefaults` with data attributes on each container.

2. **Progress Bars**  
   - **Top-Level**: Single-run fill each cycle (`data-progress-bar="true"`).  
   - **Bullet-Based**: Animates each bullet for its active slide (`data-bullet-progress="true"`).

3. **Custom Draggable Range Sliders**  
   - `data-custom-slider="true"` to let users drag a slider to jump between slides.

4. **Responsiveness & Breakpoints**  
   - Define via `data-breakpoints` (a JSON string) or standard `slidesPerView`, `spaceBetween`.

5. **Optional Intersection Observer**  
   - Autoplay only while in view (`data-autoplay-inview="true"`), threshold adjustable with `data-intersection-threshold="0.5"`.

6. **Observer/Mutation Support**  
   - `data-observer="true"` auto-updates layout when slides or container sizes change.

7. **Single Slide Mode**  
   - If there is only one slide, auto-disables navigation/pagination/touch unless you choose otherwise.

8. **Fade + CrossFade**  
   - For a smooth fade effect between slides (`data-effect="fade"`, `data-crossfade="true"`).

9. **Zero or Minimal JavaScript Setup**  
   - Everything is triggered automatically on `DOMContentLoaded`.

---

## Prerequisites

- **Swiper 11+**  
  - If you’re using older versions, there may be minor incompatibilities.  
- **Modern Browsers**  
  - Intersection Observer features are widely supported, but older browsers may need polyfills.

---

## Installation

### 1. Include Swiper’s CSS and JS

In your `<head>`:

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"
/>
```

Before `</body>` or in `<head>`:

```html
<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
```

### 2. Include the Script

After including Swiper, embed or link to the **revamped Swiper Starter Kit**:

```html
<script src="https://cdn.jsdelivr.net/gh/SimonKefas/swiper-starter@latest/js/script.js"></script>
```

*(You can rename the file as you prefer.)*

### 3. Basic HTML Structure

Wrap each slider in a `.slider-main_component` with an inner `.swiper` container:

```html
<div class="slider-main_component" data-some-attributes="...">
  <div class="swiper">
    <div class="swiper-wrapper">
      <!-- .swiper-slide elements -->
      <div class="swiper-slide">Slide 1</div>
      <div class="swiper-slide">Slide 2</div>
      <!-- etc. -->
    </div>
    <!-- Optional pagination, navigation, scrollbar -->
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
    <input type="range" class="custom-slider" />
  </div>
</div>
```

### 4. Optional Global Configuration

Before the `<script>` that loads the starter kit, define `window.SwiperDefaults` to override global defaults:

```html
<script>
  window.SwiperDefaults = {
    loop: true,
    speed: 500,
    autoplay: { delay: 3000, disableOnInteraction: false },
    keyboard: { enabled: true, onlyInViewport: true },
    // etc.
  };
</script>
```

### 5. Integration

On page load, the script auto-initializes all `.slider-main_component` elements. You can store a reference to each Swiper instance via:

```js
// The script attaches each Swiper instance to the container:
// container._swiperInstance
```

So you can do:
```js
document
  .querySelectorAll(".slider-main_component")
  .forEach(container => {
    const swiper = container._swiperInstance;
    // e.g. swiper.update() after adding slides dynamically
  });
```

---

## Data Attributes

### Key Attributes

- **`data-loop-mode`**: `"true"` or `"false"`  
  Whether to loop slides.
- **`data-autoplay`**: `"false"` or numeric (delay in ms)  
  For example, `data-autoplay="3000"` → 3s per slide.
- **`data-slider-duration`**: numeric (transition speed in ms)  
  e.g. `data-slider-duration="600"`.
- **`data-effect`**: `"slide"`, `"fade"`, or other Swiper effects.  
- **`data-crossfade`**: `"true"` or `"false"` when `data-effect="fade"`.
- **`data-full-height`**: `"true"` to set each slide to `height: 100%`.
- **`data-progress-bar`**: `"true"` for a top-level progress bar.
- **`data-bullet-progress`**: `"true"` to add a progress fill to each bullet.
- **`data-slides-per-view`**: integer or `"auto"`.
- **`data-space-between`**: integer (px).
- **`data-breakpoints`**: JSON string defining breakpoints.  
  Example:  
  ```html
  data-breakpoints='{
    "480": { "slidesPerView": 1, "spaceBetween": 10 },
    "768": { "slidesPerView": 2, "spaceBetween": 16 }
  }'
  ```
- **`data-single-slide`**: `"true"` to force 1 slide at all breakpoints.  

### Advanced Attributes

- **`data-centered-slides`**: center active slides within container.
- **`data-slides-per-group`**: integer (how many slides to advance at once).
- **`data-watch-overflow`**: `"true"` (enable or disable watchOverflow).
- **`data-resistance-ratio`**: float, e.g. `0.85`.
- **`data-center-insufficient-slides`**: `"true"` to center if slides < slidesPerView.
- **`data-free-mode`**: `"true"` for free mode scrolling.
- **`data-slider-color`**: e.g. `"#FF5722"` to color the custom slider or bullet progress bar.
- **`data-autoplay-inview`**: `"true"` (Intersection Observer-based autoplay).
- **`data-intersection-threshold`**: float, e.g. `0.5` (use with `data-autoplay-inview`).
- **`data-observer`**: `"true"` to enable `observer` and `observeParents` in Swiper (react to DOM changes).

#### Disable Features per Instance
- **`data-disable-navigation`**: `"true"` → remove next/prev arrows for that slider.
- **`data-disable-pagination`**: `"true"` → remove bullet pagination.
- **`data-disable-touch`**: `"true"` → disable touch/drag swiping.

---

## Additional Features & Notes

### Single-Slide Scenario
If there is only **one** slide, the script automatically disables navigation, pagination, autoplay, and touch. This avoids unexpected bullet or nav arrows. If you *do* want to keep them, remove or comment out the relevant lines in the script.

### Intersection Observer Threshold
For **autoplay only in view**, the default threshold is `0.2` (20%). You can override that via `data-intersection-threshold="0.5"`. The slider must be **≥ 50%** visible in the viewport to autoplay.

### Disable Features per Instance
- `data-disable-navigation="true"` hides `.swiper-next` and `.swiper-prev`.
- `data-disable-pagination="true"` hides `.swiper-bullet-wrapper`.
- `data-disable-touch="true"` sets `allowTouchMove = false`.

### Observer & Observe Parents
- `data-observer="true"` → sets Swiper’s `observer` and `observeParents` to `true`. If your slider or its parent containers resize or get new slides, Swiper auto-updates.

### Storing Swiper Instance
After initialization, the code attaches each instance to `container._swiperInstance`. Access it for `.update()`, `.slideNext()`, etc.

### Reduced Motion Handling (Optional)
Inside the code, you’ll see a commented-out snippet checking `window.matchMedia('(prefers-reduced-motion: reduce)')`.  
If you want to automatically disable or slow autoplay for those users, **uncomment** that snippet.

### Allow Loop With Fewer Slides
By default, if `slidesCount <= maxSlidesPerView`, we set `loop = false` to prevent awkward bullet behavior. If you’d rather keep loop turned on, just remove that condition.

---

## Examples

### Basic Slider

```html
<div class="slider-main_component">
  <div class="swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide">Slide 1</div>
      <div class="swiper-slide">Slide 2</div>
      <div class="swiper-slide">Slide 3</div>
    </div>
    <div class="swiper-bullet-wrapper"></div>
    <div class="swiper-next"></div>
    <div class="swiper-prev"></div>
  </div>
</div>
```

### Progress Bar Slider

```html
<div class="slider-main_component" data-autoplay="3000" data-progress-bar="true">
  <div class="swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide">A</div>
      <div class="swiper-slide">B</div>
      <div class="swiper-slide">C</div>
    </div>
  </div>
  <div class="swiper-progress-bar-wrapper">
    <div class="swiper-progress-bar"></div>
  </div>
</div>
```

### Bullet-Based Progress Slider

```html
<div
  class="slider-main_component"
  data-autoplay="4000"
  data-bullet-progress="true"
  data-slides-per-view="3"
>
  <div class="swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide">1</div>
      <div class="swiper-slide">2</div>
      <div class="swiper-slide">3</div>
    </div>
    <div class="swiper-bullet-wrapper"></div>
  </div>
</div>
```

### Custom Draggable Range Slider

```html
<div class="slider-main_component" data-custom-slider="true">
  <div class="swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide">Alpha</div>
      <div class="swiper-slide">Beta</div>
      <div class="swiper-slide">Gamma</div>
    </div>
  </div>
  <div class="custom-slider-wrapper">
    <input type="range" class="custom-slider" />
  </div>
</div>
```

### Autoplay Only in View

```html
<div
  class="slider-main_component"
  data-autoplay="3000"
  data-progress-bar="true"
  data-autoplay-inview="true"
  data-intersection-threshold="0.5"
>
  <div class="swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide">Hello</div>
      <div class="swiper-slide">World</div>
    </div>
  </div>
  <div class="swiper-progress-bar-wrapper">
    <div class="swiper-progress-bar"></div>
  </div>
</div>
```
This slider only autoplays when at least **50%** visible (threshold = 0.5).

### Fade + CrossFade

```html
<div
  class="slider-main_component"
  data-effect="fade"
  data-crossfade="true"
  data-autoplay="2500"
>
  <div class="swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide">Fade Slide 1</div>
      <div class="swiper-slide">Fade Slide 2</div>
    </div>
  </div>
</div>
```

### Observer/Mutation Example

```html
<div class="slider-main_component" data-observer="true" data-loop-mode="true">
  <div class="swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide">Slide A</div>
      <div class="swiper-slide">Slide B</div>
    </div>
    <div class="swiper-bullet-wrapper"></div>
  </div>
</div>
```

If you programmatically insert a new `.swiper-slide`, Swiper will detect it and update automatically.

---

## CSS Snippets

### Top-Level Progress Bar

```css
@keyframes swiper-progress-bar-animation {
  from {
    transform: scaleX(0);
    transform-origin: left;
  }
  to {
    transform: scaleX(1);
    transform-origin: left;
  }
}

.swiper-progress-bar-wrapper {
  position: relative;
  width: 100%;
  height: 4px;
  background: rgba(0, 0, 0, 0.1);
}

.swiper-progress-bar {
  width: 100%;
  height: 100%;
  background: #007aff;
  transform: scaleX(0);
  transform-origin: left;
}
```

### Bullet-Based Progress Bars

```css
.swiper-bullet {
  position: relative;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #ccc;
  margin: 0 4px;
  overflow: hidden; /* ensures .bullet-progress stays clipped */
}

.bullet-progress {
  position: absolute;
  top: 0;
  left: 0;
  width: 0%;
  height: 100%;
  background: #007aff; /* fill color */
  transition: width 0s linear; /* real timing is set in JS */
}
```

### Custom Range Slider

```css
.custom-slider {
  --slider-color: #007aff; /* fallback */
  --value-percent: 0%;
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 5px;
  background: transparent;
  cursor: pointer;
  outline: none; /* for a cleaner look; ensure focus styles if needed */
}

/* Track styling */
.custom-slider::-webkit-slider-runnable-track {
  height: 5px;
  border-radius: 4px;
  background: linear-gradient(
    to right,
    var(--slider-color) 0%,
    var(--slider-color) var(--value-percent),
    #ccc var(--value-percent),
    #ccc 100%
  );
}
.custom-slider::-moz-range-track {
  /* For Firefox */
  height: 5px;
  border-radius: 4px;
  background: linear-gradient(
    to right,
    var(--slider-color) 0%,
    var(--slider-color) var(--value-percent),
    #ccc var(--value-percent),
    #ccc 100%
  );
}

/* Thumb styling */
.custom-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 27px;
  height: 27px;
  margin-top: -11px; /* align thumb vertically */
  background: var(--slider-color);
  border-radius: 50%;
  cursor: pointer;
}
.custom-slider::-moz-range-thumb {
  /* For Firefox */
  width: 27px;
  height: 27px;
  background: var(--slider-color);
  border-radius: 50%;
  cursor: pointer;
}
```

---

## Edge Cases & Performance Tips

1. **Many Images / Lazy Loading**  
   If your slides contain large images, consider using Swiper’s [lazy loading module](https://swiperjs.com/swiper-api#lazy). Import or enable `lazy: { ... }` in the global defaults or data attributes.

2. **Single-Slide “Hero”**  
   By default, the script disables navigation & autoplay if there is only 1 slide. If you still want arrows or autoplay for a single “hero” slide, remove or comment out that block in the script.

3. **Dynamically Adding Slides**  
   If you do *not* enable `data-observer="true"`, you must manually call  
   ```js
   container._swiperInstance.update();
   ```  
   after adding or removing `.swiper-slide` elements.

4. **Loop with < slidesPerView**  
   The script forces `loop = false` if slides are fewer than or equal to `maxSlidesPerView`. If you want continuous looping, remove that condition.

5. **Performance**  
   - Minimizing reflows: The script uses forced reflows (`void x.offsetWidth`) for bullet progress bars. This is typically fine for small slide counts. For extremely large slide sets, consider more efficient height or progress logic.  
   - Using Intersection Observer means less CPU overhead for autoplay when off-screen.

---

## License

This project is provided under the [MIT License](LICENSE). You can freely copy, modify, and distribute it as you see fit.

---

**Enjoy using the revamped Swiper Starter Kit!** If you have questions or need custom modifications, feel free to reach out.