import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Icon } from "./icon";

@Component({
  selector: "app-footer",
  imports: [Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="bg-ink py-14 text-smoke md:py-20">
      <div class="container-x">
        <p class="font-display text-[clamp(1.9rem,4.5vw,3rem)] leading-[1.2] tracking-[-.015em] text-paper">
          Gracias por <em class="italic">llegar</em> hasta aquí.
        </p>
        <div class="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-7">
          <p class="text-[.8rem]">© {{ year }} Omar Rafael Martínez Ríos · León, Guanajuato</p>
          <a href="#inicio" class="btn btn-fog h-11! px-5! text-[.9rem]!">Volver arriba <app-icon name="up" cls="size-4" /></a>
        </div>
      </div>
    </footer>
  `,
})
export class Footer {
  protected readonly year = new Date().getFullYear();
}
