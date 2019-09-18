import get from 'axios';

export async function query(pkg, from, to) {
  const response = await get(getURL(pkg, from, to));
  return response.data.downloads;
}

function getURL(pkg, from, to) {
  return `https://api.npmjs.org/downloads/point/${from.format('YYYY-MM-DD')}:${to.format('YYYY-MM-DD')}/${pkg}`;
}
