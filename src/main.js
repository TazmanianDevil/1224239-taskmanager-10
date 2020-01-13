import {generateTasks} from "./mock/task";
import {generateFilters} from "./mock/filter";
import MainMenuComponent from "./components/main-menu";
import FilterComponent from "./components/filters";
import BoardComponent from "./components/board";
import {render} from "./utils/render";
import BoardController from './controllers/boardController';

const TASK_COUNT = 22;

const headerSiteElement = document.querySelector(`.main__control`);

render(headerSiteElement, new MainMenuComponent());

const mainSiteElement = document.querySelector(`.main`);

const filters = generateFilters();
render(mainSiteElement, new FilterComponent(filters));

const boardComponent = new BoardComponent();
render(mainSiteElement, boardComponent);

const tasks = generateTasks(TASK_COUNT);

const boardController = new BoardController(boardComponent);

boardController.render(tasks);
