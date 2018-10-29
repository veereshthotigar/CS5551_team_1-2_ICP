
module.exports = function (app, db) {
    let drug_model = db.model('drug');
    let product_model = db.model('products');
    //api to search drug details
    app.get('/drug/search',(req,res)=>{
        let search_text = req.query.searchtext;
        let search_by = req.query.searchby;
        let query = {};
        query[search_by] = { $regex: search_text, $options: 'i' };
        drug_model.find(query).exec((err, drug) => {
            if (!err) {
                res.send({
                    result: "Success",
                    data: drug
                });
            } else {
                res.status(400).send({
                    result: "Failure",
                    message: "Error in fetching drug list",
                    error: err.message
                });
            }
        });
    });

    //api to create Product details
    app.post('/product/create',(req,res) => {
        let product_info = req.body;
        let product = new product_model({
            created_on:new Date(),
            updated_on:new Date()
        });
        product.save((err, prod_res) => {
            if (!err) {
                res.send({
                    result: "Success",
                    message: "Details saved successfully"
                });
            } else {
                res.status(400).send({
                    result: "Failure",
                    message: "Error in creating product",
                    error: err.message
                });
            }
        })
    });
};