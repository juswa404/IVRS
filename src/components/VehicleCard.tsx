import React from 'react';
import { Calendar, Activity, FileText, MapPin, AlertCircle } from 'lucide-react';
import { statusColors } from '../utils/constants';
interface VehicleCardProps {
  image: string;
  make: string;
  model: string;
  year: number;
  plate: string;
  vin: string;
  caseNumber: string;
  impoundDate: string;
  location: string;
  status: 'HELD' | 'RELEASABLE' | 'PROCESSING';
  onViewDetails: () => void;
}
export const VehicleCard = ({
  image,
  make,
  model,
  year,
  plate,
  vin,
  caseNumber,
  impoundDate,
  location,
  status,
  onViewDetails
}: VehicleCardProps) => {
  return <div className="group bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-[1.02] hover:border-blue-200">
      <div className="relative">
        <img src={image} alt={`${make} ${model}`} className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" />
        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full font-medium cursor-help transition-all duration-200 ${statusColors[status].base} ${statusColors[status].hover}`} title={statusColors[status].tooltip}>
          {status}
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
            {make} {model} {year}
          </h3>
        </div>
        <div className="mt-3 space-y-2">
          <div className="flex items-center text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
            <FileText className="h-4 w-4 mr-2 group-hover:text-blue-600 transition-colors" />
            <span className="font-medium">Case #{caseNumber}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
            <AlertCircle className="h-4 w-4 mr-2 group-hover:text-blue-600 transition-colors" />
            <span>Plate: {plate}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
            <Calendar className="h-4 w-4 mr-2 group-hover:text-blue-600 transition-colors" />
            <span>Impounded: {impoundDate}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
            <MapPin className="h-4 w-4 mr-2 group-hover:text-blue-600 transition-colors" />
            <span>{location}</span>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200">
          <button onClick={onViewDetails} className="w-full bg-blue-600 text-white py-2 rounded-md transition-all duration-300 hover:bg-blue-700 group-hover:shadow-md">
            View Details
          </button>
        </div>
      </div>
    </div>;
};