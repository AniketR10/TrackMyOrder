import crypto from 'crypto';

// basically type definition of mock api of Order object
export type ApiData = {
  channel: string; 
  orderId: string; 
  quantity: number;
  price: number;
  status: 'pending';
  attempts: number;
  lastAttempt: null;
};

// generate single mock api for a given channel
export const generateApi = (channel: string): ApiData => {
  return {
    channel,
    orderId: crypto.randomUUID(),
    quantity: Math.floor(Math.random() * 10) + 1,
    price: Math.floor(Math.random() * (500 - 100 + 1)) + 100,
    status: 'pending',
    attempts: 0,
    lastAttempt: null
  };
};

 //  generates an array of mock orders for a specific channel.
//   for simulating incoming order data from various platforms.
export const fetchOrders = (channel: string): ApiData[] => {
  const count = Math.floor(Math.random() * 5) + 1; // 1 to 5 fake orders
  const results: ApiData[] = [];

  for (let i = 0; i < count; i++) {
    results.push(generateApi(channel));
  }

  return results;
};
