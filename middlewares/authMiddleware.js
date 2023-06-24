import exp from "constants";
import Users from "../modals/UserModals.js"
import encrypt from "encryptjs";

export const registrationChecks = async (req, res, next) => {
    try {
        const { name, email, password, pin } = req.body;
        if (!name) return res.send("name is required. - middleware")
        if (!email) return res.send("email is required. - middleware")
        if (!password) return res.send("password is required. - middleware")
        if (!pin) return res.send("pin is required. - middleware")

        if (password.length < 8) {
            return res.send("password should include atleast 8 characters")
        }

        const user = await Users.find({ email })
        if (user.length) {
            return res.send("email alredy exist")
        }
        next();

    } catch (error) {
        res.send(error)
    }
}

export const checkpin = async (req, res ,next) => {
    try {
        const { id, pin } = req.body;
        if (!id) return res.send("Id is required-middleware")
        if (!pin) return res.send("pin is required-middleware")

        const user = await Users.find({ _id: id })
        var secretkey = 'ios';
        var decipherpin = encrypt.decrypt(user[0].pin, secretkey, 256)
        console.log("decipher pin " + decipherpin);
        if(decipherpin === pin){
            next();
        }else{
            res.send("incorrect pin -middleware")
        }



    } catch (error) {
        res.send(error)
    }
}