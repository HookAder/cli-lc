import inquirer from "inquirer";
import chalk from "chalk";
import cmd from "node-cmd";
import cliProgress from "cli-progress";

const SelectDepend = (projectName: string) => {
  inquirer
    .prompt([
      {
        type: "checkbox",
        message: "选择安装的依赖",
        name: "dependencies",
        choices: [
          new inquirer.Separator(),
          {
            name: "react-router-dom",
          },
          {
            name: "react-redux",
          },
          {
            name: "redux",
          },
          {
            name: "node-sass",
          },
          {
            name: "antd",
          },
          {
            name: "typescript",
          },
        ],
        validate: function (answer) {
          if (answer.length < 1) {
            return "You must choose at least one topping.";
          }
          return true;
        },
      },
    ])
    .then(async (list) => {
      // 执行状态
      let runStatus: boolean = false;
      if (list.dependencies.includes("typescript")) {
        await cmd.run(
          `npx create-react-app ${projectName} --template typescript && cd ${projectName} && npm init -y && npm i ${list.dependencies.join(
            " "
          )}`,
          () => {
            console.log(chalk.red("安装成功"));
            runStatus = true;
          }
        );
      } else {
        await cmd.run(
          `npx create-react-app ${projectName} && cd ${projectName} && npm i ${list.dependencies.join(
            " "
          )}`,
          () => {
            console.log(chalk.red("安装成功"));
            runStatus = true;
          }
        );
      }
      // create a new progress bar instance and use shades_classic theme
      const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.rect);

      // start the progress bar with a total value of 200 and start value of 0
      bar1.start(100, 0);

      // update the current value in your application..
      let num = 0;
      let timer: NodeJS.Timeout = setInterval(() => {
        if (runStatus) {
          clearInterval(timer);
        }
        num++;
        bar1.update(num);
      }, 30);
      console.log(chalk.green("正在安装中..."));
    });
};

export default SelectDepend;
