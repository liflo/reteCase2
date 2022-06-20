import React from "react";
import styled from "styled-components";
import { Control } from "rete";
import { ReactControl } from "./ReactControl";
import { BotTextarea } from "../Views/BotTextarea";

const Styled = {
    BotText: styled.div`
        text-align: left;
        margin: 0;
        padding: 0;
    `,
    Divider: styled.hr`
        border: 1px solid #bbbbbb;
        border-radius: 2px;
        width: 25%;
        position: absolute;
    `
};

export class BodyControl extends Control {
    constructor(emitter, data, id, elementType, readonly = false) {
        super(id);

        this.render = "react";
        this.component = ReactControl;
        this.props = {
            emitter,
            id,
            data,
            readonly,
            name: elementType,
            onChange: event => {
                this.putData(event.target.id, event.target.value);
                this.update();
            },
            putData: () => this.putData.apply(this, arguments),
            render: () => this.renderControl()
        };
    }

    generateBody() {
        if (this.props.data && this.props.data.length > 0) {
            var unique = 0;
            return this.props.data.map(item => {
                return (
                    <BotTextarea
                        key={this.props.id + "_TEXT_" + unique++}
                        id={this.props.id}
                        readOnly={this.props.readonly}
                        value={item}
                        onChange={e => this.props.onChange(e)}
                    />
                );
            });
        } else {
            return <></>;
        }
    }

    renderControl() {
        return (
            <Styled.BotText key={this.props.id}>
                {this.generateBody()}
                <Styled.Divider />
            </Styled.BotText>
        );
    }
}
