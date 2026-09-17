/* =========================================================
   PUBG PORTFOLIO — CINEMATIC ANIMATION JS
========================================================= */

document.body.classList.add("preloading");


/* =========================================================
   PUBG LOADING SCREEN
========================================================= */

const loader = document.createElement("div");

loader.id = "pubg-loader";

loader.innerHTML = `
  <div class="loader-scan"></div>

  <div class="loader-inner">

    <img
      class="loader-logo"
      src="./img/logo.png"
      alt="PUBG"
    >

    <div class="loader-brand">
      PUBG PORTFOLIO
    </div>

    <div class="loader-sub">
      PLAYER DATA INITIALIZATION
    </div>

    <div class="loader-status">

      <span id="loaderStatus">
        CONNECTING TO SYSTEM...
      </span>

      <span
        class="loader-percent"
        id="loaderPercent"
      >
        0%
      </span>

    </div>

    <div class="loader-bar">
      <span id="loaderProgress"></span>
    </div>

  </div>
`;

document.body.prepend(loader);


/* =========================================================
   LOADING PROGRESS
========================================================= */

const loaderProgress =
  document.getElementById("loaderProgress");

const loaderPercent =
  document.getElementById("loaderPercent");

const loaderStatus =
  document.getElementById("loaderStatus");


const loadingMessages = [

  "CONNECTING TO SYSTEM...",

  "LOADING PLAYER DATA...",

  "SYNCING INVENTORY...",

  "CHECKING SKILLS...",

  "PREPARING MISSION...",

  "SYSTEM ONLINE"

];


let loadValue = 0;


const loadingTimer = setInterval(() => {

  loadValue +=
    Math.floor(Math.random() * 5) + 2;


  if (loadValue >= 100) {

    loadValue = 100;

    clearInterval(loadingTimer);

  }


  loaderProgress.style.width =
    `${loadValue}%`;


  loaderPercent.textContent =
    `${loadValue}%`;


  const index = Math.min(

    loadingMessages.length - 1,

    Math.floor(loadValue / 18)

  );


  loaderStatus.textContent =
    loadingMessages[index];


  if (loadValue === 100) {

    setTimeout(() => {

      loader.classList.add("hide");

      document.body.classList.remove(
        "preloading"
      );


      setTimeout(() => {

        loader.remove();

      }, 800);

    }, 450);

  }

}, 65);


/* =========================================================
   HUD SCAN LINE
========================================================= */

const scanline =
  document.createElement("div");

scanline.id =
  "hud-scanline";

document.body.appendChild(
  scanline
);


/* =========================================================
   HUD CORNERS
========================================================= */

[
  "tl",
  "tr",
  "bl",
  "br"
].forEach(position => {

  const corner =
    document.createElement("div");

  corner.className =
    `hud-corner ${position}`;

  document.body.appendChild(
    corner
  );

});


/* =========================================================
   PARTICLES
========================================================= */

const particles =
  document.createElement("div");

particles.id =
  "particles";

document.body.appendChild(
  particles
);


for (let i = 0; i < 32; i++) {

  const particle =
    document.createElement("span");

  particle.className =
    "particle";


  particle.style.left =
    `${Math.random() * 100}%`;


  particle.style.bottom =
    `${Math.random() * 100}%`;


  particle.style.animationDuration =
    `${7 + Math.random() * 12}s`;


  particle.style.animationDelay =
    `${Math.random() * -15}s`;


  particle.style.opacity =
    `${.15 + Math.random() * .55}`;


  particle.style.transform =
    `scale(${.5 + Math.random() * 1.5})`;


  particles.appendChild(
    particle
  );

}


/* =========================================================
   MOBILE MENU
========================================================= */

const menuButton =
  document.getElementById(
    "menuButton"
  );


const mobileMenu =
  document.getElementById(
    "mobileMenu"
  );


if (
  menuButton &&
  mobileMenu
) {

  menuButton.addEventListener(
    "click",
    () => {

      mobileMenu.classList.toggle(
        "show"
      );


      menuButton.textContent =
        mobileMenu.classList.contains(
          "show"
        )
          ? "✕"
          : "☰";

    }
  );


  document
    .querySelectorAll(
      ".mobile-menu a"
    )
    .forEach(link => {

      link.addEventListener(
        "click",
        () => {

          mobileMenu.classList.remove(
            "show"
          );


          menuButton.textContent =
            "☰";

        }
      );

    });

}


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections =
  document.querySelectorAll(
    "section[id]"
  );


const navLinks =
  document.querySelectorAll(
    ".desktop-nav a"
  );


function updateActiveNav() {

  let currentSection = "";


  sections.forEach(section => {

    const sectionTop =
      section.offsetTop - 180;


    if (
      window.scrollY >=
      sectionTop
    ) {

      currentSection =
        section.id;

    }

  });


  navLinks.forEach(link => {

    link.classList.toggle(

      "active",

      link.getAttribute(
        "href"
      ) ===
      `#${currentSection}`

    );

  });

}


window.addEventListener(
  "scroll",
  updateActiveNav,
  {
    passive: true
  }
);


updateActiveNav();


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
  document.querySelectorAll(`

    .profile-card,

    .about-content,

    .skill-card,

    .project-card,

    .achievement-card,

    .section-title

  `);


const revealObserver =
  new IntersectionObserver(

    entries => {

      entries.forEach(entry => {

        if (
          entry.isIntersecting
        ) {

          entry.target.classList.add(
            "visible"
          );


          revealObserver.unobserve(
            entry.target
          );

        }

      });

    },

    {
      threshold: 0.12
    }

  );


revealElements.forEach(
  (element, index) => {

    element.classList.add(
      "reveal"
    );


    element.style.transitionDelay =
      `${Math.min(index % 4, 3) * 90}ms`;


    revealObserver.observe(
      element
    );

  }
);


/* =========================================================
   PROJECT MODAL
========================================================= */

const projectLinks =
  document.querySelectorAll(
    ".project-link"
  );


const modal =
  document.getElementById(
    "projectModal"
  );


const modalTitle =
  document.getElementById(
    "modalTitle"
  );


const modalClose =
  document.getElementById(
    "modalClose"
  );


const modalOk =
  document.getElementById(
    "modalOk"
  );


function closeModal() {

  if (modal) {

    modal.classList.remove(
      "show"
    );

  }

}


projectLinks.forEach(link => {

  link.addEventListener(
    "click",
    event => {

      event.preventDefault();


      const projectName =
        link.dataset.project ||
        "PROJECT";


      if (modalTitle) {

        modalTitle.textContent =
          projectName;

      }


      if (modal) {

        modal.classList.add(
          "show"
        );

      }

    }
  );

});


if (modalClose) {

  modalClose.addEventListener(
    "click",
    closeModal
  );

}


if (modalOk) {

  modalOk.addEventListener(
    "click",
    closeModal
  );

}


if (modal) {

  modal.addEventListener(
    "click",
    event => {

      if (
        event.target === modal
      ) {

        closeModal();

      }

    }
  );

}


document.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "Escape"
    ) {

      closeModal();

    }

  }
);


/* =========================================================
   CHARACTER MOUSE PARALLAX
========================================================= */

const character =
  document.querySelector(
    ".hero-character"
  );


if (character) {

  character.addEventListener(
    "mousemove",
    event => {

      const rect =
        character.getBoundingClientRect();


      const x =
        event.clientX -
        rect.left;


      const y =
        event.clientY -
        rect.top;


      const rotateX =
        ((y / rect.height) - .5) *
        -4;


      const rotateY =
        ((x / rect.width) - .5) *
        5;


      character.style.transform = `

        perspective(1000px)

        rotateX(${rotateX}deg)

        rotateY(${rotateY}deg)

        scale(1.015)

      `;

    }
  );


  character.addEventListener(
    "mouseleave",
    () => {

      character.style.transform =
        `
        perspective(1000px)

        rotateX(0)

        rotateY(0)

        scale(1)
        `;

    }
  );

}


/* =========================================================
   HERO MOUSE PARALLAX
========================================================= */

const hero =
  document.querySelector(
    ".hero"
  );


const heroLeft =
  document.querySelector(
    ".hero-left"
  );


if (
  hero &&
  heroLeft &&
  window.matchMedia(
    "(pointer:fine)"
  ).matches
) {

  hero.addEventListener(
    "mousemove",
    event => {

      const rect =
        hero.getBoundingClientRect();


      const x =
        (event.clientX -
          rect.left) /
          rect.width -
        .5;


      const y =
        (event.clientY -
          rect.top) /
          rect.height -
        .5;


      heroLeft.style.transform =
        `translate3d(
          ${x * -8}px,
          ${y * -5}px,
          0
        )`;

    }
  );


  hero.addEventListener(
    "mouseleave",
    () => {

      heroLeft.style.transform =
        "";

    }
  );

}


/* =========================================================
   NUMBER COUNTER
========================================================= */

function animateNumber(
  element,
  target,
  duration = 1300
) {

  if (
    !element ||
    Number.isNaN(target)
  ) {

    return;

  }


  const start =
    performance.now();


  function tick(now) {

    const progress =
      Math.min(
        (now - start) /
        duration,
        1
      );


    const eased =
      1 -
      Math.pow(
        1 - progress,
        3
      );


    const value =
      Math.round(
        target * eased
      );


    element.textContent =
      value.toLocaleString(
        "en-US"
      );


    if (
      progress < 1
    ) {

      requestAnimationFrame(
        tick
      );

    }

  }


  requestAnimationFrame(
    tick
  );

}


/* =========================================================
   DECIMAL COUNTER
========================================================= */

function animateDecimal(
  element,
  target,
  original,
  duration = 1200
) {

  const start =
    performance.now();


  function tick(now) {

    const progress =
      Math.min(
        (now - start) /
        duration,
        1
      );


    const eased =
      1 -
      Math.pow(
        1 - progress,
        3
      );


    const value =
      target * eased;


    element.textContent =
      value.toFixed(2);


    if (
      progress < 1
    ) {

      requestAnimationFrame(
        tick
      );

    } else {

      element.textContent =
        original;

    }

  }


  requestAnimationFrame(
    tick
  );

}


/* =========================================================
   COUNTER OBSERVER
========================================================= */

const counterTargets = [

  ...document.querySelectorAll(
    ".hero-stat strong"
  ),

  ...document.querySelectorAll(
    ".stat-box strong"
  )

];


const counterObserver =
  new IntersectionObserver(

    entries => {

      entries.forEach(entry => {

        if (
          entry.isIntersecting &&
          !entry.target.dataset.counted
        ) {

          const original =
            entry.target.textContent.trim();


          const numeric =
            parseFloat(
              original.replace(
                /[^0-9.]/g,
                ""
              )
            );


          if (
            !Number.isNaN(
              numeric
            ) &&
            !original.includes(
              "TOP"
            ) &&
            !original.includes(
              "ONLINE"
            )
          ) {

            entry.target.dataset.counted =
              "true";


            if (
              original.includes(".")
            ) {

              animateDecimal(
                entry.target,
                numeric,
                original,
                1200
              );

            }

            else if (
              original.includes("+")
            ) {

              animateNumber(
                entry.target,
                numeric,
                1200
              );


              setTimeout(() => {

                entry.target.textContent =
                  `${Math.round(
                    numeric
                  )}+`;

              }, 1250);

            }

            else {

              animateNumber(
                entry.target,
                numeric,
                1200
              );

            }

          }


          counterObserver.unobserve(
            entry.target
          );

        }

      });

    },

    {
      threshold: .7
    }

  );


counterTargets.forEach(
  counter => {

    counterObserver.observe(
      counter
    );

  }
);


/* =========================================================
   SKILL BAR EFFECT
========================================================= */

document
  .querySelectorAll(
    ".skill-card"
  )
  .forEach(card => {

    card.addEventListener(
      "mouseenter",
      () => {

        const bar =
          card.querySelector(
            ".skill-bar span"
          );


        if (bar) {

          bar.style.filter =
            "brightness(1.35)";

        }

      }
    );


    card.addEventListener(
      "mouseleave",
      () => {

        const bar =
          card.querySelector(
            ".skill-bar span"
          );


        if (bar) {

          bar.style.filter =
            "";

        }

      }
    );

  });


/* =========================================================
   PROJECT 3D TILT
========================================================= */

document
  .querySelectorAll(
    ".project-card"
  )
  .forEach(card => {

    card.addEventListener(
      "mousemove",
      event => {

        if (
          !window.matchMedia(
            "(pointer:fine)"
          ).matches
        ) {

          return;

        }


        const rect =
          card.getBoundingClientRect();


        const x =
          (event.clientX -
            rect.left) /
          rect.width;


        const y =
          (event.clientY -
            rect.top) /
          rect.height;


        const rotateY =
          (x - .5) * 5;


        const rotateX =
          (.5 - y) * 5;


        card.style.transform =
          `translateY(-10px)
           rotateX(${rotateX}deg)
           rotateY(${rotateY}deg)`;

      }
    );


    card.addEventListener(
      "mouseleave",
      () => {

        card.style.transform =
          "";

      }
    );

  });


/* =========================================================
   BUTTON RIPPLE
========================================================= */

document
  .querySelectorAll(
    ".btn"
  )
  .forEach(button => {

    button.addEventListener(
      "click",
      event => {

        const rect =
          button.getBoundingClientRect();


        const ripple =
          document.createElement(
            "span"
          );


        ripple.style.position =
          "absolute";


        ripple.style.width =
          "10px";


        ripple.style.height =
          "10px";


        ripple.style.borderRadius =
          "50%";


        ripple.style.background =
          "rgba(255,255,255,.35)";


        ripple.style.pointerEvents =
          "none";


        ripple.style.left =
          `${event.clientX -
            rect.left -
            5}px`;


        ripple.style.top =
          `${event.clientY -
            rect.top -
            5}px`;


        ripple.style.transform =
          "scale(0)";


        ripple.style.transition =
          "transform .55s ease, opacity .55s ease";


        button.appendChild(
          ripple
        );


        requestAnimationFrame(
          () => {

            ripple.style.transform =
              "scale(25)";


            ripple.style.opacity =
              "0";

          }
        );


        setTimeout(
          () => {

            ripple.remove();

          },
          600
        );

      }
    );

  });


/* =========================================================
   SMOOTH SCROLL
========================================================= */

document
  .querySelectorAll(
    'a[href^="#"]'
  )
  .forEach(link => {

    link.addEventListener(
      "click",
      event => {

        const targetId =
          link.getAttribute(
            "href"
          );


        if (
          !targetId ||
          targetId === "#"
        ) {

          return;

        }


        const target =
          document.querySelector(
            targetId
          );


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


/* =========================================================
   HOME KEY
========================================================= */

document.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "Home"
    ) {

      window.scrollTo({

        top: 0,

        behavior: "smooth"

      });

    }

  }
);


/* =========================================================
   CONSOLE
========================================================= */

console.log(

  "%c ABDULLOH PUBG PORTFOLIO ",

  `
  background:#f4c430;
  color:#111;
  font-size:16px;
  font-weight:bold;
  padding:8px;
  `

);


console.log(

  "%c SYSTEM ONLINE ",

  `
  color:#71d95b;
  font-size:14px;
  font-weight:bold;
  `

);