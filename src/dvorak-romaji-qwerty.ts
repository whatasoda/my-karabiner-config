
import Karabiner from '../karabiner';

const { rule, publish } = Karabiner('Romaji-QWERTY with default Dvorak keymap of Mac');
const { manipurator } = rule('Romaji-QWERTY with default Dvorak keymap of Mac');

const ENTRIES: Array<[string, string]> = [
  ['open_bracket', 'hyphen'],
  ['close_bracket', 'equal_sign'],
  ['quote', 'q'],
  ['comma', 'w'],
  ['period', 'e'],
  ['p', 'r'],
  ['y', 't'],
  ['f', 'y'],
  ['g', 'u'],
  ['c', 'i'],
  ['r', 'o'],
  ['l', 'p'],
  ['slash', 'open_bracket'],
  ['equal_sign', 'close_bracket'],
  // ['backslash', 'backslash'],
  // ['a', 'a'],
  ['o', 's'],
  ['e', 'd'],
  ['u', 'f'],
  ['i', 'g'],
  ['d', 'h'],
  ['h', 'j'],
  ['t', 'k'],
  ['n', 'l'],
  ['s', 'semicolon'],
  ['hyphen', 'quote'],
  ['semicolon', 'z'],
  ['q', 'x'],
  ['j', 'c'],
  ['k', 'v'],
  ['x', 'b'],
  ['b', 'n'],
  // ['m', 'm'],
  ['w', 'comma'],
  ['v', 'period'],
  ['z', 'slash'],
];

ENTRIES.forEach(([from, to]) => {
  manipurator({
    type: 'basic',
    from: {
      key_code: from,
      modifiers: {
        optional: ['any'],
      },
    },
    to: [
      {
        key_code: to,
      },
    ],
    conditions: [
      {
        type: 'input_source_if',
        input_sources: [
          {
            language: '^ja$',
          }
        ]
      }
    ]
  })
})


publish('dvorak-romaji-qwerty');
