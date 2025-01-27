# Swiper Starter Kit

A customizable [Swiper](https://swiperjs.com/) slider initializer script that simplifies configuration and offers advanced features like:

- **Global & Per-Instance Configuration**  
- **Progress Bar for Autoplay**  
- **Custom Draggable Slider**  
- **Responsive Breakpoints**  
- **Single Slide Mode**  
- **Custom Slider Color**  
- **Autoplay Only While In View** (via Intersection Observer)

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
  - [1. Include Swiper’s CSS and JS](#1-include-swipers-css-and-js)
  - [2. Include the Swiper Starter Script](#2-include-the-swiper-starter-script)
  - [3. Basic HTML Structure](#3-basic-html-structure)
  - [4. Global Configuration (Optional)](#4-global-configuration-optional)
  - [5. Initialize and Enjoy](#5-initialize-and-enjoy)
- [Data Attributes](#data-attributes)
- [Examples](#examples)
  - [Basic Slider](#basic-slider)
  - [Progress Bar Slider](#progress-bar-slider)
  - [Custom Draggable Slider](#custom-draggable-slider)
  - [Custom Slider Color](#custom-slider-color)
  - [Autoplay Only While In View](#autoplay-only-while-in-view)
  - [Fade + Crossfade Example](#fade--crossfade-example)
- [Customization](#customization)
  - [Styling the Range Slider](#styling-the-range-slider)
  - [Styling a Bullet Progress Bar (Optional Concept)](#styling-a-bullet-progress-bar-optional-concept)
- [Notes](#notes)
- [License](#license)

---

## Introduction

The **Swiper Starter Kit** is built on top of [Swiper 11](https://swiperjs.com/). It provides a single JavaScript initializer script that handles:

- **Per-Instance Overrides** via `data-` attributes.
- **Progress Bar Synchronization** with Swiper’s autoplay timing.
- **Intersection Observer** for optional “autoplay only in view”.
- **Draggable Sliders** that tie directly into Swiper’s active slide.

This structure allows you to quickly integrate multiple sliders on a single page, each with different requirements.

---

## Features

1. **Global & Per-Instance Configuration**  
   Set global defaults, then override or extend them on individual sliders.

2. **Progress Bar**  
   Tied to each autoplay cycle, resetting when a new slide is triggered.

3. **Custom Range Slider**  
   A draggable `input[type="range"]` that moves Swiper slides and also updates when Swiper changes slides.

4. **Responsive Breakpoints**  
   Control `slidesPerView`, `spaceBetween`, etc. for various screen widths.

5. **Single Slide Mode**  
   Force a slider to show only one slide at any breakpoint.

6. **Custom Slider Color**  
   Use `data-slider-color` to theme the slider’s track & thumb.

7. **Autoplay Only In View**  
   Uses Intersection Observer to pause/resume autoplay based on viewport visibility.

---

## Getting Started

### 1. Include Swiper’s CSS and JS

In your `<head>`:

```html
<!-- Swiper CSS -->
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"
/>
```

Before the closing `</body>` tag:

```html
<!-- Swiper JS -->
<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
```

### 2. Include the Swiper Starter Script

After Swiper is included, load the Starter Kit script:

```html
<script src="https://cdn.jsdelivr.net/gh/SimonKefas/swiper-starter@latest/js/script.js"></script>
```

*(Replace the script source with your own if self-hosting.)*

### 3. Basic HTML Structure

Each slider should be wrapped in a `.slider-main_component` element, containing a `.swiper` block with slides:

```html
<div class="slider-main_component" data-attributes...>
  <div class="swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide">Slide 1</div>
      <div class="swiper-slide">Slide 2</div>
      <!-- ... more slides ... -->
    </div>
    <!-- Optional pagination, navigation, scrollbar, etc. -->
  </div>
  <!-- Optional progress bar -->
  <div class="swiper-progress-bar-wrapper">
    <div class="swiper-progress-bar"></div>
  </div>
  <!-- Optional custom slider wrapper -->
  <div class="custom-slider-wrapper">
    <input type="range" class="custom-slider" />
  </div>
</div>
```

### 4. Global Configuration (Optional)

If desired, define global defaults before including the Starter Kit script:

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
    // breakpoints, etc.
  };
</script>
```

### 5. Initialize and Enjoy

When the page loads (`DOMContentLoaded`), all `.slider-main_component` blocks are automatically initialized with Swiper. Provide `data-` attributes to customize each instance as needed.

---

## Data Attributes

Attach these attributes to `.slider-main_component` elements:

- **`data-loop-mode`**: `"true"` or `"false"`  
- **`data-autoplay`**: `"false"` or delay in ms (e.g., `"4000"`)  
- **`data-slider-duration`**: Transition speed in ms (e.g., `"600"`)  
- **`data-effect`**: `"slide"`, `"fade"`, `"cube"`, `"coverflow"`, `"flip"`  
- **`data-crossfade`**: `"true"` or `"false"` if using `data-effect="fade"`  
- **`data-full-height`**: `"true"` or `"false"`  
- **`data-progress-bar`**: `"true"` or `"false"`  
- **`data-slides-per-view`**: e.g., `"1"`, `"auto"`, or `"3"`  
- **`data-space-between`**: e.g., `"20"` for 20px  
- **`data-breakpoints`**: JSON string for custom breakpoints (e.g., `'{"768":{"slidesPerView":2}}'`)  
- **`data-single-slide`**: `"true"` or `"false"`  
- **`data-custom-slider`**: `"true"` or `"false"`  
- **`data-slider-color`**: Color string (e.g., `"#FF5722"`) for custom slider track & thumb  
- **Advanced**:  
  - `data-centered-slides`  
  - `data-slides-per-group`  
  - `data-watch-overflow`  
  - `data-resistance-ratio`  
  - `data-center-insufficient-slides`  
  - `data-free-mode`  
- **`data-autoplay-inview`**: `"true"` or `"false"` - if `true`, autoplay only runs when the slider is in the viewport (via Intersection Observer).

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
<div
  class="slider-main_component"
  data-autoplay="3000"
  data-progress-bar="true"
>
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

The progress bar resets or restarts each time a slide changes, matching the autoplay duration.

### Custom Draggable Slider

```html
<div
  class="slider-main_component"
  data-autoplay="4000"
  data-custom-slider="true"
>
  <div class="swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide">Slide X</div>
      <div class="swiper-slide">Slide Y</div>
      <div class="swiper-slide">Slide Z</div>
    </div>
  </div>
  <div class="custom-slider-wrapper">
    <input type="range" class="custom-slider" min="0" max="100" value="0" />
  </div>
</div>
```

Dragging the slider changes Swiper’s active slide, and Swiper’s slide changes also update the slider’s position.

### Custom Slider Color

```html
<div
  class="slider-main_component"
  data-custom-slider="true"
  data-slider-color="#FF5722"
>
  <div class="swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide">Colored Slider</div>
      <div class="swiper-slide">Thumb & Track in #FF5722</div>
    </div>
  </div>
  <div class="custom-slider-wrapper">
    <input type="range" class="custom-slider" min="0" max="100" value="0" />
  </div>
</div>
```

### Autoplay Only While In View

```html
<div
  class="slider-main_component"
  data-autoplay="3000"
  data-progress-bar="true"
  data-autoplay-inview="true"
>
  <div class="swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide">Slide 1</div>
      <div class="swiper-slide">Slide 2</div>
      <div class="swiper-slide">Slide 3</div>
    </div>
  </div>
  <div class="swiper-progress-bar-wrapper">
    <div class="swiper-progress-bar"></div>
  </div>
</div>
```

Autoplay automatically stops when the slider scrolls out of view (≥ 20% threshold by default).

### Fade + Crossfade Example

```html
<div
  class="slider-main_component"
  data-effect="fade"
  data-crossfade="true"
  data-autoplay="3000"
>
  <div class="swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide">Slide A</div>
      <div class="swiper-slide">Slide B</div>
      <div class="swiper-slide">Slide C</div>
    </div>
  </div>
</div>
```

Slides fade with crossFade if `data-crossfade="true"`.

---

## Customization

### Styling the Range Slider

The script updates `--slider-color` and `--value-percent` for `.custom-slider`. Example CSS:

```css
.custom-slider {
  --slider-color: #007aff;
  --value-percent: 0%;
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 5px;
  background: transparent;
  cursor: pointer;
}

/* Example track styling */
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

/* Example thumb styling */
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

/* Firefox track & thumb (similarly) */
```

### Styling a Bullet Progress Bar (Optional Concept)

If you want each bullet to show a mini progress bar:

1. Style bullets (`.swiper-bullet`) with an inner `.bullet-progress`.
2. On `slideChangeTransitionStart`, reset and animate the active bullet’s `.bullet-progress` to fill over the autoplay duration.  
3. This is more advanced and typically requires custom bullet rendering or logic in `paginationBulletRender`.

---

## Notes

1. **Syncing Progress Bar & Autoplay**: The script sets a new one-shot animation each time the slide changes. If the user manually interacts with the slider or intersection observer stops it, the bar pauses or resets.
2. **Multiple Slides**: If your last slide is not fully visible, consider `data-centered-slides="true"` or `data-free-mode="true"`.
3. **Performance**: For many sliders, watch for overhead from Intersection Observers, animations, etc.
4. **Testing & Accessibility**: Test on different devices. Add ARIA roles/labels for screen readers.

---

## License

This project is licensed under the [MIT License](LICENSE).