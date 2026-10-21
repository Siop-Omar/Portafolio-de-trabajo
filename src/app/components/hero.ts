import { ChangeDetectionStrategy, Component } from "@angular/core";
import { HERO_IMGS, PROFILE, PROJECTS } from "../data/portfolio";
import { CountUp } from "../directives/count-up";
import { Icon } from "./icon";

@Component({
  selector: "app-hero",
  imports: [Icon, CountUp],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./hero.html",
})
export class Hero {
  protected readonly imgs = HERO_IMGS;
  protected readonly profile = PROFILE;
  /** Métrica destacada del primer proyecto (artefacto flotante del hero). */
  protected readonly stat = PROJECTS[0].metrics?.[0];
}
