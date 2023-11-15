import { error } from "console";

enum Fix {
  PRE,
  POST,
}

const evaluate = (expression: string, type: Fix): number | undefined => {
  const tokens = expression.split(" ");
  const stack: number[] = [];
  const isPrefix = type == Fix.PRE;

  let i = isPrefix ? tokens.length - 1 : 0;
  let end = isPrefix ? 0 : tokens.length + 1;

  while (i != end - 1) {
    const token = tokens[i];
    if (!isNaN(Number(token))) {
      stack.push(parseFloat(token));
    } else {
      let res = 0;
      let op1 = stack.pop();
      let op2 = stack.pop();

      if (op1 == undefined || op2 == undefined)
        throw new Error(
          `Se debe ingresar una expresión válida, ${expression} no es una expresión válida`,
        );

      switch (token) {
        case "+":
          res = isPrefix ? op1 + op2 : op2 + op1;
          break;
        case "-":
          res = isPrefix ? op1 - op2 : op2 - op1;
          break;
        case "*":
          res = isPrefix ? op1 * op2 : op2 * op1;
          break;
        case "/":
          res = isPrefix ? op1 / op2 : op2 / op1;
          break;
        default:
          throw error(`${token} is not a valid operator: (+, -, *, /)`);
      }

      stack.push(res);
    }

    i = isPrefix ? i - 1 : i + 1;
  }

  return stack.pop();
};

const show = (expression: string, type: Fix): string | undefined => {
  const tokens = expression.split(" ");
  const stack: string[] = [];
  const isPrefix = type == Fix.PRE;

  let i = isPrefix ? tokens.length - 1 : 0;
  let end = isPrefix ? 0 : tokens.length + 1;

  while (i != end - 1) {
    const token = tokens[i];
    if (!isNaN(Number(token))) {
      stack.push(token);
    } else {
      let res: string;
      let op1 = stack.pop();
      let op2 = stack.pop();

      if (op1 == undefined || op2 == undefined)
        throw new Error(
          `Se debe ingresar una expresión válida, ${expression} no es una expresión válida`,
        );

      switch (token) {
        case "+":
          res = isPrefix ? `${op1} + ${op2}` : `${op2} + ${op1}`;
          break;
        case "-":
          res = isPrefix ? `${op1} - ${op2}` : `${op2} - ${op1}`;
          break;
        case "*":
          if (isAddOrSub(op1)) op1 = `(${op1})`;
          if (isAddOrSub(op2)) op2 = `(${op2})`;
          res = isPrefix ? `${op1} * ${op2}` : `${op2} * ${op1}`;
          break;
        case "/":
          if (isAddOrSub(op1)) op1 = `(${op1})`;
          if (isAddOrSub(op2)) op2 = `(${op2})`;
          res = isPrefix ? `${op1} / ${op2}` : `${op2} / ${op1}`;
          break;
        default:
          throw error(`${token} is not a valid operator: (+, -, *, /)`);
      }

      stack.push(res);
    }

    i = isPrefix ? i - 1 : i + 1;
  }

  return stack.pop();
};

const isAddOrSub = (expression: string): boolean => {
  let tokens = expression.split(" ");
  let operator = tokens[tokens.length - 2];

  return operator == "+" || operator == "-";
};

export { Fix, evaluate, show };
