var request = require('request');
module.exports = function(app) {
    var url = 'https://rxnav.nlm.nih.gov/REST/interaction/interaction.json?rxcui=';
    app.get('/api/rxlist', function(req, res) {
        url = url+req.query.rxcui+'&sources='+req.query.sources;
        var params = req.query;
        request.get(url).pipe(res);
    });
}