import * as vscode from "vscode";
import { ProviderResult } from "vscode";
import { DebugSession, TerminatedEvent } from "@vscode/debugadapter";

let ownTerminal: vscode.Terminal;

export function activate(context: vscode.ExtensionContext) {
	let factory = new InlineDebugAdapterFactory();
	context.subscriptions.push(vscode.debug.registerDebugAdapterDescriptorFactory("f5anything", factory));
}

function getTerminal(configuration: vscode.DebugConfiguration): vscode.Terminal {
	if (
		configuration.hasOwnProperty("terminalIndex") &&
		Number.isInteger(configuration.terminalIndex) &&
		configuration.terminalIndex >= 0 &&
		configuration.terminalIndex < vscode.window.terminals.length
	) {
		return vscode.window.terminals[configuration.terminalIndex];
	}

	if (!ownTerminal || ownTerminal.exitStatus) {
		let name = "F5 Anything";
		if (configuration.hasOwnProperty("terminalName")) {
			name = String(configuration.terminalName);
		}
		ownTerminal = vscode.window.createTerminal(name);
	}

	return ownTerminal;
}

// All this use of hasOwnProperty probably not needed, but doesn't hurt.
class InlineDebugAdapterFactory implements vscode.DebugAdapterDescriptorFactory {
	createDebugAdapterDescriptor(session: vscode.DebugSession): ProviderResult<vscode.DebugAdapterDescriptor> {
		const command: false | string =
			session.configuration.hasOwnProperty("command") && session.configuration.command;
		const vscCommand: false | string =
			session.configuration.hasOwnProperty("vscCommand") && session.configuration.vscCommand;

		if (!command && !vscCommand) {
			vscode.window.showWarningMessage(`F5 Anything had nothing to do. No command or vscCommand found in launch \
configuration "${session.configuration.name}". \
Add one like "command": "echo Hello" or "vscCommand": "editor.action.formatDocument" to your launch.json.`);
		} else {
			if (vscCommand) {
				vscode.commands.executeCommand(vscCommand);
			}

			if (command) {
				const terminal = getTerminal(session.configuration);
				if (!session.configuration.hasOwnProperty("showTerminal") || session.configuration.showTerminal) {
					terminal.show();
				}
				terminal.sendText(String(command)); // Using String is kinda weird..
			}
		}
		return new vscode.DebugAdapterInlineImplementation(new DummyDebugSession());
	}
}

export class DummyDebugSession extends DebugSession {
	protected initializeRequest(): void {
		this.sendEvent(new TerminatedEvent());
	}
}

// Had to migrate to new vscode packages
// https://code.visualstudio.com/api/working-with-extensions/testing-extension#migrating-from-vscode
