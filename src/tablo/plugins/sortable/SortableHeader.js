import React from 'react';
import cx from 'classnames';
import { pure, skinnable } from 'revenge';
import t, { maybe, enums } from 'tcomb';
import { props } from 'tcomb-react';
import FlexView from 'react-flexview';
import Arrow from './Arrow';

@skinnable()
@pure
@props({
  sortDir: maybe(enums.of(['asc', 'desc'], 'sortDir')),
  children: t.ReactChildren
})
export default class SortableHeader extends React.Component {

  getLocals({ sortDir, children }) {
    return {
      arrowDir: sortDir === 'asc' ? 'up' : sortDir === 'desc' ? 'down' : 'up-down',
      classNames: cx({
        sorted: !!sortDir,
        [`sort-${sortDir}`]: !!sortDir
      }),
      children
    };
  }

  template({ arrowDir, classNames, children }) {
    return (
      <FlexView className={cx('sortable-header', classNames)} vAlignContent='center' grow height='100%'>
        <FlexView grow height='100%' vAlignContent='center'>
          {children}
        </FlexView>
        <FlexView
          className='sort-icon'
          vAlignContent='center'
          hAlignContent='center'
          basis={20}
          shrink={false}
          height='100%'
        >
          <Arrow arrowDir={arrowDir} />
        </FlexView>
      </FlexView>
    );
  }
}
