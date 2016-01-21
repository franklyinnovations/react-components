import React from 'react';
import Select from 'react-select';
import omit from 'lodash/object/omit';
import cx from 'classnames';
import { warn } from '../utils/log';

const themes = {
  semantic: 'semantic-theme'
};

const PropTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.node,
    React.PropTypes.element,
    React.PropTypes.array
  ]),
  theme: React.PropTypes.oneOf(['semantic']),
  valueLink: React.PropTypes.shape({
    value: React.PropTypes.string,
    requestChange: React.PropTypes.func
  })
};

export default class Dropdown extends React.Component {

  static propTypes = PropTypes

  getChildren = () => [].concat(this.props.children || [])

  renderOption = (option) => this.getChildren()[option.value]

  renderValue = (option) => this.getChildren()[option.value]

  getGeneralProps = () => {
    if (this.props.children && this.props.options) {
      warn('You\'re passing both children and options. Children will override options!');
    }
    return omit(this.props, Object.keys(PropTypes));
  }

  getChildrenProps = () => {
    if (this.props.children) {
      const options = this.getChildren().map((c, index) => {
        return {
          value: index,
          label: index
        };
      });

      return {
        options,
        valueRenderer: this.renderValue,
        optionRenderer: this.renderOption
      };
    }
  }

  getValueLinkProps = () => {
    if (this.props.valueLink) {
      return {
        value: this.props.valueLink.value,
        onChange: this.props.valueLink.requestChange
      };
    }
  }

  getClassName = () => cx(this.props.className, themes[this.props.theme])

  render() {
    // The order is important: props may override previous ones
    return (
      <Select
        {...this.getGeneralProps()}
        {...this.getChildrenProps()}
        {...this.getValueLinkProps()}
        {...this.getClassName()}
      />
    );
  }

}
