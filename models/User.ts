import mongoose, { Schema, model, models } from "mongoose";
import bcrypt from "bcryptjs";


export interface IUserAuth{
    email: string,
    password: string,
    _id?: mongoose.Types.ObjectId,
    createdAt?: Date,
    updatedAt? : Date
}

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

const userAuthSchema = new Schema<IUserAuth>(
    {
        email: {
            type:String,
            required:true,
            unique:true
        },
        password: {
            type:String, 
            required:true,
            validate: {
                validator:function (value: string){
                    return passwordRegex.test(value)
                },
                message: "Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, and one number.",
            }
        }
    },
    {timestamps:true}
)

userAuthSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10)
    }
    next()
})

const UserAuth = models?.userAuth || model<IUserAuth>("userAuth", userAuthSchema)

export default UserAuth;