import { TableInstance } from 'services/TableInstance';
import { LongTermRequestPayload } from './payloads/LongTermRequestPayload';
import { ServiceBase } from './client/ServiceBase';
import { AxiosInstance } from 'axios';


const item = JSON.parse(`{"id":"id0",
  "guest":{"parkId":"fb49009a-ae2d-4ea1-bf98-735a97289762","primaryPaymentMethodId":"a5e92a1e-f106-4268-afe4-97f59ed6cb75","firstName":"Ned","middleName":null,"lastName":"Flanders","fullName":"Flanders, Ned","title":null,"email":"ned.flanders@mail.com","id":"f5edc430-01cc-4e0f-a87f-882acbc7b4b8"},
  "siteTypeId":"37242f50-b804-450a-86ba-010e5b6c9c9c","siteTypeName":"Pull-Thru","dateRange":["2022-01-26T13:43:41.294Z","2022-03-02T13:43:41.294Z"],"vehicleType":"fifth-wheel","vehicleLengthRange":"length-21-30","vehicleTowing":"motorcycle","vehicleSlides":["driver","passenger"],"vehicleElectrical":["20-amp","30-amp"],
  "arrivalDate":"2022-01-26T13:43:41.294Z","departureDate":"2022-03-02T13:43:41.294Z","requestNum":"LTR18990"}`);

export default class LongTermRequestService extends ServiceBase<LongTermRequestPayload> {
  constructor(ax: AxiosInstance) {
    super(LongTermRequestPayload, ax, 'long_term_request');
  }

  static getById = async (id: string) => {
    // const result = await client.getById(id);
    return item;
  }

  findForTable = async (table: TableInstance, parkId: string) => {
    // const result = await client.findForTable(table, { parkId });
    return [item];
  }

  getAll = async (parkId: string) => {
    const params = { filter: { parkId } };
    let result = await this.client.getAll(params);
    result = [item];
    return result;
  };

}
