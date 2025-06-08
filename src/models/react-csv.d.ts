declare module 'react-csv' {
    export const CSVLink: React.FC<React.PropsWithChildren<{
      data: any;
      filename?: string;
      headers?: { label: string; key: string }[];
      separator?: string;
      enclosingCharacter?: string;
      uFEFF?: boolean;
      asyncOnClick?: boolean;
      onClick?: (event: React.MouseEvent<HTMLAnchorElement>, done: (proceed: boolean) => void) => void;
      target?: string;
      className?: string;
      style?: React.CSSProperties;
    }>>;
  
    export const CSVDownload: React.FC<{
      data: any;
      filename?: string;
      headers?: { label: string; key: string }[];
      separator?: string;
      enclosingCharacter?: string;
      uFEFF?: boolean;
      target?: string;
    }>;
  }