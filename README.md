# Swiper Starter Kit

A customizable Swiper slider initializer script that simplifies the integration and configuration of Swiper sliders in your web projects. This script allows for global defaults, per-instance overrides using data attributes, progress bar functionality, custom draggable sliders, and responsive settings.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [HTML Structure](#html-structure)
  - [Including the Script](#including-the-script)
  - [Global Configuration](#global-configuration)
  - [Per-Instance Configuration](#per-instance-configuration)
- [Examples](#examples)
  - [Basic Slider](#basic-slider)
  - [Single Slide with Progress Bar](#single-slide-with-progress-bar)
  - [Draggable Custom Slider](#draggable-custom-slider)
- [Customization](#customization)
  - [CSS Adjustments](#css-adjustments)
- [Full Script](#full-script)
- [License](#license)

## Introduction

The Swiper Starter Kit provides an easy way to integrate Swiper sliders into your projects with minimal configuration. It supports global settings, which can be overridden on a per-instance basis using data attributes. The script includes advanced features like progress bars and custom draggable sliders that synchronize with the Swiper instance.

## Features

- **Global Configuration**: Set default Swiper options for all sliders.
- **Per-Instance Overrides**: Customize individual sliders using `data-` attributes.
- **Progress Bar Support**: Add a progress bar to visualize autoplay timing.
- **Custom Draggable Slider**: Synchronize a custom draggable slider with the Swiper instance.
- **Responsive Breakpoints**: Configure different settings for various screen sizes.
- **Automatic Initialization**: Initializes all sliders with a specific class on `DOMContentLoaded`.
- **Flexible Slides Per View**: Set `slidesPerView` and `spaceBetween` per instance.
- **Single Slide Mode**: Option to display one slide at all breakpoints.
- **Visual-Only Slider**: Option to display a non-interactive slider that reflects Swiper's position.

## Installation

Include Swiper's CSS and JS in your HTML file:

```html
<!-- Swiper CSS -->
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"
/>

<!-- Swiper JS -->
<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
```

Include the Swiper Starter Kit script from the repository:

```html
<!-- Swiper Starter Kit JS -->
<script src="https://cdn.jsdelivr.net/gh/SimonKefas/swiper-starter@latest/js/script.js"></script>
```

## Usage

### HTML Structure

Use the following structure for your Swiper slider:

```html
<div class="slider-main_component" data-attributes...>
  <div class="swiper">
    <div class="swiper-wrapper">
      <!-- Slides -->
      <div class="swiper-slide">Slide Content 1</div>
      <div class="swiper-slide">Slide Content 2</div>
      <!-- ... more slides ... -->
    </div>
    <!-- Optional Pagination -->
    <div class="swiper-bullet-wrapper"></div>
    <!-- Optional Navigation -->
    <div class="swiper-next"></div>
    <div class="swiper-prev"></div>
    <!-- Optional Scrollbar -->
    <div class="swiper-drag-wrapper"></div>
  </div>
  <!-- Optional Progress Bar -->
  <div class="swiper-progress-bar-wrapper">
    <div class="swiper-progress-bar"></div>
  </div>
  <!-- Optional Custom Slider -->
  <div class="custom-slider-wrapper">
    <!-- For Draggable Slider -->
    <input type="range" class="custom-slider" min="0" max="100" value="0" />
    <!-- For Visual-Only Slider -->
    <!-- <div class="custom-slider-bar"></div> -->
  </div>
</div>
```

### Including the Script

Include the Swiper Starter Kit script after defining any global configurations:

```html
<script src="https://cdn.jsdelivr.net/gh/SimonKefas/swiper-starter@latest/js/script.js"></script>
```

### Global Configuration

Define global defaults using `window.SwiperDefaults` before including the initializer script. These settings apply to all sliders unless overridden per instance.

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
    breakpoints: {
      480: { slidesPerView: 1, spaceBetween: 10 },
      768: { slidesPerView: 2, spaceBetween: 20 },
      992: { slidesPerView: 3, spaceBetween: 30 },
      1200: { slidesPerView: 4, spaceBetween: 40 },
    },
    // Additional Swiper options can be added here
  };
</script>
```

### Per-Instance Configuration

Override global settings for individual sliders using `data-` attributes on the `.slider-main_component` element.

#### Data Attributes

- `data-loop-mode`: `"true"` or `"false"`
- `data-autoplay`: `"false"` or delay in milliseconds (e.g., `"5000"`)
- `data-slider-duration`: Transition speed in milliseconds (e.g., `"600"`)
- `data-effect`: `"slide"`, `"fade"`, `"cube"`, `"coverflow"`, `"flip"`
- `data-full-height`: `"true"` or `"false"`
- `data-progress-bar`: `"true"` or `"false"`
- `data-slides-per-view`: Number of slides per view (e.g., `"1"`, `"auto"`)
- `data-space-between`: Space between slides in pixels (e.g., `"20"`)
- `data-breakpoints`: JSON string for custom breakpoints (e.g., `'{"768": {"slidesPerView": 1}}'`)
- `data-single-slide`: `"true"` or `"false"` to display one slide at all breakpoints
- `data-custom-slider`: `"true"` or `"false"` to enable a custom draggable slider

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
    <!-- Optional Pagination -->
    <div class="swiper-bullet-wrapper"></div>
    <!-- Optional Navigation -->
    <div class="swiper-next"></div>
    <div class="swiper-prev"></div>
  </div>
</div>
```

### Single Slide with Progress Bar

```html
<div
  class="slider-main_component"
  data-autoplay="4000"
  data-progress-bar="true"
  data-single-slide="true"
>
  <div class="swiper">
    <div class="swiper-wrapper">
      <!-- Slides -->
      <div class="swiper-slide">Slide 1</div>
      <div class="swiper-slide">Slide 2</div>
      <!-- More slides... -->
    </div>
  </div>
  <!-- Progress Bar -->
  <div class="swiper-progress-bar-wrapper">
    <div class="swiper-progress-bar"></div>
  </div>
</div>
```

### Draggable Custom Slider

```html
<div class="slider-main_component" data-custom-slider="true">
  <div class="swiper">
    <div class="swiper-wrapper">
      <!-- Slides -->
      <div class="swiper-slide">Slide 1</div>
      <div class="swiper-slide">Slide 2</div>
      <!-- More slides... -->
    </div>
  </div>
  <!-- Custom Draggable Slider -->
  <div class="custom-slider-wrapper">
    <input type="range" class="custom-slider" min="0" max="100" value="0" />
  </div>
</div>
```

## Customization

### CSS Adjustments

Include the following CSS to ensure slides adjust their height appropriately and to style the progress bar and custom slider.

```css
/* Swiper Core Styles */
.slider-main_component .swiper,
.slider-main_component .swiper-wrapper,
.slider-main_component .swiper-slide {
  height: auto !important;
}

/* Full-Height Slides */
.slider-main_component[data-full-height="true"] {
  height: 100vh;
}

.slider-main_component[data-full-height="true"] .swiper,
.slider-main_component[data-full-height="true"] .swiper-wrapper,
.slider-main_component[data-full-height="true"] .swiper-slide {
  height: 100% !important;
}

/* Progress Bar Styles */
.swiper-progress-bar-wrapper {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background-color: rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.swiper-progress-bar {
  width: 100%;
  height: 100%;
  background-color: #007aff;
  transform: scaleX(0);
  transform-origin: left;
}

/* Progress Bar Animation */
@keyframes swiper-progress-bar-animation {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}

/* Custom Draggable Slider Styles */
.custom-slider-wrapper {
  position: relative;
  width: 100%;
  margin-top: 10px;
}

.custom-slider {
  width: 100%;
}

/* Visual-Only Slider Styles */
.custom-slider-bar {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 0%;
  background-color: #007aff;
  transition: width 0.3s ease;
}
```


## License

This project is licensed under the [MIT License](LICENSE).

---

**Note:** Replace the script URL in the `<script>` tag with the actual path if you host the script yourself or if the repository structure changes.