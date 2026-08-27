(function () {
  "use strict";

  function setupCarousel(trackId, dotsId, prevId, nextId) {
    var track = document.getElementById(trackId);
    var dotsWrap = document.getElementById(dotsId);
    var prevBtn = document.getElementById(prevId);
    var nextBtn = document.getElementById(nextId);
    if (!track || !dotsWrap || !prevBtn || !nextBtn) return;

    var slides = track.querySelectorAll(".carousel-slide");
    var dots = dotsWrap.querySelectorAll(".carousel-dot");
    var current = 0;

    function show(index) {
      var total = slides.length;
      current = (index + total) % total;

      slides.forEach(function (slide, i) {
        var active = i === current;
        slide.classList.toggle("is-active", active);
        slide.setAttribute("aria-hidden", active ? "false" : "true");
      });

      dots.forEach(function (dot, i) {
        dot.classList.toggle("is-active", i === current);
      });
    }

    prevBtn.addEventListener("click", function () { show(current - 1); });
    nextBtn.addEventListener("click", function () { show(current + 1); });
    dots.forEach(function (dot, i) {
      dot.addEventListener("click", function () { show(i); });
    });
  }

  function setupFaq() {
    var list = document.getElementById("faq-list");
    if (!list) return;

    var items = list.querySelectorAll(".faq-item");

    function setOpen(item, open) {
      var btn = item.querySelector(".faq-question");
      item.classList.toggle("is-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    }

    items.forEach(function (item) {
      var btn = item.querySelector(".faq-question");
      btn.addEventListener("click", function () {
        var isOpen = item.classList.contains("is-open");
        items.forEach(function (other) { setOpen(other, false); });
        if (!isOpen) setOpen(item, true);
      });
    });
  }

  function forwardQueryParams() {
    var search = window.location.search;
    if (!search) return;

    var current = new URLSearchParams(search);
    var links = document.querySelectorAll('a[href*="payt.site"]');
    links.forEach(function (link) {
      var url = new URL(link.href);
      current.forEach(function (value, key) {
        if (!url.searchParams.has(key)) url.searchParams.set(key, value);
      });
      link.href = url.toString();
    });
  }

  function setupUpsell() {
    var trigger = document.getElementById("cta-oferta");
    var backdrop = document.getElementById("upsell-backdrop");
    var closeBtn = document.getElementById("upsell-close");
    var declineBtn = document.getElementById("upsell-decline");
    if (!trigger || !backdrop || !closeBtn || !declineBtn) return;

    function open() { backdrop.classList.add("is-open"); }
    function close() { backdrop.classList.remove("is-open"); }

    trigger.addEventListener("click", function (e) {
      e.preventDefault();
      open();
    });
    closeBtn.addEventListener("click", close);
    declineBtn.addEventListener("click", function () {
      window.location.href = trigger.href;
    });
    backdrop.addEventListener("click", function (e) {
      if (e.target === backdrop) close();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && backdrop.classList.contains("is-open")) close();
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    setupCarousel("carousel-track", "carousel-dots", "carousel-prev", "carousel-next");
    setupCarousel("carousel-track-2", "carousel-dots-2", "carousel-prev-2", "carousel-next-2");
    setupCarousel("carousel-track-3", "carousel-dots-3", "carousel-prev-3", "carousel-next-3");
    setupFaq();
    setupUpsell();
    forwardQueryParams();
  });
})();
