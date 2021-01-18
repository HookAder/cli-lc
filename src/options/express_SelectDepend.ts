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
            name: "mysql",
          },
          {
            name: "chalk",
          },
        ],
        validate: function (answer: string | any[]) {
          if (answer.length < 1) {
            return "You must choose at least one topping.";
          }
          return true;
        },
      },
    ])
    .then(async (list: any) => {
      // 执行状态
      let runStatus: boolean = false;
      runStatus = false;

      await cmd.run(
        `express --no-view ${projectName} && cd ${projectName} && npm i && npm i ${list.dependencies.join(
          " "
        )}`,
        () => {
          console.log(chalk.red("安装成功"));
          runStatus = true;
        }
      );

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
