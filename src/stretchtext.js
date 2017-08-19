require('./stretchtext.css');

import flow from 'lodash/fp/flow';
import pluck from 'lodash/fp/pluck';
import uniq from 'lodash/fp/uniq';
import map from 'lodash/fp/map';
import find from 'lodash/fp/find';

function StretchText({ content, menu }) {
  // node -> Array[Part]
  const createParts = content =>
    Array.from(content.querySelectorAll('[data-stretchtext]')).map(createPart);

  // container -> createPart([sectionName, container])
  const createPart = container => [container.dataset.stretchtext, container];

  const Section = name => ({ name: name, isVisible: true });

  const extractSections = flow(pluck(0), uniq, map(Section));

  const updateMenu = (container, sections) =>
    (container.innerHTML = sections
      .map(
        section =>
          `<div>
              <input type="checkbox" id="stretchtext-${section.name}" ${section.isVisible
            ? 'checked="checked"'
            : ''} name="stretchtext-${section.name}" value="${section.name}">
              <label for="stretchtext-${section.name}">${section.name}</label>
          </div>
            `
      )
      .join('\n'));

  const attachMenuHandler = (container, handler) =>
    container
      .querySelectorAll('input')
      .forEach(input => (input.onchange = handler));

  const displayParts = (parts, section, isVisible) =>
    parts
      .filter(([partSection]) => partSection === section.name)
      .forEach(([partSection, partContainer]) =>
        display(isVisible, partContainer)
      );

  const setSectionVisibility = isVisible => parts => section => {
    section.isVisible = isVisible;
    displayParts(parts, section, isVisible);
  };

  const display = (isVisible, element) => {
    element.dataset.stretchtextdisplay =
      element.dataset.stretchtextdisplay ||
      window.getComputedStyle(element).display;

    element.style.display = isVisible
      ? element.dataset.stretchtextdisplay
      : 'none';
  };

  // [[{String:sectionName}, {DomElement:element}], ...]
  const parts = createParts(content);

  // [{Section}, ...]
  const sections = extractSections(parts);

  const and = (fa, fb) => a => {
    f(a);
    fb();
  };

  const hideSection = section => {
    setSectionVisibility(false)(parts)(section);
    updateMenu(menu, sections);
  };
  const showSection = section => {
    setSectionVisibility(true)(parts)(section);
    updateMenu(menu, sections);
  };

  // hide all sections (this will also trigger a menu render)
  sections.forEach(hideSection);

  // attach event handles to each menu section
  const onStretchTextChange = parts => e =>
    setSectionVisibility(e.target.checked)(parts)(
      find({ name: e.target.value }, sections)
    );

  attachMenuHandler(menu, onStretchTextChange(parts));

  return {
    hideSection: sectionName =>
      hideSection(find({ name: sectionName }, sections)),
    showSection: sectionName =>
      showSection(find({ name: sectionName }, sections)),
  };
}

window.StretchText = StretchText;
