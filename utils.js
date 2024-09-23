export const farenheitToCelcius = (temp) => {
  return ((temp - 32) * (5 / 9)).toFixed(1)
}

export const formatPlace = (data) => {
  let places = data.split(',', 2)
  return [formatString(places[0]), formatString(places[1])]
}

export const formatString = (str) => {
  str = str.trim().toLowerCase();
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const formatDate = (date) => {
  let rawDate = date.split('-');
  let day = rawDate[2]
  let suffix = getSuffix(day)
  let month = getMonth(rawDate[1])
  let year = rawDate[0]

  return `${day}${suffix} ${month} ${year}`
}

export const getSuffix = (n) => {

  if (n === '11' || n === '12' || n === '13') {
    return 'th';
  }

  let charArr = n.split('');
  let lastNum = charArr.pop();

  switch (lastNum) {
    case '1': return 'st';
    case '2': return 'nd';
    case '3': return 'rd';
    default: return 'th';
  }
}

export const getMonth = (n) => {
  switch (n) {
    case '01': return 'Jan';
    case '02': return 'Feb';
    case '03': return 'Mar';
    case '04': return 'Apr';
    case '05': return 'May';
    case '06': return 'Jun';
    case '07': return 'Jul';
    case '08': return 'Aug';
    case '09': return 'Sep';
    case '10': return 'Oct';
    case '11': return 'Nov';
    case '12': return 'Dec';
  }
}