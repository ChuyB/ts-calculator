#!/usr/bin/env node

import { createSpinner } from "nanospinner";
import { Fix, evaluate, show } from "./calc.js";
import inquirer from "inquirer";

enum Action {
  EVAL,
  MOSTRAR,
  SALIR,
}

async function askForAction() {
  const { action } = await inquirer.prompt({
    name: "action",
    type: "list",
    message: "Ingrese una acción",
    choices: ["EVAL", "MOSTRAR", "SALIR"],
  });
  return Action[action as keyof typeof Action];
}

async function askForType() {
  const { type } = await inquirer.prompt({
    name: "type",
    type: "list",
    message: "Ingresa un tipo de fijado",
    choices: ["PRE", "POST"],
  });

  return Fix[type as keyof typeof Fix];
}

async function askForExpression(type: Fix) {
  const { expression } = await inquirer.prompt({
    name: "expression",
    type: "input",
    message: "Ingresa la expresión:",
    default: type == Fix.PRE ? "+ 1 1" : "2 3 *",
  });

  return expression;
}

const wait = (ms: number): Promise<void> =>
  new Promise((r) => {
    setTimeout(r, ms);
  });

const main = async () => {
  while (true) {
    let action: Action = await askForAction();
    if (action == Action.SALIR) break;
    let type: Fix = await askForType();
    let input: string = await askForExpression(type);

    let spinner;
    switch (action) {
      case Action.EVAL:
        spinner = createSpinner(
          `El resultado de evaluar la expresión es:`,
        ).start();
        await wait(700);
        try {
          spinner.success({ text: `${evaluate(input, type)}` });
        } catch (err) {
          spinner.error({ text: `${err}` });
        }
        break;
      case Action.MOSTRAR:
        spinner = createSpinner(`La expresión in-fija es:`).start();
        await wait(700);
        try {
          spinner.success({ text: show(input, type) });
        } catch (err) {
          spinner.error({ text: `${err}` });
        }
        break;
    }
    await wait(1000);
  }

  process.exit(0);
};

await main();
