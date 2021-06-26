class DOMHelper {
  static clearEventListeners(element) {
    const clonedElement = element.cloneNode(true);
    element.replaceWith(clonedElement);
    return clonedElement;
  }

  static moveElement(elementId, newDestenationSelector) {
    const element = document.getElementById(elementId);
    const destenationElement = document.querySelector(newDestenationSelector);
    destenationElement.append(element);
  }
}

class component {
  constructor(hostElementId, insertBefore) {
    if (hostElementId) {
      this.hostElement = document.getElementById(hostElementId);
    } else {
      this.hostElement = document.body;
    }
    this.insertBefore = insertBefore;
  }

  detach() {
    if (this.element) {
      this.element.remove();
    }
  }
  attach() {
    this.hostElement.insertAdjacentElement(
      this.insertBefore
        ? `afterbegin
      +`
        : `beforeend`,
      this.element
    );
  }
}

class ToolTip extends component {
  constructor(closeNotifierFunc, text) {
    super();
    this.closeNotifier = closeNotifierFunc;
    this.text = text;
    this.creat();
  }
  closeTooltip = () => {
    this.detach();
    this.closeNotifier();
  };
  creat() {
    const tooltipEl = document.createElement(`div`);
    tooltipEl.className = `card`;
    tooltipEl.textContent = this.text;
    tooltipEl.addEventListener(`click`, this.closeTooltip);
    this.element = tooltipEl;
  }
}

class ProjectItem {
  hasActiveToolTip = false;
  constructor(ID, updateProjectListFunction, type) {
    this.id = ID;
    this.updateProjectListHandler = updateProjectListFunction;
    this.connectMoreInfoButton();
    this.connectSwitchButton(type);
  }
  showMoreInfoHandler() {
    if (this.hasActiveToolTip) {
      return;
    }
    const projectElement = document.getElementById(this.id);
    const tooltipText = projectElement.dataset.extraInfo;
    const tooltip = new ToolTip(
      () => (this.hasActiveToolTip = false),
      tooltipText
    );
    tooltip.attach();
    this.hasActiveToolTip = true;
  }

  connectMoreInfoButton() {
    const projectItemEl = document.getElementById(this.id);
    let moreInfoButton = projectItemEl.querySelector(`button:first-of-type`);
    moreInfoButton.addEventListener(
      `click`,
      this.showMoreInfoHandler.bind(this)
    );
  }

  connectSwitchButton(type) {
    const projectItemEl = document.getElementById(this.id);
    let switchButton = projectItemEl.querySelector(`button:last-of-type`);
    switchButton = DOMHelper.clearEventListeners(switchButton);
    switchButton.textContent = type === `active` ? `Finish` : `Activate`;
    switchButton.addEventListener(
      `click`,
      this.updateProjectListHandler.bind(null, this.id)
    );
  }

  update(updateProjectListsFn, type) {
    this.updateProjectListHandler = updateProjectListsFn;
    this.connectSwitchButton(type);
  }
}

class ProjectList {
  projects = [];
  constructor(type) {
    this.type = type;
    const projItems = document.querySelectorAll(`#${type}-projects li`);
    // console.log(projIttems);
    for (const project of projItems) {
      this.projects.push(
        new ProjectItem(project.id, this.switchProject.bind(this), this.type)
      );
    }
    console.log(this.projects);
  }

  setSwitchHandlerFunc(switchHandlerFunc) {
    this.switchHandler = switchHandlerFunc;
  }

  addProject(project) {
    this.projects.push(project);
    DOMHelper.moveElement(project.id, `#${this.type}-projects ul`);
    project.update(this.switchProject.bind(this), this.type);
  }

  switchProject(projectId) {
    this.switchHandler(this.projects.find((p) => p.id === projectId));
    this.projects.filter((p) => p.id !== projectId);
  }
}

class App {
  static init() {
    const activeProjectListEl = new ProjectList(`active`);
    const finishedProjectListEl = new ProjectList(`finished`);
    activeProjectListEl.setSwitchHandlerFunc(
      finishedProjectListEl.addProject.bind(finishedProjectListEl)
    );
    finishedProjectListEl.setSwitchHandlerFunc(
      activeProjectListEl.addProject.bind(activeProjectListEl)
    );
  }
}

App.init();
