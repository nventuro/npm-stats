import React from 'react';
import { Line } from 'rc-progress';
import Table from 'rc-table';

import moment from 'moment';
import numeral from 'numeral';
import { getMonths, getRanges } from '../time';
import { query } from '../npm-stats'

export default class Statistics extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      package: props.package,
      range: props.range,
      progress: 0,
      records: [],
    };
  }

  async componentDidMount() {
    const start = moment('2019-01-01');

    const months = getMonths(start, moment());
    const step = 100 / months.length;

    const downloads = await Promise.all(getRanges([...months, moment()]).map(async ([start, end]) => {
      const count = await query(this.state.package, start, end);

      this.setState({ progress: this.state.progress + step });

      return count;
    }));

    const records = [];
    for (let i = 0; i < months.length; ++i) {
      records.push({ month: months[i], downloads: downloads[i] });
    }

    this.setState( { done: true, records });
  }

  render() {
    if (!this.state.done) {
      return (
        <Line percent={this.state.progress} strokeWidth="4" strokeColor="#D3D3D3" />
      );
    } else {
      const columns = this.state.records.map(record => ({
        title: record.month.format('MMM-YY'),
        dataIndex: record.month.format(),
      }));

      const data = [this.state.records.reduce((records, record) =>
        ({ ...records, [record.month.format()]: numeral(record.downloads).format('0a') })
      )];

      return (
        <div>
        <text>{this.state.range} downloads for {this.state.package}</text>
        <Table columns={columns} data={data}/>
        </div>
      );
    }
  }
}
