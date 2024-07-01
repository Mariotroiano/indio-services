import { Dayjs } from 'dayjs';
export type { Dayjs };

export type DateRange = [Dayjs, Dayjs];

export class DateRangeFormat {
  static toISOString(range: DateRange | Dayjs[]) {
    const values = range?.map(val => val && toISODate(val));
    return values;
  }

  static toString(range: DateRange | Dayjs[]) {
    const values = DateRangeFormat.toISOString(range);
    return values.join(', ');
  }

  static toPeriod(range: DateRange | Dayjs[]) {
    const values = DateRangeFormat.toISOString(range);
    const result = values.join('...');
    return result;
  }
  
  static rangeComplete(range: DateRange | Dayjs[]): boolean {
    const isComplete = !!range && !!range[0] && !!range[1];
    return isComplete;
  }
}

function toISODate(date: Dayjs) {
  return date.startOf('day').toISOString().replace(/T.*/, '');
}
