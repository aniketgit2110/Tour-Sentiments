import Tour from "../models/Tour.js";
import Review from "../models/Review.js";

export const createReview = async(req,res)=>{
    const tourId = eq.params.tourId
    const newReview = new Review({...req.body})
    try{
        const savadeReview = await newReview.save()

        //after creating a new review now update the reviews array of the tour
        await Tour.findByIdAndUpdate(tourId , {
            $push:{reviews: savadeReview._id}
        })

        res.status(200).json({success:true , message:"Review Submitted" , data:savadeReview})
    }
    catch(err){
        res.status(500).json({success:false , message:"Failed to submit"})
    }
}