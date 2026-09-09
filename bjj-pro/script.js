// A small data model keeps the schedule and its filters in sync.
const classes = [
  { day: 'Monday', time: '18:00–19:00', name: 'No Gi', level: 'Beginner' },
  { day: 'Tuesday', time: '19:00–20:00', name: 'Gi', level: 'Advanced' },
  { day: 'Wednesday', time: '18:00–19:00', name: 'Open Mat', level: 'All levels' },
  { day: 'Thursday', time: '19:00–20:00', name: 'Gi', level: 'Advanced' },
  { day: 'Friday', time: '18:00–19:00', name: 'Open Mat', level: 'All levels' },
  { day: 'Saturday', time: '10:00–11:00', name: 'Gi', level: 'Advanced' }
];
const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() {
  menu.setAttribute('aria-expanded', 'false');
  menu.setAttribute('aria-label', 'Open menu');
  navigation.classList.remove('is-open');
}
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  navigation.classList.toggle('is-open', open);
});
navigation.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') { closeMenu(); menu.focus(); }
});
window.matchMedia('(min-width: 781px)').addEventListener('change', closeMenu);
function renderSchedule(filter = 'All') {
  const shown = classes.filter(item => filter === 'All' || item.name === filter || item.level === filter);
  document.querySelector('#schedule-list').innerHTML = shown.map(item => `
    <div class="schedule-row">
      <span class="schedule-day">${item.day}</span><span class="schedule-time">${item.time}</span>
      <span class="schedule-class">${item.name}</span><span class="level ${item.level === 'Beginner' ? 'beginner' : ''}">${item.level}</span>
      <a href="#contact" data-session="${item.day} · ${item.time} · ${item.name}" aria-label="Plan a ${item.day} ${item.name} session">↗</a>
    </div>`).join('');
  document.querySelectorAll('[data-filter]').forEach(button => {
    const selected = button.dataset.filter === filter;
    button.classList.toggle('active', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
  document.querySelector('#filter-status').textContent = `${shown.length} ${filter === 'All' ? '' : filter + ' '}classes shown. Sunday closed.`;
}
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => renderSchedule(button.dataset.filter)));
document.querySelectorAll('[data-program]').forEach(link => link.addEventListener('click', () => renderSchedule(link.dataset.program)));
const sessionSelect = document.querySelector('#session');
function selectSession(value) {
  if (![...sessionSelect.options].some(option => option.value === value)) sessionSelect.add(new Option(value, value));
  sessionSelect.value = value;
  document.querySelector('#trial-result').hidden = true;
}
document.querySelector('#schedule-list').addEventListener('click', event => {
  const link = event.target.closest('[data-session]');
  if (link) selectSession(link.dataset.session);
});
document.querySelector('#trial-form').addEventListener('submit', event => {
  event.preventDefault();
  const result = document.querySelector('#trial-result');
  const firstTime = document.querySelector('#experience').value === 'new';
  result.replaceChildren();
  const heading = document.createElement('strong');
  heading.textContent = sessionSelect.value;
  const message = document.createElement('p');
  message.textContent = firstTime ? 'Arrive 15 minutes early, bring water and clean sportswear, and let the coach know it’s your first visit. Contact the academy to confirm the session and any kit you need.' : 'Bring water and your training kit. Contact the academy to confirm availability and the best session for your experience.';
  const link = document.createElement('a');
  link.textContent = 'Email the academy to confirm ↗';
  link.href = `mailto:info@focusbjj.com?subject=${encodeURIComponent('Trial class enquiry')}&body=${encodeURIComponent('Hello Focus BJJ,\nI am interested in ' + sessionSelect.value + '. Please could you confirm availability and what I should bring?')}`;
  result.append(heading, message, link);
  result.hidden = false;
});
document.querySelectorAll('#trial-form select').forEach(select => select.addEventListener('change', () => { document.querySelector('#trial-result').hidden = true; }));
document.querySelector('#year').textContent = new Date().getFullYear();
renderSchedule();
