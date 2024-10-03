// src/extension.ts
import * as vscode from 'vscode';
import { sortObject } from './sortObject';

async function compareInMemoryDiff(jsonString1: string, jsonString2: string) {
	const leftDoc = await vscode.workspace.openTextDocument({
	  content: jsonString1,
	  language: 'json',
	});
  
	const rightDoc = await vscode.workspace.openTextDocument({
	  content: jsonString2,
	  language: 'json',
	});
  
	const leftUri = leftDoc.uri;
	const rightUri = rightDoc.uri;
  
	await vscode.commands.executeCommand(
	  'vscode.diff',
	  leftUri,
	  rightUri,
	  'JSON Diff'
	);
  }

  export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand(
	  'extension.sortAndCompareJsonFiles',
	  async () => {
		try {
		  const fileUri1 = await selectJsonFile('Select the first JSON file to compare');
		  if (!fileUri1) {return;}
  
		  const fileUri2 = await selectJsonFile('Select the second JSON file to compare');
		  if (!fileUri2) {return;}
  
		  const json1 = await readAndParseJson(fileUri1);
		  const json2 = await readAndParseJson(fileUri2);
  
		  const sortedJson1 = sortObject(json1);
		  const sortedJson2 = sortObject(json2);
  
		  const jsonString1 = JSON.stringify(sortedJson1, null, 2);
		  const jsonString2 = JSON.stringify(sortedJson2, null, 2);
  
		  await compareInMemoryDiff(jsonString1, jsonString2);

		} catch (error) {
		  vscode.window.showErrorMessage(`Error comparing JSON files: ${error}`);
		}
	  }
	);
  
	context.subscriptions.push(disposable);
  }
  
async function selectJsonFile(placeHolder: string): Promise<vscode.Uri | undefined> {
  const options: vscode.OpenDialogOptions = {
    canSelectMany: false,
    openLabel: 'Select',
    filters: {
      'JSON files': ['json'],
      'All files': ['*']
    }
  };

  const fileUri = await vscode.window.showOpenDialog(options);
  if (fileUri && fileUri[0]) {
    return fileUri[0];
  }
}

async function readAndParseJson(fileUri: vscode.Uri): Promise<any> {
  const document = await vscode.workspace.openTextDocument(fileUri);
  return JSON.parse(document.getText());
}

export function deactivate() {}