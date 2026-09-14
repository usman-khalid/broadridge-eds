import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  [...block.children].forEach((row) => {
    const cell = row.firstElementChild;
    if (cell) row.replaceChildren(...cell.childNodes);
    const isMedia = row.querySelector('img') && !row.textContent.trim();
    row.className = isMedia ? 'hero-media' : 'hero-body';
  });
  block.querySelectorAll('.hero-media img').forEach((img) => {
    const current = img.closest('picture') || img;
    current.replaceWith(createOptimizedPicture(img.src, img.alt, true, [{ width: '1600' }]));
  });
}
