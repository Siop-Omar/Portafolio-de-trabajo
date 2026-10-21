import { Directive, ElementRef, OnDestroy, OnInit, inject, input } from "@angular/core";

/**
 * Revela el elemento host al entrar en el viewport (fade + slide).
 * - Respeta `prefers-reduced-motion` mostrando el contenido al instante.
 * - Si no existe IntersectionObserver, muestra todo sin fallar.
 * - Limpia el observador al destruirse la vista.
 */
@Directive({ selector: "[appReveal]" })
export class Reveal implements OnInit, OnDestroy {
  /** Retardo en ms (para efecto cascada). */
  readonly appRevealDelay = input<number>(0, { alias: "appRevealDelay" });

  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private io: IntersectionObserver | null = null;

  ngOnInit(): void {
    const host = this.el.nativeElement;
    const delay = this.appRevealDelay();
    if (delay > 0) host.style.transitionDelay = `${delay}ms`;

    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    if (reduced || !("IntersectionObserver" in window)) {
      host.classList.add("is-in");
      return;
    }
    this.io = new IntersectionObserver(
      (entries, obs) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          host.classList.add("is-in");
          obs.unobserve(e.target);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    this.io.observe(host);
  }

  ngOnDestroy(): void {
    this.io?.disconnect();
  }
}
