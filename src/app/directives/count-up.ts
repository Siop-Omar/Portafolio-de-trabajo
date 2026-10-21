import { Directive, ElementRef, OnDestroy, OnInit, inject, input } from "@angular/core";

/**
 * Anima un valor numérico (ej. +25%, 20.3 mil) cuando su host entra en viewport.
 * El texto final coincide exactamente con `pre + valor + suf`, y si no se puede
 * animar (movimiento reducido / sin IO / valor inválido) muestra el valor final.
 */
@Directive({ selector: "[appCountUp]" })
export class CountUp implements OnInit, OnDestroy {
  readonly appCountUp = input.required<number>();
  readonly decimals = input<number>(0);
  readonly prefix = input<string>("");
  readonly suffix = input<string>("");

  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private io: IntersectionObserver | null = null;
  private raf = 0;

  private readonly fmt = (n: number) =>
    this.prefix() + n.toFixed(Math.max(0, this.decimals())) + this.suffix();

  ngOnInit(): void {
    const host = this.el.nativeElement;
    const target = this.appCountUp();
    if (!Number.isFinite(target)) {
      host.textContent = this.prefix();
      return;
    }
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    if (reduced || !("IntersectionObserver" in window)) {
      host.textContent = this.fmt(target);
      return;
    }
    host.textContent = this.fmt(0);
    this.io = new IntersectionObserver(
      (entries, obs) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          obs.unobserve(e.target);
          this.animate(target);
        }
      },
      { threshold: 0.4 },
    );
    this.io.observe(host);
  }

  private animate(target: number): void {
    const duration = 1600;
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 4);
      this.el.nativeElement.textContent = this.fmt(target * eased);
      if (t < 1) this.raf = requestAnimationFrame(step);
    };
    this.raf = requestAnimationFrame(step);
  }

  ngOnDestroy(): void {
    this.io?.disconnect();
    cancelAnimationFrame(this.raf);
  }
}
