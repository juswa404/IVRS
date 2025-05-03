import React, { useMemo, useState } from 'react';
import { Navbar } from './components/Navbar';
import { VehicleCard } from './components/VehicleCard';
import { Filters } from './components/Filters';
import { Modal } from './components/Modal';
import { AddVehicleForm } from './components/AddVehicleForm';
import { VehicleDetailsModal } from './components/VehicleDetailsModal';
import { AuditTrailPage } from './pages/AuditTrailPage';
import { AuditTrailFilters } from './components/AuditTrailFilters';
import { ImpoundmentTrends } from './components/ImpoundmentTrends';
import { emailService } from './services/email.service';
export function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);
  const [showAuditTrail, setShowAuditTrail] = useState(false);
  const [vehicles, setVehicles] = useState([{
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3',
    make: 'BMW',
    model: '3 Series',
    year: 2023,
    plate: 'XYZ-123',
    vin: '1HGCM82633A123456',
    caseNumber: '2023-1234',
    impoundDate: 'Oct 15, 2023',
    location: 'North Lot - Space A12',
    status: 'HELD' as const
  }, {
    image: 'https://images.unsplash.com/photo-1616422285623-13ff0162193c?ixlib=rb-4.0.3',
    make: 'Tesla',
    model: 'Model 3',
    year: 2023,
    plate: 'ABC-789',
    vin: '5YJSA1E27HF123456',
    caseNumber: '2023-1235',
    impoundDate: 'Oct 16, 2023',
    location: 'Secure Storage',
    status: 'PROCESSING' as const
  }, {
    image: 'https://images.unsplash.com/photo-1619682817481-e994891cd1f5?ixlib=rb-4.0.3',
    make: 'Toyota',
    model: 'RAV4',
    year: 2022,
    plate: 'DEF-456',
    vin: 'JTMDFREV2HD123456',
    caseNumber: '2023-1236',
    impoundDate: 'Oct 14, 2023',
    location: 'South Lot - Space B5',
    status: 'RELEASABLE' as const
  }]);
  const [filters, setFilters] = useState({
    status: 'All Status',
    date: 'All Dates',
    location: 'All Locations',
    caseType: 'All Types'
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [activities, setActivities] = useState([{
    id: '1',
    type: 'vehicle_added',
    user: 'John Doe',
    details: 'Added new vehicle',
    timestamp: new Date().toISOString()
  }]);
  const [auditFilters, setAuditFilters] = useState({
    activityType: 'all',
    dateRange: 'all'
  });
  const logActivity = (type: string, details: string, oldData?: any, newData?: any, receiptData?: any) => {
    if (type === 'vehicle_updated' && oldData && newData) {
      const changes = Object.keys(newData).filter(key => oldData[key] !== newData[key]);
      if (changes.length === 0) return;
      const changeDetails = changes.map(key => {
        if (key === 'status') {
          return `status from ${oldData[key]} to ${newData[key]}`;
        }
        return `${key} updated`;
      }).join(', ');
      details = `${details} (${changeDetails})`;
    }
    setActivities(prev => [{
      id: Date.now().toString(),
      type,
      user: 'Current User',
      details,
      timestamp: new Date().toISOString(),
      receiptData
    }, ...prev]);
  };
  const handleAddVehicle = (vehicleData: any) => {
    setVehicles(prev => [...prev, vehicleData]);
    logActivity('vehicle_added', `Added vehicle ${vehicleData.make} ${vehicleData.model}`);
  };
  const handleReleaseVehicle = (vehicle: any, paymentDetails: any) => {
    logActivity('vehicle_released', `Released vehicle ${vehicle.make} ${vehicle.model} (Case #${vehicle.caseNumber})`, null, null, {
      vehicle,
      paymentDetails
    });
    setSelectedVehicle(null);
  };
  const handleViewDetails = (vehicle: any) => {
    setSelectedVehicle(vehicle);
  };
  const handleUpdateVehicle = (updatedVehicle: any) => {
    const oldVehicle = vehicles.find(v => v.caseNumber === updatedVehicle.caseNumber);
    if (oldVehicle?.status === 'HELD' && updatedVehicle.status === 'PROCESSING' && updatedVehicle.driverEmail) {
      emailService.sendStatusChangeNotification(updatedVehicle);
    }
    setVehicles(prev => prev.map(v => v.caseNumber === updatedVehicle.caseNumber ? updatedVehicle : v));
    logActivity('vehicle_updated', `Updated vehicle ${updatedVehicle.make} ${updatedVehicle.model}`, oldVehicle, updatedVehicle);
  };
  const filteredVehicles = useMemo(() => {
    return vehicles.filter(vehicle => {
      const searchString = `${vehicle.make} ${vehicle.model} ${vehicle.plate} ${vehicle.vin} ${vehicle.caseNumber}`.toLowerCase();
      const matchesSearch = searchQuery === '' || searchString.includes(searchQuery.toLowerCase());
      const matchesStatus = filters.status === 'All Status' || vehicle.status === filters.status.toUpperCase();
      const matchesLocation = filters.location === 'All Locations' || vehicle.location.includes(filters.location);
      let matchesDate = true;
      if (filters.date !== 'All Dates') {
        const impoundDate = new Date(vehicle.impoundDate);
        const now = new Date();
        const daysDiff = (now.getTime() - impoundDate.getTime()) / (1000 * 3600 * 24);
        switch (filters.date) {
          case 'Last 24 Hours':
            matchesDate = daysDiff <= 1;
            break;
          case 'Last 7 Days':
            matchesDate = daysDiff <= 7;
            break;
          case 'Last 30 Days':
            matchesDate = daysDiff <= 30;
            break;
          case 'Over 30 Days':
            matchesDate = daysDiff > 30;
            break;
        }
      }
      return matchesSearch && matchesStatus && matchesLocation && matchesDate;
    });
  }, [vehicles, filters, searchQuery]);
  const handleFilterChange = (filterType: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };
  const handleAuditFilterChange = (filterType: string, value: string) => {
    setAuditFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };
  const analytics = useMemo(() => {
    const totalVehicles = vehicles.length;
    const processingCount = vehicles.filter(v => v.status === 'PROCESSING').length;
    const releasableCount = vehicles.filter(v => v.status === 'RELEASABLE').length;
    const processingRate = totalVehicles ? Math.round(processingCount / totalVehicles * 100) : 0;
    const releaseRate = totalVehicles ? Math.round(releasableCount / totalVehicles * 100) : 0;
    const trends = {
      vehicles: 5,
      processing: processingRate > 50 ? 8 : -5,
      release: releaseRate > 50 ? 12 : -3
    };
    return {
      totalVehicles,
      processingRate,
      releaseRate,
      trends
    };
  }, [vehicles]);
  const filteredActivities = useMemo(() => {
    return activities.filter(activity => {
      const matchesType = auditFilters.activityType === 'all' || activity.type === auditFilters.activityType;
      let matchesDate = true;
      const activityDate = new Date(activity.timestamp);
      const now = new Date();
      const daysDiff = (now.getTime() - activityDate.getTime()) / (1000 * 3600 * 24);
      switch (auditFilters.dateRange) {
        case '24h':
          matchesDate = daysDiff <= 1;
          break;
        case '7d':
          matchesDate = daysDiff <= 7;
          break;
        case '30d':
          matchesDate = daysDiff <= 30;
          break;
        case 'all':
        default:
          matchesDate = true;
          break;
      }
      return matchesType && matchesDate;
    });
  }, [activities, auditFilters]);
  return <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-8 mt-16">
        {showAuditTrail ? <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <AuditTrailFilters onBackToDashboard={() => setShowAuditTrail(false)} activities={activities} filters={auditFilters} onFilterChange={handleAuditFilterChange} />
            </div>
            <div className="lg:col-span-3">
              <AuditTrailPage activities={filteredActivities} />
            </div>
          </div> : <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <Filters onAddVehicle={() => setIsModalOpen(true)} filters={filters} onFilterChange={handleFilterChange} searchQuery={searchQuery} onSearchChange={setSearchQuery} onViewAuditTrail={() => setShowAuditTrail(true)} />
            </div>
            <div className="lg:col-span-3">
              <ImpoundmentTrends totalVehicles={analytics.totalVehicles} processingRate={analytics.processingRate} releaseRate={analytics.releaseRate} trends={analytics.trends} />
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredVehicles.map((vehicle, index) => <VehicleCard key={index} {...vehicle} onViewDetails={() => handleViewDetails(vehicle)} />)}
              </div>
            </div>
          </div>}
      </main>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <AddVehicleForm onSubmit={handleAddVehicle} onClose={() => setIsModalOpen(false)} />
      </Modal>
      <VehicleDetailsModal isOpen={!!selectedVehicle} onClose={() => setSelectedVehicle(null)} vehicle={selectedVehicle} onRelease={handleReleaseVehicle} onUpdate={handleUpdateVehicle} />
    </div>;
}