import {getMainMenuTemplate} from "./components/main-menu";
import {getFiltersTemplate} from "./components/filters";
import {getTaskListTemplate} from "./components/task-list";
import {getTaskEditTemplate} from "./components/task-edit";
import {generateTasks} from "./mock/task";
import {generateFilters} from "./mock/filter";
import {getTaskCardTemplate} from "./components/task-card";

const TASK_COUNT = 22;
const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

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

const filters = generateFilters();
render(mainSiteElement, getFiltersTemplate(filters));
render(mainSiteElement, getTaskListTemplate());

const taskListElement = document.querySelector(`.board__tasks`);
const tasks = generateTasks(TASK_COUNT);

render(taskListElement, getTaskEditTemplate(tasks[0]));
let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
tasks.slice(1, showingTasksCount).forEach((task) => render(taskListElement, getTaskCardTemplate(task)));
const boardElement = mainSiteElement.querySelector(`.board`);
render(boardElement, getLoadMoreButtonTemplate(), `beforeend`);

const loadMoreButton = boardElement.querySelector(`.load-more`);
loadMoreButton.addEventListener(`click`, () => {
  const prevTasksCount = showingTasksCount;
  showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

  tasks.slice(prevTasksCount, showingTasksCount)
    .forEach((task) => render(taskListElement, getTaskCardTemplate(task), `beforeend`));

  if (showingTasksCount >= tasks.length) {
    loadMoreButton.remove();
  }
});
