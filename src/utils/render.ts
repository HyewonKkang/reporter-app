import React, { ReactNode, cloneElement } from 'react';

export const renderAddon = (addon: ReactNode, additionalProps?: object) => {
  if (!addon || !React.isValidElement(addon)) return null;
  return cloneElement(addon, { ...addon.props, ...additionalProps });
};
