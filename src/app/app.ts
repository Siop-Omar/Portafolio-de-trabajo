import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Header } from "./components/header";
import { Hero } from "./components/hero";
import { Marquee } from "./components/marquee";
import { About } from "./components/about";
import { Philosophy } from "./components/philosophy";
import { Projects } from "./components/projects";
import { VideoSection } from "./components/video";
import { Skills } from "./components/skills";
import { Contact } from "./components/contact";
import { Footer } from "./components/footer";
import { Lightbox } from "./components/lightbox";

@Component({
  selector: "app-root",
  imports: [Header, Hero, Marquee, About, Philosophy, Projects, VideoSection, Skills, Contact, Footer, Lightbox],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./app.html",
})
export class App {}
