(function () {
  const routes = {
    home: {
      file: "pages/home.html",
      title: "Exam Paper Variation CPD"
    },
    "claude-chat": {
      file: "pages/claude-chat.html",
      title: "Claude Chat Workflow | Exam Paper Variation CPD"
    },
    "power-user": {
      file: "pages/power-user.html",
      title: "Power User Workflow | Exam Paper Variation CPD"
    }
  };

  const aliases = {
    free: "claude-chat",
    pro: "claude-chat",
    repo: "power-user"
  };

  function pageFromHash() {
    const key = window.location.hash.replace("#", "");
    return routes[key] ? key : aliases[key] || "home";
  }

  async function loadPage(key) {
    const root = document.querySelector("#page-root");
    const navLinks = [...document.querySelectorAll("[data-nav]")];
    const route = routes[key];
    const response = await fetch(route.file);

    if (!response.ok) {
      throw new Error(`Could not load ${route.file}`);
    }

    root.innerHTML = await response.text();

    navLinks.forEach((link) => {
      const isCurrent = link.dataset.nav === key;

      if (isCurrent) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });

    document.title = route.title;
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  function route() {
    loadPage(pageFromHash()).catch(() => {
      if (window.location.hash !== "#home") {
        window.location.hash = "home";
      }
    });
  }

  window.CPD_ROUTER = {
    route
  };
})();
