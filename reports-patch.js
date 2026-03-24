// reports-patch.js
// Adds Door-Knock and Walk Sheet buttons to the Reports dropdown
// without modifying index.html

(function() {
  function injectButtons() {
    // Find the Campaign Views divider — insert our buttons just before it
    var dividers = document.querySelectorAll('.rpt-divider');
    var target = null;

    dividers.forEach(function(d) {
      var next = d.nextElementSibling;
      if (next && next.textContent.indexOf('Campaign Views') !== -1) {
        target = d;
      }
    });

    if (!target) return; // dropdown not found yet

    // Don't add twice
    if (document.getElementById('rpt-doorknock-btn')) return;

    var dk = document.createElement('button');
    dk.id = 'rpt-doorknock-btn';
    dk.className = 'rpt-item';
    dk.setAttribute('role', 'menuitem');
    dk.innerHTML =
      '<span class="rpt-icon">🏘️</span>' +
      '<span class="rpt-text">' +
        '<span class="rpt-title">Door-Knock Street Report</span>' +
        '<span class="rpt-desc">View canvass responses street by street</span>' +
      '</span>' +
      '<span class="rpt-badge rpt-badge-view">VIEW</span>';
    dk.addEventListener('click', function() {
      if (typeof closeReportsDropdown === 'function') closeReportsDropdown();
      window.location.href = 'doorknock.html';
    });

    var ws = document.createElement('button');
    ws.id = 'rpt-walksheet-btn';
    ws.className = 'rpt-item';
    ws.setAttribute('role', 'menuitem');
    ws.innerHTML =
      '<span class="rpt-icon">🖨️</span>' +
      '<span class="rpt-text">' +
        '<span class="rpt-title">Walk Sheet — Needs Visit</span>' +
        '<span class="rpt-desc">Printable walk sheet for unvisited &amp; not-home addresses</span>' +
      '</span>' +
      '<span class="rpt-badge rpt-badge-pdf">PDF</span>';
    ws.addEventListener('click', function() {
      if (typeof closeReportsDropdown === 'function') closeReportsDropdown();
      window.location.href = 'walksheet.html';
    });

    // Insert both buttons before the divider
    target.parentNode.insertBefore(ws, target);
    target.parentNode.insertBefore(dk, ws);
  }

  // Run after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectButtons);
  } else {
    injectButtons();
  }
})();
