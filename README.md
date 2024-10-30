# Swiper Initializer Script

A customizable Swiper slider initializer script that supports global configurations, per-instance overrides, progress bar functionality, and responsive settings using data attributes.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [HTML Structure](#html-structure)
  - [Global Configuration](#global-configuration)
  - [Per-Instance Configuration](#per-instance-configuration)
  - [Data Attributes](#data-attributes)
- [Progress Bar](#progress-bar)
- [Examples](#examples)
- [CSS Adjustments](#css-adjustments)
- [Notes](#notes)
- [License](#license)

## Introduction

This script simplifies the initialization of Swiper sliders with the ability to define global defaults and override them on a per-instance basis using data attributes. It also supports a progress bar that visualizes the autoplay timing.

## Features

- **Global Configuration**: Set default Swiper options for all sliders.
- **Per-Instance Overrides**: Customize individual sliders using `data-` attributes.
- **Progress Bar Support**: Add a progress bar that shows the time until the next slide is shown.
- **Responsive Breakpoints**: Configure different settings for various screen sizes.
- **Automatic Initialization**: Initializes all sliders with a specific class on `DOMContentLoaded`.
- **Flexible Slides Per View**: Set `slidesPerView` and `spaceBetween` per instance.
- **Single Slide Mode**: Option to display one slide at all breakpoints.

## Installation

1. **Include Swiper's CSS and JS**:

   ```html
   <!-- Swiper CSS -->
   <link
     rel="stylesheet"
     href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"
   />

   <!-- Swiper JS -->
   <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
   ```

2. **Include the Swiper Initializer Script**:

   Place the `swiper-initializer.js` script after defining any global configurations.

   ```html
   <script src="path/to/swiper-initializer.js"></script>
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
    <!-- Pagination -->
    <div class="swiper-bullet-wrapper"></div>
    <!-- Navigation -->
    <div class="swiper-next"></div>
    <div class="swiper-prev"></div>
    <!-- Scrollbar -->
    <div class="swiper-drag-wrapper"></div>
  </div>
  <!-- Progress Bar (optional) -->
  <div class="swiper-progress-bar-wrapper">
    <div class="swiper-progress-bar"></div>
  </div>
</div>
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
    pagination: {
      el: ".swiper-bullet-wrapper",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-next",
      prevEl: ".swiper-prev",
    },
    scrollbar: {
      el: ".swiper-drag-wrapper",
      draggable: true,
    },
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
    mousewheel: {
      forceToAxis: true,
    },
    fullHeight: false,
    observer: true,
    observeParents: true,
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

#### Example:

```html
<div
  class="slider-main_component"
  data-autoplay="5000"
  data-effect="fade"
  data-progress-bar="true"
  data-single-slide="true"
>
  <!-- Swiper structure -->
</div>
```

## Progress Bar

To add a progress bar that shows when the next slide will be displayed during autoplay:

1. **Enable the Progress Bar**:

   Add `data-progress-bar="true"` to your `.slider-main_component` and ensure `autoplay` is enabled.

2. **Add the Progress Bar Elements**:

   Place the progress bar wrapper and bar outside the `.swiper` element but inside the `.slider-main_component`.

   ```html
   <!-- Progress Bar -->
   <div class="swiper-progress-bar-wrapper">
     <div class="swiper-progress-bar"></div>
   </div>
   ```

3. **Customize the Styles**:

   Use the provided CSS classes to style the progress bar.

## Examples

### Example 1: Single Slide at All Breakpoints with Progress Bar

```html
<div
  class="slider-main_component"
  data-autoplay="4000"
  data-progress-bar="true"
  data-single-slide="true"
>
  <div class="swiper">
    <!-- Swiper content -->
  </div>
  <!-- Progress Bar -->
  <div class="swiper-progress-bar-wrapper">
    <div class="swiper-progress-bar"></div>
  </div>
</div>
```

### Example 2: Custom Slides Per View and Breakpoints

```html
<div
  class="slider-main_component"
  data-slides-per-view="3"
  data-breakpoints='{"768": {"slidesPerView": 2}, "1024": {"slidesPerView": 3}}'
>
  <div class="swiper">
    <!-- Swiper content -->
  </div>
</div>
```

## CSS Adjustments

To ensure slides can adjust their height appropriately and the progress bar displays correctly, include the following CSS:

```css
/* Allow slides to adjust their height */
.slider-main_component .swiper,
.slider-main_component .swiper-wrapper,
.slider-main_component .swiper-slide {
  height: auto !important;
}

/* For full-height slides */
.slider-main_component[data-full-height="true"] {
  height: 100vh;
}

.slider-main_component[data-full-height="true"] .swiper,
.slider-main_component[data-full-height="true"] .swiper-wrapper,
.slider-main_component[data-full-height="true"] .swiper-slide {
  height: 100% !important;
}

/* Position the progress bar */
.slider-main_component {
  position: relative;
}

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

/* Vendor prefixes for broader support */
@-webkit-keyframes swiper-progress-bar-animation {
  from {
    -webkit-transform: scaleX(0);
  }
  to {
    -webkit-transform: scaleX(1);
  }
}

@-ms-keyframes swiper-progress-bar-animation {
  from {
    -ms-transform: scaleX(0);
  }
  to {
    -ms-transform: scaleX(1);
  }
}
```

## Notes

- **Order Matters**: Define `window.SwiperDefaults` before including the initializer script.
- **Data Attribute Formatting**: When using `data-breakpoints`, ensure JSON is properly formatted.
- **Vendor Prefixes**: The CSS includes vendor prefixes for broader browser support.
- **Per-Instance Configurations**: Utilize data attributes to customize sliders without affecting others.
- **Testing**: Test sliders across different devices and browsers to ensure consistent behavior.

## License

This script is provided under the [MIT License](LICENSE).