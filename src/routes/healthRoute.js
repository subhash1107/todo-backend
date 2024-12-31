import express from "express";

const router = express.Router()

// Health router to check the health of the API
router.get("/", (req,res)=>{
    return res.json({message:"your api health is good"})
})

export default router;