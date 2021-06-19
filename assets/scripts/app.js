class ToolTip{}

class ProjectItem{
    constructor(ID){
        this.id = ID;
        this.connectMoreInfoButton();
        this.connectSwitchButton()
    }
    connectMoreInfoButton(){}

    connectSwitchButton(){
        const projectItemEl = document.getElementById(this.id);
        switchButton = projectItemEl.querySelector(`button:last-of-type`);
        switchButton.addEventListener(`click`,)
    }
}

class ProjectList{
    projects = [];
    constructor(type) {
        const projItems = document.querySelectorAll(`#${type}-projects li`);
        // console.log(projIttems);
        for (const project of projItems){
            this.projects.push(new ProjectItem(project.id));
        }
    }

    addProject(){}
    switchProject(projectId){
        this.addProject();
        this.projects.filter(p => p.id !== projectId);
    }
}

class App{
    static init(){
        const activeProjectListEl = new ProjectList(`active`);
        const finishedProjectListEl = new ProjectList(`finished`);
    }
}

App.init();