import { css, html } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
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
        :host(:hover) #unknown-value.hide {
          display: none;
        }
      `
    ];
  }

  _play() {
    const random = Math.floor(Math.random() * (Math.floor(2) - Math.ceil(0) + 1)) + Math.ceil(0)
    this.__onClick(this.choices[random]);
  }

  firstUpdated() {
    this.addEventListener('npc-play', this._play);
  }

  render() {
    return html`
      <div id="unknown-value" class='${classMap(this.choiceClass)}'>
        ❔
      </div>
      <div id="value" class='${classMap(this.valueClass)}'>
        ${this.choice}
      </div>
      <slot></slot>
    `;
  }
}
