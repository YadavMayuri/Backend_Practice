import Users from "../modals/UserModals.js"
import { v4 as uuidv4 } from "uuid";

export const OTPregister = async (req, res) => {
    try {

        var codefornum = uuidv4();
        var codeforemail = uuidv4();
        const { name, email, password, number } = req.body;
        if (!name) return res.send("name is requ")
        if (!email) return res.send("email is requ")
        if (!password) return res.send("password is requ")
        if (!number) return res.send("number is requ")

        const response = await Users.find({ email });
        if (!response) return res.send("User not found")

        const user = new Users({
            name,
            email,
            password,
            number,
            otpfornum: codefornum,
            otpforemail: codeforemail,
            isotpnumverify: false,
            isemailverify: false
        })

        await user.save();
        return res.send(user)
    } catch (error) {
        res.send(error)
    }
}


export const otpcjeckforNum = async (req, res) => {
    try {
        const { number, otpchecknum } = req.body;
        if (!number) return res.send("Number is requ")
        if (!otpchecknum) return res.send("otpckecknum is requ")

        const user = await Users.find({ number })
        if (!user) res.send("user nit found");

        if (user[0].otpfornum == otpchecknum) {
            const res = await Users.findOneAndUpdate({ number }, { isotpnumverify: true })
            await res.save();
            return res.send("num verified through otp")
        } else {
            res.send("wrong otp")
        }


        res.send(user)



    } catch (error) {
        res.send(error)
    }
}




export const otpcjeckforemail = async (req, res) => {
    try {
        const { email, otpcheckemail } = req.body;
        if (!email) return res.send("Number is requ")
        if (!otpcheckemail) return res.send("otpckecknum is requ")

        const user = await Users.find({ email })
        if (!user) res.send("user nit found");

        if (user[0].otpforemail == otpcheckemail) {
            const res = await Users.findOneAndUpdate({ email }, { isemailverify: true })
            await res.save();
            return res.send("email verified through otp")
        } else {
            res.send("wrong otp")
        }

        res.send(user)
    } catch (error) {
        res.send(error)
    }
}

