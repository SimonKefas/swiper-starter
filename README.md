# Swiper Starter Kit

A customizable Swiper slider initializer script that integrates seamlessly with [Swiper](https://swiperjs.com/). This kit provides:

- Easy global and per-instance configuration via `data-` attributes.
- Optional progress bars to visualize autoplay.
- A custom draggable range slider synchronized with Swiper slides.
- Responsive breakpoints for different screen sizes.
- Flexible styling options, including a configurable slider color via `data-slider-color`.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [HTML Structure](#html-structure)
  - [Including the Script](#including-the-script)
  - [Global Configuration](#global-configuration)
  - [Per-Instance Configuration](#per-instance-configuration)
    - [Data Attributes](#data-attributes)
- [Examples](#examples)
  - [Basic Slider](#basic-slider)
  - [Single Slide with Progress Bar](#single-slide-with-progress-bar)
  - [Draggable Custom Slider](#draggable-custom-slider)
  - [Custom Slider Color](#custom-slider-color)
  - [Advanced Configuration](#advanced-configuration)
- [Customization](#customization)
  - [CSS Adjustments](#css-adjustments)
  - [Styling the Custom Range Slider](#styling-the-custom-range-slider)
- [Notes](#notes)
- [License](#license)

## Introduction

The Swiper Starter Kit simplifies integrating Swiper sliders into your projects. It supports per-instance configuration with `data-` attributes, progress bars for autoplay, custom sliders for navigation, and responsive breakpoints. You can also style the custom range slider using `data-slider-color`, making it easy to theme each slider instance without editing global CSS.

## Features

- **Global & Per-Instance Configuration**: Set global defaults, then override them per slider using data attributes.
- **Progress Bar Support**: Add a visual progress bar to track autoplay progress.
- **Custom Draggable Slider**: A synchronized range slider that updates with Swiper slides and vice versa.
- **Responsive Breakpoints**: Customize `slidesPerView`, `spaceBetween`, and more for various screen sizes.
- **Single Slide Mode**: Force a slider to show only one slide at all breakpoints.
- **Custom Slider Color**: Use `data-slider-color` to easily change the slider’s track and thumb color.
- **Advanced Options**: Fine-tune behavior with `data-centered-slides`, `data-slides-per-group`, `data-watch-overflow`, `data-resistance-ratio`, `data-free-mode`, etc.

## Installation

Include Swiper’s CSS and JS in your HTML:

```html
<!-- Swiper CSS -->
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"
/>

<!-- Swiper JS -->
<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
```

Include the Swiper Starter Kit script (the final version provided earlier):

```html
<script src="https://cdn.jsdelivr.net/gh/SimonKefas/swiper-starter@latest/js/script.js"></script>
```

## Usage

### HTML Structure

A typical Swiper container might look like:

```html
<div class="slider-main_component" data-attributes...>
  <div class="swiper">
    <div class="swiper-wrapper">
      <!-- Slides -->
      <div class="swiper-slide">Slide 1</div>
      <div class="swiper-slide">Slide 2</div>
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
    <input type="range" class="custom-slider" min="0" max="100" value="0" />
  </div>
</div>
```

### Including the Script

After defining any global defaults, include the initializer script:

```html
<script src="https://cdn.jsdelivr.net/gh/SimonKefas/swiper-starter@latest/js/script.js"></script>
```

### Global Configuration

Set global defaults before including the script:

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
  };
</script>
```

### Per-Instance Configuration

Use `data-` attributes on `.slider-main_component` to override these settings.

#### Data Attributes

- `data-loop-mode`: `"true"` or `"false"`
- `data-autoplay`: `"false"` or delay in milliseconds
- `data-slider-duration`: Transition speed in milliseconds
- `data-effect`: `"slide"`, `"fade"`, `"cube"`, `"coverflow"`, `"flip"`
- `data-full-height`: `"true"` or `"false"`
- `data-progress-bar`: `"true"` or `"false"`
- `data-slides-per-view`: e.g., `"1"`, `"auto"`, or a number
- `data-space-between`: e.g., `"20"` for 20px
- `data-breakpoints`: JSON string for custom breakpoints
- `data-single-slide`: `"true"` or `"false"`
- `data-custom-slider`: `"true"` or `"false"` for a custom draggable slider
- `data-slider-color`: A color value (e.g., `"#FF5722"`) to style the slider’s track and thumb
- **Advanced Options**:
  - `data-centered-slides`
  - `data-slides-per-group`
  - `data-watch-overflow`
  - `data-resistance-ratio`
  - `data-center-insufficient-slides`
  - `data-free-mode`

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
      <div class="swiper-slide">Slide 1</div>
      <div class="swiper-slide">Slide 2</div>
    </div>
  </div>
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
      <div class="swiper-slide">Slide A</div>
      <div class="swiper-slide">Slide B</div>
    </div>
  </div>
  <div class="custom-slider-wrapper">
    <input type="range" class="custom-slider" min="0" max="100" value="0" />
  </div>
</div>
```

### Custom Slider Color

```html
<div class="slider-main_component" data-custom-slider="true" data-slider-color="#FF5722">
  <div class="swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide">Slide X</div>
      <div class="swiper-slide">Slide Y</div>
    </div>
  </div>
  <div class="custom-slider-wrapper">
    <input type="range" class="custom-slider" min="0" max="100" value="0" />
  </div>
</div>
```

With `data-slider-color="#FF5722"`, the script sets `--slider-color` on the slider, allowing you to theme it dynamically.

### Advanced Configuration

If you have multiple slides visible and want to ensure the user can scroll fully to the last slide, consider using attributes like `data-centered-slides="true"` or `data-free-mode="true"` to improve final slide visibility. Experiment with `data-slides-per-group` and other advanced attributes for a tailored experience.

## Customization

### CSS Adjustments

Adjust slide heights, progress bars, and navigation elements as needed. The initializer script handles synchronization and slide logic; you control the look via CSS.

### Styling the Custom Range Slider

The script sets `--slider-color` and `--value-percent` dynamically. Ensure your CSS uses these variables. For example:

```css
.custom-slider {
  --slider-color: #007aff;
  --value-percent: 0%;
  appearance: none;
  width: 100%;
  background: transparent;
  cursor: pointer;
}

.custom-slider::-webkit-slider-runnable-track {
  width: 100%;
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
  appearance: none;
  width: 27px;
  height: 27px;
  margin-top: -11px;
  background: var(--slider-color);
  border-radius: 50%;
  cursor: pointer;
}
```

This setup ensures that as Swiper slides or the user moves the slider, the track updates smoothly.

## Notes

- **Swiper → Slider**: When Swiper changes slides (autoplay, navigation, etc.), the slider updates its value and track automatically.
- **Slider → Swiper**: When the user drags the slider, Swiper navigates to the corresponding slide.
- **Last Slide Visibility**: If you have trouble making the final slide fully visible when using multiple slides per view, consider enabling `data-centered-slides` or `data-free-mode`.
- **Testing & Accessibility**: Test across different devices and browsers. Add ARIA labels and roles for improved accessibility.

## License

This project is licensed under the [MIT License](LICENSE).