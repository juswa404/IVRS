import { collection, addDoc, updateDoc, deleteDoc, doc, query, where, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
export const vehicleService = {
  async addVehicle(vehicleData: any) {
    try {
      const docRef = await addDoc(collection(db, 'vehicles'), {
        ...vehicleData,
        createdAt: new Date()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding vehicle:', error);
      throw error;
    }
  },
  async updateVehicle(id: string, vehicleData: any) {
    try {
      const vehicleRef = doc(db, 'vehicles', id);
      await updateDoc(vehicleRef, {
        ...vehicleData,
        updatedAt: new Date()
      });
    } catch (error) {
      console.error('Error updating vehicle:', error);
      throw error;
    }
  },
  async releaseVehicle(id: string, paymentDetails: any) {
    try {
      const vehicleRef = doc(db, 'vehicles', id);
      await updateDoc(vehicleRef, {
        status: 'RELEASED',
        releaseDate: new Date(),
        paymentDetails
      });
      // Add to release records
      await addDoc(collection(db, 'releases'), {
        vehicleId: id,
        paymentDetails,
        releaseDate: new Date()
      });
    } catch (error) {
      console.error('Error releasing vehicle:', error);
      throw error;
    }
  },
  async getVehicles() {
    try {
      const vehiclesRef = collection(db, 'vehicles');
      const querySnapshot = await getDocs(vehiclesRef);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting vehicles:', error);
      throw error;
    }
  }
};