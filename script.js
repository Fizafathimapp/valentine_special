/**
 * Valentine's Day Romantic SPA
 * Pure HTML, CSS, JavaScript - no frameworks
 * Uses sessionStorage for login and story progress
 */

// ========== CREDENTIALS ==========
const correctName = "anzal khan";
const correctPassword = "7202006";

// ========== ANSWER STORAGE ==========
const userLoveAnswers = {
  memoryStart: "",
  proposalMemory: "",
  favoriteMoment: "",
  relationshipMeaning: "",
  futurePromise: ""
};

// ========== STORY DATA ==========
const storyScenes = [
  {
    id: "memoryStart",
    question: "Do you remember when our story began? ❤️",
    answers: [
      { text: "6 August 🌸", correct: false },
      { text: "14 February 💘", correct: false },
      { text: "12 July ☀️", correct: false },
      { text: "1rst standard", correct: true }
    ],
    correctResponse: "Yes!! The days when destiny decided to let us meet without convos ❤️",
    wrongResponse: "Hehe not exactly… but I love that you're trying 😄"
  },
  {
    id: "proposalMemory",
    question: "Do you remember when u proposed me?",
    answers: [
      { text: "9th august💖", correct: false },
      { text: "6th august😳", correct: true },
      { text: "15th august😅", correct: false }
    ],
    correctResponse: "I'm so glad you remember that moment 💖",
    wrongResponse: "That's okay, we have forever to make more memories 💖"
  },
  {
    id: "favoriteMoment",
    question: "Which moment of ours do you love the most?",
    answers: [
      { text: "Our first conversation", correct: false },
      { text: "Our first kiss", correct: false },
      { text: "Every moment with you ❤️", correct: true }
    ],
    correctResponse: "That's exactly how I feel too! Every moment with you is precious ❤️",
    wrongResponse: "I love that memory too! But honestly, every moment with you is my favorite 💖"
  },
  {
    id: "relationshipMeaning",
    question: "What makes our relationship special?",
    answers: [
      { text: "Trust", correct: false },
      { text: "Laughter", correct: false },
      { text: "You ❤️", correct: true }
    ],
    correctResponse: "You're my everything too ❤️",
    wrongResponse: "All of that and more... but most of all, it's you 💖"
  },
  {
    id: "futurePromise",
    question: "Will you continue writing this love story with me?",
    answers: [
      { text: "Always ❤️", correct: true },
      { text: "Forever 💍", correct: true },
      { text: "Yes, of course 💖", correct: false }
    ],
    correctResponse: "I can't wait for every chapter we'll write together 💖",
    wrongResponse: "I'll be here, writing our story with you forever ❤️"
  }
];

// ========== DOM ELEMENTS ==========
const sections = {
  login: document.getElementById("section-login"),
  confession: document.getElementById("section-confession"),
  rejection: document.getElementById("section-rejection"),
  proposal: document.getElementById("section-proposal"),
  envelope: document.getElementById("section-envelope"),
  story: document.getElementById("section-story"),
  cartoon: document.getElementById("section-cartoon"),
  ending: document.getElementById("section-ending")
};

const floatingHeartsEl = document.getElementById("floating-hearts");
const heartTrailEl = document.getElementById("heart-trail");
const celebrationEl = document.getElementById("celebration-container");

// ========== NAVIGATION (SPA - no refresh) ==========
function showSection(sectionId) {
  Object.keys(sections).forEach(function (id) {
    const el = sections[id];
    if (el) {
      el.classList.remove("active", "slide-in");
      if (id === sectionId) {
        el.classList.add("active", "slide-in");
      }
    }
  });
  // Persist current section for refresh recovery (optional)
  try {
    sessionStorage.setItem("valentine_section", sectionId);
  } catch (e) {}
}

// ========== FLOATING HEARTS BACKGROUND ==========
function createFloatingHearts() {
  const hearts = ["❤️", "💕", "💖", "💗", "💓", "💘"];
  for (let i = 0; i < 18; i++) {
    const heart = document.createElement("span");
    heart.className = "heart";
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = Math.random() * 100 + "%";
    heart.style.animationDelay = Math.random() * 6 + "s";
    heart.style.animationDuration = (6 + Math.random() * 4) + "s";
    floatingHeartsEl.appendChild(heart);
  }
}

// ========== CURSOR HEART TRAIL ==========
let trailTimeout;
function createHeartTrail(e) {
  clearTimeout(trailTimeout);
  trailTimeout = setTimeout(function () {
    const heart = document.createElement("span");
    heart.className = "trail-heart";
    heart.textContent = "❤️";
    heart.style.left = e.clientX + "px";
    heart.style.top = e.clientY + "px";
    heart.style.fontSize = (12 + Math.random() * 8) + "px";
    heartTrailEl.appendChild(heart);
    setTimeout(function () {
      heart.remove();
    }, 800);
  }, 50);
}

document.body.addEventListener("mousemove", createHeartTrail);
document.body.addEventListener("touchmove", function (e) {
  if (e.touches.length) {
    createHeartTrail({ clientX: e.touches[0].clientX, clientY: e.touches[0].clientY });
  }
});

// ========== LOGIN ==========
const loginForm = document.getElementById("login-form");
const modalLoginError = document.getElementById("modal-login-error");

function isLoggedIn() {
  return sessionStorage.getItem("valentine_login") === "true";
}

function setLoggedIn(value) {
  try {
    sessionStorage.setItem("valentine_login", value ? "true" : "false");
  } catch (e) {}
}

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = (document.getElementById("login-name").value || "").trim();
  const password = document.getElementById("login-password").value;

  if (name === correctName && password === correctPassword) {
    setLoggedIn(true);
    showSection("confession");
  } else {
    modalLoginError.classList.remove("hidden");
    var modalBox = modalLoginError.querySelector(".modal");
    if (modalBox) modalBox.classList.add("shake");
    setTimeout(function () {
      if (modalBox) modalBox.classList.remove("shake");
    }, 500);
  }
});

document.querySelectorAll(".modal-close").forEach(function (btn) {
  btn.addEventListener("click", function () {
    var targetId = btn.getAttribute("data-close");
    if (targetId) {
      document.getElementById(targetId).classList.add("hidden");
    }
  });
});

// ========== LOVE CONFESSION ==========
document.getElementById("btn-love-yes").addEventListener("click", function () {
  showSection("proposal");
});

document.getElementById("btn-love-no").addEventListener("click", function () {
  showSection("rejection");
});

document.getElementById("btn-back-confession").addEventListener("click", function () {
  showSection("confession");
});

// ========== BROKEN HEARTS (REJECTION) ==========
function createBrokenHearts() {
  const container = document.getElementById("broken-hearts");
  if (!container) return;
  container.innerHTML = "";
  const symbols = ["💔", "🖤"];
  for (let i = 0; i < 15; i++) {
    const el = document.createElement("span");
    el.className = "broken-heart";
    el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    el.style.left = Math.random() * 100 + "%";
    el.style.animationDelay = Math.random() * 4 + "s";
    el.style.animationDuration = (4 + Math.random() * 4) + "s";
    container.appendChild(el);
  }
}

// When rejection section is shown, create broken hearts
const observerRejection = new MutationObserver(function (mutations, obs) {
  if (sections.rejection && sections.rejection.classList.contains("active")) {
    createBrokenHearts();
  }
});
if (sections.rejection) {
  observerRejection.observe(sections.rejection, { attributes: true, attributeFilter: ["class"] });
}

// ========== VALENTINE PROPOSAL ==========
const btnValentineYes = document.getElementById("btn-valentine-yes");
const btnValentineNo = document.getElementById("btn-valentine-no");
const modalInvalidOption = document.getElementById("modal-invalid-option");

let noEscapeCount = 0;
const NO_ESCAPES_NEEDED = 3;

function runCelebration() {
  celebrationEl.innerHTML = "";
  const colors = ["#ff69b4", "#e63946", "#ffc0cb", "#ff1493", "#fff"];
  for (let i = 0; i < 80; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti-piece";
    confetti.style.left = Math.random() * 100 + "%";
    confetti.style.top = "-20px";
    confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.borderRadius = Math.random() > 0.5 ? "50%" : "0";
    confetti.style.animationDelay = Math.random() * 0.5 + "s";
    confetti.style.animationDuration = (2 + Math.random() * 1.5) + "s";
    celebrationEl.appendChild(confetti);
    setTimeout(function () {
      confetti.remove();
    }, 4000);
  }
  for (let i = 0; i < 25; i++) {
    setTimeout(function () {
      const heart = document.createElement("span");
      heart.className = "celebration-heart";
      heart.textContent = "❤️";
      heart.style.left = Math.random() * 100 + "%";
      heart.style.top = Math.random() * 100 + "%";
      heart.style.fontSize = (1.5 + Math.random() * 1.5) + "rem";
      celebrationEl.appendChild(heart);
      setTimeout(function () {
        heart.remove();
      }, 1200);
    }, i * 80);
  }
}

btnValentineYes.addEventListener("click", function () {
  if (!isLoggedIn()) {
    showSection("login");
    return;
  }
  runCelebration();
  setTimeout(function () {
    showSection("envelope");
  }, 1800);
});

// NO button that moves 2-3 times then shows modal on click
function getRandomPosition() {
  const padding = 80;
  return {
    x: padding + Math.random() * (window.innerWidth - padding * 2),
    y: padding + Math.random() * (window.innerHeight - padding * 2)
  };
}

function moveNoButton() {
  var pos = getRandomPosition();
  btnValentineNo.style.position = "fixed";
  btnValentineNo.style.left = pos.x + "px";
  btnValentineNo.style.top = pos.y + "px";
  btnValentineNo.style.transform = "translate(-50%, -50%)";
  btnValentineNo.style.zIndex = "10";
}

btnValentineNo.addEventListener("mouseenter", function () {
  noEscapeCount++;
  if (noEscapeCount <= NO_ESCAPES_NEEDED) {
    moveNoButton();
  }
});

btnValentineNo.addEventListener("touchstart", function (e) {
  e.preventDefault();
  noEscapeCount++;
  if (noEscapeCount <= NO_ESCAPES_NEEDED) {
    moveNoButton();
  }
}, { passive: false });

btnValentineNo.addEventListener("click", function () {
  if (noEscapeCount >= NO_ESCAPES_NEEDED) {
    modalInvalidOption.classList.remove("hidden");
  }
});

// ========== ENVELOPE ==========
const envelopeEl = document.getElementById("envelope");

envelopeEl.addEventListener("click", function () {
  envelopeEl.classList.add("opening");
  setTimeout(function () {
    envelopeEl.classList.remove("opening");
    showSection("story");
    startStory();
  }, 800);
});

// ========== TYPING ANIMATION ==========
function typeWriter(el, text, speed, onComplete) {
  el.innerHTML = "";
  var i = 0;
  var cursor = document.createElement("span");
  cursor.className = "typed-cursor";
  el.appendChild(cursor);

  function type() {
    if (i < text.length) {
      var before = text.slice(0, i);
      var span = document.createElement("span");
      span.textContent = before;
      el.insertBefore(span, cursor);
      if (el.lastChild !== cursor) {
        el.removeChild(el.childNodes[el.childNodes.length - 2]);
      }
      el.insertBefore(document.createTextNode(before), cursor);
      el.removeChild(el.firstChild);
      if (el.firstChild && el.firstChild.nodeType === 3) {
        el.insertBefore(cursor, el.firstChild.nextSibling);
      }
      i++;
      setTimeout(type, speed);
    } else {
      el.innerHTML = text;
      el.appendChild(cursor);
      if (onComplete) onComplete();
    }
  }
  // Simplify: just set text and animate with cursor
  el.innerHTML = "";
  var idx = 0;
  function step() {
    if (idx <= text.length) {
      el.innerHTML = text.slice(0, idx) + '<span class="typed-cursor"></span>';
      idx++;
      setTimeout(step, speed);
    } else {
      el.innerHTML = text;
      if (onComplete) onComplete();
    }
  }
  step();
}

// ========== STORY FLOW ==========
let currentSceneIndex = 0;
const storyQuestionEl = document.getElementById("story-question");
const storyAnswersEl = document.getElementById("story-answers");
const btnNext = document.getElementById("btn-next");
const storyResponsePopup = document.getElementById("story-response-popup");
const storyResponseText = document.getElementById("story-response-text");

function saveAnswersToStorage() {
  try {
    sessionStorage.setItem("valentine_answers", JSON.stringify(userLoveAnswers));
  } catch (e) {}
}

function loadAnswersFromStorage() {
  try {
    var saved = sessionStorage.getItem("valentine_answers");
    if (saved) {
      var o = JSON.parse(saved);
      Object.keys(o).forEach(function (k) {
        if (userLoveAnswers.hasOwnProperty(k)) userLoveAnswers[k] = o[k];
      });
    }
  } catch (e) {}
}

function showResponsePopup(message) {
  storyResponseText.textContent = message;
  storyResponsePopup.classList.remove("hidden");
  // Sparkle effect around popup (fixed position so % is viewport)
  for (var s = 0; s < 6; s++) {
    (function (delay) {
      setTimeout(function () {
        var sp = document.createElement("span");
        sp.className = "sparkle";
        sp.textContent = "✨";
        sp.style.left = (50 + (Math.random() - 0.5) * 20) + "%";
        sp.style.top = (50 + (Math.random() - 0.5) * 15) + "%";
        document.body.appendChild(sp);
        setTimeout(function () { sp.remove(); }, 600);
      }, delay);
    })(s * 80);
  }
  setTimeout(function () {
    storyResponsePopup.classList.add("hidden");
  }, 2500);
}

function renderStoryScene() {
  if (currentSceneIndex >= storyScenes.length) {
    showSection("ending");
    renderEnding();
    return;
  }

  var scene = storyScenes[currentSceneIndex];
  storyQuestionEl.innerHTML = "";
  storyAnswersEl.innerHTML = "";
  btnNext.classList.add("hidden");
  btnNext.disabled = true;

  typeWriter(storyQuestionEl, scene.question, 45, function () {
    scene.answers.forEach(function (a) {
      var btn = document.createElement("button");
      btn.className = "answer-btn";
      btn.textContent = a.text;
      btn.type = "button";
      btn.addEventListener("click", function () {
        if (btn.disabled) return;
        document.querySelectorAll(".answer-btn").forEach(function (b) {
          b.disabled = true;
        });
        btn.classList.add("bounce");
        userLoveAnswers[scene.id] = a.text;
        saveAnswersToStorage();
        var msg = a.correct ? scene.correctResponse : scene.wrongResponse;
        showResponsePopup(msg);
        btnNext.classList.remove("hidden");
        btnNext.disabled = false;
      });
      storyAnswersEl.appendChild(btn);
    });
  });
}

function startStory() {
  loadAnswersFromStorage();
  currentSceneIndex = 0;
  renderStoryScene();
}

btnNext.addEventListener("click", function () {
  currentSceneIndex++;
  // After Scene 1 (Beginning Memory), show Cartoon Couple scene
  if (currentSceneIndex === 1) {
    showSection("cartoon");
    initCartoonScene();
    return;
  }
  renderStoryScene();
});

// After cartoon "Continue", go to scene 2 (index 1)
document.getElementById("btn-cartoon-next").addEventListener("click", function () {
  currentSceneIndex = 1;
  showSection("story");
  renderStoryScene();
});

// ========== CARTOON COUPLE SCENE ==========
function initCartoonScene() {
  var container = document.getElementById("cartoon-image-container");
  var heartsContainer = document.getElementById("cartoon-hearts");
  if (!heartsContainer) return;
  heartsContainer.innerHTML = "";
  for (var h = 0; h < 8; h++) {
    var heart = document.createElement("span");
    heart.className = "cartoon-heart";
    heart.textContent = "❤️";
    heart.style.left = (15 + Math.random() * 70) + "%";
    heart.style.top = (10 + Math.random() * 60) + "%";
    heart.style.animationDelay = Math.random() * 2 + "s";
    heartsContainer.appendChild(heart);
  }

  var img = document.getElementById("cartoon-image");
  var popup = document.getElementById("cartoon-popup");

  function onCartoonClick(e) {
    var x = e.clientX || (e.touches && e.touches[0].clientX);
    var y = e.clientY || (e.touches && e.touches[0].clientY);
    for (var i = 0; i < 12; i++) {
      setTimeout(function () {
        var sparkle = document.createElement("span");
        sparkle.className = "sparkle";
        sparkle.textContent = "✨";
        sparkle.style.left = (x + (Math.random() - 0.5) * 80) + "px";
        sparkle.style.top = (y + (Math.random() - 0.5) * 80) + "px";
        document.body.appendChild(sparkle);
        setTimeout(function () {
          sparkle.remove();
        }, 600);
      }, i * 40);
    }
    for (var j = 0; j < 8; j++) {
      setTimeout(function () {
        var heart = document.createElement("span");
        heart.className = "celebration-heart";
        heart.textContent = "❤️";
        heart.style.left = (x + (Math.random() - 0.5) * 100) + "px";
        heart.style.top = (y + (Math.random() - 0.5) * 100) + "px";
        heart.style.fontSize = "1.2rem";
        document.body.appendChild(heart);
        setTimeout(function () {
          heart.remove();
        }, 1000);
      }, j * 60);
    }
    popup.classList.remove("hidden");
    setTimeout(function () {
      popup.classList.add("hidden");
    }, 3000);
  }

  if (img) {
    img.removeEventListener("click", onCartoonClick);
    img.removeEventListener("touchend", onCartoonClick);
    img.addEventListener("click", onCartoonClick);
    img.addEventListener("touchend", function (e) {
      e.preventDefault();
      onCartoonClick(e);
    }, { passive: false });
  }
  var placeholder = container && container.querySelector(".cartoon-placeholder");
  if (placeholder) {
    placeholder.addEventListener("click", onCartoonClick);
    placeholder.addEventListener("touchend", function (e) {
      e.preventDefault();
      onCartoonClick(e);
    }, { passive: false });
  }
}

// ========== ENDING ==========
function renderEnding() {
  var container = document.getElementById("ending-hearts");
  if (container) {
    container.innerHTML = "";
    for (var i = 0; i < 20; i++) {
      setTimeout(function () {
        var heart = document.createElement("span");
        heart.className = "ending-heart";
        heart.textContent = "❤️";
        heart.style.left = Math.random() * 100 + "%";
        heart.style.top = Math.random() * 100 + "%";
        container.appendChild(heart);
        setTimeout(function () {
          heart.remove();
        }, 2000);
      }, i * 100);
    }
  }

  var summaryEl = document.getElementById("summary-cards");
  if (summaryEl) {
    summaryEl.innerHTML = "";
    var labels = {
      memoryStart: "When our story began",
      proposalMemory: "Proposal memory",
      favoriteMoment: "Favorite moment",
      relationshipMeaning: "What makes us special",
      futurePromise: "Future promise"
    };
    storyScenes.forEach(function (scene) {
      var key = scene.id;
      var userAnswer = userLoveAnswers[key];
      var correctAnswer = scene.answers.filter(function (a) { return a.correct; })[0];
      correctAnswer = correctAnswer ? correctAnswer.text : "";
      if (userAnswer || correctAnswer) {
        var card = document.createElement("div");
        card.className = "summary-card";
        card.innerHTML =
          "<strong>" + (labels[key] || key) + "</strong><br>" +
          "<span class=\"summary-your-answer\">Your answer: " + (userAnswer || "—") + "</span><br>" +
          "<span class=\"summary-correct-answer\">Correct answer: " + (correctAnswer || "—") + "</span>";
        summaryEl.appendChild(card);
      }
    });
  }
}

// ========== INIT ==========
createFloatingHearts();

// Optional: restore section from sessionStorage (e.g. after refresh)
var savedSection = sessionStorage.getItem("valentine_section");
if (savedSection === "confession" && isLoggedIn()) {
  showSection("confession");
} else if (savedSection === "story" && isLoggedIn()) {
  showSection("story");
  startStory();
} else {
  showSection("login");
}
