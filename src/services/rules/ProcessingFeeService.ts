import { AxiosInstance } from 'axios';
import { ServiceBase } from 'services/client/ServiceBase';
import { ProcessingFeePayload } from 'services/payloads/ProcessingFeePayload';

export default class ProcessingFeeService extends ServiceBase<ProcessingFeePayload> {

  constructor(ax: AxiosInstance) {
    super(ProcessingFeePayload, ax, 'processing_fees');
  }

}
