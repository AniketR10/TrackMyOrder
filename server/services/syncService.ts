import Order from "../models/Order.js";
import { IOrder } from "../models/Order.js";

//  Simulates syncing a single order with an external system.
//  Assigns a 'success' or 'failed' status randomly (60% chance of success)
//  Increments attempt count
//  Records the timestamp of the last attempt
const syncOrder = async (order: IOrder) => {
  // Simulate sync process
  try {
     const isSuccess = Math.random() > 0.4; // chances of success are 60%

  order.attempts += 1;
  order.lastAttempt = new Date();
  order.status = isSuccess ? 'success' : 'failed';

  await order.save();
  } catch(err) {
    console.error(`Error syncing order ${order.orderId} : `, err)
  }
 
};

// if any order fails this will run to try to make it success
//finds all ordrs of with status 'failed'
// calls syncOrder on each of those to re-attempt processing 
const retryFailedOrders = async () => { 
  const failedOrders = await Order.find({ status: 'failed' });
  for (const order of failedOrders) {
    await syncOrder(order);
  }
};

export {syncOrder, retryFailedOrders} // named export 