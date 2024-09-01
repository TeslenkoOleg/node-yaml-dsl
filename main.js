'use strict';

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';
import { STEP_ACTIONS } from './stepActions.js';

// Helper to get the directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Function to load and parse YAML files
function loadYamlFiles(directory) {
  return fs.readdirSync(directory)
    .filter(file => file.endsWith('.yaml'))
    .map(file => {
      const filePath = path.join(directory, file);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      return yaml.load(fileContents);
    });
}
// Function to execute a single workflow
async function executeWorkflow(workflow) {
  let previousStepResult = null;
  for (const step of workflow) {
    const action = STEP_ACTIONS.get(step.action);
    if (!action) {
      continue;
    }
    previousStepResult = await action(step, previousStepResult);
  }
}
// Main function to load and execute all workflows at intervals
async function main() {
  const scenarioDir = path.join(__dirname, 'scenarios');
  const workflows = loadYamlFiles(scenarioDir);

  for (const workflowData of workflows) {
    await executeWorkflow(workflowData.workflow);
  }
}

await main();

