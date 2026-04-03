// ── COUNTDOWN TIMERS ──────────────────────────────────────────
function padZ(n) { return String(n).padStart(2, '0'); }

// Summer Glow countdown (4 days 14h 48m 18s from now)
const target = new Date(Date.now() + (4 * 86400 + 14 * 3600 + 48 * 60 + 18) * 1000);
function updateSummerCountdown() {
  const diff = target - Date.now();
  if (diff <= 0) return;
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  document.getElementById('sb-d').textContent = padZ(d);
  document.getElementById('sb-h').textContent = padZ(h);
  document.getElementById('sb-m').textContent = padZ(m);
  document.getElementById('sb-s').textContent = padZ(s);
}
setInterval(updateSummerCountdown, 1000);
updateSummerCountdown();

// Product card countdown (display only — static)
let cdSec = 25;
setInterval(() => {
  cdSec--;
  if (cdSec < 0) { cdSec = 59; }
  const el = document.getElementById('cd1-s');
  // Target only the text node after the label span, not the full element
  // (setting textContent would wipe the .cd-label child span)
  if (el) {
    const textNode = [...el.childNodes].find(n => n.nodeType === Node.TEXT_NODE);
    if (textNode) textNode.textContent = padZ(cdSec);
  }
}, 1000);

// ── TESTIMONIALS ──────────────────────────────────────────────
const testimonials = [
  { name: 'Bessie Cooper', role: 'Happy Customer', quote: '"The Best Thing I\'ve Used for My Skin!"', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.' },
  { name: 'Sarah Mitchell', role: 'Verified Buyer', quote: '"Absolutely Love This Brand!"', text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.' },
  { name: 'Emma Johnson', role: 'Regular Customer', quote: '"My Skin Has Never Looked Better!"', text: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa ab illo inventore.' },
  { name: 'Olivia Brown', role: 'Beauty Enthusiast', quote: '"Premium Quality Products!"', text: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores quas molestias.' },
  { name: 'Mia Davis', role: 'Loyal Customer', quote: '"Will Definitely Order Again!"', text: 'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda.' },
];
let tIdx = 0;
const avatars = document.querySelectorAll('.testimonial-avatars img');
const tText = document.getElementById('testimonialText');
function showTestimonial(i) {
  tIdx = (i + testimonials.length) % testimonials.length;
  const t = testimonials[tIdx];
  tText.innerHTML = `
    <h4>${t.quote}</h4>
    <p>${t.text}</p>
    <div class="stars my-2">
      <i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i>
      <strong>5.0</strong>
    </div>
    <div class="fw-600 mt-1" style="font-weight:600;">${t.name}</div>
    <div class="text-muted" style="font-size:.8rem;">${t.role}</div>
  `;
  avatars.forEach((a, idx) => a.classList.toggle('active', idx === tIdx));
}
document.getElementById('tPrev').addEventListener('click', () => showTestimonial(tIdx - 1));
document.getElementById('tNext').addEventListener('click', () => showTestimonial(tIdx + 1));
avatars.forEach((a) => a.addEventListener('click', () => showTestimonial(parseInt(a.dataset.idx))));

// ── PRODUCT TABS ──────────────────────────────────────────────
document.querySelectorAll('.product-tabs .nav-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    document.querySelectorAll('.product-tabs .nav-link').forEach(l => l.classList.remove('active'));
    link.classList.add('active');
  });
});

// ── WISHLIST / CART TOGGLE ────────────────────────────────────
document.querySelectorAll('.action-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    const icon = this.querySelector('i');
    if (icon && icon.classList.contains('bi-heart')) {
      icon.classList.toggle('bi-heart');
      icon.classList.toggle('bi-heart-fill');
      icon.style.color = icon.classList.contains('bi-heart-fill') ? '#e74c3c' : '';
    }
  });
});
