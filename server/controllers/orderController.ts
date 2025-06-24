import { Request, Response } from 'express';
import Order, { IOrder, channelList, statusList } from '../models/Order.js';
import { fetchOrders } from '../utils/mockApis.js';
import { syncOrder, retryFailedOrders } from '../services/syncService.js';
import { error } from 'console';


// sync one channel (e.g. /sync/amazon), if we want for only one channel
export const fetchAndSyncOrders = async (req: Request, res: Response): Promise<void> => {
  const { channel } = req.params;

  try {
    const mockOrders = fetchOrders(channel);
    const savedOrders: IOrder[] = [];

    for (const data of mockOrders) {
      const order = new Order(data);
      await order.save();
      await syncOrder(order);
      savedOrders.push(order);
    }

    res.status(201).json(savedOrders);
  } catch (err: any) {
    res.status(500).json({ message: 'Error syncing orders', error: err.message });
  }
};

//fetching the list of all channels
export const fetchChannelList = (req: Request, res: Response) => {
  try {
    res.json({ channels: channelList})
  } catch(err: any) {
    res.status(500).json({message: 'There was an error in getting the channel list', error: err})
  }
  
}

// sync multiple channels (e.g. { channels: ["amazon", "myntra"] }) insert the name of the channels which you want to sync
export const fetchAndSyncMultipleChannels = async (req: Request, res: Response): Promise<void> => {
   console.log(" Received body:", req.body); // log body to inspect what we are getting, for debuggin purpose
  const { channels } = req.body;

  if (!Array.isArray(channels) || channels.length === 0) {
     res.status(400).json({ message: 'channels must be a non-empty array' });
     return;
  }

  try {
    const allOrders: IOrder[] = [];

    for (const channel of channels) {
      const mockOrders = fetchOrders(channel);

      for (const data of mockOrders) {
        const order = new Order(data);
        await order.save();
        await syncOrder(order);
        allOrders.push(order);
      }
    }

    res.status(201).json(allOrders);
  } catch (err: any) {
    res.status(500).json({ message: 'Error syncing multiple channels', error: err.message });
  }
};


// retry failed syncs
export const retryFailed = async (_req: Request, res: Response): Promise<void> => {
  try {
    await retryFailedOrders();
    res.json({ message: 'Retry initiated' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const clearAllData = async (req: Request, res: Response) => {
    try{
      await Order.deleteMany({})
      res.json({message: 'All orders cleared.'})
    } catch(err) {
      console.error('Failed to clear data:', err)
      res.status(500).json({error: 'Failed to clear the data.'})
    }
}


// getting all the information of all the channels such as their name,status and count(how many times before success)
export const getStats = async (_req: Request, res: Response): Promise<void> => {
  try {
    const stats = await Order.aggregate([
      {
        $group: {
          _id: { channel: "$channel", status: "$status" },
          count: { $sum: 1 }
        }
      }
    ]);

    res.json(stats);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
