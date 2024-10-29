import { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';

interface Package {
  id: number;
  name: string;
  price: number;
  description: string;
}

export default function Store() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/store/packages`);
        setPackages(response.data);
      } catch (error) {
        console.error('Failed to fetch packages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {packages.map((pkg) => (
        <div key={pkg.id} className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-2">{pkg.name}</h3>
          <p className="text-gray-600 mb-4">{pkg.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold">${pkg.price}</span>
            <button
              onClick={() => addItem({ ...pkg, quantity: 1 })}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}