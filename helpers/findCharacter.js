const findCharacter = (data, characterId) => {
  const charCategories = Object.keys(data);
  let character;

  charCategories.forEach((category) => {
    const foundCharacter = data[category].find((char) => char.id == characterId);

    character = foundCharacter 
      ? foundCharacter
      : character;
  });

  if (!character) throw new Error('Character not found.');
  return character;
};

export default findCharacter;
