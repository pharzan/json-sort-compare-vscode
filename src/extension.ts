// src/extension.ts
import * as vscode from 'vscode';
import { sortObject } from './sortObject';

class JsonDiffContentProvider implements vscode.TextDocumentContentProvider {
	private contentMap = new Map<string, string>();
	private _onDidChange = new vscode.EventEmitter<vscode.Uri>();

	public provideTextDocumentContent(uri: vscode.Uri): string | Thenable<string> {
		return this.contentMap.get(uri.toString()) || '';
	}

	public update(uri: vscode.Uri, content: string) {
		this.contentMap.set(uri.toString(), content);
		this._onDidChange.fire(uri);
	}

	get onDidChange() {
		return this._onDidChange.event;
	}
}


async function compareInMemoryDiff(
	jsonString1: string,
	jsonString2: string,
	contentProvider: JsonDiffContentProvider,
	fileUri1: vscode.Uri,
    fileUri2: vscode.Uri
) {
	const leftUri = vscode.Uri.parse('json-diff://authority/json1.json');
	const rightUri = vscode.Uri.parse('json-diff://authority/json2.json');

	contentProvider.update(leftUri, jsonString1);
	contentProvider.update(rightUri, jsonString2);
    const fileName1 = vscode.workspace.asRelativePath(fileUri1, true);
    const fileName2 = vscode.workspace.asRelativePath(fileUri2, true);

	await vscode.commands.executeCommand(
		'vscode.diff',
		leftUri,
		rightUri,
		`${fileName1} ↔ ${fileName2}`
	);
}


export function activate(context: vscode.ExtensionContext) {
	const contentProvider = new JsonDiffContentProvider();
	context.subscriptions.push(
		vscode.workspace.registerTextDocumentContentProvider('json-diff', contentProvider)
	);

	let disposable = vscode.commands.registerCommand(
		'extension.sortAndCompareJsonFiles',
		async () => {
			try {
				const fileUri1 = await selectJsonFile('Select the first JSON file to compare');
				if (!fileUri1) { return; }

				const fileUri2 = await selectJsonFile('Select the second JSON file to compare');
				if (!fileUri2) { return; }

				const json1 = await readAndParseJson(fileUri1);
				const json2 = await readAndParseJson(fileUri2);

				const sortedJson1 = sortObject(json1);
				const sortedJson2 = sortObject(json2);

				const jsonString1 = JSON.stringify(sortedJson1, null, 2);
				const jsonString2 = JSON.stringify(sortedJson2, null, 2);

				await compareInMemoryDiff(jsonString1, jsonString2, contentProvider, fileUri1, fileUri2);

			} catch (error) {
				vscode.window.showErrorMessage(`Error comparing JSON files: ${error}`);
			}
		}
	);

	context.subscriptions.push(disposable);
}

async function selectJsonFile(placeHolder: string): Promise<vscode.Uri | undefined> {
	const jsonFiles = await vscode.workspace.findFiles('**/*.json');

	if (jsonFiles.length === 0) {
		vscode.window.showInformationMessage('No JSON files found in the workspace.');
		return;
	}

	const items = jsonFiles.map(file => ({
		label: vscode.workspace.asRelativePath(file),
		description: file.fsPath,
		uri: file
	}));

	const selected = await vscode.window.showQuickPick(items, {
		placeHolder,
		matchOnDescription: true,
	});

	if (selected) {
		return selected.uri;
	}
}

async function readAndParseJson(fileUri: vscode.Uri): Promise<any> {
	const document = await vscode.workspace.openTextDocument(fileUri);
	return JSON.parse(document.getText());
}

export function deactivate() { }
