import fs from "fs";
import chalk from "chalk";
import prompts from "prompts";
import inquirer from "inquirer";
import request from "request";
import updateNotifier from "update-notifier";
import { OptionsList, InstallOptions } from "./types/index";
import react_SelectDepend from "./options/react_SelectDepend";
import express_SelectDepend from "./options/express_SelectDepend";
import ProjectNameOptions from "./options/inputProjectName";
const pkg = require('../package.json');

const notifier = updateNotifier({ pkg });

notifier.notify();

inquirer
  .prompt([
    {
      type: "list",
      name: "option",
      message: "功能选项",
      choices: [
        OptionsList.Hello,
        new inquirer.Separator(),
        OptionsList.InstallExpressProject,
        new inquirer.Separator(),
        OptionsList.InstallReactProject,
      ],
    },
  ])
  .then(async (answers: any) => {
    if (answers.option === OptionsList.Hello) {
      console.log(chalk.red("Hello Welcome to Cli."));
    } else if (answers.option === OptionsList.InstallExpressProject) {
      // what are you doing
      const { projectName } = await prompts(ProjectNameOptions);
      await express_SelectDepend(projectName);

      // console.log(chalk.green("www.inlcas.top"));
    } else if (answers.option === OptionsList.InstallReactProject) {
      // dosomething
      inquirer
        .prompt([
          {
            type: "list",
            name: "type",
            message: "选项",
            choices: [
              InstallOptions.newProject,
              new inquirer.Separator(),
              InstallOptions.InstallReactAdminTemplate,
            ],
          },
        ])
        .then(async (res: any) => {
          if (res.type === InstallOptions.newProject) {
            // create project folder name
            const { projectName } = await prompts(ProjectNameOptions);
            // select dependencies
            await react_SelectDepend(projectName);
          } else if (res.type === InstallOptions.InstallReactAdminTemplate) {
            await request(
              "https://github.com/HookAder/react-admin-template/archive/master.zip"
            ).pipe(fs.createWriteStream("master.zip"));

            console.log("文件下载中...");
          }
        });
    }
    // console.log(answers);
  });
