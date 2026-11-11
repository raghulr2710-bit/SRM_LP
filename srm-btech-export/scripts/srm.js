/* SRM adapter: settings transcribed from the reference page's custom.js.
 * Carousel rendering/animation uses the original bundled Slick library.
 */
"use strict";
(() => {
  const $ = window.jQuery;
  if (!$ || !$.fn.slick) return;
  document
    .querySelectorAll(".headerBanner_slide,.whySrmSlide,.lifeAtSrm_slider")
    .forEach((slider) => {
      const originals = [
        ...slider.querySelectorAll(".slick-slide:not(.slick-cloned)"),
      ];
      if (!originals.length) return;
      for (const slide of originals) {
        for (const attribute of [
          "style",
          "role",
          "tabindex",
          "aria-hidden",
          "aria-describedby",
          "data-slick-index",
        ])
          slide.removeAttribute(attribute);
        slide.classList.remove("slick-slide", "slick-active", "slick-current");
      }
      slider.replaceChildren(...originals);
      slider.classList.remove(
        "slick-slider",
        "slick-initialized",
        "slick-dotted",
      );
      slider.removeAttribute("role");
    });
  const common = {
    rows: 1,
    autoplaySpeed: 2000,
    speed: 500,
    slidesToScroll: 1,
    pauseOnHover: true,
    adaptiveHeight: true,
    cssEase: "linear",
    swipeToSlide: true,
  };
  $(".headerBanner_slide").slick({
    ...common,
    infinite: true,
    autoplay: true,
    slidesToShow: 1,
    dots: false,
    arrows: false,
  });
  $(".whySrmSlide").slick({
    ...common,
    infinite: true,
    autoplay: false,
    slidesToShow: 1,
    dots: true,
    arrows: false,
  });
  $(".lifeAtSrm_slider").slick({
    ...common,
    infinite: false,
    autoplay: false,
    slidesToShow: 3,
    dots: false,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          arrows: false,
        },
      },
    ],
  });
  const register = document.querySelector(".desktop_withoutpopup");
  if (register && !register.querySelector('a[href="#tab2default"]')) {
    const wrapper = document.createElement("div");
    wrapper.className = "text-center center-link";
    const link = document.createElement("a");
    link.href = "#tab2default";
    link.dataset.toggle = "tab";
    link.textContent = "Existing user? Login";
    wrapper.append(link);
    register.append(wrapper);
  }
  document.querySelector("#tab1default")?.classList.remove("fade");
  document
    .querySelectorAll(
      "#registerBtn,#loginBtn,#forgotBtn,#resendVlinkBtn,#forgotOtpBtn",
    )
    .forEach((button) => {
      if (!button.parentElement.classList.contains("register-parent")) {
        const wrapper = document.createElement("div");
        wrapper.className = "register-parent";
        wrapper.style.textAlign = "center";
        button.replaceWith(wrapper);
        wrapper.append(button);
      }
    });
  const nav = document.querySelector(".nav_wrapper");
  const scroll = () =>
    nav?.classList.toggle("navbar_bgColor_scroll_changed", window.scrollY > 0);
  window.addEventListener("scroll", scroll, { passive: true });
  scroll();
  document.querySelectorAll("input").forEach((input) => {
    input.addEventListener("focus", () => input.classList.add("input-focus"));
    input.addEventListener("blur", () => input.classList.remove("input-focus"));
  });
  document.querySelectorAll('.tab[id^="tab"]').forEach((tab) => {
    tab.tabIndex = 0;
    tab.setAttribute("role", "tab");
    const activate = () => {
      const id = tab.id.replace("tab", "");
      document.querySelectorAll('.tab[id^="tab"]').forEach((item) => {
        item.classList.toggle("active", item === tab);
        item.setAttribute("aria-selected", String(item === tab));
      });
      document
        .querySelectorAll('.content[id^="content"]')
        .forEach((content) =>
          content.classList.toggle("active", content.id === "content" + id),
        );
    };
    tab.addEventListener("click", activate);
    tab.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        activate();
      }
    });
  });
  window.addEventListener("load", () =>
    $(".slick-initialized").slick("setPosition"),
  );
})();
