# Swiper Starter Kit

A customizable [Swiper](https://swiperjs.com/) slider initializer script that provides:

- **Global & Per-Instance Configuration**  
- **Progress Bar Support**  
- **Custom Draggable Slider**  
- **Responsive Breakpoints**  
- **Single Slide Mode**  
- **Custom Slider Color**  
- **Autoplay Only in View** (using an Intersection Observer)

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
  - [Autoplay Only When in View](#autoplay-only-when-in-view)
- [Customization](#customization)
  - [CSS Adjustments](#css-adjustments)
  - [Styling the Custom Range Slider](#styling-the-custom-range-slider)
- [Notes](#notes)
- [License](#license)

---

## Introduction

The **Swiper Starter Kit** helps you integrate [Swiper](https://swiperjs.com/) into your projects with minimal configuration and maximum flexibility. It offers:

- **Global & Per-Instance Setup**: Use global defaults or override them via `data-` attributes on a per-slider basis.
- **Autoplay Visibility**: Choose to only autoplay slides while the slider is in the viewport.
- **Progress Bars**: Visualize autoplay progress.
- **Custom Draggable Sliders**: Synchronize a range input with Swiper’s slides.
- **Responsive Breakpoints**: Adjust slides and spacing at different screen sizes.
- **Themeable Range Sliders**: Style slider tracks and thumbs via `data-slider-color`.

---

## Features

1. **Global & Per-Instance Configuration**  
   Set defaults globally, then override them slider-by-slider with data attributes.

2. **Progress Bar**  
   Display a progress bar for autoplay, supporting custom intervals.

3. **Custom Draggable Slider**  
   A range input that both controls Swiper slides and updates as Swiper slides change.

4. **Responsive Breakpoints**  
   Configure different `slidesPerView`, `spaceBetween`, and more at each breakpoint.

5. **Single Slide Mode**  
   Force one slide at all breakpoints with `data-single-slide="true"`.

6. **Custom Slider Color**  
   Use `data-slider-color` to define the track and thumb color of the custom slider.

7. **Autoplay Only in View**  
   Control autoplay using the [Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API). If `data-autoplay-inview="true"`, the slider autoplays only while visible in the viewport.

---

## Installation

1. **Include Swiper’s CSS and JS**:

   ```html
   <!-- Swiper CSS -->
   <link
     rel="stylesheet"
     href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"
   />

   <!-- Swiper JS -->
   <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
   ```

2. **Include the Swiper Starter Kit Script**:

   ```html
   <script src="https://cdn.jsdelivr.net/gh/SimonKefas/swiper-starter@latest/js/script.js"></script>
   ```

   (Replace the script source with your actual path if self-hosting.)

---

## Usage

### HTML Structure

Each slider container should have:

- A parent with the class `.slider-main_component`.
- A child `.swiper` element containing `.swiper-wrapper` and `.swiper-slide`s.
- Optional pagination, navigation, scrollbar, progress bar, and custom slider elements.

```html
<div class="slider-main_component" data-attributes...>
  <div class="swiper">
    <div class="swiper-wrapper">
      <!-- .swiper-slide elements -->
    </div>
    <div class="swiper-bullet-wrapper"></div>
    <div class="swiper-next"></div>
    <div class="swiper-prev"></div>
    <div class="swiper-drag-wrapper"></div>
  </div>
  <div class="swiper-progress-bar-wrapper">
    <div class="swiper-progress-bar"></div>
  </div>
  <div class="custom-slider-wrapper">
    <input type="range" class="custom-slider" min="0" max="100" value="0" />
  </div>
</div>
```

### Including the Script

1. **Global Defaults (Optional)**:

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
       // Additional default options as needed...
     };
   </script>
   ```

2. **Include the Starter Kit Script**:

   ```html
   <script src="https://cdn.jsdelivr.net/gh/SimonKefas/swiper-starter@latest/js/script.js"></script>
   ```

### Global Configuration

Any object in `window.SwiperDefaults` merges into each Swiper instance unless overridden per instance.

### Per-Instance Configuration

Use `data-` attributes on each `.slider-main_component`:

#### Data Attributes

- `data-loop-mode`: `"true"` or `"false"`
- `data-autoplay`: `"false"` or delay in milliseconds (e.g., `"4000"`)
- `data-slider-duration`: Transition speed in ms (e.g., `"600"`)
- `data-effect`: `"slide"`, `"fade"`, `"cube"`, `"coverflow"`, or `"flip"`
- `data-full-height`: `"true"` or `"false"`
- `data-progress-bar`: `"true"` or `"false"`
- `data-slides-per-view`: e.g., `"1"`, `"auto"`, `"3"`
- `data-space-between`: e.g., `"20"`
- `data-breakpoints`: JSON string for custom breakpoints
- `data-single-slide`: `"true"` or `"false"`
- `data-custom-slider`: `"true"` or `"false"`
- `data-slider-color`: A color value (e.g., `"#FF5722"`) for the track and thumb
- **Advanced**:
  - `data-centered-slides`
  - `data-slides-per-group`
  - `data-watch-overflow`
  - `data-resistance-ratio`
  - `data-center-insufficient-slides`
  - `data-free-mode`
- **Autoplay Visibility**:
  - `data-autoplay-inview`: `"true"` or `"false"` to enable Intersection Observer control of autoplay

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
      <div class="swiper-slide">Only Two Slides Visible</div>
      <div class="swiper-slide">Another Slide</div>
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
      <div class="swiper-slide">Styled Slider</div>
      <div class="swiper-slide">Thumb & Track in #FF5722</div>
    </div>
  </div>
  <div class="custom-slider-wrapper">
    <input type="range" class="custom-slider" min="0" max="100" value="0" />
  </div>
</div>
```

### Autoplay Only When in View

```html
<div
  class="slider-main_component"
  data-autoplay="3000"
  data-progress-bar="true"
  data-custom-slider="true"
  data-autoplay-inview="true"
>
  <div class="swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide">Slide 1</div>
      <div class="swiper-slide">Slide 2</div>
      <div class="swiper-slide">Slide 3</div>
    </div>
    <div class="swiper-next"></div>
    <div class="swiper-prev"></div>
  </div>
  <div class="swiper-progress-bar-wrapper">
    <div class="swiper-progress-bar"></div>
  </div>
  <div class="custom-slider-wrapper">
    <input type="range" class="custom-slider" min="0" max="100" value="0" />
  </div>
</div>
```

When `data-autoplay-inview="true"`, the script uses an **Intersection Observer** to start/stop autoplay depending on whether the slider is in the viewport (≥20% by default).

---

## Customization

### CSS Adjustments

Use your own CSS to style slides, navigation, pagination, and progress bars. The script handles synchronization; you have full design control.

### Styling the Custom Range Slider

Below is an example CSS for a range slider referencing CSS variables the script sets (`--slider-color` for color, `--value-percent` for track progress):

```css
.custom-slider {
  --slider-color: #007aff; /* Fallback color */
  --value-percent: 0%;
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 5px;
  background: transparent;
  cursor: pointer;
  border-radius: 4px;
}

/* WebKit track */
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

/* WebKit thumb */
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

/* Firefox track */
.custom-slider::-moz-range-track {
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

/* Firefox thumb */
.custom-slider::-moz-range-thumb {
  width: 27px;
  height: 27px;
  background: var(--slider-color);
  border-radius: 50%;
  cursor: pointer;
}
```

The script updates `--value-percent` to reflect Swiper’s progress or slider movement, and `--slider-color` is set if you provide `data-slider-color`.

---

## Notes

1. **Swiper → Slider**: When slides change (e.g., autoplay, navigation), the script updates the slider track.
2. **Slider → Swiper**: When the user drags the slider, Swiper navigates to the corresponding slide index.
3. **Last Slide Visibility**: If multiple slides are visible at once and you want to fully scroll to the last, consider `data-centered-slides="true"` or `data-free-mode="true"`.
4. **Intersection Observer**: If using `data-autoplay-inview="true"`, the script starts/stops autoplay based on visibility. Adjust thresholds or margins in the code if needed.
5. **Testing**: Verify on different devices, browsers, and screen sizes for best results.
6. **Accessibility**: Add ARIA attributes, labels, etc., for screen reader support.

---

## License

This project is licensed under the [MIT License](LICENSE).