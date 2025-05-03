import React from 'react';
export const statusColors = {
  HELD: {
    base: 'bg-red-100 text-red-800',
    hover: 'hover:bg-red-200 hover:text-red-900',
    tooltip: 'Vehicle is held for investigation'
  },
  RELEASABLE: {
    base: 'bg-green-100 text-green-800',
    hover: 'hover:bg-green-200 hover:text-green-900',
    tooltip: 'Vehicle is ready for release'
  },
  PROCESSING: {
    base: 'bg-yellow-100 text-yellow-800',
    hover: 'hover:bg-yellow-200 hover:text-yellow-900',
    tooltip: 'Vehicle is being processed'
  }
};