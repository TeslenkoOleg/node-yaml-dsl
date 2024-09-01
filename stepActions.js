'use strict'
import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const STEP_ACTIONS = new Map([
    ['read', async (step, previousStepResult) => read(step)],
    ['script', async (step, previousStepResult) => script(step, previousStepResult)],
    ['insertIntoDB', async (step, previousStepResult) => insertIntoDB(step, previousStepResult)],
    ['write', async (step, previousStepResult) => write(step, previousStepResult)],
]);
const read = async (step, previousStepResult) => {
    return fs.readFileSync(step.path, 'utf8');
};
const script = async (step, previousStepResult) => {
    const scriptModule = await import(path.join(__dirname, step.script));
    return scriptModule.default(previousStepResult);
};
const insertIntoDB = async (step, previousStepResult) => {
    console.log(`Inserting data into database: ${step.database} ` + previousStepResult);
    if (step.database === 'mysql') {
        //TODO: MySQL insertion logic
    }
}
const write = async (step, previousStepResult) => {
    console.log(`Writing data to file: ${step.path}`);
    fs.writeFileSync(step.path, previousStepResult);
}
