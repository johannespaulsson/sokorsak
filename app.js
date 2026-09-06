// Sökorsak Print-on-Demand
document.addEventListener('DOMContentLoaded', () => {
  const templateSelect = document.getElementById('templateSelect');
  const sheets = {
    brostsmarta: document.getElementById('sheet-brostsmarta'),
    generell: document.getElementById('sheet-generell')
  };

  function switchTemplate(templateKey) {
    Object.keys(sheets).forEach(key => {
      const sheet = sheets[key];
      if (sheet) {
        if (key === templateKey) {
          sheet.classList.remove('hidden');
        } else {
          sheet.classList.add('hidden');
        }
      }
    });
  }

  if (templateSelect) {
    templateSelect.addEventListener('change', (e) => {
      switchTemplate(e.target.value);
    });
  }

  // Snabbkommando Ctrl+P
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
      window.print();
    }
  });
});
