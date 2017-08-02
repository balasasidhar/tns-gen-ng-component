#!/usr/bin/env node
const fs = require("fs");
const path = require('path');
const component = process.argv[2].toLowerCase();
let dir = path.join('app', component);
console.log(`Generating ${component} directory`);
if (fs.existsSync(dir)) {
    console.error(`Error: Component ${component} already exists.`)
}
else {
    fs.mkdirSync(dir);
    console.log(`Done`);
    generateHTMLFile()
}

function generateHTMLFile() {
    console.log(`Generating ${component}.component.html`);
    fs.writeFile(path.join(dir, `${component}.component.html`), `<ns-${component} class="${component}"></ns-${component}>`, function (err) {
        if (err) {
            return console.log(err)
        }
        console.log(`Done`);
        generateCSSFile()
    })
}

function generateCSSFile() {
    console.log(`Generating ${component}.component.css`);
    fs.writeFile(path.join(dir, `${component}.component.css`), `.${component} {
    background-color: #f2f2f2;
}`, function (err) {
        if (err) {
            return console.log(err)
        }
        console.log(`Done`);
        generateTypeScriptFile()
    })
}

function generateTypeScriptFile() {
    console.log(`Generating ${component}.component.ts`);
    fs.writeFile(path.join(dir, `${component}.component.ts`), `import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'ns-${component}',
    moduleId: module.id,
    templateUrl: './${component}.component.html',
    styleUrls: ['./${component}.component.css']
})

export class ${component.charAt(0).toUpperCase()}${component.slice(1)}Component{

    constructor(
        private route: ActivatedRoute
    ) { }
    
}`, function (err) {
        if (err) {
            return console.log(err)
        }
        console.log(`Done`)
    })
}