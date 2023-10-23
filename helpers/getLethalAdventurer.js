function calculatePower(weaponsArr, character) {
  let totalDamage = 0;

  const { weapons } = character;

  weapons.forEach((weapon) => {
    totalDamage += weaponsArr.find(({ id }) => weapon === id).damage;
  });

  return totalDamage;
}

const getLethalAdventurer = (data) => {
  const { adventurers, weapons } = data;

  const mostLethal = adventurers.reduce((acc, adventurer) => {
    const actual = calculatePower(weapons, acc);
    const compare = calculatePower(weapons, adventurer);

    acc = compare > actual
      ? adventurer
      : acc;

    return acc;
  }, { weapons: [] });

  return mostLethal;
};

export default getLethalAdventurer;
