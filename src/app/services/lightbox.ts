import { Injectable, computed, signal } from "@angular/core";
import { LbItem } from "../data/portfolio";

/**
 * Estado global del visor (lightbox). Verifica que:
 * - no abra nada con una lista vacía (evita un visor roto),
 * - al cerrar, devuelva el foco al elemento que lo abrió (accesibilidad),
 * - la navegación sea circular y acotada al índice válido.
 */
@Injectable({ providedIn: "root" })
export class LightboxService {
  private readonly _items = signal<LbItem[]>([]);
  private readonly _index = signal(0);
  private readonly _isOpen = signal(false);
  private lastFocus: HTMLElement | null = null;

  readonly items = computed(() => this._items());
  readonly index = computed(() => this._index());
  readonly isOpen = computed(() => this._isOpen());
  readonly current = computed<LbItem | undefined>(() => this._items()[this._index()]);

  open(items: readonly LbItem[], startIndex = 0): void {
    if (!items.length) return;
    this.lastFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    this._items.set([...items]);
    this._index.set(Math.max(0, Math.min(startIndex, items.length - 1)));
    this._isOpen.set(true);
  }

  close(): void {
    if (!this._isOpen()) return;
    this._isOpen.set(false);
    this.lastFocus?.focus({ preventScroll: true });
    this.lastFocus = null;
  }

  go(dir: 1 | -1): void {
    const n = this._items().length;
    if (!this._isOpen() || n < 2) return;
    this._index.update((i) => (i + dir + n) % n);
  }
}
