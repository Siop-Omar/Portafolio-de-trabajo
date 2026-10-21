import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  inject,
  signal,
} from "@angular/core";
import { NAV_LINKS } from "../data/portfolio";

/**
 * Header fijo: fondo al hacer scroll, menú móvil (cierra con Escape,
 * al elegir un enlace o al tocar fuera) y enlace activo por sección.
 * Limpia sus listeners con DestroyRef (compatible con zona sin zone).
 */
@Component({
  selector: "app-header",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./header.html",
})
export class Header {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destroy = inject(DestroyRef);

  protected readonly links = NAV_LINKS;
  protected readonly scrolled = signal(false);
  protected readonly menuOpen = signal(false);
  protected readonly activeId = signal<string | null>(null);

  protected readonly year = new Date().getFullYear();

  private progressEl: HTMLElement | null = null;
  private io: IntersectionObserver | null = null;

  constructor() {
    afterNextRender(() => {
      this.progressEl = document.getElementById("scroll-progress");
      this.onScroll();
      window.addEventListener("scroll", this.onScroll, { passive: true });
      document.addEventListener("click", this.onDocClick);
      document.addEventListener("keydown", this.onKeydown);

      if ("IntersectionObserver" in window) {
        const navMap = new Map<string, HTMLElement>();
        for (const l of this.links) {
          const sec = document.getElementById(l.id);
          if (sec) navMap.set(l.id, sec);
        }
        this.io = new IntersectionObserver(
          (entries) => {
            for (const e of entries) {
              if (!e.isIntersecting) continue;
              this.activeId.set(e.target.id);
            }
          },
          { rootMargin: "-45% 0px -50% 0px" },
        );
        navMap.forEach((sec) => this.io!.observe(sec));
      }
    });

    this.destroy.onDestroy(() => {
      window.removeEventListener("scroll", this.onScroll);
      document.removeEventListener("click", this.onDocClick);
      document.removeEventListener("keydown", this.onKeydown);
      this.io?.disconnect();
    });
  }

  private readonly onScroll = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    this.scrolled.set(window.scrollY > 20);
    if (this.progressEl) {
      this.progressEl.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
    }
  };

  private readonly onDocClick = (e: Event) => {
    if (this.menuOpen() && !this.host.nativeElement.contains(e.target as Node)) this.closeMenu();
  };

  private readonly onKeydown = (e: KeyboardEvent) => {
    if (e.key === "Escape" && this.menuOpen()) {
      this.closeMenu();
      this.focusToggle();
    }
  };

  protected isActive(id: string): boolean {
    return this.activeId() === id;
  }

  protected toggleMenu(): void {
    this.menuOpen.update((v) => !v);
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }

  /** Cierra el menú y lleva el foco al título de la sección elegida (teclado/lectores). */
  protected navigate(id: string): void {
    this.closeMenu();
    requestAnimationFrame(() => {
      const heading = document.getElementById(id)?.querySelector<HTMLElement>("h1, h2, h3");
      if (!heading) return;
      heading.setAttribute("tabindex", "-1");
      heading.focus({ preventScroll: true });
    });
  }

  private focusToggle(): void {
    this.host.nativeElement.querySelector<HTMLElement>(".nav-toggle")?.focus();
  }
}
