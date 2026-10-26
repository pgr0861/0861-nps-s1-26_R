const SITE = {
  name: "Pavel Gorfunkel",
  unit: "NPS10003: Sustainability Challenges in Science",
  university: "Swinburne University of Technology",
};

const PAGES = [
  { file: "index.html", title: "Home" },
  { file: "turnitin.html", num: 1, title: "Research (Turnitin)", short: "Research", colour: "#ff6b4a", ink: "#2a0d05" },
  { file: "digital-skills.html", num: 2, title: "Digital Skills", colour: "#3d5afe", ink: "#ffffff" },
  { file: "sustainability.html", num: 3, title: "Sustainability", colour: "#2ec27e", ink: "#05301c" },
  { file: "spreadsheets.html", num: 4, title: "Spreadsheets", colour: "#ffd43b", ink: "#3d2e00" },
  { file: "five3one.html", num: 5, title: "Five3One", colour: "#c77dff", ink: "#2a0a40" },
  { file: "professional-purpose.html", num: 6, title: "Professional Purpose", short: "Purpose", colour: "#ff8fab", ink: "#3d0a17" },
  { file: "cultural-competency.html", num: 7, title: "Indigenous Cultural Competency", short: "Cultural Competency", colour: "#e07a1f", ink: "#2b1300" },
  { file: "video-editing.html", num: 8, title: "Video Editing", colour: "#d62839", ink: "#ffffff" },
  { file: "guest-lectures.html", num: 9, title: "Guest Lectures", colour: "#00a6a6", ink: "#002424" },
  { file: "reflection.html", num: 10, title: "Overall Reflection", short: "Reflection", colour: "#1d3557", ink: "#ffffff" },
  { file: "project.html", num: "P", title: "Final Project", short: "Project", colour: "#ffffff", ink: "#141414" },
];

(function () {
  const slug = (location.pathname.split("/").pop() || "index").toLowerCase().replace(/\.html$/, "");
  const idx = PAGES.findIndex((p) => p.file.replace(/\.html$/, "") === slug); // -1 on the 404 page
  const page = PAGES[idx] || {};

  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
  const isTodo = (s) => /^\[.*\]$/.test(s);
  const fill = (s) => (isTodo(s) ? `<span class="placeholder">${esc(s)}</span>` : esc(s));
  const pad = (n) => (typeof n === "number" ? String(n).padStart(2, "0") : n); // "P" stays "P"
  const kind = (p) => (typeof p.num === "number" ? `Task ${p.num}` : "Project");
  const vars = (p) => (p.colour ? `--c:${p.colour};--ink:${p.ink}` : "");

  if (page.colour) {
    const root = document.documentElement;
    root.dataset.task = page.num;
    root.style.setProperty("--task", page.colour);
    root.style.setProperty("--task-ink", page.ink);
  }
  if (!isTodo(SITE.name)) document.title = document.title.replace(/\| Portfolio$/, `| ${SITE.name}`);

  const header = document.getElementById("site-header");
  if (header) {
    const brand = isTodo(SITE.name) ? "My portfolio" : `${esc(SITE.name)} <span>/ portfolio</span>`;
    header.innerHTML = `
      <div class="container">
        <a class="brand" href="index.html">${brand}</a>
        <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav">Menu</button>
        <nav class="site-nav" id="site-nav" aria-label="Portfolio pages">
          <ul>${PAGES.map((p, i) => `
            <li${p.num ? "" : ' class="nav-home"'}><a href="${p.file}" style="${vars(p)}"${i === idx ? ' aria-current="page"' : ""}>${
              p.num ? `<span class="nnum">${p.num}</span>` : ""}<span class="nlabel">${esc(p.short || p.title)}</span></a></li>`).join("")}
          </ul>
        </nav>
      </div>`;
    const toggle = header.querySelector(".nav-toggle");
    const nav = header.querySelector(".site-nav");
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.textContent = open ? "Close" : "Menu";
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && nav.classList.contains("open")) { toggle.click(); toggle.focus(); }
    });
    document.addEventListener("click", (e) => {
      if (nav.classList.contains("open") && !header.contains(e.target)) toggle.click();
    });
  }

  document.querySelectorAll("[data-site]").forEach((el) => {
    const v = SITE[el.dataset.site];
    if (v) el.innerHTML = fill(v);
  });

  const grid = document.getElementById("task-grid");
  if (grid) {
    grid.innerHTML = PAGES.filter((p) => p.num).map((p) => `
      <li${typeof p.num === "number" ? "" : ' class="project"'}><a class="task-card" href="${p.file}" style="${vars(p)}">
        <span class="num" aria-hidden="true">${pad(p.num)}</span>
        <h3><span class="visually-hidden">${kind(p)}: </span>${esc(p.title)}</h3>
      </a></li>`).join("");
  }

  const toc = document.querySelector("[data-toc]");
  if (toc) {
    const heads = [...document.querySelectorAll("main .section > h2[id]")];
    if (heads.length > 1) {
      toc.innerHTML = `<h2>Jump to</h2><ol>${heads.map((h) =>
        `<li><a href="#${h.id}">${esc(h.textContent)}</a></li>`).join("")}</ol>`;
    }
  }

  const pager = document.getElementById("pager");
  if (pager && idx > 0) {
    const link = (p, cls, small) => `<a class="${cls}" href="${p.file}" style="${vars(p)}"><small>${small}</small>${
      p.num ? `<b>${pad(p.num)}</b> ` : ""}${esc(p.title)}</a>`;
    const prev = PAGES[idx - 1];
    const next = PAGES[idx + 1] || PAGES[0];
    pager.innerHTML = link(prev, "prev", "&larr; Previous") + link(next, "next", PAGES[idx + 1] ? "Next &rarr;" : "Back to");
  }

     Decorative (the container is aria-hidden), so the stars are mouse-only links. */
  const con = document.getElementById("constellation");
  if (con) {
    const pts = [[10, 72], [24, 50], [37, 63], [45, 38], [58, 22], [71, 36], [65, 60], [79, 76], [91, 55], [86, 22], [70, 6]];
    const tasks = PAGES.filter((p) => p.num);
    con.innerHTML =
      `<svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><polyline points="${
        pts.slice(0, tasks.length).map((p) => p.join(",")).join(" ")}"/></svg>` +
      tasks.map((p, i) => `
        <a class="cstar" href="${p.file}" tabindex="-1" style="left:${pts[i][0]}%;top:${pts[i][1]}%;${vars(p)}">
          <span class="dot"></span><span class="cnum">${p.num}</span>
          <span class="clabel">${pad(p.num)} ${esc(p.short || p.title)}</span>
        </a>`).join("");
  }

  const sky = document.querySelector(".starfield");
  if (sky && sky.getContext) {
    const ctx = sky.getContext("2d");
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const tints = ["#ffffff", "#ffffff", "#ffffff", "#cad7ff", "#9bb0ff", "#fff4ea", "#ffd2a1", "#ffad51"];
    let w = 0, h = 0, stars = [], shoot = null, nextShoot = 0, raf = 0, visible = true;

    const size = () => {
      const r = sky.getBoundingClientRect();
      const d = window.devicePixelRatio || 1;
      w = r.width; h = r.height;
      sky.width = Math.round(w * d); sky.height = Math.round(h * d);
      ctx.setTransform(d, 0, 0, d, 0, 0);
      stars = Array.from({ length: Math.round((w * h) / 1600) }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        r: Math.random() ** 3 * 1.6 + 0.3,
        phase: Math.random() * Math.PI * 2, speed: 0.4 + Math.random() * 1.6,
        tint: tints[Math.floor(Math.random() * tints.length)],
      }));
      if (still) draw(0);
    };

    const draw = (t) => {
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        ctx.globalAlpha = still ? 0.85 : 0.35 + 0.55 * (0.5 + 0.5 * Math.sin(s.phase + (t / 1000) * s.speed));
        ctx.fillStyle = s.tint;
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill();
      }
      if (!still) {
        if (!shoot && t > nextShoot) {
          shoot = { x: Math.random() * w * 0.7, y: Math.random() * h * 0.4, vx: 7 + Math.random() * 4, vy: 2.5 + Math.random() * 2, life: 1 };
        }
        if (shoot) {
          const tail = 14;
          const g = ctx.createLinearGradient(shoot.x, shoot.y, shoot.x - shoot.vx * tail, shoot.y - shoot.vy * tail);
          g.addColorStop(0, "rgba(255,255,255,1)");
          g.addColorStop(1, "rgba(255,255,255,0)");
          ctx.globalAlpha = shoot.life; ctx.strokeStyle = g; ctx.lineWidth = 1.6;
          ctx.beginPath(); ctx.moveTo(shoot.x, shoot.y);
          ctx.lineTo(shoot.x - shoot.vx * tail, shoot.y - shoot.vy * tail); ctx.stroke();
          shoot.x += shoot.vx; shoot.y += shoot.vy; shoot.life -= 0.012;
          if (shoot.life <= 0 || shoot.x > w + 200 || shoot.y > h + 200) { shoot = null; nextShoot = t + 4000 + Math.random() * 7000; }
        }
      }
      ctx.globalAlpha = 1;
    };

    const loop = (t) => { draw(t); raf = visible ? requestAnimationFrame(loop) : 0; };
    size();
    new ResizeObserver(size).observe(sky);
    if (!still) {
      nextShoot = 2500;
      new IntersectionObserver(([e]) => {
        visible = e.isIntersecting;
        if (visible && !raf) raf = requestAnimationFrame(loop);
      }).observe(sky);
    }
  }

  document.querySelectorAll("[data-year]").forEach((el) => { el.textContent = new Date().getFullYear(); });

  const imgs = document.querySelectorAll("figure.evidence img");
  if (imgs.length && typeof HTMLDialogElement === "function") {
    const box = document.createElement("dialog");
    box.className = "lightbox";
    box.setAttribute("aria-label", "Enlarged image");
    box.innerHTML = `<button class="lightbox-close" type="button" aria-label="Close">&times;</button><img alt=""><p></p>`;
    document.body.appendChild(box);
    const big = box.querySelector("img");
    const cap = box.querySelector("p");
    let opener = null;

    const open = (img) => {
      opener = img;
      big.src = img.currentSrc || img.src;
      big.alt = img.alt;
      const fc = img.closest("figure").querySelector("figcaption");
      cap.textContent = fc ? fc.textContent.trim() : "";
      box.showModal();
    };
    const close = () => box.close();

    imgs.forEach((img) => {
      img.tabIndex = 0;
      img.setAttribute("role", "button");
      img.setAttribute("aria-label", `Enlarge image: ${img.alt}`);
      img.addEventListener("click", () => open(img));
      img.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(img); }
      });
    });
    box.querySelector(".lightbox-close").addEventListener("click", close);
    box.addEventListener("click", (e) => { if (e.target === box) close(); });
    box.addEventListener("close", () => { big.removeAttribute("src"); if (opener) opener.focus(); });
  }
})();
