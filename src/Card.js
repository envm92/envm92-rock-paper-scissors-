import { css, html, LitElement } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';

export class Card extends LitElement {
  static get styles() {
    return css`
      :host {
        background: #333;
        z-index: 1;
        box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8);
        border-radius: 30px;
        text-align: center;
        padding: 2em;
        width: 200px;
      }
      :host([winner='true']) {
        box-shadow: inset 0 0 10px whitesmoke, inset 20px 0 80px #f0f,
          inset -20px 0 80px #0ff, inset 20px 0 300px #f0f,
          inset -20px 0 300px #0ff, 0 0 50px #fff, -10px 0 80px #f0f,
          10px 0 80px #0ff;
        border-radius: 30px;
        cursor: pointer;
      }
      :host(:hover)[winner='false'] {
        z-index: 2;
        box-shadow: inset 0 0 10px whitesmoke, inset 20px 0 80px #f0f,
          inset -20px 0 80px #0ff, inset 20px 0 300px #f0f,
          inset -20px 0 300px #0ff, 0 0 50px #fff, -10px 0 80px #f0f,
          10px 0 80px #0ff;
        border-radius: 30px;
        cursor: pointer;
      }
      :host(:hover) #unknown-value {
        display: none;
      }
      :host(:hover) #options {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      :host(:hover) #options.hide {
        display: none;
      }
      #unknown-value,
      #value {
        font-size: 10em;
      }
      #value {
        cursor: not-allowed;
      }
      #options {
        display: none;
      }
      .hide {
        display: none;
      }
      ul {
        display: flex;
        flex-direction: column;
        padding: 0;
      }
      ul li {
        list-style: none;
        margin: 0 15px;
      }
      ul li button {
        position: relative;
        display: block;
        width: 50px;
        height: 50px;
        text-align: center;
        line-height: 60px;
        background: #171515;
        border-radius: 50%;
        font-size: 30px;
        color: #666;
        transition: 0.5s;
        text-decoration: none;
        margin: 5px;
      }
      ul li button:before {
        content: '';
        position: absolute;
        border-radius: 50%;
        background: #d30086;
        transition: 0.5s;
        transform: scale(0.9);
        z-index: -1;
      }
      ul li button:hover:before {
        transform: scale(1.2);
        box-shadow: 0 0 15px #d30086;
        filter: blur(3px);
      }
      ul li button:hover {
        color: #e266ad;
        box-shadow: 0 0 15px #d02b97;
        text-shadow: 0 0 15px #d30086;
      }
    `;
  }

  static get properties() {
    return {
      isPlayed: Boolean,
      choice: String,
      choices: Array,
      winner: {
        type: String,
        reflect: true,
      },
    };
  }

  __onClick(e) {
    this.isPlayed = true;
    this.valueClass = { hide: !this.isPlayed };
    this.choiceClass = { hide: this.isPlayed };
    this.choice = e.target.value;
  }

  constructor() {
    super();
    this.isPlayed = false;
    this.choice = '👾';
    this.valueClass = { hide: !this.isPlayed };
    this.choiceClass = { hide: this.isPlayed };
    this.choices = ['✊', '🖐', '✌️'];
  }

  updated(_changedProperties) {
    super.updated(_changedProperties);
    if (_changedProperties.has('isPlayed') && this.isPlayed) {
      const playEvent = new CustomEvent('choice-selected', {
        detail: {
          choice: this.choice,
        },
      });
      this.dispatchEvent(playEvent);
    }
  }

  render() {
    return html`
      <div id="unknown-value" class="${classMap(this.choiceClass)}">❔</div>
      <div id="options" class="${classMap(this.choiceClass)}">
        <ul>
          ${this.choices.map(
            choice => html`<li>
              <button value="${choice}" @click="${this.__onClick}">
                ${choice}
              </button>
            </li>`
          )}
        </ul>
      </div>
      <div id="value" class="${classMap(this.valueClass)}">${this.choice}</div>
      <slot> Player </slot>
    `;
  }
}
