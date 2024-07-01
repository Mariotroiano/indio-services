import { OptionItem } from 'interfaces/OptionItem';

const appliesToDictionary = {
  addonReservation: 'Add-on Reservation',
  siteReservation: 'Reservation',
  petFees: 'Pet Fees',
  lockedSiteFees: 'Locked Site Frees',
  occupancyFees: 'Occupancy Fees',
};
export type AppliesTo = keyof typeof appliesToDictionary;
export type DefaultAppliesTo = 'front_desk' | 'online';

export const appliesToOps = Object.keys(appliesToDictionary).map<OptionItem>(key => ({
  value: key,
  label: appliesToDictionary[key]
}));

export const defaultAppliesToOps: OptionItem[] = [
  { label: 'Front Desk', value: 'front_desk' },
  { label: 'Online', value: 'online' },
];

const statusDict = { 
  true: 'Active', 
  false: 'Inactive' 
};

export const statusOps = Object.keys(statusDict).map<OptionItem>(key => ({
  value: key,
  label: statusDict[key]
}));
