(function () {
  "use strict";

  /* ---------- cursor-following glow ---------- */
  var glow = document.getElementById("cursorGlow");
  if (glow && window.matchMedia && window.matchMedia("(pointer: fine)").matches) {
    var glowTicking = false;
    document.addEventListener("mousemove", function (e) {
      glow.classList.add("active");
      if (!glowTicking) {
        window.requestAnimationFrame(function () {
          glow.style.setProperty("--gx", e.clientX + "px");
          glow.style.setProperty("--gy", e.clientY + "px");
          glowTicking = false;
        });
        glowTicking = true;
      }
    });
    document.addEventListener("mouseleave", function () {
      glow.classList.remove("active");
    });
  }

  /* ---------- shooting stars ---------- */
  var shootingLayer = document.getElementById("shootingStars");
  if (shootingLayer) {
    function fireShootingStar() {
      var star = document.createElement("span");
      star.className = "shooting-star";
      star.style.top = (Math.random() * 40) + "%";
      star.style.left = (30 + Math.random() * 60) + "%";
      shootingLayer.appendChild(star);
      // trigger the animation on the next frame so it actually runs
      requestAnimationFrame(function () {
        star.classList.add("run");
      });
      star.addEventListener("animationend", function () {
        star.remove();
      });
    }

    function scheduleShootingStar() {
      var delay = 4000 + Math.random() * 7000;
      window.setTimeout(function () {
        fireShootingStar();
        scheduleShootingStar();
      }, delay);
    }

    if (!window.matchMedia || !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      scheduleShootingStar();
    }
  }

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

  /* ---------- project detail modal ---------- */
  var modalOverlay = document.getElementById("projectModal");
  if (modalOverlay) {
    var modalThumb = document.getElementById("modalThumb");
    var modalTitle = document.getElementById("modalTitle");
    var modalDesc = document.getElementById("modalDesc");
    var modalChips = document.getElementById("modalChips");
    var modalLink = document.getElementById("modalLink");
    var modalCloseBtn = document.getElementById("modalClose");
    var projectCards = document.querySelectorAll(".project-card[data-project]");
    var lastFocused = null;

    function openProjectModal(card) {
      var titleEl = card.querySelector("h3");
      var fullDesc = card.querySelector(".full-desc");
      var thumb = card.querySelector(".thumb-inner");
      var chips = card.querySelector(".chip-row");
      var link = card.getAttribute("data-link");

      modalTitle.textContent = titleEl ? titleEl.textContent : "";
      modalDesc.innerHTML = fullDesc ? fullDesc.innerHTML : "";
      modalChips.innerHTML = chips ? chips.innerHTML : "";
      modalThumb.innerHTML = "";
      if (thumb) {
        modalThumb.appendChild(thumb.cloneNode(true));
      }

      if (link) {
        modalLink.href = link;
        modalLink.style.display = "inline-block";
      } else {
        modalLink.style.display = "none";
        modalLink.removeAttribute("href");
      }

      lastFocused = document.activeElement;
      modalOverlay.classList.add("open");
      modalOverlay.setAttribute("aria-hidden", "false");
      document.body.classList.add("modal-open");
      modalCloseBtn.focus();
    }

    function closeProjectModal() {
      modalOverlay.classList.remove("open");
      modalOverlay.setAttribute("aria-hidden", "true");
      document.body.classList.remove("modal-open");
      if (lastFocused && typeof lastFocused.focus === "function") {
        lastFocused.focus();
      }
    }

    projectCards.forEach(function (card) {
      card.addEventListener("click", function () {
        openProjectModal(card);
      });
      card.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openProjectModal(card);
        }
      });
    });

    modalCloseBtn.addEventListener("click", closeProjectModal);
    modalOverlay.addEventListener("click", function (e) {
      if (e.target === modalOverlay) {
        closeProjectModal();
      }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && modalOverlay.classList.contains("open")) {
        closeProjectModal();
      }
    });
  }
})();
