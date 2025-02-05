import * as assert from "assert";
import { readFile } from "fs/promises";
import { join } from "path";
import * as jscodeshift from "jscodeshift";
import { type API } from "jscodeshift";
import transform from "../remove-legacy-context.codemod";

const buildApi = (parser: string | undefined): API => ({
  j: parser ? jscodeshift.withParser(parser) : jscodeshift,
  jscodeshift: parser ? jscodeshift.withParser(parser) : jscodeshift,
  stats: () => {
    console.error(
      "The stats function was called, which is not supported on purpose"
    );
  },
  report: () => {
    console.error(
      "The report function was called, which is not supported on purpose"
    );
  },
});

describe("remove-legacy-context", () => {
  it("should remove getChildContext and childContextTypes from parent component", async () => {
    const INPUT = await readFile(
      join(
        __dirname,
        "..",
        "__testfixtures__/remove-legacy-context/class-component.input.tsx"
      ),
      "utf-8"
    );
    const OUTPUT = await readFile(
      join(
        __dirname,
        "..",
        "__testfixtures__/remove-legacy-context/class-component.output.tsx"
      ),
      "utf-8"
    );

    const actualOutput = transform(
      {
        path: "index.js",
        source: INPUT,
      },
      buildApi("tsx")
    );

    assert.deepEqual(
      actualOutput?.replace(/W/gm, ""),
      OUTPUT.replace(/W/gm, "")
    );
  });
});
