# Swiper Starter Kit

A comprehensive [Swiper](https://swiperjs.com/) slider initializer script that offers:

- **Global & Per-Instance Configuration**  
- **Top-Level Progress Bars**  
- **Bullet-Based Progress Bars**  
- **Custom Draggable Sliders**  
- **Responsive Breakpoints**  
- **Single Slide Mode**  
- **Custom Slider Colors**  
- **Intersection-Based Autoplay** *(Play only while in view)*  
- **Fade + CrossFade Support**  

All configured via **data attributes** on each slider container, or via optional **global defaults**.

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
  - [4. (Optional) Global Configuration](#4-optional-global-configuration)
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
  - [Styling the Top-Level Progress Bar](#styling-the-top-level-progress-bar)
  - [Styling Bullet-Based Progress Bars](#styling-bullet-based-progress-bars)
  - [Styling the Range Slider](#styling-the-range-slider)
- [Notes & Edge Cases](#notes--edge-cases)
- [License](#license)

---

## Introduction

The **Swiper Starter Kit** is built around [Swiper 11](https://swiperjs.com/). It aims to reduce repetitive boilerplate when integrating Swiper across multiple sliders on a single page. Each slider can have distinct settings, such as autoplay intervals, progress bars, custom draggable range sliders, bullet-based progress animations, and advanced breakpoints.

---

## Features

1. **Global & Per-Instance**: Define global defaults with `window.SwiperDefaults`, then override via data attributes on each slider container.
2. **Progress Bars**: 
   - *Top-Level Bar*: A large progress bar at the bottom or top of your slider.
   - *Bullet-Based Bar*: Each bullet can have a small fill that tracks the active slide’s progress.
3. **Autoplay Sync**: Single-run animations each time a new slide starts, ensuring correct timing if the user drags or cancels autoplay.
4. **Intersection-Based Autoplay**: Only run autoplay when the slider is in view (`data-autoplay-inview="true"`).
5. **Custom Range Slider**: A draggable `input[type="range"]` that moves Swiper’s active slide, also updates when Swiper slides change.
6. **Responsive Breakpoints**: Adjust slides and spacing for different screen widths.
7. **Single Slide Mode**: Force `slidesPerView: 1` across breakpoints with `data-single-slide="true"`.
8. **Fade + CrossFade**: If `data-effect="fade"` and `data-crossfade="true"`, the slides fade with cross-fading of content.
9. **Advanced**: Additional attributes such as `data-centered-slides`, `data-slides-per-group`, `data-watch-overflow`, etc.

---

## Prerequisites

- **Swiper 11** (older or newer versions may also work, but this script is tested with v11).
- **Modern Browser** for Intersection Observer usage (or provide a fallback if needed).
- **Basic HTML/CSS** knowledge to style progress bars or slider tracks.

---

## Installation

1. **Download or reference the `swiper-initializer.js`** script from your repository or via a CDN:
   
   ```html
   <script src="https://cdn.jsdelivr.net/gh/SimonKefas/swiper-starter@latest/js/script.js"></script>
   ```

2. **Include Swiper** itself:
   
   ```html
   <!-- Swiper CSS -->
   <link
     rel="stylesheet"
     href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"
   />

   <!-- Swiper JS (before body or head) -->
   <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
   ```

---

## Usage

### 1. Include Swiper’s CSS and JS

In `<head>` (CSS):

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"
/>
```

Before `</body>` or in `<head>` (JS):

```html
<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
```

### 2. Include the Swiper Starter Kit Script

After Swiper is included, load the initializer script:

```html
<script src="https://cdn.jsdelivr.net/gh/SimonKefas/swiper-starter@latest/js/script.js"></script>
```

### 3. Basic HTML Structure

Each slider container has `.slider-main_component` with a `.swiper` child:

```html
<div class="slider-main_component" data-attributes...>
  <div class="swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide">Slide 1</div>
      <div class="swiper-slide">Slide 2</div>
      <!-- More slides... -->
    </div>
    <!-- Optional Pagination -->
    <div class="swiper-bullet-wrapper"></div>
    <!-- Optional Navigation -->
    <div class="swiper-next"></div>
    <div class="swiper-prev"></div>
    <!-- Optional Scrollbar -->
    <div class="swiper-drag-wrapper"></div>
  </div>
  <!-- Optional top-level progress bar -->
  <div class="swiper-progress-bar-wrapper">
    <div class="swiper-progress-bar"></div>
  </div>
  <!-- Optional custom range slider -->
  <div class="custom-slider-wrapper">
    <input type="range" class="custom-slider" min="0" max="100" value="0" />
  </div>
</div>
```

### 4. (Optional) Global Configuration

Before including the script, define global defaults:

```html
<script>
  window.SwiperDefaults = {
    loop: false,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    speed: 500,
    effect: "slide",
    slidesPerView: 1,
    spaceBetween: 10,
    // Additional...
  };
</script>
```

### 5. Integration

On page load (`DOMContentLoaded`), each `.slider-main_component` is automatically initialized with Swiper using the data attributes (see below).

---

## Data Attributes

Attach these to each `.slider-main_component`:

- **`data-loop-mode`**: `"true"` or `"false"`
- **`data-autoplay`**: `"false"` or a delay in ms (e.g., `"3000"`)
- **`data-slider-duration`**: Transition speed in ms (e.g., `"600"`)
- **`data-effect`**: `"slide"`, `"fade"`, `"cube"`, `"coverflow"`, `"flip"`
- **`data-crossfade`**: `"true"` or `"false"` if effect is `"fade"`
- **`data-full-height`**: `"true"` or `"false"`
- **`data-progress-bar`**: `"true"` or `"false"` for a top-level progress bar
- **`data-slides-per-view`**: e.g., `"1"`, `"auto"`, `"3"`
- **`data-space-between`**: e.g., `"16"`
- **`data-breakpoints`**: A JSON string for custom breakpoints
- **`data-single-slide`**: `"true"` or `"false"` (forces 1 slide across breakpoints)
- **`data-custom-slider`**: `"true"` or `"false"`
- **`data-slider-color`**: e.g., `"#FF5722"` for a custom slider track & thumb
- **Advanced**:
  - `data-centered-slides`
  - `data-slides-per-group`
  - `data-watch-overflow`
  - `data-resistance-ratio`
  - `data-center-insufficient-slides`
  - `data-free-mode`
- **`data-autoplay-inview`**: `"true"` or `"false"` for Intersection Observer-based autoplay (only run while in view).

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

The script creates a single-run animation each time a slide changes, resetting or pausing if autoplay is stopped.

### Bullet-Based Progress Bar

By default, Swiper’s pagination yields `.swiper-bullet` elements. The script injects `.bullet-progress` inside each bullet. When a new slide starts, the active bullet's bar goes `0% → 100%`.

**CSS** (example):
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

.bullet-progress {
  position: absolute;
  top: 0;
  left: 0;
  width: 0%;
  height: 100%;
  background: #007aff;
}
```

### Custom Draggable Slider

```html
<div class="slider-main_component" data-custom-slider="true" data-slides-per-view="3">
  <div class="swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide">Slide 1</div>
      <div class="swiper-slide">Slide 2</div>
      <div class="swiper-slide">Slide 3</div>
    </div>
  </div>
  <div class="custom-slider-wrapper">
    <input type="range" class="custom-slider" min="0" max="100" value="0" />
  </div>
</div>
```

The script updates this range input when Swiper slides change; dragging the slider calls `swiper.slideTo()`.

### Autoplay Only in View

```html
<div
  class="slider-main_component"
  data-autoplay="2500"
  data-progress-bar="true"
  data-autoplay-inview="true"
>
  <div class="swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide">Vis Slide A</div>
      <div class="swiper-slide">Vis Slide B</div>
    </div>
  </div>
  <div class="swiper-progress-bar-wrapper">
    <div class="swiper-progress-bar"></div>
  </div>
</div>
```

When scrolled out of view, autoplay stops; it restarts when `IntersectionObserver` sees it again.

### Fade + CrossFade

```html
<div
  class="slider-main_component"
  data-effect="fade"
  data-crossfade="true"
  data-autoplay="3000"
>
  <div class="swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide">Fade A</div>
      <div class="swiper-slide">Fade B</div>
    </div>
  </div>
</div>
```

Slides fade, cross-fading their content if `crossfade="true"`.

---

## Customization

### Styling the Top-Level Progress Bar

**CSS Keyframes** (example):
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

The script triggers a single-run animation for each slide period (`autoplay.delay + speed`).

### Styling Bullet-Based Progress Bars

If you rely on bullet-based progress:

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

.swiper-bullet.is-active {
  background: #ccc; /* or #fff, or none, depending on your design */
}

.bullet-progress {
  position: absolute;
  top: 0;
  left: 0;
  width: 0%; /* We'll animate this to 100% in JS */
  height: 100%;
  background: #007aff;
  transition: width 0s linear; /* We'll set actual transition in JS */
}
```

### Styling the Range Slider

When `data-custom-slider="true"`, the script sets `--slider-color` and `--value-percent`. An example CSS:

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

1. **Manual Slide Changes**:
   - If the user clicks a bullet or navigates with arrows, the script resets top-level and bullet-based progress bars to 0% and starts a fresh fill for the new slide’s bullet or bar.

2. **Drag Cancels Autoplay**:
   - If `disableOnInteraction: false`, autoplay will resume but the script effectively starts a new fill on the next slide change. If you want immediate partial progress, you’d need more complex logic (not recommended for clarity).

3. **Small Slide Count**:
   - If `slidesCount <= slidesPerView`, the script turns `loop` off, hides navigation & pagination, and stops autoplay.

4. **Performance**:
   - **Intersection Observer** usage is typically lightweight. If you have many sliders or large DOM changes, watch for overhead.

5. **Testing**:
   - Always test on multiple devices, screen sizes, browsers, and check console logs for data attribute mistakes.

---

## License

This project is provided under the [MIT License](LICENSE). You’re free to copy, modify, and distribute it as needed. Contributions and modifications are welcome.