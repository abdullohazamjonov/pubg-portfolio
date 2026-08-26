const menuButton = document.getElementById("menuButton");
const mobileMenu = document.getElementById("mobileMenu");

menuButton.addEventListener("click", () => {

  mobileMenu.classList.toggle("show");

  if (mobileMenu.classList.contains("show")) {

    menuButton.textContent = "✕";

  } else {

    menuButton.textContent = "☰";

  }

});

const mobileLinks =
  document.querySelectorAll(".mobile-menu a");


mobileLinks.forEach(link => {

  link.addEventListener("click", () => {

    mobileMenu.classList.remove("show");

    menuButton.textContent = "☰";

  });

});

const sections =
  document.querySelectorAll("section[id]");

const navLinks =
  document.querySelectorAll(".desktop-nav a");


window.addEventListener("scroll", () => {

  let currentSection = "";


  sections.forEach(section => {

    const sectionTop =
      section.offsetTop - 180;


    if (window.scrollY >= sectionTop) {

      currentSection =
        section.getAttribute("id");

    }

  });


  navLinks.forEach(link => {

    link.classList.remove("active");


    if (
      link.getAttribute("href") ===
      "#" + currentSection
    ) {

      link.classList.add("active");

    }

  });

});

const revealElements =
  document.querySelectorAll(
    ".profile-card, .about-content, .skill-card, .project-card, .achievement-card"
  );


const revealObserver =
  new IntersectionObserver(
    (entries) => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add("visible");

          revealObserver.unobserve(entry.target);

        }

      });

    },
    {
      threshold: .12
    }
  );


revealElements.forEach(element => {

  element.classList.add("reveal");

  revealObserver.observe(element);

});

const projectLinks =
  document.querySelectorAll(".project-link");

const modal =
  document.getElementById("projectModal");

const modalTitle =
  document.getElementById("modalTitle");

const modalClose =
  document.getElementById("modalClose");

const modalOk =
  document.getElementById("modalOk");


projectLinks.forEach(link => {

  link.addEventListener("click", (event) => {

    event.preventDefault();


    const projectName =
      link.dataset.project;


    modalTitle.textContent =
      projectName;


    modal.classList.add("show");

  });

});

function closeModal() {

  modal.classList.remove("show");

}


modalClose.addEventListener(
  "click",
  closeModal
);


modalOk.addEventListener(
  "click",
  closeModal
);

modal.addEventListener("click", (event) => {

  if (event.target === modal) {

    closeModal();

  }

});

document.addEventListener("keydown", (event) => {

  if (event.key === "Escape") {

    closeModal();

  }

});

const character =
  document.querySelector(".hero-character");


if (character) {

  character.addEventListener(
    "mousemove",
    (event) => {

      const rect =
        character.getBoundingClientRect();


      const x =
        event.clientX - rect.left;


      const y =
        event.clientY - rect.top;


      const rotateX =
        ((y / rect.height) - .5) * -3;


      const rotateY =
        ((x / rect.width) - .5) * 3;


      character.style.transform =
        `
        perspective(1000px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale(1.01)
        `;

    }
  );


  character.addEventListener(
    "mouseleave",
    () => {

      character.style.transform =
        "perspective(1000px) rotateX(0) rotateY(0) scale(1)";

    }
  );

}

document.querySelectorAll(
  'a[href^="#"]'
).forEach(link => {

  link.addEventListener(
    "click",
    (event) => {

      const targetId =
        link.getAttribute("href");


      if (
        targetId === "#" ||
        !targetId
      ) {

        return;

      }


      const target =
        document.querySelector(targetId);


      if (target) {

        event.preventDefault();


        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }

    }
  );

});

console.log(
  "%c ABDULLOH PUBG PORTFOLIO ",
  "background:#f4c430;color:#111;font-size:16px;font-weight:bold;padding:8px;"
);

console.log(
  "%c SYSTEM ONLINE ",
  "color:#71d95b;font-size:14px;font-weight:bold;"
);