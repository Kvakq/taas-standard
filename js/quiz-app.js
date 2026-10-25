// =========================================
// QUIZ ENGINE & GOOGLE FORMS INTEGRATION
// =========================================

const quizContainer = document.getElementById("quiz-questions-container");
const submitQuizBtn = document.getElementById("submit-quiz-btn");
const resetQuizBtn = document.getElementById("reset-quiz-btn");
const quizResultBox = document.getElementById("quiz-result-box");
const resultTitle = document.getElementById("result-title");
const resultMessage = document.getElementById("result-message");
const copyQuizResultBtn = document.getElementById("copy-quiz-result-btn");
const quizWarningBox = document.getElementById("quiz-warning-box");

// Google Form Configuration
const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLScugpFXrBrM4M3OvSHmx2CzvKzaidi25W9gkIQbVQHQPwT_PQ/formResponse";
const ENTRY_SCORE = "entry.1738877862";
const ENTRY_PERCENT = "entry.748515956";
const ENTRY_ANSWERS = "entry.281756967";

// LocalStorage key to prevent duplicate submissions
const STORAGE_KEY = "taas_quiz_first_attempt";

let lastQuizScoreText = "";

// Submit first attempt to Google Forms
async function sendResultToGoogleForm(score, percent, detailsText) {
  const formData = new FormData();
  formData.append(ENTRY_SCORE, `${score} / ${quizData.length}`);
  formData.append(ENTRY_PERCENT, `${percent}%`);
  formData.append(ENTRY_ANSWERS, detailsText);

  try {
    await fetch(GOOGLE_FORM_URL, {
      method: "POST",
      mode: "no-cors",
      body: formData,
    });
    console.log("Quiz result successfully submitted to Google Forms.");
  } catch (error) {
    console.error("Error submitting quiz result:", error);
  }
}

// Render quiz questions
function renderQuiz() {
  if (!quizContainer) return;
  quizContainer.innerHTML = "";

  quizData.forEach((item, qIndex) => {
    const card = document.createElement("div");
    card.className = "quiz-card";
    card.id = `quiz-card-${qIndex}`;

    const optionsHtml = item.options
      .map(
        (optText, optIndex) => `
            <label class="quiz-option-label" id="label-q${qIndex}-o${optIndex}">
                <input type="radio" name="question-${qIndex}" value="${optIndex}">
                <span>${optText}</span>
            </label>
        `,
      )
      .join("");

    card.innerHTML = `
            <span class="quiz-question-num">Küsimus ${qIndex + 1} / ${quizData.length}</span>
            <div class="quiz-question-text">${item.question}</div>
            <div class="quiz-options">${optionsHtml}</div>
            <div class="unanswered-hint" id="hint-q${qIndex}">⚠ Palun vasta sellele küsimusele enne kontrollimist.</div>
            <div class="quiz-explanation" id="exp-q${qIndex}">${item.explanation}</div>
        `;

    card
      .querySelectorAll(`input[name="question-${qIndex}"]`)
      .forEach((radio) => {
        radio.addEventListener("change", () => {
          card.classList.remove("unanswered-card");
          const stillUnanswered = document.querySelectorAll(
            ".quiz-card.unanswered-card",
          );
          if (stillUnanswered.length === 0 && quizWarningBox) {
            quizWarningBox.style.display = "none";
          }
        });
      });

    quizContainer.appendChild(card);
  });

  // Check if user has already completed the quiz earlier
  const savedAttempt = localStorage.getItem(STORAGE_KEY);
  if (savedAttempt) {
    const parsed = JSON.parse(savedAttempt);
    quizResultBox.style.display = "block";
    resultTitle.textContent = `Oled testi juba sooritanud! Esimese katse tulemus: ${parsed.score} / ${quizData.length} (${parsed.percent}%)`;
    resultMessage.textContent =
      "✓ Sinu esimene tulemus on juba statistikasse salvestatud. Võid küsimusi allpool uuesti läbi lahendada, kuid korduskatseid enam tabelisse ei saadeta.";
    lastQuizScoreText = `TAAS 1.0 testi tulemus: ${parsed.score}/${quizData.length} (${parsed.percent}%)`;
  }
}

// Handle quiz submission
if (submitQuizBtn) {
  submitQuizBtn.addEventListener("click", () => {
    let score = 0;
    const unansweredNumbers = [];
    let firstUnansweredCard = null;

    quizData.forEach((item, qIndex) => {
      const card = document.getElementById(`quiz-card-${qIndex}`);
      const selected = document.querySelector(
        `input[name="question-${qIndex}"]:checked`,
      );

      if (!selected) {
        unansweredNumbers.push(qIndex + 1);
        card.classList.add("unanswered-card");
        if (!firstUnansweredCard) {
          firstUnansweredCard = card;
        }
      } else {
        card.classList.remove("unanswered-card");
      }
    });

    if (unansweredNumbers.length > 0) {
      const answeredCount = quizData.length - unansweredNumbers.length;
      if (quizWarningBox) {
        quizWarningBox.style.display = "block";
        quizWarningBox.innerHTML = `⚠ <strong>Palun vasta kõigile küsimustele!</strong> Vastatud: ${answeredCount} / ${quizData.length}. Vastamata küsimused: <strong>#${unansweredNumbers.join(", #")}</strong>.`;
      }

      if (firstUnansweredCard) {
        firstUnansweredCard.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
      return;
    }

    if (quizWarningBox) {
      quizWarningBox.style.display = "none";
    }

    const answerDetailsList = [];

    quizData.forEach((item, qIndex) => {
      const selected = document.querySelector(
        `input[name="question-${qIndex}"]:checked`,
      );
      const userChoice = parseInt(selected.value, 10);
      const expBox = document.getElementById(`exp-q${qIndex}`);

      document
        .querySelectorAll(`input[name="question-${qIndex}"]`)
        .forEach((input) => {
          input.disabled = true;
        });

      const correctLabel = document.getElementById(
        `label-q${qIndex}-o${item.correct}`,
      );
      correctLabel.classList.add("correct-answer");

      if (userChoice === item.correct) {
        score++;
        answerDetailsList.push(`K${qIndex + 1}: Õige`);
        expBox.className = "quiz-explanation show exp-correct";
        expBox.innerHTML = `<strong>✓ Õige vastus!</strong> ${item.explanation}`;
      } else {
        const wrongLabel = document.getElementById(
          `label-q${qIndex}-o${userChoice}`,
        );
        wrongLabel.classList.add("wrong-answer");
        answerDetailsList.push(`K${qIndex + 1}: Vale`);
        expBox.className = "quiz-explanation show exp-wrong";
        expBox.innerHTML = `<strong>✕ Vale vastus.</strong> ${item.explanation}`;
      }
    });

    const percent = Math.round((score / quizData.length) * 100);
    const detailsString = answerDetailsList.join(", ");

    const alreadySubmitted = localStorage.getItem(STORAGE_KEY);

    if (!alreadySubmitted) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          score: score,
          percent: percent,
          date: new Date().toLocaleString("et-EE"),
        }),
      );
      sendResultToGoogleForm(score, percent, detailsString);

      resultTitle.textContent = `Sinu tulemus: ${score} / ${quizData.length} (${percent}%)`;
      resultMessage.textContent =
        "✓ Sinu vastus on edukalt salvestatud projekti statistikasse! " +
        (percent >= 85
          ? "Suurepärane! Tunned TAAS 1.0 standardit väga hästi."
          : "Vaata küsimuste selgitused üle.");
    } else {
      const firstAttempt = JSON.parse(alreadySubmitted);
      resultTitle.textContent = `Korduskatse tulemus: ${score} / ${quizData.length} (${percent}%)`;
      resultMessage.textContent = `ℹ Kuna oled testi juba varem teinud, siis seda korduskatset statistikasse ei saadetud (kirjas on sinu esimene tulemus: ${firstAttempt.score}/${quizData.length}).`;
    }

    lastQuizScoreText = `TAAS 1.0 testi tulemus: ${score}/${quizData.length} (${percent}%)`;

    quizResultBox.style.display = "block";
    resetQuizBtn.style.display = "inline-block";
    submitQuizBtn.style.display = "none";

    quizResultBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
}

// Reset quiz for practice
if (resetQuizBtn) {
  resetQuizBtn.addEventListener("click", () => {
    renderQuiz();
    if (quizWarningBox) quizWarningBox.style.display = "none";
    resetQuizBtn.style.display = "none";
    submitQuizBtn.style.display = "inline-block";
    document.getElementById("test").scrollIntoView({ behavior: "smooth" });
  });
}

// Copy result to clipboard
if (copyQuizResultBtn) {
  copyQuizResultBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(lastQuizScoreText).then(() => {
      const orig = copyQuizResultBtn.textContent;
      copyQuizResultBtn.textContent = "Kopeeritud! ✓";
      setTimeout(() => {
        copyQuizResultBtn.textContent = orig;
      }, 2000);
    });
  });
}

// Initialize quiz on page load
renderQuiz();
