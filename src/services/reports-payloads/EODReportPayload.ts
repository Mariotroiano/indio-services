export class EODReportPayload {
  id: string;
  date: string;
  chargeList: Charge[] = [];
  receiptList: Receipt[] = [];
  chargeTotal: number;
  receiptTotal: number;
  movement: number;
  creditMovement: number;
  debitMovement: number;
  openingBalance: number;
  closingBalance: number;
};

type Charge = {
  id: string;
  glAccountCode: string;
  description: string;
  totalCharge: string;
};

type Receipt = {
  id: string;
  receiptType: string;
  description: string;
  totalReceipts: string;
};
