import { Router } from "express";
import { fetchAndSyncMultipleChannels, fetchAndSyncOrders, retryFailed, getStats, fetchChannelList, clearAllData } from "../controllers/orderController.js";

const router = Router();

router.get('/test', (_, res) => { // for testing purposes if the routes are working correctly or not
  res.send('Order routes are working!');
});

// to delete all the data form the database
router.delete('/clear-all', clearAllData);

//for sending the channels to the frontend
router.get('/channelList', fetchChannelList)

router.post('/sync/:channel', fetchAndSyncOrders); // put the name of the single channel to get it api info
router.post('/sync-all', fetchAndSyncMultipleChannels); // put the names of the channels first to get their api info
router.post('/retry', retryFailed); // we click on retry to process failed req jabtak saari succes nahi ho jaati tabtak we can keep on clicking
router.get('/stats', getStats); // basically kitne attempts lage to make it success, name fo the channel and status which is success

export default router;
