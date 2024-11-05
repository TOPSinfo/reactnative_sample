declare module '*.svg' {
  import { SvgProps } from 'react-native-svg';

  const content: React.FC<SvgProps>;

  export default content;
}

declare module React {
  type FCWithoutChildren<P = {}> = {
    (props: Omit<P, 'children'>, context?: any): React.ReactElement | null;
  };
}

declare module 'react-native-base64' {
  const encode: (input: string) => string;

  const decode: (input: string) => string;
}
