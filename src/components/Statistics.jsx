import React from 'react';
import { Line } from 'rc-progress';
import DateRow from './DateRow';

import moment from 'moment';
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
    const start = moment('2018-01-01');

    const months = getMonths(start, moment());
    const step = 100 / months.length;

    const downloads = await Promise.all(getRanges([...months, moment()]).map(async ([start, end]) => {
      const count = await query(this.state.package, start, end);

      this.setState({ progress: this.state.progress + step });

      return count;
    }));

    const records = [];
    for (let i = 0; i < months.length; ++i) {
      records.push({ date: months[i], data: downloads[i] });
    }

    this.setState( { done: true, records });
  }

  splitInSextuplets(arr) {
    const sextuplets = [];

    while (arr.length > 0) {
      sextuplets.push(arr.slice(0, 6));
      arr = arr.slice(6);
    }

    return sextuplets;
  }

  render() {
    if (!this.state.done) {
      return (
        <Line percent={this.state.progress} strokeWidth="4" strokeColor="#D3D3D3" />
      );
    } else {
      return (
        <div>
        <text>{this.state.range} downloads for {this.state.package}</text>
        {
          this.splitInSextuplets(this.state.records).map(sextuplet =>
            <DateRow records={sextuplet} dateFormat='MMM-YY' />
          )
        }
        </div>
      );
    }
  }
}
