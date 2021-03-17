import { html, LitElement } from 'lit-element';

export class RockPaperScissors extends LitElement {

  render() {
    return html`
      <h2>Welcome to Rock Paper Scissors!</h2>
      <card-rock-paper-scissors></card-rock-paper-scissors>
      <card-rock-paper-scissors></card-rock-paper-scissors>
    `;
  }
}
