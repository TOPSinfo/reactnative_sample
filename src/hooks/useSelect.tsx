import { useContext } from 'react';

import SelectContext from '@context/SelectContext';

const useSelect = () => {
  const context = useContext(SelectContext);

  if (context === undefined) {
    throw new Error('useSelect must be used within SelectProvider');
  }

  return context;
};

export default useSelect;
