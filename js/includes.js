
async function loadHTML(elId, filePath) {
  const el = document.getElementById(elId);
  if (!el) return;                        // 1) Skip if container not on this page
  try {
    const res = await fetch(filePath, { cache: 'force-cache' }); // 2) Use cache
    if (!res.ok) throw new Error(res.status);
    el.innerHTML = await res.text();
  } catch (e) {
    // 3) Fail soft: don't block page
    console.warn(`Include failed: ${filePath}`, e);
  }
}

function initLoadedContent() {
  if (typeof bootstrap !== 'undefined') {
    document.querySelectorAll('.dropdown-toggle').forEach(d => new bootstrap.Dropdown(d));
  }
  setActiveNavigation?.();
}   

function setActiveNavigation() {
  const page = location.pathname.replace(/\/$/, '') || '/';
  document.querySelectorAll('.nav-link').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href')?.replace(/#.*$/, '') === page);
  });
}

// 4) Never gate the spinner on includes; do includes async
document.addEventListener('DOMContentLoaded', () => {
  // Fire-and-forget; don't await
  loadHTML('navbar-container', '/includes/navbar.html');
  loadHTML('footer-container', '/includes/footer.html');
  // Light re-init after next frame
  requestAnimationFrame(initLoadedContent);
});