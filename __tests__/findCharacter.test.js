import findCharacter from '../helpers/findCharacter.js';

const data = require('../data');

const airElementalId = 'e8481c1d-42ea-4610-8e11-1752cfc05a46';

const emeryId = 'b0dc644a-5335-489b-8a2c-4e086c7819a2';

const scimitarId = '0938aa23-f153-4937-9f88-4858b24d6bce';

describe('Function findCharacters', () => {
  it('is a function', () => {
    expect(typeof findCharacter).toBe('function');
  });
  it('Returns the correct object when given a existing id', () => {
    let actual = findCharacter(data, airElementalId);
    let expected = {
      id: airElementalId,
      name: 'Air Elemental',
      size: 'Large',
      type: 'elemental',
      image: './images/air_elemental.png',
      exp_by_defeating: 250,
      stats: {
        health_points: 90,
        strength: 14,
        dexterity: 20,
        constitution: 14,
        intelligence: 6,
        wisdom: 10,
        charisma: 6,
      },
      special_abilities: [
        {
          name: 'Multiattack',
          damage: 15,
        },
        {
          name: 'Slam',
          damage: 7,
        },
      ]
    };

    expect(actual).toEqual(expected);

    actual = findCharacter(data, emeryId);
    expected = {
      id: emeryId,
      name: 'Emery Spry',
      class: 'Fighter',
      race: 'Dwarf',
      image: './images/emery_spry.png',
      level: 7,
      weapons: [
        '89be95b3-47e4-4c5b-b687-1fabf2afa274',
      ],
      defeatedMonsters: [
        'baa6e93a-f295-44e7-8f70-2bcdc6f6948d',
        airElementalId,
      ],
    };

    expect(actual).toEqual(expected);
  });
  it('Throws an error when there is no character with the id', () => {
    expect(() => {
      findCharacter(data, scimitarId);
    }).toThrow();

    expect(() => {
      findCharacter(data, '123 oi gente sou um teste');
    }).toThrow();
  });
});