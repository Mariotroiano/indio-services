import { MenuProps } from 'antd';
import { Show } from 'components/common/Show';
import { Link } from 'react-router-dom';
import { NavItem, NavGroup } from '../routes/menus/NavTypes';
import { isNavGroup } from '../routes/helpers/NavHelper';
import { ItemType, MenuItemGroupType, MenuItemType, SubMenuType } from 'antd/lib/menu/hooks/useItems';
export type { ItemType, MenuItemGroupType, MenuItemType, SubMenuType } from 'antd/lib/menu/hooks/useItems';

type Entity = { id: string }
type Callback<T> = (value: T, index: number) => ItemType

export function buildMenuFromEntities<T extends Entity>(entities: T[], callbackfn: Callback<T>): MenuProps {
  const items = entities.map<ItemType>(callbackfn);
  const menu: MenuProps = {
    items,
  }
  return menu;
};

export function buildMenuItems(data: (NavItem | NavGroup)[], level?: number) {
  if (!data?.length) return [];
  const result = data.map<ItemType>(item => isNavGroup(item) ? getMenuGroup(item) : getMenuItem(item, level));
  return result;
}

const getMenuGroup = (menuGroup: NavGroup): MenuItemGroupType => ({
  key: menuGroup.groupKey,
  label: menuGroup.groupTitle,
  children: getMenuItems(menuGroup.navItems, 0),
  type: 'group',
});

const getMenuItems = (menuItem: NavItem[], level: number) => {
  return menuItem?.map(item => getMenuItem(item, level));
};

const getMenuItem = (menuItem: NavItem, level: number): MenuItemType | SubMenuType => ({
  key: menuItem.title,
  label: getLabel(menuItem, level),
  title: menuItem.title,
  icon: menuItem.icon,
  children: level > 0 ? getMenuItems(menuItem.subItems, level + 1) : null,
});

const getLabel = (menuItem: NavItem, level: number) => {
  if (menuItem.subItems && level > 0) return (
    menuItem.title
  )
  else return (
    <Show when={menuItem.path}>
      <Link to={menuItem.path}>{menuItem.title}</Link>
    </Show>
  )
}
