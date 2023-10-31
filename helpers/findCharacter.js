const findCharacter = (data, characterId) => (
  data.monsters.find(monster => monster.id === characterId)
  || data.adventurers.find(adventurer => adventurer.id === characterId)
);

export default findCharacter;
