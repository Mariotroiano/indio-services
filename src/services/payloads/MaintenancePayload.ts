import { PayloadBase } from './PayloadBase';

export class MaintenancePayload extends PayloadBase {
  id: string;
  siteTypeId: string;
  siteTypeName: string;
  siteTypeLabel: string;
  name: string;
  label: string;
  siteNumber: string;
  status: string;
  siteStatus: string;
  hasTasks: boolean;
  housekeeping: string;
  housekeepingActions: string[];
  utilities: string;
  utilitiesActions: string[];
  inspection: string;
  inspectionActions: string[];
  action: string;
  taskList: string[];
  lastInspectedBy: string;
  lastInspectedById: string;
  lastInspectedAt: string;
  mostRecentStay?: {
    id: string,
    confirmationNumber: string,
    arrivalDate: string,
    departureDate: string,
    status: string,
    rateType: string,
  }
  createdAt: string;
  updatedAt: string;
};
