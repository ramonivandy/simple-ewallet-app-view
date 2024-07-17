import { useState, useEffect } from 'react';
import api from '../utils/api';

interface UserData {
  name: string;
  balance: number;
  history: {
    _id: string;
    user_id: string;
    balance_change: number;
    created_at: string;
    __v: number;
  }[];
}

export default function Dashboard() {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get('/api/dashboard');
        const data = {
          name: 'ramon',
          balance: response.data.data.balance.balance,
          history: response.data.data.history
        }
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <p className="mb-4"><strong>Name:</strong> {userData.name}</p>
        <p><strong>Balance:</strong> Rp {userData.balance.toFixed(0)}</p>
      </div>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-xl font-bold mt-4">History</h2>
        <ul>
          {userData.history.map((item) => (
            <li key={item._id} className="mb-2">
              <p><strong>Date:</strong> {new Date(item.created_at).toLocaleString()}</p>
              <p><strong>Change:</strong> Rp{item.balance_change.toFixed(0)}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
