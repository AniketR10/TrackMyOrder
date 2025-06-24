import axios from "axios";

const Api = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`,
});

//get the list of all channels
export const fetchChannelList = () => Api.get(`/channelList`)

// sync a specific channel i.e. amazon, myntra etc.
export const syncOrders = (channel: string) => Api.post(`sync/${channel}`)

// retry the failed orders
export const retryOrders = () => Api.post(`/retry`)

// get sync stats for all the channels i.e. pending, success, failed
export const getStats = () => Api.get(`/stats`)

// sync all the channels that you have passed when you choose /sync-all and pass the array of channels that you want to sync instead of just one
export const syncAllOrders = (channels: string[]) => Api.post(`/sync-all`, {channels})

// clear all the data from the database
export const clearAllData = () => Api.delete(`/clear-all`)