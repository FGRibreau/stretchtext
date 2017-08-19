require('./stretchtext.css');

import flow from 'lodash/fp/flow';
import pluck from 'lodash/fp/pluck';
import uniq from 'lodash/fp/uniq';
import map from 'lodash/fp/map';
import find from 'lodash/fp/find';

import { bind, wire } from 'hyperhtml';

function StretchText({ content, menu }) {
  // node -> Array[Part]
  const createParts = content =>
    Array.from(content.querySelectorAll('[data-stretchtext]')).map(createPart);

  // container -> createPart([sectionName, container])
  const createPart = container => [container.dataset.stretchtext, container];

  const Section = name => ({ name: name, isVisible: true });

  const extractSections = flow(pluck(0), uniq, map(Section));

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

  // attach event handles to each menu section (/!\ wrap `parts`)
  const onStretchTextChange = e =>
    setSectionVisibility(e.target.checked)(parts)(
      find({ name: e.target.value }, sections)
    );

  const updateMenu = (container, sections) =>
    bind(container)`${sections.map(
      section =>
        wire(section)`<div>
          <input onchange=${onStretchTextChange} checked=${section.isVisible}
            type=checkbox value=${section.name} id=${'stretchtext-' +
          section.name} />
          <label for=${'stretchtext-' + section.name} >${section.name}</label>
      </div>`
    )}`;

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

  return {
    hideSection: sectionName =>
      hideSection(find({ name: sectionName }, sections)),
    showSection: sectionName =>
      showSection(find({ name: sectionName }, sections)),
  };
}

window.StretchText = StretchText;
