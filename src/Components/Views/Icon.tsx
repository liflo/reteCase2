import * as React from "react";
import * as PropTypes from "prop-types";

export type RequiredIconProps = Pick<
    React.HTMLProps<SVGElement>,
    Exclude<keyof React.HTMLProps<SVGElement>, "ref">
> & {
    async?: boolean;
    awaitingInput?: boolean;
};

export type DefaultIconProps = {
    async: boolean;
    awaitingInput: boolean;
};

export type IconProps = RequiredIconProps & Partial<DefaultIconProps>;
export type IconState = { awaitingInput: boolean };

type InnerIconProps = IconProps & {
    innerRef: React.RefObject<SVGElement> | null;
};

class IconClass extends React.Component<InnerIconProps, IconState> {
    static defaultProps: DefaultIconProps = {
        async: false,
        awaitingInput: true
    };

    static propTypes: {
        [key in keyof InnerIconProps]: PropTypes.Requireable<any>
    } = {
        awaitingInput: PropTypes.bool,
        async: PropTypes.bool,
        innerRef: PropTypes.object
    };

    state = {
        awaitingInput: true
    };

    svg = this.props.innerRef || React.createRef<SVGElement>();
    currentValue: InnerIconProps["value"];

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
                key={this.props.id + `_ICON`}
                onChange={this.onChange}
                viewBox={`0 0 24 24`}
                version={`1.1`}
                className={`icon`}>
                <path
                    fillRule={`evenodd`}
                    fill={`white`}
                    d={`M12 4L10.59 5.41L16.17 11H4V13H16.17L10.59 18.59L12 20L20 12L12 4Z`}
                />
            </svg>
        );
    }
}

export const Icon = React.forwardRef(
    (props: IconProps, ref: React.RefObject<SVGElement> | null) => {
        return <IconClass {...props} innerRef={ref} />;
    }
);
