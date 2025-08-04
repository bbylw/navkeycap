document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll("nav a");

  // 主题切换：读取/写入 data-theme 到 localStorage
  const THEME_KEY = "webnav.theme";
  const rootEl = document.documentElement;
  const savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme === "light" || savedTheme === "dark") {
    rootEl.setAttribute("data-theme", savedTheme);
  }

  // 动态插入主题切换按钮（放到导航胶囊末尾）
  const navUl = document.querySelector("nav ul");
  if (navUl) {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.type = "button";
    btn.setAttribute("aria-label", "Toggle theme");
    btn.textContent = "Theme";
    // 使用与导航 pill 接近的样式类名（复用 a 的视觉由 CSS 继承现有风格）
    btn.style.border = "none";
    btn.style.background = "transparent";
    btn.style.cursor = "pointer";
    btn.style.font = "inherit";
    btn.className = "theme-toggle";
    li.appendChild(btn);
    navUl.appendChild(li);

    btn.addEventListener("click", () => {
      const cur = rootEl.getAttribute("data-theme");
      const next = cur === "dark" ? "light" : "dark";
      rootEl.setAttribute("data-theme", next);
      localStorage.setItem(THEME_KEY, next);
    });
  }

  // 为所有 target=_blank 外链补充安全属性
  document.querySelectorAll('a[target="_blank"]').forEach((a) => {
    const rel = (a.getAttribute("rel") || "").split(/\s+/).filter(Boolean);
    if (!rel.includes("noopener")) rel.push("noopener");
    if (!rel.includes("noreferrer")) rel.push("noreferrer");
    a.setAttribute("rel", rel.join(" "));
  });

  // 工具函数：同步导航 active 与 aria-current
  function syncActive(linkEl) {
    if (!linkEl) return;
    navLinks.forEach((l) => {
      l.classList.remove("active");
      l.removeAttribute("aria-current");
    });
    linkEl.classList.add("active");
    linkEl.setAttribute("aria-current", "page");
  }

  // 仅处理站内锚点的点击，外链不拦截
  navLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href") || "";
      if (!href.startsWith("#")) {
        // 外链：不处理 active 状态也不阻止默认行为
        return;
      }

      e.preventDefault();
      syncActive(this);

      const targetId = href.slice(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });

        const newUrl =
          window.location.protocol +
          "//" +
          window.location.host +
          window.location.pathname +
          "#" +
          targetId;
        window.history.pushState({ path: newUrl }, "", newUrl);
      }
    });
  });

  function handleHashChange() {
    const hash = window.location.hash;
    if (hash) {
      const targetElement = document.getElementById(hash.substring(1));
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
        const activeLink = document.querySelector('nav a[href="' + hash + '"]');
        if (activeLink) {
          syncActive(activeLink);
        }
      }
    }
  }

  window.addEventListener("hashchange", handleHashChange);
  // 首次载入时按现有 hash 定位并高亮；若无 hash，默认激活第一个
  if (window.location.hash) {
    handleHashChange();
  } else if (navLinks[0]) {
    syncActive(navLinks[0]);
  }
});