import React, { useEffect, useState } from 'react';
import ChannelSyncCard from '../components/channelSyncCard';
import StatsDashboard from '../components/statsDashboard';
import { retryOrders, syncOrders, fetchChannelList, clearAllData } from '../services/api';

const Home = () => {
  const [channels, setChannels] = useState<string[]>([]); // contains the channels list
  const [loading,setLoading] = useState(true) // indicates whether the channel data is still loading 
  const [refreshKey, setRefreshKey] = useState(0); // triggers re-fetching the stats from the statsDashboard

  // loading the channels array from the backend throught api call
  const loadChannels = async() => {
    try {
       const res = await fetchChannelList();
       setChannels(res.data.channels)
    } catch(err) {
      console.error('failed to load channels: ', err)
    }
  };

  // refreshes the stats dashboard
  const refreshData = async() => {
      setLoading(true);
    await loadChannels();
     setRefreshKey(prev => prev+1);
      setLoading(false)
  };

  // runs once when the components mount to load the initial data
  useEffect(() => {
    refreshData();
  },[]);

  // clears all the order data upon conformation
const handleClear = async () => {
  const confirmDelete = confirm("Are you sure you want to delete all orders?");
  if (!confirmDelete) return;

  try {
    await clearAllData(); // api call to clear all the data
    alert("All data cleared successfully");
     await refreshData();
  } catch (err) {
    console.error("Error clearing data", err);
    alert("Failed to clear data.");
  }
};

  // sync and fetches order status for specific channel
  const handleSync = async (channel: string) => {
    try {
      await syncOrders(channel); // api call to sync orders
     await refreshData();
    } catch(err) {
      console.error('failed to sync data: ', err);
    }
    
  };

  // retries failed orders across all the channels
  const handleRetry = async () => {
    try {
        await retryOrders(); // api call to retry failed orders 
       await refreshData();
    } catch(err) {
      console.log('Retry failed: ',err);
    }
  
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">📦 Order Sync Dashboard</h1>

      {loading ? ( // display until all the channels data is fetched
        <p>Loading channels...</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 mb-6">
          {channels.map((channel) => ( // render a card for each channel
            <ChannelSyncCard
              key={channel}
              channel={channel}
              onSync={() => handleSync(channel)} // sync action
            />
          ))}
        </div>
      )}

      <button // retry button
        onClick={handleRetry}
        className="m-6 bg-blue-900 text-white px-4 py-2 rounded transform transition duration-150 hover:scale-105 active:scale-95 cursor-pointer hover:bg-blue-700"
      >
        Retry Failed Orders
      </button>

      <button // clear all data button
      onClick={handleClear}
      className="m-6 bg-red-500 text-white px-4 py-2 rounded transform transition duration-150 hover:scale-105 active:scale-95 cursor-pointer hover:bg-red-700"
      >Clear all data</button>

      <StatsDashboard refreshKey={refreshKey} /> {/* shows the orders counts for every channel and their status */}
    </div>
  );
};

export default Home;
