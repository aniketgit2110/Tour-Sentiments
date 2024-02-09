import Booking from "../models/Booking.js";


//create new booking
export const createBooking = async(req,res)=>{
    const newBooking = new Booking(req.body)
    try{
        const savedBooking = await  newBooking.save()
        res.status(200).json({success:true,message:"Your tour has been booked" , data:savedBooking})
    }
    catch(err){
        res.status(500).json({success:false,message:"Error occured while booking the tour"})
    }
}

//get sinlge boooking
export const  getBooking = async(req,res)=>{
    const id = req.params.id

    try{
        const book = await Booking.findById(id)

        res.status(200).json({success:true,message:"succesful" , data:book})
    }
    catch(err){
        res.status(404).json({success:false,message:"Error occured"})
    }
}


//get all boooking
export const getAllBooking = async (req, res) => {
    try {
        const books = await Booking.find();  // Use find() instead of findById()
        res.status(200).json({ success: true, message: "Successful", data: books });
    } catch (err) {
        res.status(500).json({ success: false, message: "Internal server error", error: err.message });
    }
};
