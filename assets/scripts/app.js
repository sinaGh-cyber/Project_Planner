class ToolTip{}

class ProjectItem{}

class ProjectList{
    constructor(type) {
        const projItems = document.querySelectorAll(`#${type}-projects li`);
        // console.log(projIttems);
        // for (const project of projItems){
        //     const Item = new ProjectItem(type, project);
        // }
    }
}

class App{
    static init(){
        const activeProjectListEl = new ProjectList(`active`);
        const finishedProjectListEl = new ProjectList(`finished`);
    }
}

App.init();