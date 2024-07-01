import { countries } from 'coutries-states';
import { OptionItem } from 'interfaces/OptionItem';

export const countryOptions = () => {
  return countries
    .filter(x => ['US', 'CA'].includes(x.iso))
    .map<OptionItem>((country) => ({
      value: country.iso,
      label: country.name,
    }));
};

export const getCountry = (iso: string) => {
  if (!iso) return;

  return countries.find((c) => c.iso === iso);
};

export const stateOptions = (iso: string) => {
  if (!iso) return [];
  const country = getCountry(iso);
  if (!country) return [];

  return country.states.map<OptionItem>((state) => ({
    value: state.iso,
    label: state.name,
  }));
};

export const timeZoneOptions = () => {
  const westertHemisphereTimezones = [
    { label: 'Pacific Time (US & Canada)', value: 'America/Los_Angeles'},
    { label: 'Mountain Time (US & Canada)', value: 'America/Denver'},
    { label: 'Central Time (US & Canada)', value: 'America/Chicago'},
    { label: 'Eastern Time (US & Canada)', value: 'America/New_York'},
    { label: 'Alaska', value: 'America/Juneau'},
    { label: 'Hawaii', value: 'Pacific/Honolulu'},
    { label: 'Indiana (East)', value: 'America/Indiana/Indianapolis'},
    { label: 'Arizona', value: 'America/Phoenix'},
    { label: 'Atlantic Time (Canada)', value: 'America/Halifax'},
    { label: 'Newfoundland', value: 'America/St_Johns'}
  ];

  return westertHemisphereTimezones.map<OptionItem>((timeZone) => ({
    value: timeZone.value,
    label: timeZone.label,
  }));
};
