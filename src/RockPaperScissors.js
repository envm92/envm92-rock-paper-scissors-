import { css, html, LitElement } from 'lit-element';

export class RockPaperScissors extends LitElement {

  static get styles() {
    return css`
      :host{
        background-color: black;
        display: flex;
        color: white;
        font-family: sans-serif;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-radius: 30px;
      }
      #board {
        padding: 40px;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
      }
    `;
  }

  render() {
    return html`
      <div id="welcome-message">
        <h2>Let's play Rock Paper Scissors!</h2>
      </div>
      <div id="board">
        <card-rock-paper-scissors>
          Player
        </card-rock-paper-scissors>
        <npc-card-rock-paper-scissors>
          NPC
        </npc-card-rock-paper-scissors>
      </div>
    `;
  }
}
