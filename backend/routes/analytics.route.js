import express from 'express';
import { adminRoute, protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();   

router.get("/", protectRoute, adminRoute, async (req, res) => {
    try {
        const analyticsData = await getAnalyticsData(); 

        const startDate = new Date();
        const endDate = new Date(endDate.getTime() -7* 24 * 60 * 60 * 1000);

        const dailySalesData = await getDailySalesData(startDate, endDate);
        res.json(
            {
            analyticsData,
            dailySalesData,
            }
        )
    } catch (error) {
        console.log("Error in analytics route", error);
        res.status(500).json({ message: "Internal server error" });
        
    }
});


export default router;  