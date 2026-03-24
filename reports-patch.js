// reports-patch.js — injects Door-Knock and Walk Sheet into Reports dropdown
(function() {
  function injectButtons() {
    // Don't add twice
    if (document.getElementById('rpt-doorknock-btn')) return;

    // Find the dropdown by its known ID
    var dropdown = document.getElementById('nav-rpt-dropdown');
    if (!dropdown) return;

    // Find the rpt-divider that comes before "Campaign Views"
    var target = null;
    var dividers = dropdown.querySelectorAll('.rpt-divider');
    dividers.forEach(function(d) {
      var sib = d.nextElementSibling;
      if (sib && sib.textContent.trim().indexOf('Campaign Views') === 0) {
        target = d;
      }
    });
    if (!target) return;

    // Build Door-Knock button
    var dk = document.createElement('button');
    dk.id        = 'rpt-doorknock-btn';
    dk.className = 'rpt-item';
    dk.setAttribute('role', 'menuitem');
    dk.innerHTML =
      '<span class="rpt-icon">\uD83C\uDFD8\uFE0F</span>' +
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
    ws.id        = 'rpt-walksheet-btn';
    ws.className = 'rpt-item';
    ws.setAttribute('role', 'menuitem');
    ws.innerHTML =
      '<span class="rpt-icon">\uD83D\uDDA8\uFE0F</span>' +
      '<span class="rpt-text">' +
        '<span class="rpt-title">Walk Sheet \u2014 Needs Visit</span>' +
        '<span class="rpt-desc">Printable walk sheet for unvisited &amp; not-home addresses</span>' +
      '</span>' +
      '<span class="rpt-badge rpt-badge-pdf">PDF</span>';
    ws.addEventListener('click', function() {
      if (typeof closeReportsDropdown === 'function') closeReportsDropdown();
      window.location.href = 'walksheet.html';
    });

    // Insert before the divider
    target.parentNode.insertBefore(ws, target);
    target.parentNode.insertBefore(dk, ws);
  }

  // Run after page fully loaded
  window.addEventListener('load', injectButtons);
})();
