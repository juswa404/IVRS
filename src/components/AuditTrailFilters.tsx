import React from 'react';
import { LayoutDashboard, Download } from 'lucide-react';
import { jsPDF } from 'jspdf';
interface AuditTrailFiltersProps {
  onBackToDashboard: () => void;
  activities: Array<{
    id: string;
    type: string;
    user: string;
    details: string;
    timestamp: string;
  }>;
  onFilterChange: (type: string, value: string) => void;
  filters: {
    activityType: string;
    dateRange: string;
  };
}
export const AuditTrailFilters = ({
  onBackToDashboard,
  activities,
  onFilterChange,
  filters
}: AuditTrailFiltersProps) => {
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    // Add header with styling
    doc.setFillColor(241, 245, 249); // bg-gray-100
    doc.rect(0, 0, doc.internal.pageSize.width, 40, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(24);
    doc.setTextColor(17, 24, 39); // text-gray-900
    doc.text('Audit Trail Report', 20, 25);
    // Add timestamp
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.setTextColor(107, 114, 128); // text-gray-500
    doc.text(`Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`, 20, 35);
    // Add content with styling
    let yPos = 60;
    activities.forEach((activity, index) => {
      if (yPos >= doc.internal.pageSize.height - 20) {
        doc.addPage();
        yPos = 20;
      }
      // Add activity entry with icon placeholder and formatting
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.setTextColor(17, 24, 39);
      doc.text(`${new Date(activity.timestamp).toLocaleString()}`, 20, yPos);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(107, 114, 128);
      doc.text(`${activity.details} by ${activity.user}`, 20, yPos + 7);
      // Add separator line
      doc.setDrawColor(229, 231, 235); // border-gray-200
      doc.line(20, yPos + 12, 190, yPos + 12);
      yPos += 25;
    });
    doc.save('audit-trail-report.pdf');
  };
  return <div className="sticky top-4 space-y-6 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
      <button onClick={onBackToDashboard} className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
        <LayoutDashboard className="h-5 w-5" />
        <span>Back to Dashboard</span>
      </button>
      <button onClick={handleDownloadPDF} className="w-full flex items-center justify-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors">
        <Download className="h-5 w-5" />
        <span>Download PDF Report</span>
      </button>
      <div className="space-y-4">
        <h2 className="font-semibold text-lg">Filter Activities</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium">Activity Type</label>
            <select value={filters.activityType} onChange={e => onFilterChange('activityType', e.target.value)} className="w-full p-2 border rounded-md">
              <option value="all">All Activities</option>
              <option value="vehicle_added">Vehicle Added</option>
              <option value="vehicle_updated">Vehicle Updated</option>
              <option value="vehicle_released">Vehicle Released</option>
              <option value="status_changed">Status Changed</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium">Date Range</label>
            <select value={filters.dateRange} onChange={e => onFilterChange('dateRange', e.target.value)} className="w-full p-2 border rounded-md">
              <option value="all">All Time</option>
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>
        </div>
      </div>
    </div>;
};