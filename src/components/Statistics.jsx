import React from 'react';
import { Line } from 'rc-progress';

import * as moment from 'moment';
import { getMonths, getRanges } from '../time';
import * as npmStats from '../npm-stats'

export default class Statistics extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      progress: 0,
      records: [],
    };
  }

  async componentDidMount() {
    const pkg = '@openzeppelin/contracts';
    const start = moment('2019-01-01');

    const months = getMonths(start, moment());
    const step = 100 / months.length;

    const downloads = await Promise.all(getRanges([...months, moment()]).map(async ([start, end]) => {
      const count = await npmStats.query(pkg, start, end);
      console.log(this.state.progress + step)
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
    if (this.state.done) {
      return (
        <div>
          {
            this.state.records.map(record =>
              <div>
                <text> {record.month.format('YYYY-MM')}: {record.downloads} </text>
                <br />
              </div>
            )
          }
        </div>
      )
    } else {
      return (
        <Line percent={this.state.progress} strokeWidth="4" strokeColor="#D3D3D3" />
       )
    }
  }
}
