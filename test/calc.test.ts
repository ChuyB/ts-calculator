import { show, evaluate, Fix } from "../src/calc";

describe("Show function", () => {
  it("should generate correctly infix from prefix", () => {
    const res = show("+ * + 4 5 3 / 8 - 5 1", Fix.PRE);
    expect(res).toEqual("(4 + 5) * 3 + 8 / (5 - 1)");
  });

  it("should generate correctly infix from postfix", () => {
    const res = show("4 1 - 3 / 5 + 8 *", Fix.POST);
    expect(res).toEqual("((4 - 1) / 3 + 5) * 8");
  });
});

describe("evaluate function", () => {
  it("should solve from prefix", () => {
    const res = evaluate("+ * + 4 5 3 / 8 - 5 1", Fix.PRE);
    expect(res).toEqual(29);
  });

  it("should solve from prefix", () => {
    const res = evaluate("4 1 - 3 / 5 + 8 *", Fix.POST);
    expect(res).toEqual(48);
  });
});
