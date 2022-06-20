import Rete from "rete";
import ReactRenderPlugin from "rete-react-render-plugin";
import DockPlugin from "rete-dock-plugin";
import ConnectionPlugin from "rete-connection-plugin";
import ConnectionPathPlugin from "rete-connection-path-plugin";
import ConnectionMasteryPlugin from "rete-connection-mastery-plugin";
import ContextMenuPlugin, {
    Menu,
    Item,
    Search
} from "rete-context-menu-plugin";
import AreaPlugin from "rete-area-plugin";
import TaskPlugin from "rete-task-plugin";
import HistoryPlugin from "rete-history-plugin";
import AlightRenderPlugin from "rete-alight-render-plugin";
import AutoArrangePlugin from "rete-auto-arrange-plugin";
import { data } from "./data";
import { ExitNode } from "./Components/Nodes/ExitNode";
import { BotInputNode } from "./Components/Nodes/BotInputNode";
import { ReactNode } from "./Components/Nodes/ReactNode";
// import AutoArrange from "./Helpers/NodeHelpers";

export var editor;

export default async function(container) {
    editor = new Rete.NodeEditor("covid-assessment@1.0.0", container);
    editor.use(ConnectionPlugin, { curvature: 0.3 });
    editor.use(ConnectionMasteryPlugin);
    editor.use(AlightRenderPlugin);
    editor.use(TaskPlugin);
    editor.use(HistoryPlugin, { keyboard: true });
    editor.use(AreaPlugin);
    editor.use(ConnectionPathPlugin, {
        type: ConnectionPathPlugin.DEFAULT,
        curve: ConnectionPathPlugin.curveBundle,
        options: { vertical: false, curvature: 0.3 },
        arrow: true
    });
    editor.use(AutoArrangePlugin, {
        margin: { x: 150, y: 150 },
        depth: 150
    });
    editor.use(ReactRenderPlugin, {
        component: ReactNode
    });
    editor.use(DockPlugin, {
        container: document.querySelector(".dock"),
        itemClass: "dock-item",
        plugins: [ReactRenderPlugin]
    });

    editor.use(ContextMenuPlugin, {
        searchBar: false,
        searchKeep: title => true,
        delay: 100,
        allocate(component) {
            return ["Create"];
        },
        rename(component) {
            return component.name;
        },
        items: {
            Save() {
                const filename = editor.id + ".json";
                downloadModel(filename);
            }
        },
        nodeItems: node => {
            if (node.name === "BotInput") {
                return {
                    "Entry Node"() {
                        console.log("TODO: Make this the entry node");
                    },
                    Delete: true,
                    Clone: true
                };
            } else if (node.name === "Exit") {
                return {
                    Delete: true,
                    Clone: true
                };
            }
        }
    });

    const engine = new Rete.Engine("covid-assessment@1.0.0");
    const components = [new BotInputNode(), new ExitNode()];
    components.forEach(component => {
        editor.register(component);
        engine.register(component);
    });

    async function compile() {
        await engine.abort();
        await engine.process(editor.toJSON());
    }

    editor.on(
        "process nodecreated noderemoved connectioncreated connectionremoved",
        () => {
            if (editor.silent) return;
            compile();
        }
    );

    editor.fromJSON(data).then(() => {
        arrangeNodes();
        editor.view.resize();
        AreaPlugin.zoomAt(editor);
        compile();
    });
}

function downloadModel(filename) {
    const json = editor.toJSON();
    const jsonString = JSON.stringify(json, null, "\t");
    const element = document.createElement("a");
    element.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," + encodeURIComponent(jsonString)
    );
    element.setAttribute("download", filename);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

function arrangeNodes() {
    editor.trigger("arrange", {});
    // new AutoArrange(editor).arrange(editor.nodes[0]);
    AreaPlugin.zoomAt(editor, editor.nodes);
}
