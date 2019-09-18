import React from 'react';

import * as moment from 'moment';
import { getMonths, getRanges } from '../time';
import * as npmStats from '../npm-stats'

export default class Statistics extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      records: [],
    };
  }

  async componentDidMount() {
    const pkg = '@openzeppelin/contracts';
    const start = moment('2019-01-01');

    const months = getMonths(start, moment());

    const downloads = await Promise.all(getRanges([...months, moment()]).map(([start, end]) =>
      npmStats.query(pkg, start, end)
    ));

    const records = [];
    for (let i = 0; i < months.length; ++i) {
      records.push({ month: months[i], downloads: downloads[i] });
    }

    this.setState( { records });
  }

  render() {
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
  }
}
