import { ChangeDetectionStrategy, Component } from "@angular/core";
import { VALUES } from "../data/portfolio";
import { Icon } from "./icon";
import { Reveal } from "../directives/reveal";

@Component({
  selector: "app-philosophy",
  imports: [Icon, Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./philosophy.html",
})
export class Philosophy {
  protected readonly values = VALUES;
}
