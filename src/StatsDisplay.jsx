import React from 'react';

import get from 'axios';
import * as moment from 'moment';

export default class StatsDisplay extends React.Component {
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

    const downloads = await Promise.all(months.map(month =>
      query(pkg, `${month.format('YYYY-MM-DD')}:${getMonthEnd(month).format('YYYY-MM-DD')}`)
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

function getMonths(from, to) {
  const months = [];

  for (let current = from; current.isBefore(to); current = current.add(1, 'M')) {
    months.push(current.clone());
  }

  return months;
}

function getMonthEnd(time) {
  return time.clone().add(1, 'M').subtract(1, 'd');
}

async function query(pkg, period) {
  const response = await get(getURL(pkg, period));
  return response.data.downloads;
}

function getURL(pkg, period) {
  return `https://api.npmjs.org/downloads/point/${period}/${pkg}`;
}
