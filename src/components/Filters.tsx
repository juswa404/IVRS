import React from 'react';
import { Search, Plus, ClipboardList } from 'lucide-react';
interface FiltersProps {
  onAddVehicle: () => void;
  filters: {
    status: string;
    date: string;
    location: string;
    caseType: string;
  };
  onFilterChange: (filterType: string, value: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onViewAuditTrail: () => void;
}
export const Filters = ({
  onAddVehicle,
  filters,
  onFilterChange,
  searchQuery,
  onSearchChange,
  onViewAuditTrail
}: FiltersProps) => {
  return <div className="sticky top-20 space-y-6 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Add Vehicle Button */}
      <button onClick={onAddVehicle} className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
        <Plus className="h-5 w-5" />
        <span>Add Vehicle</span>
      </button>
      {/* Audit Trail Button */}
      <button onClick={onViewAuditTrail} className="w-full flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors">
        <ClipboardList className="h-5 w-5" />
        <span>View Audit Trail</span>
      </button>
      {/* Search Section */}
      <div className="space-y-4">
        <h2 className="font-semibold text-lg">Search</h2>
        <div className="relative">
          <input type="text" value={searchQuery} onChange={e => onSearchChange(e.target.value)} placeholder="Search by case number, plate, or VIN..." className="w-full px-4 py-2 pl-10 rounded-md border border-gray-300 focus:outline-none focus:border-blue-600" />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        </div>
      </div>
      {/* Filters Section */}
      <div className="space-y-4">
        <h2 className="font-semibold text-lg">Filters</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium">Status</label>
            <select value={filters.status} onChange={e => onFilterChange('status', e.target.value)} className="w-full p-2 border rounded-md">
              <option value="All Status">All Status</option>
              <option value="HELD">Held</option>
              <option value="RELEASABLE">Releasable</option>
              <option value="PROCESSING">Processing</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium">Impound Date</label>
            <select value={filters.date} onChange={e => onFilterChange('date', e.target.value)} className="w-full p-2 border rounded-md">
              <option value="All Dates">All Dates</option>
              <option value="Last 24 Hours">Last 24 Hours</option>
              <option value="Last 7 Days">Last 7 Days</option>
              <option value="Last 30 Days">Last 30 Days</option>
              <option value="Over 30 Days">Over 30 Days</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium">Location</label>
            <select value={filters.location} onChange={e => onFilterChange('location', e.target.value)} className="w-full p-2 border rounded-md">
              <option value="All Locations">All Locations</option>
              <option value="North Lot">North Lot</option>
              <option value="South Lot">South Lot</option>
              <option value="Secure Storage">Secure Storage</option>
            </select>
          </div>
        </div>
      </div>
    </div>;
};