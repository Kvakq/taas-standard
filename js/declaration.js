// =========================================
// AI USAGE DECLARATION GENERATOR (ANNEX B)
// =========================================

let currentMode = "student";

const declInputs = [
  "decl-name",
  "decl-course",
  "decl-work",
  "decl-level",
  "decl-tools",
  "decl-purpose",
  "decl-impact",
  "check-1",
  "check-2",
  "check-3",
];

const profInputs = [
  "prof-course",
  "prof-task",
  "prof-level",
  "prof-conditions",
];

const declOutput = document.getElementById("decl-output");
const copyDeclBtn = document.getElementById("copy-decl-btn");
const previewHeaderTitle = document.getElementById("preview-header-title");

const tabStudent = document.getElementById("tab-student");
const tabProfessor = document.getElementById("tab-professor");
const studentWrapper = document.getElementById("student-form-wrapper");
const professorWrapper = document.getElementById("professor-form-wrapper");

if (tabStudent && tabProfessor) {
  tabStudent.addEventListener("click", () => {
    currentMode = "student";
    studentWrapper.style.display = "block";
    professorWrapper.style.display = "none";

    tabStudent.style.background = "#111827";
    tabStudent.style.color = "#ffffff";
    tabStudent.style.borderColor = "#111827";
    tabStudent.style.fontWeight = "600";

    tabProfessor.style.background = "#f3f4f6";
    tabProfessor.style.color = "#374151";
    tabProfessor.style.borderColor = "#d1d5db";
    tabProfessor.style.fontWeight = "500";

    if (previewHeaderTitle) {
      previewHeaderTitle.textContent = "Valmis deklaratsiooni tekst";
    }
    updateDeclarationPreview();
  });

  tabProfessor.addEventListener("click", () => {
    currentMode = "professor";
    studentWrapper.style.display = "none";
    professorWrapper.style.display = "block";

    tabProfessor.style.background = "#111827";
    tabProfessor.style.color = "#ffffff";
    tabProfessor.style.borderColor = "#111827";
    tabProfessor.style.fontWeight = "600";

    tabStudent.style.background = "#f3f4f6";
    tabStudent.style.color = "#374151";
    tabStudent.style.borderColor = "#d1d5db";
    tabStudent.style.fontWeight = "500";

    if (previewHeaderTitle) {
      previewHeaderTitle.textContent = "Valmis õppejõu deklaratsioon";
    }
    updateDeclarationPreview();
  });
}

function updateDeclarationPreview() {
  if (!declOutput) return;

  const today = new Date().toLocaleDateString("et-EE");

  if (currentMode === "student") {
    const name =
      document.getElementById("decl-name").value.trim() || "[Õppija nimi]";
    const course =
      document.getElementById("decl-course").value.trim() ||
      "[Õppeaine / kursus]";
    const work =
      document.getElementById("decl-work").value.trim() || "[Töö nimetus]";
    const level = document.getElementById("decl-level").value;
    const tools =
      document.getElementById("decl-tools").value.trim() ||
      "[Märgi kasutatud AI tööriistad]";
    const purpose =
      document.getElementById("decl-purpose").value.trim() ||
      "[Märgi kasutuse eesmärk]";
    const impact =
      document.getElementById("decl-impact").value.trim() ||
      "[Märgi mõjutatud töö osa]";

    const c1 = document.getElementById("check-1").checked ? "☑" : "☐";
    const c2 = document.getElementById("check-2").checked ? "☑" : "☐";
    const c3 = document.getElementById("check-3").checked ? "☑" : "☐";

    declOutput.textContent = `AI KASUTUSE DEKLARATSIOON (TAAS 1.0 – Lisa B)
Õppija nimi: ${name}
Õppeaine / kursus: ${course}
Töö nimetus: ${work}
AI kasutustase: ${level}
Kuupäev: ${today}

1. Milliseid AI tööriistu kasutasid?
${tools}

2. Milleks AI-d kasutasid?
${purpose}

3. Millist osa tööst AI sisuliselt mõjutas?
${impact}

4. Kinnitus:
${c1} Olen AI loodud faktilised väited ja viited kontrollinud.
${c2} Suudan selgitada ja kaitsta kogu esitatud töö sisu.
${c3} AI kasutus vastas ülesandele määratud tasemele.`;
  } else {
    const course =
      document.getElementById("prof-course").value.trim() ||
      "[Õppeaine nimetus]";
    const task =
      document.getElementById("prof-task").value.trim() || "[Ülesande nimetus]";
    const level = document.getElementById("prof-level").value;
    const conditions =
      document.getElementById("prof-conditions").value.trim() ||
      "Täiendavad eritingimused puuduvad.";

    declOutput.textContent = `ÕPPEJÕU AI KASUTUSE DEKLARATSIOON (TAAS 1.0)
Õppeaine: ${course}
Ülesanne: ${task}
Lubatud AI kasutustase: ${level}
Lisatingimused: ${conditions}
Kuupäev: ${today}`;
  }
}

declInputs.forEach((id) => {
  const el = document.getElementById(id);
  if (el) {
    el.addEventListener("input", updateDeclarationPreview);
    el.addEventListener("change", updateDeclarationPreview);
  }
});

profInputs.forEach((id) => {
  const el = document.getElementById(id);
  if (el) {
    el.addEventListener("input", updateDeclarationPreview);
    el.addEventListener("change", updateDeclarationPreview);
  }
});

if (copyDeclBtn) {
  copyDeclBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(declOutput.textContent).then(() => {
      const originalText = copyDeclBtn.textContent;
      copyDeclBtn.textContent = "Kopeeritud! ✓";
      setTimeout(() => {
        copyDeclBtn.textContent = originalText;
      }, 2000);
    });
  });
}

// Initialize preview on page load
updateDeclarationPreview();
