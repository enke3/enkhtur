(function () {
  "use strict";

  /* ---------- fullscreen menu ---------- */
  var menuBtn = document.getElementById("menuBtn");
  var closeMenu = document.getElementById("closeMenu");
  var menuOverlay = document.getElementById("menuOverlay");
  var menuLinks = menuOverlay.querySelectorAll("a");

  function openMenu() {
    // restart the per-item pop-in animation every time the menu opens
    menuLinks.forEach(function (el) {
      el.style.animation = "none";
      el.style.animationDelay = "";
    });
    var contact = menuOverlay.querySelector(".menu-contact");
    if (contact) {
      contact.style.animation = "none";
    }

    menuOverlay.classList.add("open");
    menuOverlay.setAttribute("aria-hidden", "false");
    menuBtn.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";

    // force reflow so the animation restarts, then stagger each item in
    void menuOverlay.offsetWidth;
    menuLinks.forEach(function (el, i) {
      el.style.animation = "";
      el.style.animationDelay = (i * 0.05) + "s";
    });
    if (contact) {
      contact.style.animation = "";
      contact.style.animationDelay = (menuLinks.length * 0.05 + 0.1) + "s";
    }
  }

  function closeMenuFn() {
    menuOverlay.classList.remove("open");
    menuOverlay.setAttribute("aria-hidden", "true");
    menuBtn.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  menuBtn.addEventListener("click", openMenu);
  closeMenu.addEventListener("click", closeMenuFn);
  menuLinks.forEach(function (link) {
    link.addEventListener("click", closeMenuFn);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && menuOverlay.classList.contains("open")) {
      closeMenuFn();
    }
  });

  /* ---------- scroll reveal ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("in-view");
    });
  }
})();
