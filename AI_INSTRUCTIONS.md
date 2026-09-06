# 🩺 Sökorsak - Instruktioner för AI / Vidareutveckling

Detta dokument är en guide för framtida AI-assistenter och utvecklare som arbetar vidare på detta projekt.

---

## 🎯 Projektets syfte
Ett **Print-on-Demand**-verktyg i ren HTML/CSS/JS för **läkare** (akutmottagning och primärvård).
Syftet är att snabbt välja en sökorsak i webbläsaren och skriva ut en **A4-pappersmall** med relevanta stödord, bockrutor `[ ]` och skrivlinjer för att föra handskrivna journalanteckningar under patientmötet.

* **GitHub Repository:** `https://github.com/johannespaulsson/sokorsak`
* **Live GitHub Pages:** `https://johannespaulsson.github.io/sokorsak/`

---

## 📐 Hårda design- och formateringsregler (FÅR EJ BRYTAS)

1. **Strikt 1 A4-sida per mall:**
   * Varje mall **MÅSTE** få plats på **exakt 1 A4-sida** vid utskrift. Det får aldrig spilla över på en sida 2.
   * CSS använder `@page { size: A4 portrait; margin: 4mm 6mm 4mm 6mm; }` och `.a4-sheet { max-height: 289mm; overflow: hidden; page-break-inside: avoid; }`.
   * Undvik onödiga tomrum/glipor genom att använda jämna `gap: 3.5px` och fylla ut med faktiska skrivrader (`.line` ca 18–20px höjd med `#64748b` linjefärg).

2. **Inga externa källhänvisningar / referenser:**
   * Skriv **ALDRIG** ut källor som *"Internetmedicin"*, *"Akutboken"*, *"s. 40–41"* etc. på bladen eller i UI.

3. **Inga läkar- / signaturfält:**
   * Patienthuvudet har endast: **Patient / Pnr**, **Ålder / Kön**, **Datum / Tid**.
   * Det finns **ingen sidfot** och inget "Signatur / Läkare"-fält.

4. **"SKRIV TYDLIGT!" i rubriken:**
   * Varje mall ska ha `— SKRIV TYDLIGT!` i rött (`.header-sub`) i sidhuvudet bredvid diagnosen, t.ex:
     `<h2>BRÖSTSMÄRTA <span class="header-sub">— SKRIV TYDLIGT!</span></h2>`

5. **Standardiserat mittenblock (Ruta 3–6) – Identiskt över ALLA mallar:**
   * **Ruta 3 (Tidigare sjukdomar & Operationer):** Fast bas med 12 bockrutor:
     `[ ] Hypertoni` `[ ] Diabetes` `[ ] Hjärt-kärlsjd` `[ ] Hjärtsvikt` `[ ] Flimmer/Arytmi` `[ ] Stroke/TIA` `[ ] KOL/Astma` `[ ] Njur-/Leversjd` `[ ] Malignitet` `[ ] VTE/Trombos` `[ ] Ulcus/GI` `[ ] Hereditet` + **3 skrivrader**.
   * **Ruta 4 (Aktuella läkemedel):** **6 rena skrivrader**.
   * **Ruta 5 (Tobak, Alkohol & Socialt):** 4 fasta rader:
     * *Tobak:* `[ ] Icke [ ] Tid. [ ] Aktiv (pkt-år: __)`
     * *Alkohol:* `[ ] Nykter [ ] Måttlig [ ] Riskbruk`
     * *Socialt:* `[ ] Eget boende [ ] SÄBO [ ] Hemtjänst`
     * *Övrigt:* `[ ] Yrkesarb. [ ] Sjukskr./Pens. [ ] Droger`
   * **Ruta 6 (Allergier & CAVE):** CAVE-cue + **3 skrivrader**.

6. **Utredning & Prover (Sektion 5):**
   * Lab-delen ska alltid innehålla ett sista fält: `[ ] Övrigt:` med en liten inline skrivlinje för handskrift.

7. **Sökorsaksspecifika risker placeras i Sektion 2:**
   * Specifika diagnosrisker (t.ex. känd angina/PCI vid bröstsmärta, känd migrän vid huvudvärk, känd BPPV vid yrsel) ska placeras i **Sektion 2 (Associerade symtom & Röda flaggor)** så att mittenblocket förblir helt enhetligt.

8. **Git & Push-policy:**
   * Pusha **INTE** automatiskt till GitHub efter varje småändring. Fråga först eller vänta tills användaren ber om en push.

---

## 📑 Befintliga mallar i projektet

| Mall-ID | Namn i dropdown | Nyckelinnehåll |
| :--- | :--- | :--- |
| `sheet-brostsmarta` | **Bröstsmärta (OPQRST)** | OPQRST-rader, kardiella associerade symtom, status med Cor/Pulm/Thoraxpalpation, kardiell utredning & AKS-diffar. |
| `sheet-yrsel` | **Yrsel (HINTS & Neuro)** | Karaktär/duration/utlösande, HINTS (HI, Nystagmus, Test of Skew), Dix-Hallpike, lillhjärnestatus, BPPV/stroke-diffar. |
| `sheet-huvudvark` | **Huvudvärk (SOCRATES)** | Åskknall/akut debut, nackstyvhet, temporalisarterit (SR/palpation), LP/CT-utredning, SAB/meningit/migrän-diffar. |
| `sheet-generell` | **Generell / Akut (ABCDE)** | Öppen anamnes (8 rader), bred symtomchecklista, status enligt **A, B, C, D, E**, allmän akut lab/rtg. |

---

## 🛠 Filstruktur och arkitektur

* `index.html`: Innehåller top control bar (`.no-print`) med dropdown samt alla `<article class="a4-sheet template-sheet">`-ark. Dolda ark har klassen `.hidden`.
* `style.css`: Hanterar layout, A4-mått (210x297mm), responsiv skärmvisning samt strikta `@media print`-regler (`.hidden { display: none !important; }`).
* `app.js`: Enkel JS som lyssnar på `#templateSelect` och växlar mellan mallarna genom att ta bort/lägga till `.hidden`. Stödjer även `Ctrl + P`.

---

## ➕ Hur man lägger till en ny sökorsaksmall

1. Öppna `index.html` och lägg till ett nytt `<option value="ny_sokorsak">` i `#templateSelect`.
2. Kopiera strukturen från en befintlig `<article class="a4-sheet template-sheet hidden" id="sheet-ny_sokorsak">`.
3. Behåll sidhuvudet med `— SKRIV TYDLIGT!`, de standardiserade 4 bakgrundsrutorna (Sektion 3) och de 6 bedömningsraderna (Sektion 6).
4. Anpassa Sektion 1 (Symptomanalys), Sektion 2 (Associerade symtom & Röda flaggor), Sektion 4 (Status) och Sektion 5 (Utredning & Prover).
5. Lägg till ID:t i `app.js` under `sheets`-objektet:
   ```javascript
   const sheets = {
     brostsmarta: document.getElementById('sheet-brostsmarta'),
     yrsel: document.getElementById('sheet-yrsel'),
     huvudvark: document.getElementById('sheet-huvudvark'),
     generell: document.getElementById('sheet-generell'),
     ny_sokorsak: document.getElementById('sheet-ny_sokorsak')
   };
   ```
6. Kontrollera alltid att mallen passar på **exakt 1 A4-sida** (`Ctrl + P`).
