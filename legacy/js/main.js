/* =========================================================
   Omar Rafael Martínez Ríos — Portafolio · Interacciones
   ========================================================= */
(() => {
  "use strict";

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Año del footer ---------- */
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Header, progreso de scroll ---------- */
  const header = $("#header");
  const progress = $("#scroll-progress");
  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle("is-scrolled", y > 20);
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Menú móvil ---------- */
  const toggle = $("#nav-toggle");
  const closeMenu = () => {
    header.classList.remove("menu-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Abrir menú");
  };
  toggle.addEventListener("click", () => {
    const open = header.classList.toggle("menu-open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  });
  $$("#nav-links a").forEach((a) => a.addEventListener("click", closeMenu));
  // Cerrar el menú al tocar fuera del header
  document.addEventListener("click", (e) => {
    if (header.classList.contains("menu-open") && !header.contains(e.target)) closeMenu();
  });

  /* ---------- Enlace activo según sección ---------- */
  const navMap = new Map(
    $$("#nav-links a[href^='#']").map((a) => [a.getAttribute("href").slice(1), a])
  );
  const hasIO = "IntersectionObserver" in window;
  const revealNow = (el) => {
    el.classList.add("is-in");
    $$("[data-count]", el).forEach(animateCount);
  };

  const sectionObserver = hasIO ? new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        navMap.forEach((a) => a.classList.remove("is-active"));
        const link = navMap.get(e.target.id);
        if (link && !link.classList.contains("btn")) link.classList.add("is-active");
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  ) : null;
  navMap.forEach((_, id) => {
    const sec = document.getElementById(id);
    if (sec && sectionObserver) sectionObserver.observe(sec);
  });

  /* ---------- Brillo que sigue al cursor ---------- */
  const glow = $("#cursor-glow");
  if (glow && window.matchMedia("(hover: hover)").matches && !reduceMotion) {
    let tx = 0, ty = 0, cx = 0, cy = 0, raf = null;
    const loop = () => {
      cx += (tx - cx) * 0.12;
      cy += (ty - cy) * 0.12;
      glow.style.transform = `translate(${cx - 260}px, ${cy - 260}px)`;
      raf = Math.abs(tx - cx) > 0.5 || Math.abs(ty - cy) > 0.5 ? requestAnimationFrame(loop) : null;
    };
    window.addEventListener("pointermove", (e) => {
      tx = e.clientX; ty = e.clientY;
      if (!raf) raf = requestAnimationFrame(loop);
    }, { passive: true });
  }

  /* ---------- Contadores animados ---------- */
  const formatNumber = (n, decimals) => n.toFixed(decimals);
  const animateCount = (el) => {
    const target = parseFloat(el.dataset.count);
    if (Number.isNaN(target)) return;
    const decimals = parseInt(el.dataset.decimals || "0", 10) || 0;
    const prefix = el.dataset.prefix || "";
    const suffix = el.dataset.suffix || "";
    if (reduceMotion) { el.textContent = prefix + formatNumber(target, decimals) + suffix; return; }
    const duration = 1600;
    const start = performance.now();
    const step = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 4);
      el.textContent = prefix + formatNumber(target * eased, decimals) + suffix;
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  /* ---------- Revelado al hacer scroll ---------- */
  const revealObserver = hasIO ? new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        revealNow(e.target);
        obs.unobserve(e.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  ) : null;
  $$(".reveal").forEach((el) => (revealObserver ? revealObserver.observe(el) : revealNow(el)));

  /* ---------- Lightbox (imágenes y video) ---------- */
  const lb = $("#lightbox");
  const lbMedia = $("#lb-media");
  const lbCaption = $("#lb-caption");
  const lbCounter = $("#lb-counter");
  const lbPrev = $("#lb-prev");
  const lbNext = $("#lb-next");
  let items = [];
  let index = 0;
  let lastFocus = null;
  let isOpen = false;
  let clearTimer = 0;

  const getGroup = (trigger) => {
    if (trigger.dataset.video) return $$(".v-card[data-video]");
    return $$(`[data-gallery="${trigger.dataset.gallery}"]`);
  };

  const showPoster = (item, withMsg) => {
    const img = document.createElement("img");
    const src = $("img", item);
    img.src = src?.currentSrc || src?.src || "";
    img.alt = src?.alt || item.dataset.caption || "";
    lbMedia.replaceChildren(img);
    if (withMsg) {
      const msg = document.createElement("span");
      msg.className = "lb-msg";
      msg.textContent = "Video próximamente — por ahora se muestra la miniatura.";
      lbCaption.append(document.createElement("br"), msg);
    }
  };

  const render = () => {
    const item = items[index];
    if (!item) return;
    lbCaption.textContent = item.dataset.caption || $("img", item)?.alt || "";
    lbCounter.textContent = `${index + 1} / ${items.length}`;
    const multi = items.length > 1;
    lbPrev.hidden = !multi;
    lbNext.hidden = !multi;

    if (item.dataset.video) {
      const video = document.createElement("video");
      video.controls = true;
      video.autoplay = true;
      video.playsInline = true;
      video.preload = "metadata";
      video.poster = $("img", item)?.src || "";
      video.src = item.dataset.video;
      // Si el archivo no existe, mostramos la miniatura — pero solo si
      // el usuario sigue viendo este mismo item (evita carreras al navegar rápido).
      video.addEventListener("error", () => {
        if (lbMedia.contains(video)) showPoster(item, true);
      }, { once: true });
      lbMedia.replaceChildren(video);
      // Algunos navegadores rechazan el autoplay con sonido; lo silenciamos sin romper nada.
      video.play().catch(() => {});
    } else {
      showPoster(item, false);
    }
  };

  const openLightbox = (trigger) => {
    clearTimeout(clearTimer);
    items = getGroup(trigger);
    index = Math.max(0, items.indexOf(trigger));
    lastFocus = trigger;
    isOpen = true;
    render();
    lb.classList.add("is-open");
    lb.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    $("#lb-close").focus();
  };

  const closeLightbox = () => {
    if (!isOpen) return;
    isOpen = false;
    lb.classList.remove("is-open");
    lb.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    const v = $("video", lbMedia);
    if (v) { v.pause(); v.removeAttribute("src"); v.load(); }
    clearTimeout(clearTimer);
    clearTimer = setTimeout(() => lbMedia.replaceChildren(), 400);
    lastFocus?.focus({ preventScroll: true });
  };

  const go = (dir) => {
    if (!isOpen || items.length < 2) return;
    clearTimeout(clearTimer);
    const v = $("video", lbMedia);
    if (v) { v.pause(); v.removeAttribute("src"); v.load(); }
    index = (index + dir + items.length) % items.length;
    render();
  };

  $$("[data-gallery], [data-video]").forEach((el) =>
    el.addEventListener("click", () => openLightbox(el))
  );
  $("#lb-close").addEventListener("click", closeLightbox);
  lbPrev.addEventListener("click", () => go(-1));
  lbNext.addEventListener("click", () => go(1));
  lb.addEventListener("click", (e) => {
    if (e.target === lb || e.target.id === "lb-stage" || e.target.id === "lb-media") closeLightbox();
  });
  // Mantiene el foco dentro del lightbox mientras está abierto (accesibilidad)
  const focusablesInLb = () =>
    $$("button:not([disabled]), a[href], video[controls], [tabindex]:not([tabindex='-1'])", lb)
      .filter((el) => el.offsetParent !== null || el === document.activeElement);

  const trapFocus = (e) => {
    const f = focusablesInLb();
    if (!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && (document.activeElement === first || !lb.contains(document.activeElement))) {
      e.preventDefault(); last.focus();
    } else if (!e.shiftKey && (document.activeElement === last || !lb.contains(document.activeElement))) {
      e.preventDefault(); first.focus();
    }
  };

  document.addEventListener("keydown", (e) => {
    if (!isOpen) {
      if (e.key === "Escape") closeMenu();
      return;
    }
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") go(-1);
    if (e.key === "ArrowRight") go(1);
    if (e.key === "Tab") trapFocus(e);
  });

  // Gesto de deslizar en móviles
  let touchX = null;
  lb.addEventListener("touchstart", (e) => { touchX = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend", (e) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
    touchX = null;
  });
})();
