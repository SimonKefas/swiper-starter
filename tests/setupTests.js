const noop = () => {};

if (typeof window.matchMedia !== "function") {
  window.matchMedia = () => ({
    matches: false,
    addListener: noop,
    removeListener: noop,
    addEventListener: noop,
    removeEventListener: noop,
    dispatchEvent: noop,
  });
}

class MockIntersectionObserver {
  constructor() {
    this.observe = noop;
    this.unobserve = noop;
    this.disconnect = noop;
  }
}

if (typeof window.IntersectionObserver !== "function") {
  window.IntersectionObserver = MockIntersectionObserver;
}
