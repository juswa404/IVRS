import React, { useState } from 'react';
import { FileUpload } from './FileUpload';
import { CarIcon, FileTextIcon, UserIcon } from 'lucide-react';
interface AddVehicleFormProps {
  onSubmit: (vehicleData: any) => void;
  onClose: () => void;
}
export const AddVehicleForm = ({
  onSubmit,
  onClose
}: AddVehicleFormProps) => {
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    plate: '',
    vin: '',
    caseNumber: '',
    location: '',
    status: 'PROCESSING',
    image: '',
    driverName: '',
    driverLicense: '',
    driverPhone: '',
    driverEmail: '',
    impoundReason: ''
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({
        ...prev,
        image: reader.result as string
      }));
    };
    reader.readAsDataURL(file);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      image: formData.image || 'https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3',
      impoundDate: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric'
      })
    });
    onClose();
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  return <form onSubmit={handleSubmit} className="space-y-6 max-h-[80vh] overflow-y-auto">
      <div className="sticky top-0 bg-white pb-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">Add New Vehicle</h2>
      </div>
      <div className="space-y-8">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Vehicle Image
          </label>
          <FileUpload onFileSelect={handleFileSelect} />
        </div>
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-gray-900 flex items-center">
              <CarIcon className="h-4 w-4 mr-2 text-blue-600" />
              Vehicle Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <input type="text" name="make" placeholder="Brand" required className="px-3 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none" onChange={handleChange} />
              <input type="text" name="model" placeholder="Model" required className="px-3 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none" onChange={handleChange} />
              <input type="text" name="plate" placeholder="License Plate" required className="px-3 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none" onChange={handleChange} />
              <input type="text" name="vin" placeholder="VIN Number" required className="px-3 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none" onChange={handleChange} />
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-gray-900 flex items-center">
              <FileTextIcon className="h-4 w-4 mr-2 text-blue-600" />
              Case Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <input type="text" name="caseNumber" placeholder="Case Number" required className="px-3 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none" onChange={handleChange} />
              <select name="status" required className="px-3 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none bg-white" onChange={handleChange}>
                <option value="">Select Status</option>
                <option value="PROCESSING">Processing</option>
                <option value="HELD">Held</option>
                <option value="RELEASABLE">Releasable</option>
              </select>
              <input type="date" name="year" required className="px-3 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none" onChange={handleChange} />
              <input type="text" name="location" placeholder="Location" required className="px-3 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none" onChange={handleChange} />
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-gray-900 flex items-center">
              <UserIcon className="h-4 w-4 mr-2 text-blue-600" />
              Driver Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <input type="text" name="driverName" placeholder="Driver's Name" className="px-3 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none" onChange={handleChange} />
              <input type="text" name="driverLicense" placeholder="Driver's License (if any)" className="px-3 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none" onChange={handleChange} />
              <input type="tel" name="driverPhone" placeholder="+639" className="px-3 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none" onChange={handleChange} />
              <input type="email" name="driverEmail" placeholder="Driver's Email" className="px-3 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none" onChange={handleChange} />
            </div>
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Reason for Impound
          </label>
          <textarea name="impoundReason" required rows={3} placeholder="Enter the reason for impounding the vehicle..." className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none" onChange={handleChange} />
        </div>
      </div>
      <div className="sticky bottom-0 bg-white pt-4 border-t border-gray-200 flex justify-end space-x-3">
        <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
          Cancel
        </button>
        <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
          Add Vehicle
        </button>
      </div>
    </form>;
};