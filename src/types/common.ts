export type TMenuItem = {
  path: string;
  title: string;
  subItems?: TMenuItem[];
  exact?: boolean;
  isOpen?: boolean;
};
