import * as React from "react";
import * as PropTypes from "prop-types";

export type RequiredBotProps = Pick<
    React.HTMLProps<SVGElement>,
    Exclude<keyof React.HTMLProps<SVGElement>, "ref">
> & {
    async?: boolean;
    awaitingInput?: boolean;
};

export type DefaultBotProps = {
    async: boolean;
    awaitingInput: boolean;
};

export type BotProps = RequiredBotProps & Partial<DefaultBotProps>;
export type BotState = { awaitingInput: boolean };

type InnerBotProps = BotProps & {
    innerRef: React.RefObject<SVGElement> | null;
};

class BotIndicatorClass extends React.Component<InnerBotProps, BotState> {
    static defaultProps: DefaultBotProps = {
        async: false,
        awaitingInput: true
    };

    static propTypes: {
        [key in keyof InnerBotProps]: PropTypes.Requireable<any>
    } = {
        awaitingInput: PropTypes.bool,
        async: PropTypes.bool,
        innerRef: PropTypes.object
    };

    state = {
        awaitingInput: true
    };

    svg = this.props.innerRef || React.createRef<SVGElement>();
    currentValue: InnerBotProps["value"];

    componentDidMount() {}

    componentWillUnmount() {}

    componentDidUpdate() {}

    onChange = (e: React.SyntheticEvent<SVGElement>) => {
        const { onChange } = this.props;
        onChange && onChange(e);
    };

    render() {
        const {
            state: { awaitingInput }
        } = this;

        return (
            <svg
                key={this.props.id + `BotIndicator`}
                onChange={this.onChange}
                viewBox={`0 0 24 24`}
                version={`1.1`}
                className={`bot`}>
                <path
                    className={`botOutline`}
                    fillRule={`evenodd`}
                    d={`M12 .75a.69.69 0 01.692.689v1.378h1.385a.69.69 0 01.692.689.69.69 0 01-.692.689h-1.385v1.378a.69.69 0 01-.692.689.69.69 0 01-.693-.689V4.195H9.923a.69.69 0 01-.692-.689c0-.38.31-.689.692-.689h1.384V1.439c0-.38.31-.689.693-.689zm4.154 6.89H7.846C5.17 7.64 3 9.8 3 12.463c0 2.664 2.17 4.823 4.846 4.823h8.308c2.676 0 4.846-2.16 4.846-4.823 0-2.664-2.17-4.823-4.846-4.823zm-11.77 4.823a3.453 3.453 0 013.462-3.445h8.308a3.453 3.453 0 013.461 3.445 3.453 3.453 0 01-3.461 3.445H7.846a3.453 3.453 0 01-3.462-3.445zm4.155 6.89h6.923a.69.69 0 01.692.689.69.69 0 01-.692.689H8.539a.69.69 0 01-.693-.69c0-.38.31-.688.693-.688zm4.154 2.756h-1.385a.69.69 0 00-.692.689c0 .38.31.689.692.689h1.385a.69.69 0 00.692-.69.69.69 0 00-.692-.688z`}
                />
                <path
                    className={awaitingInput ? `botEyesOn` : `botEyesOff`}
                    fillRule={`evenodd`}
                    d={`M7.847 13.733c.765 0 1.385-.617 1.385-1.378 0-.761-.62-1.378-1.385-1.378s-1.384.617-1.384 1.378c0 .76.62 1.378 1.384 1.378zM12 13.733c.765 0 1.385-.617 1.385-1.378 0-.761-.62-1.378-1.384-1.378-.765 0-1.385.617-1.385 1.378 0 .76.62 1.378 1.385 1.378zM16.155 13.733c.765 0 1.385-.617 1.385-1.378 0-.761-.62-1.378-1.385-1.378s-1.385.617-1.385 1.378c0 .76.62 1.378 1.385 1.378z`}
                />
            </svg>
        );
    }
}

export const BotIndicator = React.forwardRef(
    (props: BotProps, ref: React.RefObject<SVGElement> | null) => {
        return <BotIndicatorClass {...props} innerRef={ref} />;
    }
);
