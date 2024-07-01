import { Reservation } from 'models';
import dayjs from 'dayjs';

export interface TimelineItem {
  id: string,
  title: string,
  label: string,
  startDate: dayjs.Dayjs,
  endDate: dayjs.Dayjs,
}

export function buildTimelineItems(list: Reservation[]) {
  const items = list.map<TimelineItem>(x => ({
    id: x.id,
    title: '', //`${x.firstName} ${x.lastName}`,
    label: `${x.nights} nights`,
    startDate: x.arrival,
    endDate: x.departure,
  }));
  return items;
}
