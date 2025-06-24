import React from "react";

type props = { // props expected from the parent component
    channel: string;
    onSync: () => void;
}

// basic styling of channel card and fetching the data by clicking onSync
const ChannelSyncCard: React.FC<props> = ({channel, onSync }) => {
    return (
       <div className="bg-amber-100 shadow p-4 rounded-xl text-center">
      <h3 className="text-lg font-bold capitalize">{channel}</h3>
      <button
        onClick={onSync} // triggers sync function passed from the parent(Home component)
        className="mt-4 bg-amber-700 text-white px-4 py-2 rounded transform transition duration-150 hover:scale-105 active:scale-95 cursor-pointer hover:bg-amber-900"
      >
        Sync Orders
      </button>
    </div>
    )
}

export default ChannelSyncCard