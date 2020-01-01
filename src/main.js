import {generateTasks} from "./mock/task";
import {generateFilters} from "./mock/filter";
import MainMenuComponent from "./components/main-menu";
import {render} from "./utils";
import FilterComponent from "./components/filters";
import BoardComponent from "./components/board";
import TaskEditComponent from "./components/task-edit";
import LoadMoreButtonComponent from "./components/load-more-button";
import TaskComponent from "./components/task-card";
import TasksComponent from './components/tasks.js';
import SortingComponent from './components/sorting';
import NoTasksComponent from './components/no-tasks.js';

const TASK_COUNT = 22;
const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const renderTask = (taskListElement, task) => {

  const onEscapeKeyDown = (event) => {
    const isEscapeKeyDown = event.key === `Escape` || event.key === `Esc`;
    if (isEscapeKeyDown) {
      replaceEditToTask();
      document.removeEventListener(`keydown`, onEscapeKeyDown);
    }
  };

  const replaceEditToTask = () => {
    taskListElement.replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
  };

  const replaceTaskToEdit = () => {
    taskListElement.replaceChild(taskEditComponent.getElement(), taskComponent.getElement());
  };

  const taskComponent = new TaskComponent(task);
  const taskEditComponent = new TaskEditComponent(task);

  const editButton = taskComponent.getElement().querySelector(`.card__btn--edit`);
  editButton.addEventListener(`click`, () => {
    replaceTaskToEdit();
    document.addEventListener(`keydown`, onEscapeKeyDown);
  });

  const editForm = taskEditComponent.getElement().querySelector(`form`);
  editForm.addEventListener(`submit`, replaceEditToTask);

  render(taskListElement, taskComponent.getElement());
};
const headerSiteElement = document.querySelector(`.main__control`);

render(headerSiteElement, new MainMenuComponent().getElement());

const mainSiteElement = document.querySelector(`.main`);

const filters = generateFilters();
render(mainSiteElement, new FilterComponent(filters).getElement());

const boardComponent = new BoardComponent();
render(mainSiteElement, boardComponent.getElement());

const tasks = generateTasks(TASK_COUNT);
const isAllTasksArchived = tasks.every((task) => task.isArchive);
if (isAllTasksArchived) {
  render(boardComponent.getElement(), new NoTasksComponent().getElement());
} else {
  render(boardComponent.getElement(), new SortingComponent().getElement());
  render(boardComponent.getElement(), new TasksComponent().getElement());

  const taskListElement = boardComponent.getElement().querySelector(`.board__tasks`);

  let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
  tasks
    .slice(0, showingTasksCount)
    .forEach((task) => renderTask(taskListElement, task));

  const loadMoreButton = new LoadMoreButtonComponent();
  render(boardComponent.getElement(), loadMoreButton.getElement());

  loadMoreButton.getElement().addEventListener(`click`, () => {
    const prevTasksCount = showingTasksCount;
    showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

    tasks
      .slice(prevTasksCount, showingTasksCount)
      .forEach((task) => renderTask(taskListElement, task));

    if (showingTasksCount >= tasks.length) {
      loadMoreButton.getElement().remove();
      loadMoreButton.removeElement();
    }
  });
}
