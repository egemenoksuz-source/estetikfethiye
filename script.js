document.addEventListener("DOMContentLoaded", function () {
  const menuButton = document.querySelector(".menu-btn");
  const menu = document.querySelector(".links");

  if (menuButton && menu) {
    menuButton.addEventListener("click", function () {
      menu.classList.toggle("open");

      menuButton.setAttribute(
        "aria-expanded",
        menu.classList.contains("open")
      );
    });

    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        menu.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
      });
    });
  }

  const animatedElements = document.querySelectorAll(
    ".trust-item, .section-head, .card, .editorial-img, " +
    ".editorial-note, .catalog-group, .catalog-cta, " +
    ".visual, .copy, .step, .faq-intro, .faq details"
  );

  animatedElements.forEach(function (element) {
    element.classList.add("reveal");
  });

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  animatedElements.forEach(function (element) {
    observer.observe(element);
  });
});