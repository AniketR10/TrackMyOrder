    import mongoose, { Document, Schema, Model } from 'mongoose';

    // this file defines how the Order will look and what all details every particular channel will contains

    // sample channel list, one can add more channels as per wish
   export const channelList = ['amazon', 'flipkart', 'myntra'] as const;
    type Channel = typeof channelList[number]

    //status list
   export const statusList = ['pending', 'success', 'failed'] as const;
    type Status = typeof statusList[number]

    // ts interface
    export interface IOrder extends Document {
    channel: Channel; // extend as needed
    orderId: string;
    quantity: number;
    price: number;
    status: Status; // extend as needed
    attempts: number;
    lastAttempt?: Date;
    createdAt?: Date;
    updatedAt?: Date;
    }

    // mongoose schema
    const orderSchema: Schema<IOrder> = new Schema<IOrder>({
    channel: { type: String, enum: channelList, required: true },
    orderId: { type: String, required: true, unique: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    status: { type: String, enum: statusList, default: statusList[0]},
    attempts: { type: Number, default: 0 },
    lastAttempt: { type: Date },
    }, { timestamps: true });

    const Order: Model<IOrder> = mongoose.model<IOrder>('Order', orderSchema); // creating a new schema named order
    export default Order;
