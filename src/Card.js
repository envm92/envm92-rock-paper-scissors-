import { css, html, LitElement } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';

export class Card extends LitElement {
  static get styles() {
    return css`
      :host {
        background: #333;
        z-index: 1;
        box-shadow: 0 20px 50px rgba(0, 0, 0, .8);
        border-radius: 30px;
        text-align: center;
        padding: 2em;
        width: 200px;
      }
      :host(:hover) {
        z-index: 2;
        box-shadow: inset 0 0 10px whitesmoke,
        inset 20px 0 80px #f0f,
          inset -20px 0 80px #0ff,
        inset 20px 0 300px #f0f,
          inset -20px 0 300px #0ff,
        0 0 50px #fff,
        -10px 0 80px #f0f,
        10px 0 80px #0ff;
        border-radius: 30px;
      }
      :host(:hover) #unknown-value {
        display: none;
      }
      :host(:hover) #options {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      #unknown-value {
        font-size: 10em;
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
      ul li a {
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
        transition: .5s;
        text-decoration: none;
        margin: 5px;
      }
      ul li a:before {
        content: '';
        position: absolute;
        border-radius: 50%;
        background: #d30086;
        transition: .5s;
        transform: scale(.9);
        z-index: -1;
      }
      ul li a:hover:before {
        transform: scale(1.2);
        box-shadow: 0 0 15px #d30086;
        filter: blur(3px);
      }
      ul li a:hover {
        color: #e266ad;
        box-shadow: 0 0 15px #d02b97;
        text-shadow: 0 0 15px #d30086;
      }
    `;
  }

  static get properties() {
    return {
      isPlayed: {
        type: Boolean
      },
      choice: {
        type: String
      },
    }
  }

  constructor() {
    super();
    this.isPlayed = false;
    this.choice = '👾';
    this.valueClass = { hide: !this.isPlayed };
  }

  render() {
    return html`
      <div id="unknown-value">
        ❔
      </div>
      <div id="options">
        <ul>
          <li>
              <a href="#">
                ✊️
              </a>
          </li>
          <li>
              <a href="#">
                🖐
              </a>
          </li>
          <li>
              <a href="#">
                ✌️
              </a>
          </li>
        </ul>
      </div>
      <div id="value" class='${classMap(this.valueClass)}'>
        ${this.choice}
      </div>
      <slot>
        Player
      </slot>
    `;
  }
}
