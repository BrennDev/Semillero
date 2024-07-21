const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const coordinates = [];
let count = 0;

function askLatitud() {
  if (count < 5) {
    rl.question(
      `Por favor, ingrese la latitud en formato decimal para la coordenada ${
        count + 1
      }: `,
      latitud => {
        const lat = Number(latitud);
        if (isNaN(lat)) {
          console.log('El formato de latitud es incorrecto');
          askLatitud();
        } else if (lat > 90 || lat < -90) {
          console.log(
            'La latitud ingresada no es válida. Debe ser un número entre -90 y 90.',
          );
          askLatitud();
        } else {
          askLongitud(lat);
        }
      },
    );
  } else {
    console.log('Las coordenadas ingresadas son: ', coordinates);
    rl.close();
  }
}

function askLongitud(lat) {
  rl.question(
    `Por favor, ingrese la longitud en formato decimal para la coordenada ${
      count + 1
    }: `,
    longitud => {
      const lon = Number(longitud);
      if (isNaN(lon)) {
        console.log('El formato de longitud es incorrecto');
        askLongitud(lat);
      } else if (lon > 180 || lon < -180) {
        console.log(
          'La longitud ingresada no es válida. Debe ser un número entre -180 y 180.',
        );
        askLongitud(lat);
      } else {
        coordinates.push({ lat, lon });
        count++;
        console.log(`Las coordenadas (${lat}, ${lon}) son válidas`);
        askLatitud();
      }
    },
  );
}

askLatitud();
