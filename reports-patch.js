// reports-patch.js — adds Door-Knock and Walk Sheet links to the nav bar
(function() {
  function addNavLinks() {
    // Find the nav links list
    var navLinks = document.querySelector('nav .nav-links');
    if (!navLinks) return;

    // Don't add twice
    if (document.getElementById('nav-doorknock')) return;

    var dk = document.createElement('li');
    dk.innerHTML = '<a href="doorknock.html" id="nav-doorknock" style="color:#f4a460;font-weight:700">🏘️ Door-Knock</a>';

    var ws = document.createElement('li');
    ws.innerHTML = '<a href="walksheet.html" id="nav-walksheet" style="color:#74c69d;font-weight:700">🖨️ Walk Sheet</a>';

    navLinks.appendChild(dk);
    navLinks.appendChild(ws);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addNavLinks);
  } else {
    addNavLinks();
  }
})();
