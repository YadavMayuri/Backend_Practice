import Users from "../modals/UserModals.js"

export const acregister = async (req, res) => {
    try {

        const { name, email, password } = req.body;
        let random = ""
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890"
        const charlenght = characters.length;
        let length = 100;
        for (var i = 0; i < length; i++) {
            random += characters.charAt(Math.floor(Math.random() * charlenght))
        }
        const accessToken = random;

        const user = new Users({
            name,
            email,
            password,
            access_token: accessToken
        })

        setTimeout(async () => {
            await Users.updateOne({ _id: user._id }, { $unset: { access_token: 1 } });
        }, 60 * 1000)

        await user.save();
        res.send("registration success")
    } catch (error) {
        res.send(error)
    }
}


export const regeneratetoken = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Users.find({ email })
        let random = "";
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890"
        const charlenght = characters.length;
        let length = 100;
        for (var i = 0; i < length; i++) {
            random += characters.charAt(Math.floor(Math.random() * charlenght))
        }
        const accessToken = random;

        if (user[0].password == password) {
            if (user[0].access_token) {
                res.send("Token already generated")
            } else {
                await Users.findOneAndUpdate({ email }, { access_token: accessToken })
                setTimeout(async () => {
                    await Users.updateOne({ email }, { $unset: { access_token: 1 } });
                }, 60 * 1000)
                res.send("Key generated")
            }
        } else {
            res.send("wrong password")
        }

    } catch (error) {
        res.send(error)
    }
}