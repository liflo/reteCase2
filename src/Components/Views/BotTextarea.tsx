import React from "react";
import styled from "styled-components";

// MARK: Constants

const FontSize = 24;
const MinHeight = FontSize + 18;
const BottomPadding = 2;
const DefaultHeight = MinHeight * 2;

// MARK: Types

// eslint-disable-next-line @typescript-eslint/no-namespace
declare module BotText {
    export type Props = {
        value: string;
        height: number;
    };

    export type State = {
        height: number;
        value?: string;
    };
}

// MARK: Styles

const Styled = {
    ExpandingTextarea: styled.textarea`
        background: transparent;
        border-style: none;
        box-shadow: none;
        display: block;
        font-family: "Roboto", sans-serif;
        font-size: ${FontSize}px;
        font-weight: lighter;
        margin: 8px 0;
        min-height: ${MinHeight}px;
        outline: none;
        overflow: hidden;
        padding: 0;
        text-align: left;
        transition: height 0.2s ease;
        width: 100%;
    `,
    GhostArea: styled.div`
        border-style: none;
        box-shadow: none;
        display: block;
        font-family: "Roboto", sans-serif;
        font-size: ${FontSize + BottomPadding}px;
        font-weight: lighter;
        margin: 0;
        min-height: ${MinHeight}px;
        opacity: 0.3;
        outline: none;
        overflow: hidden;
        padding: 0;
        position: absolute;
        text-align: left;
        top: 0;
        visibility: hidden;
        white-space: pre-wrap;
        width: 100%;
        word-wrap: break-word;
    `,
    TextContainer: styled.div`
        position: relative;
    `
};

// MARK: Component

export class BotTextarea extends React.Component<BotText.Props, BotText.State> {
    mounted: boolean;
    ghost: any;
    state = {
        height: DefaultHeight,
        value: null
    };

    constructor(props: BotText.Props) {
        super(props);

        this.state = {
            height: DefaultHeight,
            value: props.value
        };

        this.setValue = this.setValue.bind(this);
        this.setHeight = this.setHeight.bind(this);
    }

    componentDidMount() {
        this.mounted = true;
        window.setTimeout(() => this.setHeight(), 1);
    }

    setHeight() {
        if (!this.mounted) {
            return;
        }
        this.setState({ height: this.ghost.clientHeight });
    }

    setValue(event: { target: { value: any } }) {
        const { value } = event.target;
        this.setState({ value });
    }

    expandableField() {
        const isOneLine = this.state.height <= DefaultHeight;
        const { height, value } = this.state;

        return (
            <Styled.ExpandingTextarea
                key={this.state.value + "BotTextArea"}
                autoFocus={true}
                defaultValue={value}
                style={{
                    height,
                    resize: isOneLine ? "none" : null
                }}
                onChange={this.setValue}
                onKeyUp={this.setHeight}
            />
        );
    }

    ghostField() {
        return (
            <Styled.GhostArea
                ref={c => (this.ghost = c)}
                aria-hidden="true"
                key={this.state.value + "BotTextArea-Ghost"}>
                {this.state.value}
            </Styled.GhostArea>
        );
    }

    render() {
        return (
            <Styled.TextContainer
                key={this.state.value + "BotTextArea-Container"}>
                {this.expandableField()}
                {this.ghostField()}
            </Styled.TextContainer>
        );
    }
}
