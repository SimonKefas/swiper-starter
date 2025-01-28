# Swiper Starter Kit

A feature-rich [Swiper](https://swiperjs.com/) slider initializer script that offers:

- **Global & Per-Instance Configuration**  
- **Optional Top-Level Progress Bars**  
- **Optional Bullet-Based Progress Bars**  
- **Custom Draggable Sliders**  
- **Responsive Breakpoints**  
- **Single Slide Mode**  
- **Fade + CrossFade**  
- **Intersection-Based Autoplay** *(Autoplay only in view)*  

All are configured via **data attributes** on each slider container, or via **optional global defaults**.

---

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
  - [1. Include Swiper’s CSS and JS](#1-include-swipers-css-and-js)
  - [2. Include the Swiper Starter Kit Script](#2-include-the-swiper-starter-kit-script)
  - [3. Basic HTML Structure](#3-basic-html-structure)
  - [4. Optional Global Configuration](#4-optional-global-configuration)
  - [5. Integration](#5-integration)
- [Data Attributes](#data-attributes)
- [Examples](#examples)
  - [Basic Slider](#basic-slider)
  - [Progress Bar Slider](#progress-bar-slider)
  - [Bullet-Based Progress Bar](#bullet-based-progress-bar)
  - [Custom Draggable Slider](#custom-draggable-slider)
  - [Autoplay Only in View](#autoplay-only-in-view)
  - [Fade + CrossFade](#fade--crossfade)
- [Customization](#customization)
  - [CSS for the Top-Level Progress Bar](#css-for-the-top-level-progress-bar)
  - [CSS for Bullet-Based Progress Bars](#css-for-bullet-based-progress-bars)
  - [CSS for the Custom Range Slider](#css-for-the-custom-range-slider)
- [Notes & Edge Cases](#notes--edge-cases)
- [License](#license)

---

## Introduction

The **Swiper Starter Kit** builds upon [Swiper 11](https://swiperjs.com/), reducing boilerplate for multiple sliders on a single page. You can enable or disable each feature via data attributes, such as:

- **Autoplay** (time-based, optional intersection observer for in-view only)
- **Top-Level Progress Bar** or **Bullet-Based Progress Bars** (synchronized with the autoplay cycle)
- **Custom Draggable Sliders** 
- **Single Slide Mode**, **Fade/CrossFade**, **Loop** with correct bullet synchronization, and more.

---

## Features

1. **Global & Per-Instance Configuration**  
   Use `window.SwiperDefaults` for global defaults; override them with `data-` attributes on each slider.

2. **Optional Progress Bars**:
   - **Top-Level Bar** (`data-progress-bar="true"`)  
   - **Bullet-Based Progress** (`data-bullet-progress="true"`)  
   Single-run fills each slide cycle, ensuring correct timing.

3. **Loop Mode Fix**  
   When loop is `true`, we use `swiper.realIndex` to ensure bullets and custom sliders point to the correct “real” slide.

4. **Custom Draggable Sliders** (`data-custom-slider="true"`)  
   A range input that moves Swiper’s slides and updates on slide changes.

5. **Responsive Breakpoints**  
   `data-breakpoints` with a JSON string for different `slidesPerView`, `spaceBetween`, etc.

6. **Single Slide Mode** (`data-single-slide="true"`)  
   Forces 1 slide at all breakpoints, ignoring other configs.

7. **Fade + CrossFade**  
   If `data-effect="fade"` and `data-crossfade="true"`, content cross-fades per slide.

8. **Intersection-Based Autoplay** (`data-autoplay-inview="true"`)  
   Autoplay only while in view, pausing otherwise.

---

## Prerequisites

- **Swiper 11**  
- **Modern Browsers** (for Intersection Observer if using `data-autoplay-inview="true"`)
- **Basic HTML/CSS** knowledge to style progress bars or custom sliders.

---

## Installation

### 1. Include Swiper’s CSS and JS

In your `<head>`:

```html
<!-- Swiper CSS -->
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"
/>
```

Before `</body>` (or in `<head>`):

```html
<!-- Swiper JS -->
<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
```

### 2. Include the Swiper Starter Kit Script

After including Swiper:

```html
<script src="https://cdn.jsdelivr.net/gh/SimonKefas/swiper-starter@latest/js/script.js"></script>
```

### 3. Basic HTML Structure

Each slider container needs `.slider-main_component`, containing a `.swiper` element:

```html
<div class="slider-main_component" data-attributes...>
  <div class="swiper">
    <div class="swiper-wrapper">
      <!-- .swiper-slide elements -->
    </div>
    <!-- Optional pagination, navigation, scrollbar, etc. -->
  </div>
  <!-- Optional top-level progress bar -->
  <div class="swiper-progress-bar-wrapper">
    <div class="swiper-progress-bar"></div>
  </div>
  <!-- Optional custom slider wrapper -->
  <div class="custom-slider-wrapper">
    <input type="range" class="custom-slider" />
  </div>
</div>
```

### 4. Optional Global Configuration

You can define global defaults before including the script:

```html
<script>
  window.SwiperDefaults = {
    loop: true,
    autoplay: { delay: 3000, disableOnInteraction: false },
    speed: 500,
    slidesPerView: 1,
    spaceBetween: 10,
    // Additional config...
  };
</script>
```

### 5. Integration

On page load (`DOMContentLoaded`), the script automatically initializes all `.slider-main_component` elements, merging global defaults with the data attributes found on each container.

---

## Data Attributes

Attach to `.slider-main_component`:

- **`data-loop-mode`**: `"true"` or `"false"`
- **`data-autoplay`**: `"false"` or a delay in ms (e.g., `"3000"`)
- **`data-slider-duration`**: Transition speed in ms (e.g., `"600"`)
- **`data-effect`**: `"slide"`, `"fade"`, `"cube"`, `"coverflow"`, `"flip"`
- **`data-crossfade`**: `"true"` or `"false"` if using `"fade"`
- **`data-full-height`**: `"true"` or `"false"`
- **`data-progress-bar`**: `"true"` or `"false"` (top-level bar)
- **`data-bullet-progress`**: `"true"` or `"false"` (inject bullet-based progress bars)
- **`data-slides-per-view`**: e.g., `"1"`, `"auto"`, `"3"`
- **`data-space-between`**: e.g., `"20"`
- **`data-breakpoints`**: JSON string for custom breakpoints
- **`data-single-slide`**: `"true"` or `"false"` (forces 1 slide at all breakpoints)
- **`data-custom-slider`**: `"true"` or `"false"`
- **`data-slider-color`**: e.g., `"#FF5722"` for custom slider color
- **Advanced**:
  - `data-centered-slides`
  - `data-slides-per-group`
  - `data-watch-overflow`
  - `data-resistance-ratio`
  - `data-center-insufficient-slides`
  - `data-free-mode`
- **`data-autoplay-inview`**: `"true"` or `"false"` (Intersection Observer-based autoplay)

---

## Examples

### Basic Slider

```html
<div class="slider-main_component">
  <div class="swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide">Slide 1</div>
      <div class="swiper-slide">Slide 2</div>
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
      <div class="swiper-slide">Slide A</div>
      <div class="swiper-slide">Slide B</div>
    </div>
  </div>
  <div class="swiper-progress-bar-wrapper">
    <div class="swiper-progress-bar"></div>
  </div>
</div>
```

### Bullet-Based Progress Bar

```html
<div
  class="slider-main_component"
  data-autoplay="4000"
  data-bullet-progress="true"
  data-slides-per-view="3"
>
  <div class="swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide">Slide 1</div>
      <div class="swiper-slide">Slide 2</div>
      <div class="swiper-slide">Slide 3</div>
    </div>
    <div class="swiper-bullet-wrapper"></div>
  </div>
</div>
```

When `data-bullet-progress="true"`, the script injects `.bullet-progress` elements into each bullet, animating only the active bullet each slide cycle.

### Custom Draggable Slider

```html
<div class="slider-main_component" data-custom-slider="true">
  <div class="swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide">X</div>
      <div class="swiper-slide">Y</div>
      <div class="swiper-slide">Z</div>
    </div>
  </div>
  <div class="custom-slider-wrapper">
    <input type="range" class="custom-slider" />
  </div>
</div>
```

Dragging this slider calls `swiper.slideTo()`, and Swiper updates the slider’s value when slides change.

### Autoplay Only in View

```html
<div
  class="slider-main_component"
  data-autoplay="3000"
  data-progress-bar="true"
  data-autoplay-inview="true"
>
  <div class="swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide">Vis Slide 1</div>
      <div class="swiper-slide">Vis Slide 2</div>
    </div>
  </div>
  <div class="swiper-progress-bar-wrapper">
    <div class="swiper-progress-bar"></div>
  </div>
</div>
```

Autoplay stops when scrolled out of view, resuming when the slider is back in the viewport.

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
      <div class="swiper-slide">Fade A</div>
      <div class="swiper-slide">Fade B</div>
    </div>
  </div>
</div>
```

---

## Customization

### CSS for the Top-Level Progress Bar

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

The script triggers a **single-run** animation each slide cycle (`autoplay.delay + speed`).

### CSS for Bullet-Based Progress Bars

When `data-bullet-progress="true"`, each bullet gets a `.bullet-progress` child:

```css
.swiper-bullet {
  position: relative;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #ccc;
  margin: 0 4px;
  overflow: hidden;
}

/* The bullet-progress is inserted by JS */
.bullet-progress {
  position: absolute;
  top: 0;
  left: 0;
  width: 0%;
  height: 100%;
  background: #007aff; /* fill color */
  transition: width 0s linear; /* real duration set in JS */
}
```

On each new slide, the script resets all `.bullet-progress` to `width: 0%`, then animates only the active bullet’s fill from `0%` → `100%`.

### CSS for the Custom Range Slider

When `data-custom-slider="true"`, the script updates `--slider-color` and `--value-percent`. Example:

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
}

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

.custom-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 27px;
  height: 27px;
  margin-top: -11px;
  background: var(--slider-color);
  border-radius: 50%;
  cursor: pointer;
}
```

---

## Notes & Edge Cases

1. **Loop Mode & `realIndex`**  
   In loop mode, we use `swiper.realIndex` to ensure correct bullet or custom slider alignment.

2. **First Slide Fill**  
   The script starts progress for the first slide in `on.afterInit`, ensuring the **initial** slide’s progress is visible.

3. **Manual Interactions**  
   If the user clicks bullets or drags the custom slider, autoplay can reset or pause. The script cancels animations and restarts them fresh when the next slide change occurs.

4. **One-Slide Scenario**  
   If only one slide is present, navigation, pagination, and autoplay are automatically disabled.

5. **Intersection Observer**  
   If `data-autoplay-inview="true"`, autoplay only runs while that slider is scrolled into view (≥ 20% by default). This can be configured in the script if you want a different threshold.

---

## License

This project is provided under the [MIT License](LICENSE). You can freely copy, modify, and distribute it.