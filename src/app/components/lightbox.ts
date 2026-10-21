import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  effect,
  inject,
  signal,
  viewChild,
} from "@angular/core";
import { LightboxService } from "../services/lightbox";
import { Icon } from "./icon";

/**
 * Visor de imágenes y videos con:
 * - foco atrapado mientras está abierto (Tab / Shift+Tab),
 * - Escape para cerrar, ←/→ para navegar, deslizar en táctil,
 * - devolución de foco al elemento que lo abrió,
 * - fallback de video: si el .mp4 falla, muestra la miniatura con aviso,
 * - bloqueo del scroll del body con limpieza garantizada,
 * - el contenido se destruye cuando cambia de item (sin carreras).
 */
@Component({
  selector: "app-lightbox",
  imports: [Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { "(document:keydown)": "onKeydown($event)" },
  templateUrl: "./lightbox.html",
})
export class Lightbox {
  protected readonly lb = inject(LightboxService);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destroy = inject(DestroyRef);

  private readonly closeBtn = viewChild.required<ElementRef<HTMLButtonElement>>("closeBtn");

  /** Mantiene el contenido durante la transición de salida (.4s) y luego lo limpia. */
  protected readonly renderMedia = signal(false);
  protected readonly videoFailed = signal(false);

  private clearTimer = 0;
  private lastTouchX = 0;

  constructor() {
    effect(() => {
      const open = this.lb.isOpen();
      if (open) {
        // Cancela cualquier limpieza pendiente (evita borrar contenido recién abierto).
        window.clearTimeout(this.clearTimer);
        this.clearTimer = 0;
        // Reinicia el estado al abrir o cambiar de item.
        void this.lb.index();
        this.renderMedia.set(true);
        this.videoFailed.set(false);
        queueMicrotask(() => this.closeBtn().nativeElement.focus());
      } else {
        this.clearTimer = window.setTimeout(() => {
          this.renderMedia.set(false);
          this.videoFailed.set(false);
        }, 400);
      }
      // Bloqueo del scroll del body con restauración garantizada.
      document.body.style.overflow = open ? "hidden" : "";
    });

    this.destroy.onDestroy(() => {
      window.clearTimeout(this.clearTimer);
      document.body.style.overflow = "";
    });
  }

  protected onVideoError(): void {
    // El error solo puede venir de la carga del src actual: al cambiar de item
    // la carga pendiente se aborta (sin evento error) y el effect reinicia
    // videoFailed. Un fallo antiguo no puede corromper el item nuevo.
    this.videoFailed.set(true);
  }

  /** Cierra al hacer clic en el fondo (no sobre el medio ni los botones). */
  protected onBackdrop(e: MouseEvent): void {
    const t = e.target as HTMLElement;
    if (t.closest("button, [data-lb-media], video, img")) return;
    this.lb.close();
  }

  protected onKeydown(e: KeyboardEvent): void {
    if (!this.lb.isOpen()) return;
    switch (e.key) {
      case "Escape": this.lb.close(); break;
      case "ArrowLeft": this.lb.go(-1); break;
      case "ArrowRight": this.lb.go(1); break;
      case "Tab": this.trapFocus(e); break;
    }
  }

  private trapFocus(e: KeyboardEvent): void {
    const root = this.host.nativeElement;
    const f = Array.from(root.querySelectorAll<HTMLElement>("button:not([disabled]), video"))
      .filter((el) => el.offsetParent !== null);
    if (!f.length) return;
    const first = f[0];
    const last = f[f.length - 1];
    const active = document.activeElement;
    if (e.shiftKey && (active === first || !root.contains(active))) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && (active === last || !root.contains(active))) {
      e.preventDefault();
      first.focus();
    }
  }

  protected touchStart(e: TouchEvent): void {
    this.lastTouchX = e.touches[0].clientX;
  }

  protected touchEnd(e: TouchEvent): void {
    const dx = e.changedTouches[0].clientX - this.lastTouchX;
    if (Math.abs(dx) > 50) this.lb.go(dx < 0 ? 1 : -1);
  }
}
