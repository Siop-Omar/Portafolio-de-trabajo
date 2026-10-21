import { ChangeDetectionStrategy, Component } from "@angular/core";
import { MARQUEE_ITEMS } from "../data/portfolio";

@Component({
  selector: "app-marquee",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <div class="marquee border-y border-line bg-fog" aria-hidden="true">
      <div class="marquee-track">
        @for (item of doubled; track $index) {
          <span>{{ item }}</span>
        }
      </div>
    </div>
  `,
})
export class Marquee {
  /** Contenido duplicado para el bucle infinito continuo. */
  protected readonly doubled = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
}
