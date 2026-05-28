import { clerkClient} from '@clerk/express';

export const protectRoute = async (req, res, next) => {
  const auth = req.auth();

  if (!auth.userId) {
    return res.status(401).json({
      message: "unauthorised - you must be logged in",
    });
  }

  next();
};

//to check whether user is admin or not

export const requireAdmin = async(req , res , next) =>{
    try{
        const auth = req.auth();
        const currentUser = await clerkClient.users.getUser(auth.userId);
        const isAdmin = process.env.ADMIN_EMAIL === currentUser.primaryEmailAddress?.emailAddress;
        if(!isAdmin){
            return res.status(403).json({message : "Unauthorised - you must be an admin"})
           
        }
        next();

    }catch(error){
        next(error);
    }
}
