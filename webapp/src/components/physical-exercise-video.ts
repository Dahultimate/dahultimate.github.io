import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { extractYouTubeVideoId, youTubeEmbedUrl } from "../domain/physical-exercise";

/** Intègre la vidéo si l'URL YouTube est reconnue, sinon affiche un simple lien cliquable. */
@customElement("physical-exercise-video")
export class PhysicalExerciseVideo extends LitElement {
  static override styles = css`
    :host {
      display: block;
    }
    .video-wrapper {
      position: relative;
      width: 100%;
      max-width: 480px;
      aspect-ratio: 16 / 9;
      border-radius: var(--radius-sm, 8px);
      overflow: hidden;
    }
    .video-wrapper iframe {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      border: none;
    }
    .video-link {
      color: var(--color-primary, #7c3aed);
      font-size: 0.9rem;
    }
  `;

  @property() videoUrl: string | null = null;
  @property() videoTitle = "Vidéo de démonstration";

  override render() {
    if (!this.videoUrl) return "";

    const videoId = extractYouTubeVideoId(this.videoUrl);
    if (videoId) {
      return html`
        <div class="video-wrapper">
          <iframe
            src=${youTubeEmbedUrl(videoId)}
            title=${this.videoTitle}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      `;
    }

    return html`<a class="video-link" href=${this.videoUrl} target="_blank" rel="noopener">Voir la vidéo de démonstration</a>`;
  }
}
