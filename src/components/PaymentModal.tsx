import React, { useState } from 'react';
import { X, CreditCard, DollarSign } from 'lucide-react';
interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentComplete: () => void;
  amount: number;
  vehicleDetails: any;
}
export const PaymentModal = ({
  isOpen,
  onClose,
  onPaymentComplete,
  amount,
  vehicleDetails
}: PaymentModalProps) => {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cash'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  if (!isOpen) return null;
  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      onPaymentComplete();
    } catch (error) {
      console.error('Payment failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };
  return <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black opacity-40" onClick={onClose}></div>
        <div className="relative w-full max-w-md rounded-lg bg-white shadow-xl">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Payment Details
              </h2>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-700">
                  Vehicle Details
                </h3>
                <p className="mt-1 text-sm text-gray-900">
                  {vehicleDetails.make} {vehicleDetails.model} (
                  {vehicleDetails.plate})
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Case #{vehicleDetails.caseNumber}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Payment Method
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <button onClick={() => setPaymentMethod('card')} className={`p-4 rounded-lg border ${paymentMethod === 'card' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'} flex items-center justify-center`}>
                    <CreditCard className="h-5 w-5 mr-2" />
                    Card
                  </button>
                  <button onClick={() => setPaymentMethod('cash')} className={`p-4 rounded-lg border ${paymentMethod === 'cash' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'} flex items-center justify-center`}>
                    <DollarSign className="h-5 w-5 mr-2" />
                    Cash
                  </button>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-500">Release Fee</span>
                  <span className="text-sm font-medium">
                    ₱{amount.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-500">Processing Fee</span>
                  <span className="text-sm font-medium">₱25.00</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t">
                  <span className="text-base font-medium">Total</span>
                  <span className="text-base font-bold">
                    ₱{(amount + 25).toFixed(2)}
                  </span>
                </div>
              </div>
              <button onClick={handlePayment} disabled={isProcessing} className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50">
                {isProcessing ? 'Processing...' : 'Complete Payment'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>;
};