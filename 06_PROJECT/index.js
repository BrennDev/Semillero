const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function mainAsk(date, min, max) {
  rl.question(
    `Por favor, ingrese la ${date} en formato decimal: `,
    coordinateNumber => {
      var coordinate = Number(coordinateNumber);
      if (isNaN(coordinate) || coordinate < min || coordinate > max) {
        console.log(
          'Las coordenadas ingresadas no tienen el formato o no se encuentran en el rango esperado',
        );
        mainAsk(date, min, max);
      } else {
        console.log(`La coordenada ingresada es: ${coordinate}`);
        rl.close();
      }
    },
  );
}

const coordinates = [];
/*
for (let i = 0; i < 5; i++) {
  mainAsk('latitud', -90, 90);
}*/

mainAsk('latitud', -90, 90);
