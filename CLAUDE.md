# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Swiper Starter Kit (v2.3.0) is a zero-config, attribute-driven wrapper around Swiper 11+ that lets you configure sliders entirely through HTML `data-*` attributes. It's vanilla JavaScript (ES2015+) with no build system, no transpilation, and no dependencies beyond Swiper itself (loaded via CDN). Primary audience is Webflow designers and developers who want sliders without writing JS.

## Development Workflow

There is **no build process, no linter, no test runner**. The project is two source files:

- `js/script.js` — the entire library (single IIFE, ~820 lines)
- `css/style.css` — component styles (progress bars, bullets, range slider, navigation)

**To develop:** Edit the source files directly and open `test.html` in a browser to verify changes. The test page contains comprehensive examples of all features.

**Distribution:** Via jsDelivr CDN pointing at this GitHub repo. Version is tracked in `package.json`.

## Architecture

### Initialization Flow

1. `DOMContentLoaded` fires → `initSwipers()` runs
2. For each `.slider-main_component` element:
   - Check viewport against `data-disable-below` / `data-disable-above`
   - Merge config: Swiper defaults → `window.SwiperDefaults` → per-instance `data-*` attributes
   - If loop mode + insufficient slides → smart-clone slides in DOM
   - Instantiate `new Swiper()` with merged config
   - Register in slider Map registry with cleanup functions
3. Set up shared `IntersectionObserver` for autoplay-in-view
4. Debounced `resize` listener calls `initSwipers()` to handle responsive toggling

### Key Sections in script.js

- **Section 0** (top): Utilities — `deepMerge`, `debounce`, `resolveCssLength` (handles CSS vars/calc in data-space-between)
- **Section 1**: Default Swiper configuration object
- **Section 2**: Slider registry (`Map<HTMLElement, {swiper, destroyFns}>`) and shared IntersectionObserver
- **Section 3**: Main `initSwipers()` / `destroySwipers()` logic — the core init/destroy lifecycle
- **Section 4**: Helper features — auto-height, z-index stacking, progress bars, bullet progress, custom range slider

### Global API

```js
window.initSwipers()         // (re)initialize all sliders based on current viewport
window.recalcSwipers()       // alias for initSwipers()
window.destroySwipers(sel?)  // destroy all or filtered sliders
```

Each initialized container exposes `._swiperInstance` and `._swiperConfig`.

### Config Merging Priority

`Swiper defaults` → `window.SwiperDefaults` (global override) → `data-*` attributes (per-instance) → `data-breakpoints` JSON (responsive)

### CSS Custom Properties

Styles use `--slider-color` (default `#8b5cf6`) and `--slider-track-bg`. The `data-slider-color` attribute sets `--slider-color` on the container.

## Important Conventions

- **IIFE with strict mode** — all code wrapped in `(function() { "use strict"; ... })()`
- **Attribute-first design** — all slider config is done via `data-*` attributes, not JS calls
- **Defensive initialization** — try-catch around each Swiper instantiation so one broken slider doesn't block others
- **Debug mode** — set `window.SWIPER_STARTER_DEBUG = true` before script load to enable console logging
- **Accessibility** — respects `prefers-reduced-motion: reduce` by disabling autoplay
- **Performance** — single shared IntersectionObserver for all autoplay-in-view sliders, debounced resize handler
- **Smart loop cloning** — when loop mode has too few slides, DOM clones are created automatically (v2.2+)
- **Static slider** — `data-static-slider="true"` disables all interaction (touch, nav, pagination, keyboard)
