import numeral from 'numeral';
import dayjs from 'dayjs';

function formatDate(value: dayjs.Dayjs, format: string) {
  const result = value ? dayjs(value).format(format) : 'NA';
  return result;
}

export default class format {
  static number = (num: number) => numeral(num).format('0,0.00');

  static ordinal = (num: number) => numeral(num).format('Oo');

  static money = (num: number) => numeral(num).format('$0,0.00');

  static percentage = (num: number) => num < 0.10 ? numeral(num).format('0[.]00%') : numeral(num).format('0%');

  static shortDate = (date: dayjs.Dayjs) => formatDate(date, 'MM/DD/YYYY');

  static shortDateRange = (date1: dayjs.Dayjs, date2: dayjs.Dayjs) => {
    return `${format.shortDate(date1)} - ${format.shortDate(date2)}`;
  }

  static shortNamedDate = (date: dayjs.Dayjs) => formatDate(date, 'MMM DD, YYYY');

  static shortNamedDateRange = (date1: dayjs.Dayjs, date2: dayjs.Dayjs) => {
    return `${format.shortNamedDate(date1)} - ${format.shortNamedDate(date2)}`;
  }

  static shortNamedDateAndTime = (date: dayjs.Dayjs) => formatDate(date, 'MMM DD, YYYY - hh:mma');
}
