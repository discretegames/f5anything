import * as vscode from "vscode";
import { ProviderResult } from "vscode";
import { DebugSession, TerminatedEvent } from "vscode-debugadapter";

export function activate(context: vscode.ExtensionContext) {
	let factory = new InlineDebugAdapterFactory();
	context.subscriptions.push(vscode.debug.registerDebugAdapterDescriptorFactory("f5anything", factory));
}

class InlineDebugAdapterFactory implements vscode.DebugAdapterDescriptorFactory {
	createDebugAdapterDescriptor(session: vscode.DebugSession): ProviderResult<vscode.DebugAdapterDescriptor> {
		// TODO create and use custom terminal (with icon?)
		vscode.window.terminals[0].sendText(session.configuration.command);
		return new vscode.DebugAdapterInlineImplementation(new DummyDebugSession());
	}
}

export class DummyDebugSession extends DebugSession {
	protected initializeRequest(): void {
		this.sendEvent(new TerminatedEvent());
	}
}
