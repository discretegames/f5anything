import * as vscode from "vscode";
import { ProviderResult } from "vscode";
import { DebugSession, TerminatedEvent } from "vscode-debugadapter";

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
		ownTerminal = vscode.window.createTerminal("F5 Anything");
	}

	return ownTerminal;
}

class InlineDebugAdapterFactory implements vscode.DebugAdapterDescriptorFactory {
	createDebugAdapterDescriptor(session: vscode.DebugSession): ProviderResult<vscode.DebugAdapterDescriptor> {
		if (!session.configuration.hasOwnProperty("command")) {
			vscode.window.showErrorMessage(
				`No command found for F5 Anything launch configuration "${session.configuration.name}". \
Add one like "command": "echo Hello" to your launch.json.`
			);
		} else if (typeof session.configuration.command !== "string") {
			vscode.window.showErrorMessage(
				`The command for F5 Anything launch configuration "${session.configuration.name}" must be a string.`
			);
		} else {
			const terminal = getTerminal(session.configuration);
			if (!session.configuration.hasOwnProperty("showTerminal") || session.configuration.showTerminal) {
				terminal.show();
			}
			terminal.sendText(session.configuration.command);
		}
		return new vscode.DebugAdapterInlineImplementation(new DummyDebugSession());
	}
}

export class DummyDebugSession extends DebugSession {
	protected initializeRequest(): void {
		this.sendEvent(new TerminatedEvent());
	}
}
