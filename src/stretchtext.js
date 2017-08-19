require('./stretchtext.css');

import flow from 'lodash/fp/flow';
import pluck from 'lodash/fp/pluck';
import uniq from 'lodash/fp/uniq';

function StretchText({ content, menu }) {
  // node -> Array[Part]
  const createParts = content =>
    Array.from(content.querySelectorAll('[data-stretchtext]')).map(createPart);

  // container -> createPart([sectionName, container])
  const createPart = container => [container.dataset.stretchtext, container];

  const extractSections = flow(pluck(0), uniq);

  const createMenu = (container, sections) =>
    (container.innerHTML = sections
      .map(
        section =>
          `<div>
              <input type="checkbox" id="stretchtext-${section}" name="stretchtext-${section}" value="${section}">
              <label for="stretchtext-${section}">${section}</label>
          </div>
            `
      )
      .join('\n'));

  const attachMenuHandler = (container, handler) =>
    container
      .querySelectorAll('input')
      .forEach(input => (input.onchange = handler));

  const onStretchTextChange = parts => e =>
    displayParts(parts, e.target.value, e.target.checked);

  const displayParts = (parts, section, isVisible) =>
    parts
      .filter(([partSection]) => partSection === section)
      .forEach(([partSection, partContainer]) =>
        display(isVisible, partContainer)
      );

  const hideSection = parts => section => displayParts(parts, section, false);

  const display = (isVisible, element) => {
    element.dataset.stretchtextdisplay =
      element.dataset.stretchtextdisplay ||
      window.getComputedStyle(element).display;

    element.style.display = isVisible
      ? element.dataset.stretchtextdisplay
      : 'none';
  };

  const parts = createParts(content);
  const sections = extractSections(parts);

  // init menu
  createMenu(menu, sections);

  // hide all sections
  sections.forEach(hideSection(parts));

  // attach event handles to each menu section
  attachMenuHandler(menu, onStretchTextChange(parts));
}

window.StretchText = StretchText;
