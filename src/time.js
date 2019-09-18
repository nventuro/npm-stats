// from is assumed to be the first day of a month
export function getMonths(from, to) {
  const months = [];

  for (let current = from; current.isBefore(to); current = current.add(1, 'M')) {
    months.push(current.clone());
  }

  return months;
}

export function getRanges(dates) {
  const ranges = [];

  for (let i = 0; i < (dates.length - 1); ++i) {
    ranges.push([dates[i].clone(), dates[i + 1].clone().subtract(1, 'd')]);
  }

  return ranges;
}

export function getMonthEnd(time) {
  return time.clone().add(1, 'M').subtract(1, 'd');
}
