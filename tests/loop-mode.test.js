const buildSlider = (slideCount = 3) => {
  const container = document.createElement("div");
  container.className = "slider-main_component";
  container.innerHTML = `
    <div class="swiper">
      <div class="swiper-wrapper">
        ${Array.from({ length: slideCount })
          .map(() => '<div class="swiper-slide">Slide</div>')
          .join("")}
      </div>
    </div>
  `;
  document.body.appendChild(container);
  return container;
};

const setupSwiperMock = () => {
  const swiperMock = jest.fn().mockImplementation((el, params) => ({
    el,
    params,
    autoplay: { start: jest.fn(), stop: jest.fn() },
    destroy: jest.fn(),
    slides: el.querySelectorAll(".swiper-slide"),
  }));
  global.Swiper = swiperMock;
  return swiperMock;
};

describe("loop mode auto-disables when slides do not overflow", () => {
  let swiperMock;

  beforeEach(() => {
    jest.resetModules();
    document.body.innerHTML = "";
    delete window.SwiperDefaults;
    swiperMock = setupSwiperMock();
  });

  afterEach(() => {
    document.body.innerHTML = "";
    jest.clearAllMocks();
    delete window.SwiperDefaults;
  });

  const loadScript = () => {
    jest.isolateModules(() => {
      require("../js/script.js");
    });
  };

  test("defaults loop off when slides fit numeric breakpoint", () => {
    window.SwiperDefaults = { loop: true };
    const container = buildSlider(2);

    loadScript();
    window.initSwipers();

    expect(swiperMock).toHaveBeenCalledTimes(1);
    expect(container._swiperConfig.loop).toBe(false);
  });

  test("disables watchOverflow when auto breakpoint forces loop off", () => {

    window.SwiperDefaults = {
      loop: true,
      breakpoints: {
        480: { slidesPerView: "auto" },
        768: null,
        992: null,
        1200: null,
      },
    };

    const container = buildSlider(3);

    loadScript();
    window.initSwipers();

    expect(swiperMock).toHaveBeenCalledTimes(1);
    expect(container._swiperConfig.loop).toBe(false);
    expect(container._swiperConfig.watchOverflow).toBe(false);
  });
});
