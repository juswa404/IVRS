import React from 'react';
interface BarcodeProps {
  value: string;
}
export const Barcode = ({
  value
}: BarcodeProps) => {
  return <div className="flex flex-col items-center">
      <div className="bg-white p-4 inline-block">
        <div className="flex items-center space-x-1">
          {value.split('').map((char, index) => <div key={index} className="w-[2px] bg-black" style={{
          height: Math.random() * 20 + 30 + 'px'
        }} />)}
        </div>
      </div>
      <span className="mt-2 text-sm font-mono">{value}</span>
    </div>;
};