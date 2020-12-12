/* eslint-disable @typescript-eslint/no-unused-vars */
import data from './data.json';

const patternX = 'X'; // first repeating number
const patternY = 'Y'; // second repeating number
const patternXYZ = 'XYZ'; // 123
const patternZYX = 'ZYX'; // 321
const patternWXYZ = 'WXYZ'; // 1234
const patternZYXW = 'ZYXW'; // 4321
const patternUVWXYZ = 'UVWXYZ'; // 123456,  456789
const patternZYXWVU = 'ZYXWVU'; // 987654,  654321

const pattern0 = '0';
const pattern1 = '1';
const pattern2 = '2';
const pattern3 = '3';
const pattern4 = '4';
const pattern5 = '5';
const pattern6 = '6';
const pattern7 = '7';
const pattern8 = '8';
const pattern9 = '9';

const numberPatterns = [
  pattern0,
  pattern1,
  pattern2,
  pattern3,
  pattern4,
  pattern5,
  pattern6,
  pattern7,
  pattern8,
  pattern9,
];

const makeUnique = (str = '') => {
  return str.split('').filter((item, i, ar) => ar.indexOf(item) === i);
  // .join('');
};

const getPattern = (pattern: string) => {
  return data.Sheet1.find(i => i.pattern === pattern);
};

export const parseId = (idStr?: string) => {
  if (!idStr) {
    return;
  }

  const unique = makeUnique(idStr);

  const extracted = idStr.split('');

  const groups: string[][] = [];

  extracted.forEach(char => {
    unique.forEach(iPattern => {
      if (iPattern === char) {
        if (groups[groups.length - 1]) {
          if (groups[groups.length - 1][0] === char) {
            groups[groups.length - 1].push(char);
          } else {
            groups.push([char]);
          }
        } else {
          groups.push([char]);
        }
      }
    });
  });

  console.log({ extracted, unique, groups });

  const patterns: string[] = [];

  const tier3 = [
    /(\d)\1{3}[^\1]/,
    /(\d)\1{2}([^\1])\2{2}/,
    /(\d)\1([^\1])\1{2}\2/,
    /(\d)([^\1])(\1\2){2}/,
    /(\d)([^\1])\2\1\2{2}/,
    /(\d)([^\1])\2{3}\1/,
    /(\d)([^\1])\2(\1\2){2}/,
    /(\d)\1([^\1])\2\1{2}/,
  ];

  console.log(tier3.some(r => r.test(idStr)));

  // only if unique.length === 2
  if (unique.length <= 2) {
    unique.forEach(pattern => {
      const varik = extracted
        .map(value => {
          if (pattern === value) {
            return patternX;
          } else {
            return value;
          }
        })
        .join('');
      patterns.push(varik);
    });
  } else {
    //
    unique.forEach(pattern => {
      const varik = extracted.map(value => {
        if (pattern === pattern0 && value === pattern) {
          return pattern0;
        }
        if (pattern === value) {
          return patternX;
        } else {
          return value;
        }
      });
    });
  }

  console.log({ patterns });

  const listedPattern = patterns.map(pat => getPattern(pat)).filter(i => !!i);

  if (listedPattern.length) {
    return listedPattern[0];
  }

  return { pattern: 'NOT LISTED', example: idStr, price: '$2.99', tier: '16' };
};

// //XXXXXX
// if (unique.length === 1) {
//   const xPattern = groups[0].map(() => patternX).join('');
//   return getPattern(xPattern);
// }

// // X11111  - 11111X
// if (unique.length === 2) {
//   const xPattern = groups
//     .map((group, idx, ar) => {
//       // console.log({ isNumber });

//       if (group.length === 1) {
//         const isNumber = ar.filter((q, i) => i !== idx).some(g => g.includes(group[0]));
//         if (!isNumber) {
//           return patternX;
//         }
//         return group.join('');
//       }
//       return group.join('');

//       // if (group.length === 1) {
//       //   console.log(group[0]);
//       //   const isNumber = ar.filter((q, i) => i !== idx).some(g => g.includes(group[0]));

//       //   console.log({ isNumber });
//       //   if (!isNumber) {
//       //     return patternX;
//       //   }
//       //   return group.join('');
//       // }
//       // return group.join('');
//     })
//     .join('');
//   console.log({ xPattern });
//   return getPattern(xPattern);
// }

// //
// // if (groups.length === 1) {
// //   const xPattern = groups[0].map(() => patternX).join('');
// //   return getPattern(xPattern);
// // }

// if (groups.length === 2) {
//   // X11111  || 11111X
//   if (groups[0].length === 1 || groups[1].length === 1) {
//     const xPattern = groups
//       .map(group => (group.length === 1 ? patternX : group.join('')))
//       .join('');

//     return getPattern(xPattern);
//   }

//   // 111XXX
//   if (groups[0].length === 3 || groups[1].length === 3) {
//     const xPattern = groups
//       .map((group, idx) => (idx === 0 ? group.join('') : group.map(() => patternX).join('')))
//       .join('');
//     return getPattern(xPattern);
//   }
// }
