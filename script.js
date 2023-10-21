import data from './data.js';
import findCharacter from './helpers/findCharacter.js';
import sortingByProperty from './helpers/sortingByProperty.js';
import getLethalAdventurer from './helpers/getLethalAdventurer.js';
import getMostFearedMonster from './helpers/getMostFearedMonster.js';

const mapToRaceOrType = ({ race, type }) => race ? `Raça: ${race}` : `Tipo: ${type}`;

const mapToLevelOrStrength = ({ level, strength }) => level ? `Nível: ${level}` : `Força: ${strength}`;

const play = (sound) => {
  const som = document.createElement('audio');
  som.src = `./sounds/${sound}`;
  som.volume = 0.1;
  som.play();
}

const start = () => {
  document.body.classList.remove('full');
  full.remove();
  const som = document.createElement('audio');
  som.src = `./sounds/bg.mp3`;
  som.volume = 0.05;
  som.loop = true;
  som.play();
}
full.querySelector('button').addEventListener('click', start);

const makeElementWithText = (tag, text, father) => {
  const element = document.createElement(tag);
  element.textContent = text;
  father.appendChild(element);
  return element;
};

const setCharacterCard = (character) => {
  play('woosh.wav');
  const { name, type, race, image } = character;
  document.getElementById('selected-image').setAttribute('src', image);
  document.getElementById('selected-name').textContent =  `Nome: ${name}`;
  document.getElementById('selected-race').textContent = mapToRaceOrType({ race, type });
};

const showCharacter = ({ target: { classList, id, parentElement } } ) => {
  const characterId = classList.contains('small-card') ? id : parentElement.id;
  const character = findCharacter(data, characterId);
  setCharacterCard(character);
};

const renderSmallCard = (character) => {
  const { id, name, type, race, level, stats } = character;
  const smallCard = document.createElement('li');
  smallCard.setAttribute('id', id);
  smallCard.classList.add('small-card');
  makeElementWithText('p', name, smallCard);
  makeElementWithText('p', mapToRaceOrType({ race, type }), smallCard);
  makeElementWithText('p', mapToLevelOrStrength({ level, strength: stats?.strength }), smallCard);
  smallCard.addEventListener('click', showCharacter);
  return smallCard;
};

const renderCharacters = (listId, listArray) => {
  const listOfCharacters = document.getElementById(listId);
  listArray.forEach((character) => {
    const characterSmallCard = renderSmallCard(character);
    listOfCharacters.appendChild(characterSmallCard);
  });
};

const setInitialAdventurersAndMonster = () => {
  renderCharacters('list-of-adventurers', data.adventurers);
  renderCharacters('list-of-monsters', data.monsters);
};

const clearCharacters = (listId) => {
  const listOfCharacters = document.getElementById(listId).children;
  [...listOfCharacters].forEach((element) => element.remove());
};

const setResetBtn = () => {
  const resetBtn = document.getElementById('reset');
  resetBtn.addEventListener('click', () => {
    clearCharacters('list-of-adventurers');
    clearCharacters('list-of-monsters');
    setInitialAdventurersAndMonster();
    setCharacterCard({ name: '-', race: '-', image: './images/default_picture.png'});
  });
};

const setFearedMonsterOrLethalAdventurerBtn = (btnId, getFunction) => {
  const btn = document.getElementById(btnId);
  btn.addEventListener('click', () => {
    const foundCharacter = getFunction(data);
    setCharacterCard(foundCharacter);
  });
};

const setSortingByPropertyBtn = (btnId, listId, property, nestedProperty) => {
  const btn = document.getElementById(btnId);
  btn.addEventListener('click', () => {
    play('woosh.wav');
    clearCharacters(listId);
    const characters = listId.endsWith('monsters') ? data.monsters : data.adventurers;
    const sortedCharacters = sortingByProperty(characters, property, nestedProperty);
    renderCharacters(listId, sortedCharacters);
  });
};

window.onload = () => {
  setInitialAdventurersAndMonster();

  setResetBtn();

  setFearedMonsterOrLethalAdventurerBtn('feared-monster', getMostFearedMonster);
  setFearedMonsterOrLethalAdventurerBtn('lethal-adventurer', getLethalAdventurer);

  setSortingByPropertyBtn('sort-by-strength', 'list-of-monsters', 'stats', 'strength');
  setSortingByPropertyBtn('sort-by-level', 'list-of-adventurers', 'level');
};
