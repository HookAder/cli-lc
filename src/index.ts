import fs from "fs";
import chalk from "chalk";
import prompts, { PromptObject } from "prompts";
import inquirer from "inquirer";
import request from "request";
import { OptionsList, InstallOptions } from "./types/index";
import SelectDepend from "./options/SelectDepend";
import ProjectNameOptions from "./options/inputProjectName";

// login options
const questions: PromptObject[] = [
  {
    type: "text",
    name: "username",
    message: "UserName:",
  },
  {
    type: "password",
    name: "password",
    message: "PassWord:",
  },
];

inquirer
  .prompt([
    {
      type: "list",
      name: "option",
      message: "功能选项",
      choices: [
        OptionsList.Hello,
        new inquirer.Separator(),
        OptionsList.Introdution,
        new inquirer.Separator(),
        OptionsList.InstallReactProject,
      ],
    },
  ])
  .then(async (answers) => {
    if (answers.option === OptionsList.Hello) {
      console.log(chalk.red("Hello Welcome to Cli."));
    } else if (answers.option === OptionsList.Introdution) {
      // what are you doing
      console.log(chalk.green("www.inlcas.top"));
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
        .then(async (res) => {
          if (res.type === InstallOptions.newProject) {
            // create project folder name
            const { projectName } = await prompts(ProjectNameOptions);
            // select dependencies
            await SelectDepend(projectName);
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
