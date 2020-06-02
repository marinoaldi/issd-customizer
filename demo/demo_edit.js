var fs = require("fs");

//  constantes
const TEAMS_LENGTH = 36;
const offsetIndexs = {
  name: "",
  players: {
    name: { start: 230286, end: 230446 }, // bloque de nombres
    hair: { start: 328198, end: 328199 }, // bloque de dato de 1 valor para cabello
    attributes: { start: 328197, end: 328337 }, // + 7 * 20 (140) // bloque de atributos Nº, Speed, etc
    position: { start: 328196, end: 328196 }, // + 7 * 20 (140) // bloque de posición del jugador
  },
};

//  player dictionaries
const letters = {
  "00": ".",
  "68": "A",
  "69": "B",
  "70": "I",
  "71": "J",
  "72": "K",
  "73": "L",
  "74": "M",
  "75": "N",
  "76": "O",
  "77": "P",
  "78": "Q",
  "79": "R",
  "80": "Y",
  "81": "Z",
  "82": "a",
  "83": "b",
  "84": "c",
  "85": "d",
  "86": "e",
  "87": "f",
  "88": "g",
  "89": "h",
  "90": "o",
  "91": "p",
  "92": "q",
  "93": "r",
  "94": "s",
  "95": "t",
  "96": "u",
  "97": "v",
  "98": "w",
  "99": "x",
  "00": ".",
  "6A": "C",
  "6B": "D",
  "6C": "E",
  "6D": "F",
  "6E": "G",
  "6F": "H",
  "7A": "S",
  "7B": "T",
  "7C": "U",
  "7D": "V",
  "7E": "W",
  "7F": "X",
  "8A": "i",
  "8B": "j",
  "8C": "k",
  "8D": "l",
  "8E": "m",
  "8F": "n",
  "9A": "y",
  "9B": "z",
};

const keyToValue = () =>
    Object.keys(letters).reduce((prev, hex) => {
      prev[letters[hex]] = hex;
      return prev;
    }, {});

const hexWithLetterKey = keyToValue();
const parseLetterToHex = (letter) => {
  return hexWithLetterKey[letter];
};
//  CARGAS el rom que quieres modificar
const romDemo = fs.readFileSync(`${__dirname}/ISSD.smc`);

//  cambias el primer jugador del primer equipo (Cruzeiro)
//  le pones un nombre de 8 caracteres (en este caso "Coronavi") y lo pasar a un array de Buffer hexadecimales
const nuevoNombrePortero = "Coronavi"
    .split("")
    .map(parseLetterToHex)
    .map((hex) => Buffer.from(hex, "hex"))

console.log("Coronavi = " + nuevoNombrePortero);
//  cortas el buffer del rom
// 230286 es el indice donde parte el nombre del primer jugador
const romEdited = Buffer.concat([
  romDemo.slice(0, 230286),
  //  insertas el buffer nuevo
  ...nuevoNombrePortero,
  // concatenas el otro pedazo del room hasta el ultimo
  romDemo.slice(230286 + 8),
]);
//  guardas el buffer en un nuevo archivo
fs.writeFileSync(`${__dirname}/ISSD_EDITED.smc`, romEdited);
