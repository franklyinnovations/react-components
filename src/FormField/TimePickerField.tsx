import * as React from 'react';
import { props, t, ReactChild } from '../utils';
import * as cx from 'classnames';
import View from 'react-flexview';
import TimePicker from '../TimePicker';
import { FormField } from './FormField';

export namespace TimePickerField {
  export type Props = {
    /** the label for the field */
    label: JSX.Element | string,
    /** whether the field is required */
    required?: boolean,
    /** optional props to pass to the wrapping View */
    viewProps?: View.Props,
    /** an optional class name to pass to top level element of the component */
    className?: string,
    /** an optional style object to pass to top level element of the component */
    style?: React.CSSProperties,
    /** an optional id passed to the input component */
    id?: string
  } & TimePicker.Props;
}

export const Props = {
  label: ReactChild,
  required: t.maybe(t.Boolean),
  viewProps: t.maybe(t.Object)
}

@props(Props, { strict: false })
export class TimePickerField extends React.PureComponent<TimePickerField.Props> {
  render() {
    const { label, required, className: _className, id, viewProps, disabled, ...timePickerProps } = this.props;
    const className = cx('time-picker-field', _className);

    return (
      <FormField
        label={label}
        required={required}
        className={className}
        fieldId={id}
        viewProps={viewProps}
        disabled={disabled}
      >
        <TimePicker {...timePickerProps} disabled={disabled} id={id} />
      </FormField>
    );
  }
}