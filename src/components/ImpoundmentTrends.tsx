import React from 'react';
import { BarChart, Activity, ArrowUp, ArrowDown, Car } from 'lucide-react';
interface TrendCardProps {
  title: string;
  value: string | number;
  trend: number;
  icon: React.ReactNode;
}
const TrendCard = ({
  title,
  value,
  trend,
  icon
}: TrendCardProps) => {
  const isPositive = trend > 0;
  return <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className="p-2 bg-blue-50 rounded-lg">{icon}</div>
      </div>
      <div className="flex items-center">
        {isPositive ? <ArrowUp className="h-4 w-4 text-green-500" /> : <ArrowDown className="h-4 w-4 text-red-500" />}
        <span className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'} ml-1`}>
          {Math.abs(trend)}%
        </span>
        <span className="text-sm text-gray-500 ml-1">vs last week</span>
      </div>
    </div>;
};
interface ImpoundmentTrendsProps {
  totalVehicles: number;
  processingRate: number;
  releaseRate: number;
  trends: {
    vehicles: number;
    processing: number;
    release: number;
  };
}
export const ImpoundmentTrends = ({
  totalVehicles,
  processingRate,
  releaseRate,
  trends
}: ImpoundmentTrendsProps) => {
  return <div className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TrendCard title="Total Vehicles" value={totalVehicles} trend={trends.vehicles} icon={<Car className="h-5 w-5 text-blue-600" />} />
        <TrendCard title="Processing Rate" value={`${processingRate}%`} trend={trends.processing} icon={<Activity className="h-5 w-5 text-blue-600" />} />
        <TrendCard title="Release Rate" value={`${releaseRate}%`} trend={trends.release} icon={<BarChart className="h-5 w-5 text-blue-600" />} />
      </div>
    </div>;
};