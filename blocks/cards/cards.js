import { createOptimizedPicture } from '../../scripts/aem.js';

// standalone copy of the card block's arrow — cross-block imports aren't allowed, and this is a
// demo foil that shouldn't depend on the card block
const ARROW_PATH = 'M16.5805 11.0058L12.2904 6.71885C11.8904 6.31915 11.8904 5.68961 12.2894 5.2999C12.6794 4.9002 13.3094 4.9002 13.7094 5.2989L19.7094 11.2945C19.9603 11.5388 20.0498 11.8907 19.9778 12.2144C19.9264 12.453 19.789 12.6607 19.6 12.8032L13.6995 18.6992C13.5095 18.8791 13.2495 18.989 12.9895 18.989L12.9995 19C12.7295 19 12.4695 18.8901 12.2895 18.7102C11.8895 18.3205 11.8895 17.681 12.2795 17.2913V17.2813L16.5596 13.0043H5C4.44 13.0043 4 12.5547 4 12.0051C4 11.4455 4.44 11.0058 5 11.0058H16.5805Z';

function arrowSpan() {
  const ns = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(ns, 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'currentColor');
  svg.setAttribute('aria-hidden', 'true');
  const path = document.createElementNS(ns, 'path');
  path.setAttribute('d', ARROW_PATH);
  svg.append(path);
  const span = document.createElement('span');
  span.className = 'cards-card-arrow';
  span.append(svg);
  return span;
}

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
      else div.className = 'cards-card-body';
    });
    const cta = li.querySelector('.cards-card-body a[href]');
    if (cta) {
      const label = cta.textContent.trim();
      if (label) cta.setAttribute('aria-label', label);
      cta.replaceChildren(arrowSpan());
    }
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.replaceChildren(ul);
}
