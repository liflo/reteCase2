import React from "react";
import styled from "styled-components";
import { Icon } from "../Views/Icon";

// MARK: Constants

const DefaultWidth = 80;

// MARK: Types

// eslint-disable-next-line @typescript-eslint/no-namespace
declare module PrimaryAction {
    export type Props = {
        value: string;
        icon?: SVGElement;
        width: number;
    };

    export type State = {
        value?: string;
        icon?: SVGElement;
        width: number;
    };
}

// MARK: Styles

const Styled = {
    Container: styled.div`
        position: relative;
        display: inline-flex;
        margin-bottom: 8px;
        padding: 0;
    `,
    PrimaryAction: styled.button`
        align-self: flex-end;
        background: linear-gradient(
            119.16deg,
            rgb(0, 118, 129) 0%,
            rgb(0, 132, 132) 100%
        );
        border: none;
        border-radius: 28px;
        box-shadow: rgba(0, 0, 0, 0.12) 0px 2px 8px,
            rgba(0, 0, 0, 0.06) 0px 1px 4px;
        box-sizing: border-box;
        color: white;
        cursor: pointer;
        display: flex;
        font-family: "Roboto", sans-serif;
        font-size: 20px;
        font-weight: normal;
        height: 56px;
        justify-content: space-between;
        margin: 0;
        margin-bottom: 0;
        min-width: 100px;
        overflow: visible;
        padding: 14px 20px 14px 16px;
        text-transform: none;
        transition: background 0.4s ease 0s;
        -webkit-appearance: button;
        -webkit-box-pack: justify;
    `
};

// MARK: Component

export class PrimaryActionControl extends React.Component<
    PrimaryAction.Props,
    PrimaryAction.State
> {
    mounted: boolean;
    state = {
        width: DefaultWidth,
        icon: null,
        value: null
    };

    constructor(props: PrimaryAction.Props) {
        super(props);

        this.state = {
            width: DefaultWidth,
            icon: props.icon || null,
            value: props.value
        };

        this.setValue = this.setValue.bind(this);
    }

    componentDidMount() {
        this.mounted = true;
    }

    setValue(event: { target: { value: any } }) {
        const { value } = event.target;
        this.setState({ value });
    }

    actionButton() {
        const { value, icon } = this.state;

        return (
            <Styled.PrimaryAction>
                <span className={`action-title`}>{value}</span>
                <Icon />
            </Styled.PrimaryAction>
        );
    }

    render() {
        return <Styled.Container>{this.actionButton()}</Styled.Container>;
    }
}
