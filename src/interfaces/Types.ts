import { Dayjs } from 'dayjs';

export type DateRange = [Dayjs, Dayjs];

export type Fee = [amount: number, type: '$' | '%'];
