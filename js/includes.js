// /js/includes.js
async function loadHTML(id, path) {
  const el = document.getElementById(id);
  if (!el) return; // skip if container not on this page
  try {
    const res = await fetch(path, { cache: 'force-cache' });
    if (!res.ok) throw new Error(res.status);
    el.innerHTML = await res.text();
  } catch (e) {
    console.warn('Include failed:', path, e);
  }
}

function initLoadedContent() {
  if (window.bootstrap) {
    document.querySelectorAll('.dropdown-toggle').forEach(d => new bootstrap.Dropdown(d));
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // fire-and-forget; don't await
  loadHTML('navbar-container', '/includes/navbar.html');
  loadHTML('footer-container', '/includes/footer.html');
  requestAnimationFrame(initLoadedContent);
});
