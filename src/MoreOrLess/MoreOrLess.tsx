import * as React from "react";
import * as cx from "classnames";
import { props, t, ReactChildren, ReactChild } from "../utils";
import FlexView from "react-flexview";

export namespace MoreOrLess {
  export type Props = {
    /** panel content */
    children: any; // TODO: t.ReactChildren
    /** whether the panel should be expanded or not */
    expanded: boolean;
    /** called on toggle */
    onExpandedChange: (expanded: boolean) => void;
    /** icons for expanded and collapsed panel */
    icons: {
      expanded: JSX.Element;
      collapsed: JSX.Element;
    };
    /** props for wrapper FlexView */
    wrapperProps?: object;
    /** an optional class name to pass to the component */
    className?: string;
    /** an optional style object to pass to the component */
    style?: React.CSSProperties;
  };
}

export const Props = {
  children: ReactChildren,
  expanded: t.Boolean,
  onExpandedChange: t.Function,
  icons: t.struct({
    expanded: ReactChild,
    collapsed: ReactChild
  }),
  wrapperProps: t.maybe(t.Object),
  className: t.maybe(t.String),
  style: t.maybe(t.Object)
};

/**
 * A panel used to alternately display short or long version of the content
 */
@props(Props)
export class MoreOrLess extends React.PureComponent<MoreOrLess.Props> {
  toggleExpanded = () => {
    this.props.onExpandedChange(!this.props.expanded);
  };

  templateExpandButton = (
    icon: JSX.Element,
    toggleExpanded: React.EventHandler<React.SyntheticEvent<HTMLDivElement>>
  ) => {
    return (
      <FlexView
        hAlignContent="center"
        vAlignContent="center"
        className="expand-button"
        onClick={toggleExpanded}
        shrink={false}
      >
        {icon}
      </FlexView>
    );
  };

  render() {
    const {
      props: { children, className, style, expanded, icons, wrapperProps },
      toggleExpanded
    } = this;

    const panelState = expanded ? "more" : "less";
    const icon = expanded ? icons.expanded : icons.collapsed;

    return (
      <FlexView
        column
        shrink={false}
        {...wrapperProps}
        style={style}
        className={cx("more-or-less", panelState, className)}
      >
        {children}
        {this.templateExpandButton(icon, toggleExpanded)}
      </FlexView>
    );
  }
}
