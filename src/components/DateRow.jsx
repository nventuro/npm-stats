import React from 'react';
import Table from 'rc-table';

import numeral from 'numeral';

export default class DateRow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      records: props.records,
      dateFormat: props.dateFormat,
    };
  }

  render() {
    const columns = this.state.records.map(record => ({
      title: record.date.format(this.state.dateFormat),
      dataIndex: record.date.format(),
    }));

    const data = [this.state.records.reduce((records, record) =>
      ({ ...records, [record.date.format()]: numeral(record.data).format('0a') }), {}
    )];

    return (
      <Table columns={columns} data={data}/>
    );
  }
}
