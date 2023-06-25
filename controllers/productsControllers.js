import Products from "../modals/ProductModal.js"

export const addproduct = async (req, res) => {
    try {
        const { pname, price, category, color } = req.body;
        if (!pname) return res.send("pName requires")
        if (!price) return res.send("price requires")
        if (!category) return res.send("category requires")
        if (!color) return res.send("color requires")

        const product = new Products({
            pname,
            price,
            category,
            color
        })
        await product.save();
        res.send("product added")


    } catch (error) {
        res.send(error)
    }
}



export const getbyprice = async (req, res) => {
    try {
        const { max } = req.body;
        if (!max) return res.send("price required")

        const product = await Products.find({ price: { $lte: max } })
        if (product[0]) {
            res.send({"products here":product})
        } else {
            res.send("no")
        }
    } catch (error) {
        res.send(error)
    }
}

