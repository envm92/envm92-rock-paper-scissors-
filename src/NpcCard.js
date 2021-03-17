import { css, html } from 'lit-element';
import { Card } from './Card.js';

export class NpcCard extends Card {
  static get styles() {
    return [
      super.styles,
      css`
        :host {
          background: #303f4a;
        }

        :host(:hover) {
          z-index: 2;
          box-shadow: none;
        }

        :host(:hover) #unknown-value {
          display: block;
        }
      `
    ];
  }

  render() {
    return html`
      <div id="unknown-value">
        ❔
      </div>
      <slot></slot>
    `;
  }
}
