function calculatePower(weapons, character) {
  const charWeapons = weapons.filter((weapon) => character.weapons.includes(weapon.id));
  const totalDamage = charWeapons.reduce((acc, weapon) => acc + weapon.damage, 0);

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
