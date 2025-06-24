import React, { useEffect, useState } from 'react';
import { getStats } from '../services/api.js';

type Stat = {
  _id: { channel: string; status: string };
  count: number;
};

// props expected form the parent component
type props = {
  refreshKey: number;
}

const StatsDashboard: React.FC<props> = ({refreshKey}) => {
  const [stats, setStats] = useState<Stat[]>([]); // state to store the fetched stats data

  //fetch stats whenever the refreshKey changes
  useEffect(() => {
    const fetch = async () => {
      const res = await getStats(); // api call to fetch the stats
      setStats(res.data);
    };
    fetch();
  }, [refreshKey]);

  return (
    <div className="grid grid-cols-2 gap-4">
      {stats.map((s, idx) => (
        <div key={idx} className="bg-gray-100 p-4 rounded">
          <p className="font-medium">
            <strong>{s._id.channel.toUpperCase()}</strong> - {s._id.status}: {s.count}
          </p>
        </div>
      ))}
    </div>
  );
};

export default StatsDashboard;
