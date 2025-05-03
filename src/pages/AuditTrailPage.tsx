import React from 'react';
import { AuditTrail } from '../components/AuditTrail';
interface AuditTrailPageProps {
  activities: Array<{
    id: string;
    type: string;
    user: string;
    details: string;
    timestamp: string;
  }>;
}
export const AuditTrailPage = ({
  activities
}: AuditTrailPageProps) => {
  return <div className="p-6 bg-white rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">
        Activity History
      </h1>
      <AuditTrail activities={activities} />
    </div>;
};