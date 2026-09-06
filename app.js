// Sökorsak Print-on-Demand
document.addEventListener('DOMContentLoaded', () => {
  const templateSelect = document.getElementById('templateSelect');

  // Snabbkommando för utskrift
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
      window.print();
    }
  });

  if (templateSelect) {
    templateSelect.addEventListener('change', (e) => {
      const val = e.target.value;
      console.log('Vald sökorsak:', val);
      // Förberedd för att dynamiskt ladda fler mallar framöver
    });
  }
});
