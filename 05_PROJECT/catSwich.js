const catsBirthday = [
  { name: "Bigotes", birthday: "2018-06-14" },
  { name: "Negra", birthday: "2014-02-23" },
  { name: "Willy", birthday: "2014-05-12" },
  { name: "Blanca Cafe", birthday: "2015-07-03" },
  { name: "Cuchi", birthday: "2023-03-27" },
];

function getZodiac(cats) {
  return cats.map((cat) => {
    const birthDate = new Date(cat.birthday);
    const month = birthDate.getMonth() + 1;
    const day = birthDate.getDate() + 1;
    let zodiacSign = "";

    switch (month) {
      case 1:
        zodiacSign = day <= 19 ? "Capricornio" : "Acuario";
        break;
      case 2:
        zodiacSign = day <= 18 ? "Acuario" : "Piscis";
        break;
      case 3:
        zodiacSign = day <= 20 ? "Piscis" : "Aries";
        break;
      case 4:
        zodiacSign = day <= 19 ? "Aries" : "Tauro";
        break;
      case 5:
        zodiacSign = day <= 20 ? "Tauro" : "Géminis";
        break;
      case 6:
        zodiacSign = day <= 20 ? "Géminis" : "Cáncer";
        break;
      case 7:
        zodiacSign = day <= 22 ? "Cáncer" : "Leo";
        break;
      case 8:
        zodiacSign = day <= 22 ? "Leo" : "Virgo";
        break;
      case 9:
        zodiacSign = day <= 22 ? "Virgo" : "Libra";
        break;
      case 10:
        zodiacSign = day <= 22 ? "Libra" : "Escorpio";
        break;
      case 11:
        zodiacSign = day <= 21 ? "Escorpio" : "Sagitario";
        break;
      case 12:
        zodiacSign = day <= 21 ? "Sagitario" : "Capricornio";
        break;
      default:
        zodiacSign = "undefined";
    }

    return `${cat.name} es ${zodiacSign}`;
  });
}

console.log(getZodiac(catsBirthday));
