const controls = document.querySelector('.work-controls');
const filterButtons = [...document.querySelectorAll('[data-filter]')];
const cards = [...document.querySelectorAll('.project-card')];
const count = document.querySelector('.project-count');

if (controls && cards.length) {
  controls.hidden = false;
  for (const button of filterButtons) {
    button.addEventListener('click', () => {
      const value = button.dataset.filter;
      let visible = 0;
      for (const card of cards) {
        const show = value === 'all' || card.dataset.category === value;
        card.hidden = !show;
        if (show) visible += 1;
      }
      for (const item of filterButtons) item.setAttribute('aria-pressed', String(item === button));
      count.textContent = `${visible} ${document.body.dataset.countLabel}`;
    });
  }
}

// Keep an incoming project link reachable, including after changing filters.
function revealLinkedProject() {
  let id;
  try {
    id = decodeURIComponent(location.hash.slice(1));
  } catch {
    return;
  }
  const card = cards.find(item => item.id === id);
  if (!card) return;
  filterButtons.find(button => button.dataset.filter === 'all')?.click();
  card.querySelector('details').open = true;
  card.scrollIntoView({behavior:'instant',block:'start'});
}
window.addEventListener('hashchange', revealLinkedProject);
if (location.hash) revealLinkedProject();

const copyButton = document.querySelector('.copy-email');
if (copyButton && navigator.clipboard && window.isSecureContext) {
  copyButton.hidden = false;
  copyButton.addEventListener('click', async () => {
    const status = document.querySelector('.copy-status');
    try {
      await navigator.clipboard.writeText(copyButton.dataset.email);
      status.textContent = document.body.dataset.copySuccess;
    } catch {
      status.textContent = document.body.dataset.copyFailed;
    }
  });
}
