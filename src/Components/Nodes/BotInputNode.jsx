import Rete from "rete";
import { BodyControl } from "../Controls/BodyControl";
import { StatusControl } from "../Controls/StatusControl";
import { actionSocket } from "../Sockets/Sockets";

export class BotInputNode extends Rete.Component {
    static type = "BotInput";

    constructor() {
        super(BotInputNode.type);
        this.task = {
            outputs: {}
        };
    }

    builder(node) {
        const body = new BodyControl(
            this.editor,
            node.data.body,
            node.id + "_BODY",
            BotInputNode.type
        );

        const status = new StatusControl(
            this.editor,
            node.data.status,
            node.id + "_STATUS",
            BotInputNode.type
        );

        node.addControl(status).addControl(body);

        if (
            node.data.properties &&
            !node.data.properties.includes("ENTRY_POINT")
        ) {
            node.addInput(new Rete.Input("act", "Link", actionSocket, true));
        }

        if (node.data.actions) {
            node.data.actions.forEach(action => {
                node.addOutput(
                    new Rete.Output(action.id, action.text, actionSocket, false)
                );
            });
        }
        return node;
    }

    worker(node, inputs, outputs) {
        console.log("Alert", node.id, node.data);
    }
}
