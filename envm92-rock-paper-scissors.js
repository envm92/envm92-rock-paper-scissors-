import { RockPaperScissors } from './src/RockPaperScissors.js';
import { Card } from './src/Card.js';
import { NpcCard } from './src/NpcCard.js';

window.customElements.define('npc-card-rock-paper-scissors', NpcCard);
window.customElements.define('card-rock-paper-scissors', Card);
window.customElements.define('envm92-rock-paper-scissors', RockPaperScissors);
