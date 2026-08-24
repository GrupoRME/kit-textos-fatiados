(function () {
  "use strict";

  function setupCarousel(trackId, dotsId, prevId, nextId) {
    var track = document.getElementById(trackId);
    var dotsWrap = document.getElementById(dotsId);
    var prevBtn = document.getElementById(prevId);
    var nextBtn = document.getElementById(nextId);
    if (!track || !dotsWrap || !prevBtn || !nextBtn) return;

    var slides = track.querySelectorAll("img");
    var dots = dotsWrap.querySelectorAll("button");
    var current = 0;

    function show(index) {
      var total = slides.length;
      current = (index + total) % total;

      slides.forEach(function (img, i) {
        var active = i === current;
        img.classList.toggle("opacity-100", active);
        img.classList.toggle("opacity-0", !active);
        img.setAttribute("aria-hidden", active ? "false" : "true");
      });

      dots.forEach(function (dot, i) {
        var active = i === current;
        dot.classList.toggle("w-7", active);
        dot.classList.toggle("bg-primary", active);
        dot.classList.toggle("w-2.5", !active);
        dot.classList.toggle("bg-muted-foreground/30", !active);
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

    var items = list.querySelectorAll(":scope > div");

    function closeItem(item) {
      var btn = item.querySelector("button");
      var panel = item.querySelector(":scope > div.grid");
      var icon = btn.querySelector("span");
      var chevron = icon.querySelector("svg");

      btn.setAttribute("aria-expanded", "false");
      panel.style.gridTemplateRows = "0fr";
      icon.classList.remove("bg-primary", "text-primary-foreground");
      icon.classList.add("bg-secondary", "text-primary");
      chevron.classList.remove("rotate-180");
      item.classList.remove("border-primary/40");
      item.classList.add("border-primary/10");
    }

    function openItem(item) {
      var btn = item.querySelector("button");
      var panel = item.querySelector(":scope > div.grid");
      var icon = btn.querySelector("span");
      var chevron = icon.querySelector("svg");

      btn.setAttribute("aria-expanded", "true");
      panel.style.gridTemplateRows = "1fr";
      icon.classList.remove("bg-secondary", "text-primary");
      icon.classList.add("bg-primary", "text-primary-foreground");
      chevron.classList.add("rotate-180");
      item.classList.remove("border-primary/10");
      item.classList.add("border-primary/40");
    }

    items.forEach(function (item) {
      var btn = item.querySelector("button");
      btn.addEventListener("click", function () {
        var isOpen = btn.getAttribute("aria-expanded") === "true";
        items.forEach(closeItem);
        if (!isOpen) openItem(item);
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    setupCarousel("carousel-track", "carousel-dots", "carousel-prev", "carousel-next");
    setupCarousel("carousel-track-2", "carousel-dots-2", "carousel-prev-2", "carousel-next-2");
    setupFaq();
  });
})();
