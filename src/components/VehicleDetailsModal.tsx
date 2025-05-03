import React, { useEffect, useState } from 'react';
import { X, Car, User, FileText, Calendar, MapPin, Edit2, Save, Upload } from 'lucide-react';
import { statusColors } from '../utils/constants';
import { PaymentModal } from './PaymentModal';
import { Receipt } from './Receipt';
import { Modal } from './Modal';
import { emailService } from '../services/email.service';
interface VehicleDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  vehicle: any;
  onRelease: (vehicle: any, paymentDetails: any) => void;
  onUpdate: (vehicle: any) => void;
}
export const VehicleDetailsModal = ({
  isOpen,
  onClose,
  vehicle: initialVehicle,
  onRelease,
  onUpdate
}: VehicleDetailsModalProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [vehicle, setVehicle] = useState(initialVehicle);
  const [isDirty, setIsDirty] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState<any>(null);
  const [hasPrinted, setHasPrinted] = useState(false);
  useEffect(() => {
    setVehicle(initialVehicle);
    setIsDirty(false);
    setIsEditing(false);
  }, [initialVehicle]);
  if (!isOpen || !vehicle) return null;
  const handleRelease = () => {
    setShowPayment(true);
  };
  const handlePaymentComplete = () => {
    const transactionDetails = {
      amount: 150,
      processingFee: 25,
      paymentMethod: 'card',
      transactionId: `PIP${Date.now()}`,
      timestamp: new Date()
    };
    setPaymentDetails(transactionDetails);
    setShowPayment(false);
    setShowReceipt(true);
  };
  const handleReleaseComplete = () => {
    if (hasPrinted) {
      onRelease(vehicle, paymentDetails);
      setShowReceipt(false);
      onClose();
    }
  };
  const handlePrintComplete = () => {
    setHasPrinted(true);
  };
  const handleEdit = () => {
    setIsEditing(true);
  };
  const handleSave = () => {
    if (isDirty) {
      onUpdate(vehicle);
    }
    setIsEditing(false);
    setIsDirty(false);
  };
  const handleCancel = () => {
    setVehicle(initialVehicle);
    setIsEditing(false);
    setIsDirty(false);
  };
  const handleChange = async (field: string, value: string) => {
    const updatedVehicle = {
      ...vehicle,
      [field]: value
    };
    setVehicle(updatedVehicle);
    setIsDirty(true);
    // Check if status is being changed from HELD to PROCESSING
    if (field === 'status' && vehicle.status === 'HELD' && value === 'PROCESSING') {
      try {
        const emailSent = await emailService.sendStatusChangeNotification(updatedVehicle);
        if (!emailSent) {
          console.warn('No email address available - notification not sent');
        }
      } catch (error) {
        console.error('Failed to send email notification:', error);
      }
    }
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleChange('image', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const renderField = (label: string, field: string, value: string, type: string = 'text') => {
    return <div className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-all duration-200">
        <p className="text-xs font-medium text-gray-500 mb-2">{label}</p>
        {isEditing ? type === 'select' ? <select value={value} onChange={e => handleChange(field, e.target.value)} className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none bg-white">
              <option value="HELD">Held</option>
              <option value="PROCESSING">Processing</option>
              <option value="RELEASABLE">Releasable</option>
            </select> : type === 'date' ? <input type="date" value={value} onChange={e => handleChange(field, e.target.value)} className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" /> : type === 'textarea' ? <textarea value={value} onChange={e => handleChange(field, e.target.value)} rows={3} className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none resize-none" /> : <input type="text" value={value} onChange={e => handleChange(field, e.target.value)} className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" /> : <p className="text-sm font-semibold text-gray-900">{value}</p>}
      </div>;
  };
  const renderDriverFields = () => <div className="grid grid-cols-2 gap-4">
      {renderField('Name', 'driverName', vehicle.driverName)}
      {renderField('License', 'driverLicense', vehicle.driverLicense)}
      {renderField('Phone', 'driverPhone', vehicle.driverPhone || '', 'tel')}
      {renderField('Email', 'driverEmail', vehicle.driverEmail || '', 'email')}
    </div>;
  const handleClose = () => {
    if (!showReceipt) {
      setShowPayment(false);
      onClose();
    }
  };
  return <>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-screen items-center justify-center p-4">
          <div className="fixed inset-0 bg-black opacity-40" onClick={handleClose}></div>
          <div className="relative w-full max-w-3xl rounded-lg bg-white shadow-xl">
            <div className="border-b px-6 py-4 flex items-center justify-between bg-gray-50 rounded-t-lg">
              <h2 className="text-xl font-semibold text-gray-900">
                Vehicle Details
              </h2>
              <div className="flex items-center space-x-3">
                {isEditing ? <>
                    <button onClick={handleCancel} className="flex items-center space-x-2 px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100 transition-colors">
                      <X className="h-4 w-4" />
                      <span>Cancel</span>
                    </button>
                    <button onClick={handleSave} className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                      <Save className="h-4 w-4" />
                      <span>Save Changes</span>
                    </button>
                  </> : <>
                    <button onClick={handleEdit} className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                      <Edit2 className="h-4 w-4" />
                      <span>Edit Details</span>
                    </button>
                    <button onClick={handleClose} className="text-gray-400 hover:text-gray-600">
                      <X className="h-5 w-5" />
                    </button>
                  </>}
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex items-center space-x-6">
                <div className="relative group">
                  <div className="h-32 w-32 rounded-lg overflow-hidden">
                    <img src={vehicle.image} alt={`${vehicle.make} ${vehicle.model}`} className="h-full w-full object-cover" />
                  </div>
                  {isEditing && <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                      <Upload className="h-6 w-6 text-white" />
                      <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                    </label>}
                </div>
                <div>
                  <div className="space-y-1">
                    {isEditing ? <div className="space-y-2">
                        <input type="text" value={vehicle.make} onChange={e => handleChange('make', e.target.value)} className="block w-full px-3 py-2 text-lg font-semibold rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none" placeholder="Make" />
                        <input type="text" value={vehicle.model} onChange={e => handleChange('model', e.target.value)} className="block w-full px-3 py-2 text-lg font-semibold rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none" placeholder="Model" />
                      </div> : <h3 className="text-2xl font-bold text-gray-900">
                        {vehicle.make} {vehicle.model}
                      </h3>}
                    <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${statusColors[vehicle.status].base}`}>
                      {vehicle.status}
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {renderField('Status', 'status', vehicle.status, 'select')}
                {renderField('VIN Number', 'vin', vehicle.vin)}
                {renderField('License Plate', 'plate', vehicle.plate)}
                {renderField('Case Number', 'caseNumber', vehicle.caseNumber)}
                {renderField('Location', 'location', vehicle.location)}
                {renderField('Impound Date', 'impoundDate', vehicle.impoundDate, 'date')}
              </div>
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-gray-900 flex items-center">
                  <User className="h-4 w-4 mr-2 text-blue-600" />
                  Driver Information
                </h4>
                {renderDriverFields()}
              </div>
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-gray-900 flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-blue-600" />
                  Impound Reason
                </h4>
                {renderField('Reason', 'impoundReason', vehicle.impoundReason || 'Not specified', 'textarea')}
              </div>
            </div>
            <div className="border-t px-6 py-4 bg-gray-50 rounded-b-lg flex justify-end">
              {!isEditing && <button onClick={handleRelease} className="flex items-center space-x-2 bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled={vehicle.status !== 'RELEASABLE'}>
                  Release Vehicle
                </button>}
            </div>
          </div>
        </div>
      </div>
      <PaymentModal isOpen={showPayment} onClose={() => setShowPayment(false)} onPaymentComplete={handlePaymentComplete} amount={150} vehicleDetails={vehicle} />
      <Modal isOpen={showReceipt} onClose={handleReleaseComplete}>
        <Receipt vehicle={vehicle} paymentDetails={paymentDetails} onPrintComplete={handlePrintComplete} hasPrinted={hasPrinted} />
      </Modal>
    </>;
};