import express from "express";

const router = express.Router()

router.get("/", (req,res)=>{
    return res.json({message:"your api health is good"})
})

export default router;