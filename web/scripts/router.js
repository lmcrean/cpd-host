(function () {
  const workflowKeys = ["free", "pro", "repo"];

  function pageFromHash() {
    const key = window.location.hash.replace("#", "");
    return workflowKeys.includes(key) ? key : "home";
  }

  function showPage(key) {
    const pages = [...document.querySelectorAll("[data-page]")];
    const navLinks = [...document.querySelectorAll("[data-nav]")];
    const workflows = window.CPD_WORKFLOWS;

    pages.forEach((page) => {
      page.hidden = page.dataset.page !== key;
    });

    navLinks.forEach((link) => {
      const isCurrent = link.dataset.nav === key;

      if (isCurrent) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });

    document.title = key === "home" ? "Exam Paper Variation CPD" : `${workflows[key].name} | Exam Paper Variation CPD`;
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  function route() {
    showPage(pageFromHash());
  }

  window.CPD_ROUTER = {
    route
  };
})();
