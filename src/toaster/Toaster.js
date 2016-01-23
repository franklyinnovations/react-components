import React from 'react';
import cx from 'classnames';
import ReactTransitionGroup from 'react/lib/ReactTransitionGroup';
import cloneWithProps from 'react/lib/cloneWithProps';
import { warn } from '../utils/log';
import TransitionWrapper from '../transition-wrapper/TransitionWrapper';

/**
 * ### Renders and animates toasts (children) inline or in a portal
 */
export default class Toaster extends React.Component {

  static propTypes = {
    /**
     * list of toasts (any node with a unique key)
     */
    children: React.PropTypes.node.isRequired,
    /**
     * id of the element you want to render the `Toaster` in
     */
    attachTo: React.PropTypes.string,
    /**
     * custom settings for `ReactTransitionGroup`
     */
    transitionGroup: React.PropTypes.object,
    /**
     * object with style for each transition event (used by `TransitionWrapper`)
     */
    transitionStyles: React.PropTypes.object,
    /**
     * duration of enter transition in milliseconds (used by `TransitionWrapper`)
     */
    transitionEnterTimeout: React.PropTypes.number.isRequired,
    /**
     * duration of leave transition in milliseconds (used by `TransitionWrapper`)
     */
    transitionLeaveTimeout: React.PropTypes.number.isRequired,
    id: React.PropTypes.string,
    className: React.PropTypes.string,
    style: React.PropTypes.object
  }

  static defaultProps = {
    transitionGroup: {}
  }

  componentWillMount() {
    this.appendToaster();
    this.renderToaster();
  }

  componentDidMount() {
    const node = this.props.attachTo ? this.toaster : React.findDOMNode(this).parentNode;
    const { position } = window.getComputedStyle(node);
    if (position !== 'relative' && position !== 'absolute') {
      warn(['Toaster\'s parent node should have "position: relative/absolute"', node]);
    }
  }

  componentWillUnmount() {
    this.removeToaster();
  }

  getTranslationStyle(i) {
    return {
      transform: `translateY(${100 * i}%)`,
      position: 'absolute',
      top: 0,
      right: 0
    };
  }

  getToasts = () => {
    const { children, transitionStyles, transitionEnterTimeout, transitionLeaveTimeout } = this.props;
    return React.Children.map(children, (el, i) => {
      return (
        <TransitionWrapper
          {...{ transitionStyles, transitionEnterTimeout, transitionLeaveTimeout }}
          style={this.getTranslationStyle(i)}
          key={el.key}
        >
          {cloneWithProps(el, { uniqueKey: el.key })}
        </TransitionWrapper>
      );
    });
  }

  appendToaster = () => {
    if (this.props.attachTo) {
      this.toaster = document.getElementById(this.props.attachTo);
    }
  }

  removeToaster = () => {
    if (this.toaster && this.props.attachTo) {
      this.toaster.innerHTML = ''; // stupid??
    }
  }

  getToaster = () => {
    const { style: styleProp, id, className } = this.props;
    const style = {
      position: 'absolute',
      right: 0,
      top: 0,
      width: 0,
      height: 0,
      ...styleProp
    };

    return (
      <div className={cx('toaster', className)} {...{ style, id }}>
        <ReactTransitionGroup {...this.props.transitionGroup}>
          {this.getToasts()}
        </ReactTransitionGroup>
      </div>
    );
  }

  renderToaster = () => {
    if (this.props.attachTo) {
      React.render(this.getToaster(), this.toaster);
    }
  }

  render() {
    if (this.props.attachTo) {
      return null;
    } else {
      return this.getToaster();
    }
  }

  componentDidUpdate() {
    this.renderToaster();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.attachTo !== nextProps.attachTo) {
      warn('You can\'t change "attachTo" prop after the first render!');
    }
  }

}