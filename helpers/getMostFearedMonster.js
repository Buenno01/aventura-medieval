function getTotalDamage(monster) {
  const { special_abilities } = monster;
  const totalDamage = special_abilities.reduce((acc, { damage }) => acc += damage, 0);

  return totalDamage;
}

const getMostFearedMonster = (data) => {
  const mostFeared = data.monsters.reduce((acc, monster) => {
    return (acc = getTotalDamage(monster) > getTotalDamage(acc)
      ? monster
      : acc);
  }, { special_abilities: [] });

  return mostFeared;
};

export default getMostFearedMonster;