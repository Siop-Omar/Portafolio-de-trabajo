import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { PROJECTS, Project, ProjectBlock, toLb, LbItem } from "../data/portfolio";
import { IMG_DIMS } from "../data/image-dims";
import { LightboxService } from "../services/lightbox";
import { CountUp } from "../directives/count-up";
import { Reveal } from "../directives/reveal";
import { Icon } from "./icon";

/**
 * Proyectos con galerías. Cada bloque define su layout;
 * las imágenes abren el lightbox agrupadas por proyecto.
 */
@Component({
  selector: "app-projects",
  imports: [Icon, Reveal, CountUp],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./projects.html",
})
export class Projects {
  protected readonly projects = PROJECTS;
  /** Dimensiones intrínsecas: reservan el espacio de cada imagen antes de cargar. */
  protected readonly dims = IMG_DIMS;
  private readonly lb = inject(LightboxService);

  protected blockClass(layout: ProjectBlock["layout"]): string {
    switch (layout) {
      case "duo": return "grid grid-cols-2 gap-4 max-sm:grid-cols-1";
      case "trio": return "grid grid-cols-3 gap-4 max-md:grid-cols-2 max-sm:grid-cols-1";
      case "local": return "local-grid";
      case "sessions": return "grid gap-4 md:[grid-template-columns:2.2fr_1fr] max-md:grid-cols-1";
      case "masonry": return "masonry columns-1 sm:columns-2 lg:columns-3";
    }
  }

  /** Grupo del lightbox para un proyecto: portada + todas las galerías. */
  protected group(p: Project): LbItem[] {
    const items: LbItem[] = [toLb(p.cover)];
    for (const b of p.blocks) items.push(...b.items.map(toLb));
    return items;
  }

  protected openCover(p: Project): void {
    this.lb.open(this.group(p), 0);
  }

  protected openItem(p: Project, blockIdx: number, itemIdx: number): void {
    const offset = p.blocks.slice(0, blockIdx).reduce((n, b) => n + b.items.length, 0);
    this.lb.open(this.group(p), 1 + offset + itemIdx);
  }
}
