import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ABOUT_EDUCATION, ABOUT_PILLS, PROFILE } from "../data/portfolio";
import { Reveal } from "../directives/reveal";

@Component({
  selector: "app-about",
  imports: [Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./about.html",
})
export class About {
  protected readonly pills = ABOUT_PILLS;
  protected readonly profile = PROFILE;
  /** Formación académica y enfoque profesional (del CV). */
  protected readonly education = ABOUT_EDUCATION;
}
