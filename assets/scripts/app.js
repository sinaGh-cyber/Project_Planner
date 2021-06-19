class ToolTip {}

class ProjectItem {
  goToFinishedListHandler = (chosenBtn) => {
    this.project.remove();
    document
      .getElementById(`finished-projects`)
      .querySelector(`ul`)
      .append(this.project);
      chosenBtn.textContent = `Activate`;
      chosenBtn.removeEventListener("click", this.goToFinishedListHandler);
      chosenBtn.addEventListener(`click`, this.goToActivListHandler.bind(null, chosenBtn));
  };
  goToActivListHandler = (chosenBtn) => {
    this.project.remove();
    document
      .getElementById(`active-projects`)
      .querySelector(`ul`)
      .append(this.project);
    chosenBtn.textContent = `Finish`;
    chosenBtn.removeEventListener("click", this.goToActivListHandler);;
    chosenBtn.addEventListener(`click`, this.goToFinishedListHandler.bind(null, chosenBtn));
  };
  constructor(type, project) {
    this.project = project;
    if (type === `active`) {
      this.finishBtn = project.querySelectorAll(`button`)[1];
      this.finishBtn.addEventListener(`click`, this.goToFinishedListHandler.bind(null, this.finishBtn));
    } else if (type === `finished`) {
      this.activateBtn = project.querySelectorAll(`button`)[1];
      this.activateBtn.addEventListener(`click`, this.goToActivListHandler.bind(null, this.activateBtn));
    }
    this.moreInfoBtn = project.querySelectorAll(`button`)[0];
    const ToolTipObj = new ToolTip(this.moreInfoBtn);
  }
}

class ProjectList {
  constructor(type) {
    const projItems = document.querySelectorAll(`#${type}-projects li`);
    // console.log(projIttems);
    for (const project of projItems) {
      const Item = new ProjectItem(type, project);
    }
  }
}

class App {
  static init() {
    const activeProjectListEl = new ProjectList(`active`);
    const finishedProjectListEl = new ProjectList(`finished`);
  }
}

App.init();
