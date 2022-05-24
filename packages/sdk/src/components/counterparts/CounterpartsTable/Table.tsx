import { h } from 'preact';
import { CounterpartsTable, MoniteProvider } from '@monite/react-kit';

import UIElement from '../../UIElement';

class TableElement extends UIElement {
  render() {
    const { modules, ...props } = this.props;

    return (
      <MoniteProvider api={modules.api}>
        <CounterpartsTable {...props} />
      </MoniteProvider>
    );
  }
}

export default TableElement;
