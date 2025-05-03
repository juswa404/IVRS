import React from 'react';
import { format } from 'date-fns';
import { Barcode } from './Barcode';
interface ReceiptProps {
  vehicle: any;
  paymentDetails: {
    amount: number;
    processingFee: number;
    paymentMethod: string;
    transactionId: string;
    timestamp: Date;
  };
  onPrintComplete: () => void;
  hasPrinted: boolean;
}
export const Receipt = ({
  vehicle,
  paymentDetails,
  onPrintComplete,
  hasPrinted
}: ReceiptProps) => {
  const printReceipt = () => {
    window.print();
    onPrintComplete();
  };
  return <div className="bg-white p-8 max-w-2xl mx-auto print:mx-0">
      <div className="border-b pb-4 mb-4">
        <h1 className="text-2xl font-bold text-center">
          Vehicle Release Receipt
        </h1>
        <div className="flex flex-col items-center mt-4">
          <Barcode value={paymentDetails.transactionId} />
        </div>
      </div>
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold mb-2">Vehicle Information</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Make & Model</p>
              <p className="font-medium">
                {vehicle.make} {vehicle.model}
              </p>
            </div>
            <div>
              <p className="text-gray-500">License Plate</p>
              <p className="font-medium">{vehicle.plate}</p>
            </div>
            <div>
              <p className="text-gray-500">Case Number</p>
              <p className="font-medium">{vehicle.caseNumber}</p>
            </div>
            <div>
              <p className="text-gray-500">VIN</p>
              <p className="font-medium">{vehicle.vin}</p>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">Payment Details</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Release Fee</span>
              <span className="font-medium">
                ₱{paymentDetails.amount.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Processing Fee</span>
              <span className="font-medium">
                ₱{paymentDetails.processingFee.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between border-t pt-2">
              <span className="font-medium">Total Amount</span>
              <span className="font-bold">
                ₱
                {(paymentDetails.amount + paymentDetails.processingFee).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Payment Method</span>
              <span className="font-medium">
                {paymentDetails.paymentMethod}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Date & Time</span>
              <span className="font-medium">
                {format(paymentDetails.timestamp, 'MMM dd, yyyy HH:mm')}
              </span>
            </div>
          </div>
        </div>
        <div className="border-t pt-6 mt-6">
          <p className="text-sm text-gray-500 text-center">
            Thank you for your payment. This serves as your official receipt.
          </p>
        </div>
      </div>
      <div className="mt-8 print:hidden">
        {!hasPrinted ? <button onClick={printReceipt} className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">
            Print Receipt
          </button> : <div className="text-center text-green-600 font-medium">
            ✓ Receipt printed - You can now close this window to complete the
            release
          </div>}
      </div>
    </div>;
};