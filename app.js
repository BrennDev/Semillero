const projects = [
  {
    title: "Spotify Page in HTML and CSS",
    url: "https://brenndev.github.io/Semillero/01_PROYECT/index.html",
    technologies: ["🔤 HTML", "🎨 CSS"],
  },
  {
    title: "Google Contacts Form with HTML and CSS",
    url: "https://brenndev.github.io/Semillero/02_PROJECT/index.html",
    technologies: ["🔤 HTML", "🎨 CSS"],
  },
  {
    title: "Google Contacts Table with HTML and CSS",
    url: "https://brenndev.github.io/Semillero/03_PROJECT/index.html",
    technologies: ["🔤 HTML", "🎨 CSS"],
  },
  {
    title: "Exercise 4 JS",
    url: "https://brenndev.github.io/Semillero/07_PROJECT/index.html",
    technologies: ["🟨 JS"],
  },
  {
    title: "Spotify Page with HTML, CSS, and JS",
    url: "https://brenndev.github.io/Semillero/08_PROJECT/index.html",
    technologies: ["🔤 HTML", "🎨 CSS", "🟨 JS"],
  },
  {
    title: "Google Contacts Form with JS",
    url: "https://brenndev.github.io/Semillero/09_PROJECT/index.html",
    technologies: ["🔤 HTML", "🎨 CSS", "🟨 JS"],
  },
  {
    title: "Spotify Page with REACT",
    url: "https://daini-rl.github.io/spotify-components/",
    technologies: ["⚛️React"],
  },
  {
    title: "Google Contacts Form with REACT",
    url: "https://brenndev.github.io/contacts-react/",
    technologies: ["⚛️React"],
  },
];

const container = document.getElementById("projects");

projects.forEach((project) => {
  const cardWrapper = document.createElement("div");
  cardWrapper.classList.add("card-wrapper");

  const card = document.createElement("div");
  card.classList.add("card");

  const title = document.createElement("h2");
  title.textContent = project.title;

  const technologiesDiv = document.createElement("div");
  technologiesDiv.classList.add("technologies");
  project.technologies.forEach((tech) => {
    const techButton = document.createElement("button");
    techButton.textContent = tech;
    technologiesDiv.appendChild(techButton);
  });

  card.addEventListener("click", () => {
    window.location.href = project.url;
  });

  card.appendChild(title);
  card.appendChild(technologiesDiv);

  cardWrapper.appendChild(card);

  container.appendChild(cardWrapper);
});
