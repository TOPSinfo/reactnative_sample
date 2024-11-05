import { createContext } from 'react';

interface Context {
  selected: any | undefined;
  setSelected: (value: any) => void;
}

const SelectContext = createContext<Context | undefined>(undefined);

export default SelectContext;
 