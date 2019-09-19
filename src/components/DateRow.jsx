import React from 'react';
import Table from 'rc-table';

import numeral from 'numeral';

export default function({ records, dateFormat }) {
  const columns = records.map(record => ({
    title: record.date.format(dateFormat),
    dataIndex: record.date.format(),
  }));

  const data = [records.reduce((aggregate, record) =>
    ({ ...aggregate, [record.date.format()]: numeral(record.data).format('0a') }), {}
  )];

  return (
    <Table columns={columns} data={data}/>
  );
}
