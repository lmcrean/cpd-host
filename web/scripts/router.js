(function () {
  const routes = {
    "claude-chat": {
      file: "pages/claude-chat.html",
      title: "Claude Chat Workflow | Exam Paper Variation CPD"
    }
  };

  const aliases = {
    home: "claude-chat",
    free: "claude-chat",
    pro: "claude-chat",
    repo: "claude-chat"
  };

  function pageFromHash() {
    const key = window.location.hash.replace("#", "");
    const routeKey = routes[key] ? key : aliases[key] || "claude-chat";

    if (window.location.hash !== `#${routeKey}`) {
      window.history.replaceState(null, "", `#${routeKey}`);
    }

    return routeKey;
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
      if (window.location.hash !== "#claude-chat") {
        window.location.hash = "claude-chat";
      }
    });
  }

  window.CPD_ROUTER = {
    route
  };
})();
