export type PackagesObject = {
  type: string;
  bandwidth?: number;
  hits?: number;
  links: {
    self?: string;
    versions?: string;
    stats?: string;
  };
  name: string;
  prev?: {
    bandwidth?: number;
    hist?: number;
  };
};
export type Package = {
  links?: { stats: string };
  name?: string;
  type?: string;
  tags?: {
    latest?: string;
  };
  versions?: {
    links: { self: string; entrypoints: string; stats: string };
    version: string;
  }[];
  bandwidth?: number;
  hits?: number;
};
export interface HeadersMainTable {
  title: string;
  key: string;
  align: string;
}
export interface State {
  mostPopularPackage: PackagesObject[];
  packageInfo: Package | null;
}
