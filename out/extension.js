"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DummyDebugSession = exports.activate = void 0;
const vscode = require("vscode");
const vscode_debugadapter_1 = require("vscode-debugadapter");
function activate(context) {
    let factory = new InlineDebugAdapterFactory();
    context.subscriptions.push(vscode.debug.registerDebugAdapterDescriptorFactory("f5anything", factory));
}
exports.activate = activate;
class InlineDebugAdapterFactory {
    createDebugAdapterDescriptor(session) {
        // TODO create and use custom terminal (with icon?)
        vscode.window.terminals[0].sendText(session.configuration.command);
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