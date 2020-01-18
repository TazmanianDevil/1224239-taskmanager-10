import {render, replace} from "../utils/render";
import TaskCardComponent from "../components/task-card";
import TaskEditComponent from "../components/task-edit";

export default class TaskController {
  constructor(container) {
    this._container = container;
  }

  render(task) {
    const onEscapeKeyDown = (event) => {
      const isEscapeKeyDown = event.key === `Escape` || event.key === `Esc`;
      if (isEscapeKeyDown) {
        replaceEditToTask();
        document.removeEventListener(`keydown`, onEscapeKeyDown);
      }
    };

    const replaceEditToTask = () => {
      document.removeEventListener(`keydown`, onEscapeKeyDown);
      replace(taskComponent, taskEditComponent);
    };

    const replaceTaskToEdit = () => {
      replace(taskEditComponent, taskComponent);
    };

    const taskComponent = new TaskCardComponent(task);
    const taskEditComponent = new TaskEditComponent(task);

    taskComponent.setEditButtonClickHandler(() => {
      replaceTaskToEdit();
      document.addEventListener(`keydown`, onEscapeKeyDown);
    });

    taskEditComponent.setSubmitHandler(replaceEditToTask);

    render(this._container, taskComponent);
  }
}
