import { log } from "console";
import Users from "../modals/UserModals.js"
import encrypt from "encryptjs";

export const register = async (req, res) => {
    try {

        const { name, email, password, pin } = req.body;
        var secretkey = 'ios';
        var plainpassword = password;
        var plainpin = pin;
        var cipherPassword = encrypt.encrypt(plainpassword, secretkey, 256);
        var cipherpin = encrypt.encrypt(plainpin, secretkey, 256);
        var user = new Users({
            name,
            email,
            password: cipherPassword,
            pin: cipherpin
        })
        await user.save();
        return res.send("Registration successfull")

    } catch (error) {
        return res.send(error)
    }
}


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email) return res.send("email is required")
        if (!password) return res.send("password is required")

        const user = await Users.find({ email });
        console.log(user, "user here");

        var secretkey = 'ios';
        var decipherpass = encrypt.decrypt(user[0].password, secretkey, 256)
        console.log("decipher pass " + decipherpass);

        if (decipherpass === password) {
            return res.send("logged in")
        } else {
            res.send("Wrong password")
        }



    } catch (error) {
        return res.send(error)
    }
}


//update user

export const updateUser = async (req, res) => {
    try {
        const { name, id } = req.body;
        if (!name) return res.send("name is required")
        const user = await Users.findByIdAndUpdate({ _id: id }, { name: name }, { new: true })
        await user.save();
        console.log(user, "user here");
        return res.send(user)


    } catch (error) {
        res.send(error)
    }
}


//delete user
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) return res.send("Id required");
        const user = await Users.findByIdAndDelete({ _id: id })
        await user.save();
        console.log("user deleted");
        return res.send("User deleted")
    } catch (error) {
        res.send(error)
    }
}


// get all users
export const getallusers = async (req, res) => {
    try {
        const user = await Users.find({})
        res.send(user)
    } catch (error) {
        res.send(error)
    }
}


// get user by id

export const getbyId = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) return res.send("Id required.")
        const user = await Users.find({ _id: id })
        res.send(user)

    } catch (error) {
        res.send(error)
    }
}


//pagination

export const pagination = async (req, res) => {
    const { page = 1, limit = 2 } = req.body
    try {
        const user = await Users.find()
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        const count = await Users.count()

        if (user[0]) {
            res.send({
                user,
                totalpages: Math.ceil(count / limit),
                currentpage: page

            })
        }
    } catch (error) {
        res.send(error)
    }
}