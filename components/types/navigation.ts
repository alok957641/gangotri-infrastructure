export type NavItemType = 'link' | 'dropdown';

export interface NavItemBase {
  type: NavItemType;
  label: string;
}

export interface NavLinkItem extends NavItemBase {
  type: 'link';
  href: string;
}

export interface NavDropdownItem extends NavItemBase {
  type: 'dropdown';
  children: {
    label: string;
    href: string;
  }[];
}

export type NavItem = NavLinkItem | NavDropdownItem;