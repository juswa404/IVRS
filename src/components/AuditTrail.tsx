import React, { useState } from 'react';
import { Clock, User, FileText, Receipt as ReceiptIcon } from 'lucide-react';
import { Receipt } from './Receipt';
import { Modal } from './Modal';
interface Activity {
  id: string;
  type: string;
  user: string;
  details: string;
  timestamp: string;
  receiptData?: {
    vehicle: any;
    paymentDetails: any;
  };
}
export const AuditTrail = ({
  activities
}: {
  activities: Activity[];
}) => {
  const [selectedReceipt, setSelectedReceipt] = useState<Activity | null>(null);
  return <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">Audit Trail</h2>
      <div className="flow-root">
        <ul className="-mb-8">
          {activities.map((activity, index) => <li key={activity.id}>
              <div className="relative pb-8">
                {index < activities.length - 1 ? <span className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" /> : null}
                <div className="relative flex space-x-3">
                  <div>
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                      <FileText className="h-5 w-5 text-blue-600" />
                    </span>
                  </div>
                  <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                    <div>
                      <p className="text-sm text-gray-500">
                        {activity.details}{' '}
                        <span className="font-medium text-gray-900">
                          {activity.user}
                        </span>
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="whitespace-nowrap text-right text-sm text-gray-500">
                        <time dateTime={activity.timestamp}>
                          {activity.timestamp}
                        </time>
                      </div>
                      {activity.type === 'vehicle_released' && activity.receiptData && <button onClick={() => setSelectedReceipt(activity)} className="flex items-center text-blue-600 hover:text-blue-800">
                            <ReceiptIcon className="h-4 w-4 mr-1" />
                            <span className="text-sm">View Receipt</span>
                          </button>}
                    </div>
                  </div>
                </div>
              </div>
            </li>)}
        </ul>
      </div>
      <Modal isOpen={!!selectedReceipt} onClose={() => setSelectedReceipt(null)}>
        {selectedReceipt?.receiptData && <Receipt vehicle={selectedReceipt.receiptData.vehicle} paymentDetails={selectedReceipt.receiptData.paymentDetails} onPrintComplete={() => {}} hasPrinted={false} />}
      </Modal>
    </div>;
};