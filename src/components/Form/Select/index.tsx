import React, { useState, useEffect } from 'react';

import SelectContext from '@context/SelectContext';
import Option from './Option';

interface Props {
  selected: any;
  onValueChange?: (value: any) => void;
  isPrepaid:boolean | undefined
}

type Select = React.FC<Props> & {
  Option: typeof Option;
};

const Select: Select = ({ selected, children, onValueChange,isPrepaid }) => {
  const [value, setValue] = useState(selected);
  useEffect(()=>{
    setValue(selected)
  },[selected])
  useEffect(() => {
    onValueChange && onValueChange(value);
  }, [value, onValueChange]);
  return (
    <SelectContext.Provider value={{ 
      // selected:value,
      selected: isPrepaid?value:null,
       setSelected: setValue }}>
      {children}
    </SelectContext.Provider>
  );
};

Select.Option = Option;

export default Select;
