import {Request, Response, NextFunction} from 'express';
import { User } from 'app/models';

export const findUser = async (req: Request, res: Response, next: NextFunction )=>{
    var userId = req.param("userId", null)
    const user = await User.findOne({where:{
        id: userId
    }})
    if(user){
        res.locals.user = user;
        next()
    } else {
        return res.status(404).json({
            success: false,
            message: "User not found"
        })
    }
}