import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import type { IconName } from "../data/portfolio";

/**
 * Referencia un símbolo del sprite SVG global (<symbol id="i-*">).
 * El nombre está restringido por el tipo `IconName`, por lo que `href`
 * siempre apunta a un id conocido (sin riesgo de inyección).
 */
@Component({
  selector: "app-icon",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<svg [attr.class]="cls() || null" aria-hidden="true"><use [attr.xlink:href]="'#i-' + name()" [attr.href]="'#i-' + name()" /></svg>`,
})
export class Icon {
  readonly name = input.required<IconName>();
  readonly cls = input<string>("");
}
