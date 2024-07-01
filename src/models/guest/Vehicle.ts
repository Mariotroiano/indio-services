import ModelBuilder from 'utils/ModelBuilder';
import { VehiclePayload } from 'services/payloads/VehiclePayload';
import { VehicleInfo } from 'models/reservation';
import { Equipment } from 'services/payloads/Equipment';
export type { Equipment };

export class Vehicle {
  id?: string;
  type: string;
  lengthRange: string;
  length: string;
  slides: string[] = [];
  towing: string;
  electrical: string[] = [];

  static Model = getModel(this);
}

function getModel(model: typeof Vehicle) {
  const fields = ModelBuilder.buildFields(model, {
    type: { label: 'RV Type' },
    lengthRange: { label: 'RV Size' },
    length: { label: 'RV Length', type: 'numeric' },
    slides: { label: 'RV Slide', type: 'multiple' },
    towing: { label: 'Towing' },
    electrical: { label: 'Electrical Service', type: 'multiple' },
  })
  .setInfos({
    type: 'Select the guest’s RV type.',
    lengthRange: 'Select the guest’s RV length-range (in feet).',
    length: 'Select the guest’s RV length (in feet).',
    slides: 'Select the guest’s RV slide out configuration.',
    towing: 'Select the guest’s RV towing vehicle.',
    electrical: 'Select the guest’s RV electrical service requirements.',
  })
  .build();

  const buildPayload = (entity: Vehicle, guestId: string): VehiclePayload => {
    const payload = VehiclePayload.new(entity);
    payload.guestId = guestId;
    return payload;
  }

  class Model {
    static fields = fields;
    static buildPayload = buildPayload;
  }

  return Model;
}

export function getEquipment(vehicle: VehicleInfo) {
  const equipment: Equipment = {
    type: vehicle.vehicleType,
    height: null,
    width: null,
    length: null, // vehicle.vehicleLengthRange,
    electrical: vehicle.vehicleElectrical,
    slides: vehicle.vehicleSlides,
    towing: vehicle.vehicleTowing,
  }
  return equipment;
}

