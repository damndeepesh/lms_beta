// Placeholder for Label component
import React from 'react';

export const Label = ({ children, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) => {
  return <label {...props}>{children}</label>;
};