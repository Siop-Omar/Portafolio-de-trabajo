import { ChangeDetectionStrategy, Component } from "@angular/core";
import { CONTACT, PROFILE } from "../data/portfolio";
import { Icon } from "./icon";
import { Reveal } from "../directives/reveal";

@Component({
  selector: "app-contact",
  imports: [Icon, Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="contacto" class="bg-fog py-20 md:py-28">
      <div class="container-x text-center">
        <div appReveal>
          <h2 class="display-2 text-[clamp(2.5rem,6.5vw,4rem)]">Mi siguiente paso puede ser <em class="italic">tu equipo</em></h2>
          <p class="mx-auto mt-6 max-w-[56ch] text-[17px] leading-[1.65] text-ink/75">
            Estoy <strong class="font-450 text-ink">{{ profile.finishing }}</strong> la carrera y busco
            <strong class="font-450 text-ink">{{ profile.lookingFor }}</strong> para aprender dentro de un equipo
            y poner mi parte: contenido, mirada y ganas de cuidar los detalles.
            Si tu equipo busca a alguien con <strong class="font-450 text-ink">perfil trainee/junior</strong>,
            escríbeme. Me encantaría saber qué están construyendo.
          </p>
        </div>

        <div appReveal [appRevealDelay]="120" class="mx-auto mt-10 grid max-w-[660px] gap-3 max-sm:grid-cols-1 sm:grid-cols-2">
          <a [href]="contact.whatsapp.href" target="_blank" rel="noopener noreferrer" class="btn btn-ink h-14! w-full">
            <app-icon name="wa" cls="size-5" /> {{ contact.whatsapp.value }}
          </a>
          <a [href]="contact.instagram.href" target="_blank" rel="noopener noreferrer" class="btn btn-ghost h-14! w-full">
            <app-icon name="ig" cls="size-5" /> {{ contact.instagram.value }}
          </a>
          <a [href]="contact.email.href" class="btn btn-fog h-14! w-full sm:col-span-2">
            <app-icon name="mail" cls="size-5" /> {{ contact.email.value }}
          </a>
        </div>
      </div>
    </section>
  `,
})
export class Contact {
  protected readonly contact = CONTACT;
  protected readonly profile = PROFILE;
}
