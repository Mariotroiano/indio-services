import { AxiosInstance } from 'axios';
import { JsonApiClient } from 'services/client/JsonApiClient';

export default class VehicleLookupService {
  client: JsonApiClient<VehicleLookupPayload>;
  cached: VehicleParts<VehicleLookupPayload[]>;

  initialize(axiosInstance: AxiosInstance) {
    this.client = new JsonApiClient(VehicleLookupPayload, axiosInstance, 'vehicle-fake');
  }
  
  private getAll = async (path: string) => {    
    return this.client.get<VehicleLookupPayload[]>(path);
  }

  async getLookups() {
    if (this.cached) return this.cached;
    const getAll = this.getAll;

    const requests = {
      types: getAll(VehiclePath.Types),
      lengthRanges: getAll(VehiclePath.LengthRanges),
      slides: getAll(VehiclePath.Slides),
      towings: getAll(VehiclePath.Towings),
      electricals: getAll(VehiclePath.Electricals),
    };

    const settled = await Promise.allSettled(Object.values(requests));
    const responses = settled.map(item => item.status === 'fulfilled' && (item.value ?? []));
    const results = Object.fromEntries(Object.keys(requests).map((key, idx) => [key, responses[idx]]));
    const { types, lengthRanges, slides, towings, electricals } = results;
    const lookups = { types, lengthRanges, slides, towings, electricals };
    this.cached = lookups;

    return lookups;
  }

  getMaps = async () => {
    const results = await this.getLookups();
    const maps = convertAllToMap(results);
    return maps;
  }
}

const VehiclePath = {
  Electricals: 'vehicle_electricals',
  Types: 'vehicle_types',
  LengthRanges: 'vehicle_length_ranges',
  Slides: 'vehicle_slides',
  Towings: 'vehicle_towings',
}

type VehicleParts<T> = {
  types: T;
  lengthRanges: T;
  slides: T;
  towings: T;
  electricals: T;
  [key: string]: T;
}

export type VehicleMaps = VehicleParts<Map<string, string>>;

export class VehicleLookupPayload {
  id: string;
  abbr: string;
  label: string;
  description: string;
}

const convertAllToMap = async (values: VehicleParts<VehicleLookupPayload[]>) => {
  const keys = Object.keys(values);
  const entries = keys.map(key => {
    const lookup = values[key];
    const map = new Map(lookup.map(item => [item.id, item.label]));
    return [key, map];
  });

  const result = Object.fromEntries(entries) as VehicleMaps;
  return result;
};
