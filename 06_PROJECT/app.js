const readline = require('readline');
const quicksort = require('./quicksort');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const coordinates = [];
let count = 0;

function validateCoordinate(coordinate, min, max) {
  if (isNaN(coordinate)) {
    console.log('El valor ingresado no es un número válido.');
    return false;
  }
  if (coordinate < min || coordinate > max) {
    console.log(`El valor debe estar entre ${min} y ${max}.`);
    return false;
  }
  return true;
}

function mainAsk(coordinateItem, min, max, callback) {
  rl.question(
    `Por favor, ingrese la ${coordinateItem} en formato decimal: `,
    (input) => {
      const number = Number(input);
      if (!validateCoordinate(number, min, max)) {
        mainAsk(coordinateItem, min, max, callback);
      } else {
        callback(number);
      }
    },
  );
}

function askCoordinates() {
  if (count < 5) {
    mainAsk('latitud', -90, 90, (lat) => {
      mainAsk('longitud', -180, 180, (lon) => {
        coordinates.push({ lat, lon });
        count++;
        console.log(`Las coordenadas (${lat}, ${lon}) son válidas`);
        askCoordinates();
      });
    });
  } else {
    console.log('Las coordenadas ingresadas son: ', coordinates);
    const sortedCoordinates = quicksort(coordinates);
    console.log(
      'Las coordenadas ordenadas por longitud son: ',
      sortedCoordinates,
    );
    rl.close();
  }
}

askCoordinates();
