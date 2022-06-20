import Rete from "rete";
import { actionSocket } from "../Sockets/Sockets";

export class ExitNode extends Rete.Component {
    static type = "Exit";

    constructor() {
        super(ExitNode.type);
        this.task = {
            outputs: {}
        };
    }

    builder(node) {
        return node.addInput(new Rete.Input("act", "Link", actionSocket, true));
    }

    worker(node, inputs, outputs) {
        console.log("Alert", node.id, node.data);
    }
}
