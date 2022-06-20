import React from "react";
import { EnumOptionControl } from "../Views/EnumOption";
import { PrimaryActionControl } from "../Views/PrimaryAction";
import { Node, Socket, Control } from "rete-react-render-plugin";

export class ReactNode extends Node {
    render() {
        const { node, bindSocket, bindControl } = this.props;
        const { outputs, controls, inputs, selected } = this.state;

        return (
            <div className={`node ${selected}`}>
                {/* Inputs */}
                {inputs.length === 0 ? (
                    <div className="input" key={node.id}>
                        <div className="node-title">{node.data.label}</div>
                    </div>
                ) : (
                    inputs.map(input => (
                        <div className="input" key={input.key}>
                            <Socket
                                type="input"
                                socket={input.socket}
                                io={input}
                                innerRef={bindSocket}
                            />
                            {!input.showControl() && (
                                <div className="input-title">
                                    {node.data.label}
                                </div>
                            )}
                            {input.showControl() && (
                                <Control
                                    className="input-control"
                                    control={input.control}
                                    innerRef={bindControl}
                                />
                            )}
                        </div>
                    ))
                )}
                {/* Controls */}
                {controls.map(control => (
                    <Control
                        className="control"
                        key={control.key}
                        control={control}
                        innerRef={bindControl}
                    />
                ))}
                {/* Spacer */}
                <div className="spacer" key={`spacer`} />
                {/* Outputs */}
                <div className="actions" key={`actions`}>
                    {outputs.map(output => (
                        <div className="output" key={output.key}>
                            <div className="output actions">
                                {this.generateActions(node, output.key)}
                            </div>
                            <div className="output sockets">
                                <Socket
                                    type="output"
                                    socket={output.socket}
                                    io={output}
                                    innerRef={bindSocket}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    generateActions(node, id) {
        const action = node.data.actions.find(function(act) {
            return act.id === id;
        });
        if (action.type === "ENUM_ACTION") {
            return <EnumOptionControl key={id} value={action.text} />;
        } else if (action.type === "PRIMARY_ACTION") {
            return <PrimaryActionControl key={id} value={action.text} />;
        }
    }
}
