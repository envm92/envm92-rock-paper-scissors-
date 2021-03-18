import { html, fixture, expect } from '@open-wc/testing';

import '../envm92-rock-paper-scissors.js';

describe('Envm92RockPaperScissors', () => {
  it('has a default values in all properties', async () => {
    const el = await fixture(html`<envm92-rock-paper-scissors></envm92-rock-paper-scissors>`);
    expect(el.message).to.equal('Let\'s play Rock Paper Scissors!');
    expect(el.namePlayer).to.equal('');
    expect(el.playerChoice).to.equal('');
    expect(el.npcChoice).to.equal('');
    expect(el.winner).to.equal('');
  });

  it('name player change to uppercase', async () => {
    const el = await fixture(html`<envm92-rock-paper-scissors name-player="Test"></envm92-rock-paper-scissors>`);
    expect(el.namePlayer).to.equal('TEST');
  });

  it('name player change to uppercase and trim', async () => {
    const el = await fixture(html`<envm92-rock-paper-scissors name-player="Test1234"></envm92-rock-paper-scissors>`);
    expect(el.namePlayer).to.equal('TEST12');
  });

  it('mock the player select a symbol', async () => {
    const el = await fixture(html`<envm92-rock-paper-scissors name-player="Test1234"></envm92-rock-paper-scissors>`);
    el.__playerSelect({detail: { choice: '✊'}});
    expect(el.playerChoice).to.equal('✊');
  });

  it('mock the player and npc select a symbol', async () => {
    const el = await fixture(html`<envm92-rock-paper-scissors name-player="Test1234"></envm92-rock-paper-scissors>`);
    el.__playerSelect({detail: { choice: '✊'}});
    expect(el.playerChoice).to.equal('✊');
    el.__npcSelect({detail: { choice: '✊'}});
    expect(el.npcChoice).to.equal('✊');
  });

  it('expect a TIE!', async () => {
    const el = await fixture(html`<envm92-rock-paper-scissors name-player="Test1234"></envm92-rock-paper-scissors>`);
    el.__playerSelect({detail: { choice: '✊'}});
    expect(el.playerChoice).to.equal('✊');
    el.__npcSelect({detail: { choice: '✊'}});
    expect(el.npcChoice).to.equal('✊');
    el.__whoWon();
    expect(el.winner).to.equal('');
    expect(el.message).to.equal('TIE!');
  });

  it('expect a Npc won', async () => {
    const el = await fixture(html`<envm92-rock-paper-scissors name-player="Test1234"></envm92-rock-paper-scissors>`);
    el.__playerSelect({detail: { choice: '✌️'}});
    expect(el.playerChoice).to.equal('✌️');
    el.__npcSelect({detail: { choice: '✊'}});
    expect(el.npcChoice).to.equal('✊');
    el.__whoWon();
    expect(el.winner).to.equal('npc');
    expect(el.message).to.equal('Winner NPC');
  });

  it('expect a Player won', async () => {
    const el = await fixture(html`<envm92-rock-paper-scissors name-player="Test1234"></envm92-rock-paper-scissors>`);
    el.__playerSelect({detail: { choice: '✊'}});
    expect(el.playerChoice).to.equal('✊');
    el.__npcSelect({detail: { choice: '✌️'}});
    expect(el.npcChoice).to.equal('✌️');
    el.__whoWon();
    expect(el.winner).to.equal('player');
    expect(el.message).to.equal('Winner TEST12');
  });
});
