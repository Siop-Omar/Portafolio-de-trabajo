import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { CERTS, SKILL_GROUPS, toLb } from "../data/portfolio";
import { LightboxService } from "../services/lightbox";
import { Reveal } from "../directives/reveal";
import { Icon } from "./icon";

/**
 * Conocimientos + certificaciones. Las certificaciones abren su
 * certificado ampliando en el lightbox (grupo de 3).
 */
@Component({
  selector: "app-skills",
  imports: [Icon, Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./skills.html",
})
export class Skills {
  protected readonly groups = SKILL_GROUPS;
  protected readonly certs = CERTS;
  private readonly lb = inject(LightboxService);

  protected openCert(index: number): void {
    this.lb.open(CERTS.map((c) => toLb({ src: c.img, alt: c.alt, caption: c.caption })), index);
  }
}
