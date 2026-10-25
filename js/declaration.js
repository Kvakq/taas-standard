// =========================================
// AI USAGE DECLARATION GENERATOR (ANNEX B)
// =========================================

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

const declOutput = document.getElementById("decl-output");
const copyDeclBtn = document.getElementById("copy-decl-btn");

function updateDeclarationPreview() {
  if (!declOutput) return;

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

  const today = new Date().toLocaleDateString("et-EE");

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
}

declInputs.forEach((id) => {
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
