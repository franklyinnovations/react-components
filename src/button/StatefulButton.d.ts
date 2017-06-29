import { PureComponent } from 'react';
import { ButtonProps } from './Button';

export namespace StatefulButtonProps {
  type ButtonBaseState = 'ready' | 'success' | 'not-allowed';
}

export type StatefulButtonProps = ButtonProps & {
  baseState?: StatefulButtonProps.ButtonBaseState,
  stableSuccess?: boolean,
  timerMillis?: number
};

export default class StatefulButton extends PureComponent<StatefulButtonProps, void> {}