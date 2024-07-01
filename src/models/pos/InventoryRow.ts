import { Factory } from 'utils/Factory';
import ModelBuilder from 'utils/ModelBuilder';

export class InventoryRow {
  id: string;
  locationName: string;
  inventory: number;
  reorderPoint: number;
  reorderQuantity: number;

  static Model = Model();
}

function Model() {

  const fields = ModelBuilder.buildFields(InventoryRow, {
    locationName: { label: 'Location Name', type: 'switch' },
    reorderPoint: { label: 'Reorder Point', type: 'numeric' },
    reorderQuantity: { label: 'Reorder Quantity', type: 'numeric' },
  })
  .build();

  const mapModel = ModelBuilder.buildMapModel<InventoryRow, string>(payload => {
    const model = Factory.create(InventoryRow, {
      id: payload,
      inventory: Math.random() * 10 | 0,
      locationName: payload,
    });
    return model;
  });

  return { fields, mapModel };
};
