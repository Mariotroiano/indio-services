import { OptionItem } from 'interfaces/OptionItem';

export interface OptionPairItem extends OptionItem {
  selectOptions: Array<OptionItem>;
}
