// ============================================
// TROQUE SEUS LINKS AQUI (somente esta seção)
// ============================================
const LINKS = {
  github: "https://github.com/anaflavia-silva", // seu GitHub
  linkedin: "https://www.linkedin.com/in/SEU_USUARIO/", // seu LinkedIn
  email: "mailto:fahsilva5678@gmail.com", // seu e-mail (mailto:)
  cv: "doc/currículo.pdf", // caminho do seu CV (ex: cv.pdf)
  projects: [
    {
      demo: "https://landing-page-lamburguer.vercel.app/",
      code: "https://github.com/anaflavia-silva/lanchonete",
    },
    {
      demo: "https://seu-site-dashboard.com",
      code: "https://github.com/anaflavia-silva/dashboard",
    },
    {
      demo: "https://seu-site-form.com",
      code: "https://github.com/anaflavia-silva/formulario",
    },
  ],
};

// Anos automáticos
const anoAtual = new Date().getFullYear();
document.getElementById("ano-rodape").textContent = anoAtual;
document.getElementById("ano-tecnico").textContent = anoAtual;
document.getElementById("ano-ads").textContent = anoAtual;

// Aplicar LINKS
(function applyLinks() {
  const g = document.getElementById("link-github");
  const l = document.getElementById("link-linkedin");
  const e = document.getElementById("link-email");
  const cv = document.getElementById("link-cv");
  if (g && LINKS.github) g.href = LINKS.github;
  if (l && LINKS.linkedin) l.href = LINKS.linkedin;
  if (e && LINKS.email) e.href = LINKS.email;
  if (cv && LINKS.cv) cv.href = LINKS.cv;
  document.querySelectorAll("[data-project]").forEach((a) => {
    const i = Number(a.getAttribute("data-project"));
    const kind = a.getAttribute("data-kind");
    const item = LINKS.projects?.[i];
    if (!item) return;
    if (kind === "demo" && item.demo) a.href = item.demo;
    if (kind === "code" && item.code) a.href = item.code;
  });
})();

// Typewriter
(function typewriter() {
  const el = document.getElementById("typewriter");
  const frases = [
    "Dev Front‑end Júnior: HTML, CSS e JavaScript",
    "Técnica em Informática",
    "Estudante de Análise e Desenvolvimento de Sistemas",
  ];
  let i = 0,
    j = 0,
    apag = false,
    t;
  function type() {
    if (!el) return;
    const cur = frases[i];
    if (!apag) {
      j++;
      el.textContent = cur.slice(0, j);
      if (j === cur.length) {
        apag = true;
        t = setTimeout(type, 1400);
        return;
      }
    } else {
      j--;
      el.textContent = cur.slice(0, j);
      if (j === 0) {
        apag = false;
        i = (i + 1) % frases.length;
      }
    }
    t = setTimeout(type, apag ? 35 : 65);
  }
  setTimeout(type, 600);
})();

// Rolagem suave
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const id = a.getAttribute("href").slice(1);
    const alvo = document.getElementById(id);
    if (!alvo) return;
    e.preventDefault();
    alvo.scrollIntoView({ behavior: "smooth", block: "start" });
    history.pushState(null, "", "#" + id);
  });
});

// Menu ativo + sublinhado
(function navActive() {
  const sections = document.querySelectorAll("section[id]");
  const map = new Map();
  document
    .querySelectorAll('nav a[href^="#"]')
    .forEach((a) => map.set(a.getAttribute("href").replace("#", ""), a));
  const underline = document.getElementById("nav-underline");
  function moveUnderline(el) {
    if (!underline || !el) return;
    const linkRect = el.getBoundingClientRect();
    const ul = el.closest("ul");
    if (!ul) return;
    const navRect = ul.getBoundingClientRect();
    underline.style.width = linkRect.width + "px";
    underline.style.left = linkRect.left - navRect.left + "px";
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.getAttribute("id");
        const link = map.get(id);
        if (entry.isIntersecting) {
          document
            .querySelectorAll("nav a")
            .forEach((n) => n.classList.remove("active"));
          if (link) {
            link.classList.add("active");
            moveUnderline(link);
          }
        }
      });
    },
    { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.2, 0.5, 1] }
  );
  sections.forEach((s) => io.observe(s));
  window.addEventListener("load", () => {
    const current = document.querySelector('nav a[href="#sobre"]');
    moveUnderline(document.querySelector("nav a.active") || current);
  });
  window.addEventListener("resize", () => {
    const current = document.querySelector("nav a.active");
    moveUnderline(current);
  });
})();

// Revelação ao rolar
(function revealOnScroll() {
  const els = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  els.forEach((el) => io.observe(el));
})();

// Tilt 3D + brilho
(function tiltCards() {
  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  if (prefersReduced) return;
  const maxTilt = 8; // graus
  document.querySelectorAll("[data-tilt]").forEach((card) => {
    function onMove(e) {
      const r = card.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      const rx = (y / r.height - 0.5) * -2 * maxTilt;
      const ry = (x / r.width - 0.5) * 2 * maxTilt;
      card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
      const shine = card.querySelector(".shine");
      if (shine) {
        shine.style.setProperty("--mx", (x / r.width) * 100 + "%");
        shine.style.setProperty("--my", (y / r.height) * 100 + "%");
      }
    }
    function onLeave() {
      card.style.transform = "rotateX(0) rotateY(0)";
    }
    card.addEventListener("mousemove", onMove);
    card.addEventListener("mouseleave", onLeave);
  });
})();

// Barra de progresso + botão topo
(function scrollUI() {
  const bar = document.getElementById("scrollbar");
  const toTop = document.getElementById("to-top");
  function onScroll() {
    const h = document.documentElement;
    const scrolled = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
    if (bar) bar.style.width = scrolled + "%";
    if (toTop) {
      if (h.scrollTop > 400) toTop.classList.add("show");
      else toTop.classList.remove("show");
    }
  }
  document.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();

// Menu mobile
(function mobileMenu() {
  const btn = document.getElementById("menu-toggle");
  const list = document.getElementById("nav-list");
  if (!btn || !list) return;
  btn.addEventListener("click", () => {
    const open = list.classList.toggle("open");
    btn.setAttribute("aria-expanded", open ? "true" : "false");
  });
  list.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", () => {
      list.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
    });
  });
})();

// Formulário -> mailto e copiar e-mail
(function contactForm() {
  const form = document.getElementById("contato-form");
  const feedback = document.getElementById("form-feedback");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const nome = data.get("nome");
    const email = data.get("email");
    const msg = data.get("mensagem");
    const subject = encodeURIComponent(`Contato pelo portfólio — ${nome}`);
    const body = encodeURIComponent(
      `Nome: ${nome}\nE-mail: ${email}\n\n${msg}`
    );
    const mail = LINKS.email || "mailto:fahsilva5678@gmail.com";
    const href = mail.includes("mailto:")
      ? mail + `?subject=${subject}&body=${body}`
      : `mailto:fahsilva5678@gmail.com?subject=${subject}&body=${body}`;
    window.location.href = href;
    if (feedback) feedback.textContent = "Abrindo seu cliente de e‑mail...";
  });
  document.getElementById("copiar-email").addEventListener("click", () => {
    const addr =
      LINKS.email?.replace("mailto:", "") || "fahsilva5678@gmail.com";
    navigator.clipboard
      .writeText(addr)
      .then(() => {
        if (feedback)
          feedback.textContent = "E‑mail copiado para a área de transferência!";
      })
      .catch(() => {
        if (feedback)
          feedback.textContent = "Não foi possível copiar o e‑mail.";
      });
  });
})();

// Animação “cordyceps” — ramificações orgânicas com brotos e esporos
(function cordyceps() {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const canvas = document.getElementById("cordyceps");
  const ctx = canvas.getContext("2d");
  let W = 0,
    H = 0,
    raf;

  // Paleta inspirada (sem assets oficiais)
  const COLORS = {
    vein: (a = 0.08) => `hsla(32, 38%, 72%, ${a})`, // osso/ferrugem claro
    moss: (a = 0.08) => `hsla(96, 22%, 68%, ${a})`, // musgo
    bloomCore: (a = 0.28) => `hsla(32, 62%, 58%, ${a})`, // laranja/ocre
    bloomRim: (a = 0.16) => `hsla(42, 52%, 82%, ${a})`, // osso quente
  };

  function noise2(x, y, t) {
    return (
      Math.sin(x * 0.002 + t * 0.0013) * 0.5 +
      Math.cos(y * 0.0018 - t * 0.0011) * 0.5
    );
  }
  const RND = (min, max) => Math.random() * (max - min) + min;

  // “Galhos” (ramificações)
  const branches = [];
  function seedPositions() {
    const pts = [];
    const nSide = 6;
    for (let i = 0; i < nSide; i++) {
      pts.push({ x: 0, y: H * (0.15 + (0.7 * i) / (nSide - 1)) });
      pts.push({ x: W - 1, y: H * (0.15 + (0.7 * i) / (nSide - 1)) });
    }
    const nBase = 8;
    for (let i = 0; i < nBase; i++) {
      pts.push({ x: W * (i / (nBase - 1)), y: H - 2 });
    }
    return pts;
  }

  function spawnBranch(x, y, ang, w) {
    return {
      x,
      y,
      ang,
      w,
      life: RND(200, 520),
      step: RND(0.7, 1.5),
      hueShift: RND(0, 1),
      bloomAfter: RND(24, 120),
    };
  }

  // Esporos que flutuam
  const spores = [];
  function spawnSpore() {
    return {
      x: RND(0, W),
      y: H + RND(0, 120),
      r: RND(0.6, 2.4),
      sp: RND(0.15, 0.5),
      drift: RND(-0.25, 0.25),
      a: RND(0.18, 0.45),
    };
  }

  function strokeVein(px, py, x, y, w, mix = 0.5) {
    const g = ctx.createLinearGradient(px, py, x, y);
    g.addColorStop(0, COLORS.moss(0.07 + 0.03 * mix));
    g.addColorStop(1, COLORS.vein(0.09));
    ctx.strokeStyle = g;
    ctx.lineWidth = w;
    ctx.beginPath();
    ctx.moveTo(px, py);
    ctx.lineTo(x, y);
    ctx.stroke();
  }

  function drawBloom(x, y, r) {
    const rg = ctx.createRadialGradient(x, y, r * 0.2, x, y, r);
    rg.addColorStop(0, COLORS.bloomCore(0.55));
    rg.addColorStop(0.6, COLORS.bloomRim(0.28));
    rg.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = rg;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();

    // nervuras leves
    ctx.strokeStyle = COLORS.bloomRim(0.22);
    ctx.lineWidth = Math.max(0.4, r * 0.08);
    const petals = 4 + Math.floor(RND(0, 3));
    for (let i = 0; i < petals; i++) {
      const a = i * ((Math.PI * 2) / petals) + RND(-0.25, 0.25);
      const rr = r * RND(0.45, 0.9);
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr);
      ctx.stroke();
    }
  }

  function init() {
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;
    branches.length = 0;
    const seeds = seedPositions();
    const baseCount = Math.max(28, Math.min(90, Math.floor((W * H) / 52000)));
    for (let i = 0; i < baseCount; i++) {
      const s = seeds[Math.floor(Math.random() * seeds.length)];
      branches.push(
        spawnBranch(
          s.x + RND(-6, 6),
          s.y + RND(-6, 6),
          RND(-Math.PI, Math.PI),
          RND(0.6, 1.4)
        )
      );
    }
    spores.length = 0;
    ctx.clearRect(0, 0, W, H);
    ctx.globalCompositeOperation = "lighter";
  }

  function drawFrame() {
    // leve fade do rastro
    ctx.fillStyle = "rgba(0,0,0,0.02)";
    ctx.fillRect(0, 0, W, H);

    // galhos
    for (let i = 0; i < branches.length; i++) {
      const b = branches[i];
      const n = noise2(b.x, b.y, performance.now() * 0.06);
      b.ang += n * 0.11;
      const px = b.x,
        py = b.y;
      b.x += Math.cos(b.ang) * b.step;
      b.y += Math.sin(b.ang) * b.step * 0.9 - 0.02;

      strokeVein(px, py, b.x, b.y, b.w, b.hueShift);
      b.life -= 1;
      b.w = Math.max(0.2, b.w * 0.999);
      b.bloomAfter -= 1;

      // brotos
      if (b.bloomAfter <= 0 && Math.random() < 0.6) {
        drawBloom(b.x, b.y, RND(6, 18));
        b.bloomAfter = RND(60, 160);
      }

      // ramificação
      if (
        b.w > 0.55 &&
        b.life > 140 &&
        Math.random() < 0.06 &&
        branches.length < 1200
      ) {
        branches.push(
          spawnBranch(b.x, b.y, b.ang + RND(-1.0, 1.0), b.w * RND(0.55, 0.9))
        );
        b.life -= 20;
      }

      // respawn
      if (
        b.x < -12 ||
        b.x > W + 12 ||
        b.y < -12 ||
        b.y > H + 12 ||
        b.life <= 0
      ) {
        const seeds = seedPositions();
        const s = seeds[Math.floor(Math.random() * seeds.length)];
        branches[i] = spawnBranch(
          s.x + RND(-6, 6),
          s.y + RND(-6, 6),
          RND(-Math.PI, Math.PI),
          RND(0.6, 1.4)
        );
      }
    }

    // esporos
    if (spores.length < Math.max(40, Math.min(110, Math.floor(W / 12)))) {
      spores.push({
        x: RND(0, W),
        y: H + RND(0, 120),
        r: RND(0.6, 2.4),
        sp: RND(0.15, 0.5),
        drift: RND(-0.25, 0.25),
        a: RND(0.18, 0.45),
      });
    }
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    for (let s of spores) {
      s.y -= s.sp;
      s.x += s.drift + Math.sin((s.y + s.x) * 0.01) * 0.08;
      if (s.y < -20 || s.x < -20 || s.x > W + 20) {
        s = Object.assign(s, {
          x: RND(0, W),
          y: H + RND(0, 120),
          r: RND(0.6, 2.4),
          sp: RND(0.15, 0.5),
          drift: RND(-0.25, 0.25),
          a: RND(0.18, 0.45),
        });
      }
      const g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 3);
      g.addColorStop(0, `rgba(234, 232, 224, ${0.08 * s.a})`);
      g.addColorStop(0.5, `rgba(210, 180, 120, ${0.06 * s.a})`);
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r * 3, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    raf = requestAnimationFrame(drawFrame);
  }

  function staticDraw(iter = 900) {
    // modo estático para reduzir movimento
    const seeds = seedPositions();
    if (branches.length === 0) {
      for (let i = 0; i < 40; i++) {
        const s = seeds[Math.floor(Math.random() * seeds.length)];
        branches.push(
          spawnBranch(
            s.x + RND(-6, 6),
            s.y + RND(-6, 6),
            RND(-Math.PI, Math.PI),
            RND(0.6, 1.4)
          )
        );
      }
    }
    for (let k = 0; k < iter; k++) {
      for (const b of branches) {
        const n = noise2(b.x, b.y, k);
        b.ang += n * 0.11;
        const px = b.x,
          py = b.y;
        b.x += Math.cos(b.ang) * b.step;
        b.y += Math.sin(b.ang) * b.step * 0.9;
        strokeVein(px, py, b.x, b.y, b.w, b.hueShift);
        if (Math.random() < 0.02) drawBloom(b.x, b.y, RND(6, 16));
        b.life--;
        if (b.life <= 0) {
          const s = seeds[Math.floor(Math.random() * seeds.length)];
          const nb = spawnBranch(
            s.x + RND(-6, 6),
            s.y + RND(-6, 6),
            RND(-Math.PI, Math.PI),
            RND(0.6, 1.4)
          );
          Object.assign(b, nb);
        }
      }
    }
  }

  function start() {
    init();
    if (reduced) {
      staticDraw(900);
    } else {
      raf = requestAnimationFrame(drawFrame);
    }
  }

  start();
  window.addEventListener("resize", () => {
    cancelAnimationFrame(raf);
    start();
  });
})();

// Atalhos: g (GitHub), l (LinkedIn), t (topo)
(function shortcuts() {
  document.addEventListener("keydown", (e) => {
    if (
      e.target &&
      (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA")
    )
      return;
    if (e.key.toLowerCase() === "g" && LINKS.github)
      window.open(LINKS.github, "_blank");
    if (e.key.toLowerCase() === "l" && LINKS.linkedin)
      window.open(LINKS.linkedin, "_blank");
    if (e.key.toLowerCase() === "t")
      document
        .getElementById("conteudo")
        .scrollIntoView({ behavior: "smooth" });
  });
})();
