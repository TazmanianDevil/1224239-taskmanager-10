import {getMainMenuTemplate} from "./components/main-menu";
import {getFiltersTemplate} from "./components/filters";
import {getTaskListTemplate} from "./components/task-list";
import {getTaskCardTemplate} from "./components/task-card";
import {getTaskEditTemplate} from "./components/task-edit";

const TASK_COUNT = 3;

const getLoadMoreButtonTemplate = () => {
  return (
    `<button class="load-more" type="button">load more</button>`
  );
};

const render = (container, element, place = `beforeend`) => {
  return container.insertAdjacentHTML(place, element);
};

const headerSiteElement = document.querySelector(`.main__control`);

render(headerSiteElement, getMainMenuTemplate());

const mainSiteElement = document.querySelector(`.main`);

render(mainSiteElement, getFiltersTemplate());
render(mainSiteElement, getTaskListTemplate());

const taskListElement = document.querySelector(`.board__tasks`);
render(taskListElement, getTaskEditTemplate());
for (let i = 0; i < TASK_COUNT; i++) {
  render(taskListElement, getTaskCardTemplate());
}

render(mainSiteElement, getLoadMoreButtonTemplate());
