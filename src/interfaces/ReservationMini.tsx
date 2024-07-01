import { Dayjs } from 'dayjs';

export class ReservationMini {
  constructor(
    public siteId: string,
    public siteTypeId: string,
    public startDate: Dayjs,
    public endDate: Dayjs,
  ) {
    this.siteId = siteId;
    this.siteTypeId = siteTypeId;
    this.startDate = startDate.startOf('day');
    this.endDate = endDate.startOf('day').add(1, 'day');
  }
}
