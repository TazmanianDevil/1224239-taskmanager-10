import {generateTasks} from "./mock/task";
import {generateFilters} from "./mock/filter";
import MainMenuComponent from "./components/main-menu";
import {render} from "./utils";
import FilterComponent from "./components/filters";
import TaskListComponent from "./components/task-list";
import TaskEditComponent from "./components/task-edit";
import LoadMoreButtonComponent from "./components/load-more-button";
import TaskComponent from "./components/task-card";
import {RenderPosition} from "./const";

const TASK_COUNT = 22;
const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const renderTask = (task) => {
  const taskComponent = new TaskComponent(task);
  const taskEditComponent = new TaskEditComponent(task);

  const editButton = taskComponent.getElement().querySelector(`.card__btn--edit`);
  editButton.addEventListener(`click`, () => {
    taskListElement.replaceChild(taskEditComponent.getElement(), taskComponent.getElement());
  });

  const editForm = taskEditComponent.getElement().querySelector(`form`);
  editForm.addEventListener(`submit`, () => {
    taskListElement.replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
  });

  render(taskListElement, taskComponent.getElement(), RenderPosition.BEFORE_END);
};
const headerSiteElement = document.querySelector(`.main__control`);

render(headerSiteElement, new MainMenuComponent().getElement());

const mainSiteElement = document.querySelector(`.main`);

const filters = generateFilters();
render(mainSiteElement, new FilterComponent(filters).getElement());

const taskList = new TaskListComponent();
render(mainSiteElement, taskList.getElement());

const taskListElement = taskList.getElement().querySelector(`.board__tasks`);
const tasks = generateTasks(TASK_COUNT);

let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
tasks
  .slice(0, showingTasksCount)
  .forEach((task) => renderTask(task));

const loadMoreButton = new LoadMoreButtonComponent();
render(taskList.getElement(), loadMoreButton.getElement());

loadMoreButton.getElement().addEventListener(`click`, () => {
  const prevTasksCount = showingTasksCount;
  showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

  tasks
    .slice(prevTasksCount, showingTasksCount)
    .forEach((task) => renderTask(task));

  if (showingTasksCount >= tasks.length) {
    loadMoreButton.getElement().remove();
    loadMoreButton.removeElement();
  }
});
