import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { CONTENT_VIDEO, FILMS, REELS, toLbVideo } from "../data/portfolio";
import { LightboxService } from "../services/lightbox";
import { Reveal } from "../directives/reveal";
import { Icon } from "./icon";

/**
 * Reels, cortometrajes y una muestra de creación de contenido. El grupo del
 * lightbox incluye todos los videos; si falta un .mp4, el visor muestra la
 * miniatura con el aviso (LEEME.md public/assets/video).
 */
@Component({
  selector: "app-video-section",
  imports: [Icon, Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./video.html",
})
export class VideoSection {
  protected readonly reels = REELS;
  protected readonly films = FILMS;
  protected readonly content = CONTENT_VIDEO;

  private readonly lb = inject(LightboxService);

  /** Grupo del lightbox (reels + films + contenido), armado una sola vez. */
  private readonly group = [...REELS, ...FILMS, this.content].map(toLbVideo);

  protected indexInGlobal(list: "reels" | "films" | "content", localIndex: number): number {
    return list === "reels" ? localIndex : list === "films" ? REELS.length + localIndex : REELS.length + FILMS.length;
  }

  protected openVideo(list: "reels" | "films" | "content", localIndex: number): void {
    this.lb.open(this.group, this.indexInGlobal(list, localIndex));
  }
}
