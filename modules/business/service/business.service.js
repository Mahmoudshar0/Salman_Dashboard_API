import businessModel from "../../../DB/model/business.model.js";
import { asyncHandler } from "../../../utils/error/error.js";

export const addService=asyncHandler(async(req,res,next)=>{
    const{name,description,price,duration,status,order}=req.body;
    
    const service=await businessModel.create({
        name,
        description,
        price,
        duration,
        status,
        order
    })
     return res.status(201).json({
    message: "Service created",service,
  });
})


export const getAllService=asyncHandler(async(req,res,next)=>{
    const Services=await businessModel.find().sort({order:1})
    return res.status(200).json({message:"Service fetched",Services})

})
export const getServiceByID=asyncHandler(async(req,res,next)=>{
    const {id}=req.params;
    const Service=await businessModel.findById(id)
    if (!Service) {
            return next(new Error("Service Not Found",{cause:404}))

    }
 return res.status(200).json({ message: "Service found", Service });
})
export const updateService=asyncHandler(async(req,res,next)=>{
    const {id}=req.params;
    const updateService=await businessModel.findByIdAndUpdate(id,req.body,     { returnDocument: 'after',runValidators: true}  );

    if (!updateService) {
            return next(new Error("Service Not Found",{cause:404}))

    }
 return res.status(200).json({ message: "Service updated", Service:updateService });
})

export const deleteService = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const deleted = await businessModel.findByIdAndDelete(id);
  if (!deleted) return next(new Error("Service not found", { cause: 404 }));
  return res.status(200).json({ message: "Service deleted" });
});



export const toggleServiceStatus=asyncHandler(async(req,res,next)=>{
    const {id}=req.params;
    const service=await businessModel.findById(id);
    if (!service) {
             return next(new Error("Service not found", { cause: 404 }));
        
    }
   service.status = service.status === "active" ? "hidden" : "active";
  await service.save();
  return res.status(200).json({ message: "Service status updated", service });


})