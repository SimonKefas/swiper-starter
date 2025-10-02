const assert = require('assert');
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const html = `<!DOCTYPE html>
<html>
  <body>
    <div
      class="slider-main_component"
      data-loop-mode="true"
      data-breakpoints="{'768': { 'slidesPerView': 2 }, '992': { 'slidesPerView': 3 }}"
    >
      <div class="swiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide">Slide 1</div>
          <div class="swiper-slide">Slide 2</div>
          <div class="swiper-slide">Slide 3</div>
        </div>
      </div>
    </div>

    <div
      class="slider-main_component"
      data-breakpoints="{'768': { 'slidesPerView': 2 }}"
    >
      <div class="swiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide">A</div>
          <div class="swiper-slide">B</div>
        </div>
      </div>
    </div>
  </body>
</html>`;

const dom = new JSDOM(html, {
  url: 'https://example.com',
  pretendToBeVisual: true,
  runScripts: 'outside-only',
});

const { window } = dom;
const { document } = window;

class FakeSwiper {
  constructor(el, config) {
    this.el = el;
    this.params = config;
    this.slides = Array.from(el.querySelectorAll('.swiper-slide'));
    this.realIndex = 0;
    this.activeIndex = 0;
    this.progress = 0;
    this.destroyed = false;
    this._handlers = {};

    this.autoplay = config.autoplay
      ? {
          start: () => {
            this.autoplayStarted = true;
          },
          stop: () => {
            this.autoplayStopped = true;
          },
        }
      : null;
  }

  destroy() {
    this.destroyed = true;
  }

  slideTo(index) {
    this.realIndex = index;
    this.activeIndex = index;
    (this._handlers['slideChange'] || []).forEach((cb) => cb());
  }

  on(event, callback) {
    this._handlers[event] = this._handlers[event] || [];
    this._handlers[event].push(callback);
  }
}

window.Swiper = FakeSwiper;
global.Swiper = FakeSwiper;
window.IntersectionObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};
global.IntersectionObserver = window.IntersectionObserver;

if (!window.matchMedia) {
  window.matchMedia = () => ({
    matches: false,
    addListener() {},
    removeListener() {},
  });
}

global.matchMedia = window.matchMedia;

window.requestAnimationFrame = window.requestAnimationFrame || ((cb) => setTimeout(() => cb(Date.now()), 0));
window.cancelAnimationFrame = window.cancelAnimationFrame || ((id) => clearTimeout(id));

global.requestAnimationFrame = window.requestAnimationFrame;
global.cancelAnimationFrame = window.cancelAnimationFrame;

global.window = window;
global.document = document;
global.HTMLElement = window.HTMLElement;
global.CustomEvent = window.CustomEvent;
if (!global.navigator) {
  global.navigator = window.navigator;
}

const scriptPath = path.join(__dirname, '..', 'js', 'script.js');
const scriptContent = fs.readFileSync(scriptPath, 'utf8');
window.eval(scriptContent);

window.initSwipers();

const containers = Array.from(document.querySelectorAll('.slider-main_component'));
assert.strictEqual(containers.length, 2, 'Expected two slider containers in the test DOM');

const [loopContainer, defaultContainer] = containers;

assert.ok(loopContainer._swiperConfig, 'Loop slider should initialise and store config');
assert.strictEqual(loopContainer._swiperConfig.loop, true, 'Explicit loop mode should remain enabled');
assert.strictEqual(
  loopContainer._swiperConfig.watchOverflow,
  false,
  'Loop slider should disable watchOverflow for swipeability',
);

assert.ok(defaultContainer._swiperConfig, 'Default slider should initialise and store config');
assert.strictEqual(
  defaultContainer._swiperConfig.loop,
  false,
  'Loop should auto-disable when not explicitly requested and slides fit per view',
);
assert.strictEqual(
  defaultContainer._swiperConfig.watchOverflow,
  true,
  'watchOverflow should remain enabled when loop is off',
);

console.log('Loop mode automation test passed.');
