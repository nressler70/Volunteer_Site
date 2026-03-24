// reports-patch.js — injects Door-Knock and Walk Sheet into Reports dropdown
(function() {
  function injectButtons() {
    if (document.getElementById('rpt-doorknock-btn')) return;

    var dropdown = document.getElementById('nav-rpt-dropdown');
    if (!dropdown) return;

    // Find the GA button and insert after it
    var gaBtn = null;
    dropdown.querySelectorAll('.rpt-item').forEach(function(btn) {
      if (btn.textContent.indexOf('GA') !== -1 && btn.textContent.indexOf('Analytics') !== -1) {
        gaBtn = btn;
      }
    });
    if (!gaBtn) return;

    // Build Door-Knock button
    var dk = document.createElement('button');
    dk.id = 'rpt-doorknock-btn';
    dk.className = 'rpt-item';
    dk.setAttribute('role', 'menuitem');
    dk.innerHTML =
      '<span class="rpt-icon">&#x1F3D8;</span>' +
      '<span class="rpt-text">' +
        '<span class="rpt-title">Door-Knock Street Report</span>' +
        '<span class="rpt-desc">View canvass responses street by street</span>' +
      '</span>' +
      '<span class="rpt-badge rpt-badge-view">VIEW</span>';
    dk.addEventListener('click', function() {
      if (typeof closeReportsDropdown === 'function') closeReportsDropdown();
      window.location.href = 'doorknock.html';
    });

    // Build Walk Sheet button
    var ws = document.createElement('button');
    ws.id = 'rpt-walksheet-btn';
    ws.className = 'rpt-item';
    ws.setAttribute('role', 'menuitem');
    ws.innerHTML =
      '<span class="rpt-icon">&#x1F5A8;</span>' +
      '<span class="rpt-text">' +
        '<span class="rpt-title">Walk Sheet &#x2014; Needs Visit</span>' +
        '<span class="rpt-desc">Printable walk sheet for unvisited &amp; not-home addresses</span>' +
      '</span>' +
      '<span class="rpt-badge rpt-badge-pdf">PDF</span>';
    ws.addEventListener('click', function() {
      if (typeof closeReportsDropdown === 'function') closeReportsDropdown();
      window.location.href = 'walksheet.html';
    });

    // Insert after the GA button
    gaBtn.insertAdjacentElement('afterend', ws);
    gaBtn.insertAdjacentElement('afterend', dk);
  }

  // Try immediately, then keep retrying every 500ms until it works
  // This handles the password gate delay
  var attempts = 0;
  var timer = setInterval(function() {
    injectButtons();
    attempts++;
    if (document.getElementById('rpt-doorknock-btn') || attempts > 20) {
      clearInterval(timer);
    }
  }, 500);
})();
