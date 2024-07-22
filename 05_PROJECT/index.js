const catsBirthday = [
  { name: "Bigotes", birthday: "2018-06-14" },
  { name: "Negra", birthday: "2014-02-23" },
  { name: "Willy", birthday: "2014-05-12" },
  { name: "Blanca Cafe", birthday: "2015-07-03" },
  { name: "Cuchi", birthday: "2023-03-27" },
];

const zodiacs = [
  {
    name: "Acuario",
    startDate: new Date("1970-1-20"),
    endDate: new Date("1970-2-18"),
  },
  {
    name: "Piscis",
    startDate: new Date("1970-2-19"),
    endDate: new Date("1970-3-20"),
  },
  {
    name: "Aries",
    startDate: new Date("1970-3-21"),
    endDate: new Date("1970-4-19"),
  },
  {
    name: "Tauro",
    startDate: new Date("1970-4-20"),
    endDate: new Date("1970-5-20"),
  },
  {
    name: "Géminis",
    startDate: new Date("1970-5-21"),
    endDate: new Date("1970-6-20"),
  },
  {
    name: "Cáncer",
    startDate: new Date("1970-6-21"),
    endDate: new Date("1970-7-22"),
  },
  {
    name: "Leo",
    startDate: new Date("1970-7-23"),
    endDate: new Date("1970-8-22"),
  },
  {
    name: "Virgo",
    startDate: new Date("1970-8-23"),
    endDate: new Date("1970-9-22"),
  },
  {
    name: "Libra",
    startDate: new Date("1970-9-23"),
    endDate: new Date("1970-10-22"),
  },
  {
    name: "Escorpio",
    startDate: new Date("1970-10-23"),
    endDate: new Date("1970-11-21"),
  },
  {
    name: "Sagitario",
    startDate: new Date("1970-11-22"),
    endDate: new Date("1970-12-21"),
  },
  {
    name: "Capricornio",
    startDate: new Date("1970-12-22"),
    endDate: new Date("1971-1-19"),
  },
];

function getZodiac(cats, zodiacs) {
  return cats.map((cat) => {
    const birthDate = new Date(cat.birthday);
    const zodiacSign = zodiacs.find((zodiac) => {
      const checkDate = new Date(
        `1970-${birthDate.getMonth() + 1}-${birthDate.getDate() + 1}`
      );
      return checkDate >= zodiac.startDate && checkDate <= zodiac.endDate;
    });
    return zodiacSign
      ? `${cat.name} es ${zodiacSign.name}`
      : `${cat.name} es undefined`;
  });
}

console.log(getZodiac(catsBirthday, zodiacs));
