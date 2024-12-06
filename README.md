# Swiper Starter Kit

A customizable Swiper slider initializer script that streamlines integration and configuration of [Swiper](https://swiperjs.com/) sliders in your web projects. This kit supports global defaults, per-instance overrides via `data-` attributes, visual progress bars, custom draggable sliders, responsive breakpoints, and styling options such as custom slider colors.

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
  - [Custom Range Slider Color](#custom-range-slider-color)
  - [Advanced Configuration](#advanced-configuration)
- [Customization](#customization)
  - [CSS Adjustments](#css-adjustments)
  - [Styling the Custom Range Slider](#styling-the-custom-range-slider)
- [Notes](#notes)
- [License](#license)

## Introduction

The Swiper Starter Kit simplifies integrating Swiper sliders into your projects. It supports:

- Global defaults and per-instance customization.
- Optional progress bars to visualize autoplay timing.
- A custom draggable slider synchronized with the Swiper's active slide.
- Responsive breakpoints for various viewport sizes.
- Styling options, including a configurable slider color via data attributes.

## Features

- **Global & Per-Instance Configuration**: Set global defaults, then override per slider with `data-` attributes.
- **Progress Bar Support**: Add a visual progress bar to track autoplay timing.
- **Custom Draggable Slider**: Control slides using a range input synchronized with Swiper.
- **Responsive Breakpoints**: Adjust `slidesPerView`, `spaceBetween`, and other settings per viewport size.
- **Single Slide Mode**: Force one slide at all breakpoints.
- **Customizable Range Slider**: Use `data-slider-color` to style the slider track and thumb.
- **Advanced Options**: Fine-tune behavior with attributes like `data-centered-slides`, `data-slides-per-group`, `data-watch-overflow`, and more.

## Installation

Include Swiper's CSS and JS:

```html
<!-- Swiper CSS -->
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"
/>

<!-- Swiper JS -->
<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
```

Include the Swiper Starter Kit script:

```html
<script src="https://cdn.jsdelivr.net/gh/SimonKefas/swiper-starter@latest/js/script.js"></script>
```

## Usage

### HTML Structure

Your Swiper slider container might look like this:

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
    <input type="range" class="custom-slider" min="0" max="100" value="0" />
  </div>
</div>
```

### Including the Script

Include the script after setting any global defaults:

```html
<script src="https://cdn.jsdelivr.net/gh/SimonKefas/swiper-starter@latest/js/script.js"></script>
```

### Global Configuration

Define global defaults before including the script:

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

Use `data-` attributes on `.slider-main_component` to override global settings:

#### Data Attributes

- `data-loop-mode`: `"true"` or `"false"`
- `data-autoplay`: `"false"` or a delay in ms (e.g., `"5000"`)
- `data-slider-duration`: Transition speed in ms (e.g., `"600"`)
- `data-effect`: `"slide"`, `"fade"`, `"cube"`, `"coverflow"`, `"flip"`
- `data-full-height`: `"true"` or `"false"`
- `data-progress-bar`: `"true"` or `"false"`
- `data-slides-per-view`: e.g., `"1"`, `"auto"`, `"3"`
- `data-space-between`: e.g., `"20"` for 20px
- `data-breakpoints`: JSON string for custom breakpoints (e.g., `'{"768":{"slidesPerView":1}}'`)
- `data-single-slide`: `"true"` or `"false"`
- `data-custom-slider`: `"true"` or `"false"` to enable a custom draggable slider
- `data-slider-color`: Set a color (e.g., `"#FF5722"`) for the custom slider track and thumb
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
      <div class="swiper-slide">Slide 1</div>
      <div class="swiper-slide">Slide 2</div>
    </div>
  </div>
  <div class="custom-slider-wrapper">
    <input type="range" class="custom-slider" min="0" max="100" value="0" />
  </div>
</div>
```

### Custom Range Slider Color

```html
<div class="slider-main_component" data-custom-slider="true" data-slider-color="#FF5722">
  <div class="swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide">Slide 1</div>
      <div class="swiper-slide">Slide 2</div>
    </div>
  </div>
  <div class="custom-slider-wrapper">
    <input type="range" class="custom-slider" min="0" max="100" value="0" />
  </div>
</div>
```

This sets the custom slider's color to `#FF5722`. The script will apply this color as a CSS variable (`--slider-color`) to the `.custom-slider`.

### Advanced Configuration

For scenarios like ensuring you can scroll all the way to the last slide, consider using `data-centered-slides` or adjusting `slidesPerView` and `slidesPerGroup`. If you experience difficulty making the last slide fully visible, enabling `centeredSlides` or `freeMode` may help.

## Customization

### CSS Adjustments

Ensure slides adjust their height and style optional features like the progress bar as needed.

### Styling the Custom Range Slider

Use CSS variables and pseudo-elements to style the slider:

```css
.custom-slider {
  --slider-color: #007aff; /* Fallback if no data-slider-color is set */
  appearance: none;
  width: 100%;
  background: linear-gradient(to right, var(--slider-color) 0%, #ccc 0%);
}

.custom-slider::-webkit-slider-thumb {
  appearance: none;
  height: 20px;
  width: 20px;
  background: var(--slider-color);
  border-radius: 50%;
  cursor: pointer;
}
```

The script sets `--slider-color` dynamically based on `data-slider-color`. You can also adjust other variables or create new attributes for further customization.

## Notes

- **Centered Slides**: If you cannot fully scroll to the last slide, try `data-centered-slides="true"` or `data-free-mode="true"`.
- **Testing**: Verify behavior across different devices, screen sizes, and browsers.
- **Accessibility**: Add labels and roles for assistive technologies.
- **Swiper API Reference**: For more advanced configurations, refer to the [Swiper API Documentation](https://swiperjs.com/swiper-api).

## License

This project is licensed under the [MIT License](LICENSE).

---

**Note:**  
The code and instructions above should be adapted to your specific project needs. The `data-slider-color` attribute and CSS variable integration let you easily theme your slider without modifying CSS for each instance. If you face issues with final slide visibility, consider using `centeredSlides` or `freeMode` to improve the user experience.