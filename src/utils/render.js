import {RenderPosition} from "../const";

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const render = (container, component, place = RenderPosition.BEFORE_END) => {
  switch (place) {
    case RenderPosition.AFTER_BEGIN:
      container.prepend(component.getElement());
      break;
    case RenderPosition.BEFORE_END:
      container.append(component.getElement());
      break;
  }
};

export const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};

export const replace = (newComponent, oldComponent) => {
  const newElement = newComponent.getElement();
  const oldElement = oldComponent.getElement();
  if (!oldElement) {
    return;
  }
  const parentElement = oldComponent.getElement().parentElement;
  if (parentElement) {
    parentElement.replaceChild(newElement, oldElement);
  }
};
