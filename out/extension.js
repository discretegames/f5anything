"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DummyDebugSession = exports.activate = void 0;
const vscode = require("vscode");
const vscode_debugadapter_1 = require("vscode-debugadapter");
let ownTerminal;
function activate(context) {
    let factory = new InlineDebugAdapterFactory();
    context.subscriptions.push(vscode.debug.registerDebugAdapterDescriptorFactory("f5anything", factory));
}
exports.activate = activate;
function getTerminal(configuration) {
    if (configuration.hasOwnProperty("terminalIndex") &&
        Number.isInteger(configuration.terminalIndex) &&
        configuration.terminalIndex >= 0 &&
        configuration.terminalIndex < vscode.window.terminals.length) {
        return vscode.window.terminals[configuration.terminalIndex];
    }
    if (!ownTerminal || ownTerminal.exitStatus) {
        ownTerminal = vscode.window.createTerminal("F5 Anything");
    }
    return ownTerminal;
}
class InlineDebugAdapterFactory {
    createDebugAdapterDescriptor(session) {
        if (!session.configuration.hasOwnProperty("command")) {
            vscode.window.showErrorMessage(`No command found for F5 Anything launch configuration "${session.configuration.name}". \
Add one like "command": "echo Hello" to your launch.json.`);
        }
        else if (typeof session.configuration.command !== "string") {
            vscode.window.showErrorMessage(`The command for F5 Anything launch configuration "${session.configuration.name}" must be a string.`);
        }
        else {
            const terminal = getTerminal(session.configuration);
            if (!session.configuration.hasOwnProperty("showTerminal") || session.configuration.showTerminal) {
                terminal.show();
            }
            terminal.sendText(session.configuration.command);
        }
        return new vscode.DebugAdapterInlineImplementation(new DummyDebugSession());
    }
}
class DummyDebugSession extends vscode_debugadapter_1.DebugSession {
    initializeRequest() {
        this.sendEvent(new vscode_debugadapter_1.TerminatedEvent());
    }
}
exports.DummyDebugSession = DummyDebugSession;
//# sourceMappingURL=extension.js.map