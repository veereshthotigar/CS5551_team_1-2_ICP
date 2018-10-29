
module.exports = function (app, db) {
    let events_model = db.model('events');
    //api to search events details
    app.get('/events/search/users',(req,res)=>{
        let user = req.query.user;
        let search_text = req.query.searchtext;
        let query = {};
        if(user === 'true'){
            query = {users_list:{$in:[search_text]}};
        }else{
            query = {users_list:{$nin:[search_text]}};
        }
        events_model.find(query).exec((err, events) => {
            if (!err) {
                res.send({
                    result: "Success",
                    data: events
                });
            } else {
                res.status(400).send({
                    result: "Failure",
                    message: "Error in fetching events list",
                    error: err.message
                });
            }
        });
    });
    //api to create event details
    app.post('/event/create',(req,res) => {
        let events_info = req.body;
        let events = new events_model({
            eventName:events_info.eventName,
            eventStartDate:events_info.eventStartDate,
            eventEndDate:events_info.eventEndDate,
            address_one:events_info.address_one,
            address_two:events_info.address_two,
            address_city:events_info.address_city,
            address_state:events_info.address_state,
            address_zipcode:events_info.address_zipcode,
            users_list:events_info.users_list,
            created_by:events_info.created_by,
            created_on:new Date(),
            updated_on:new Date()
        });
        events.save((err, events_res) => {
            if (!err) {
                res.send({
                    result: "Success",
                    message: "Details saved successfully"
                });
            } else {
                res.status(400).send({
                    result: "Failure",
                    message: "Error in creating event",
                    error: err.message
                });
            }
        })
    });
    //api to update event details
    app.put('/event/update/users',(req,res)=>{
        let events_info = req.body;
        events_model.updateOne({'eventName':events_info.event_name},{$push:{'users_list':events_info.user}},(err, events_res) => {
            if (!err) {
                res.send({
                    result: "Success",
                    message: "Details updated successfully"
                });
            } else {
                res.status(400).send({
                    result: "Failure",
                    message: "Error in updating event",
                    error: err.message
                });
            }
        })
    });
};