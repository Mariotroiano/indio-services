import { UtilityFeePayload } from './UtilityFeePayload';
import { AxiosInstance } from 'axios';
import { ServiceBase } from 'services/client/ServiceBase';
export default class UtilityFeeService extends ServiceBase<UtilityFeePayload> {
  constructor(ax: AxiosInstance) {
    super(UtilityFeePayload, ax, 'utility_fees');
  }
}
