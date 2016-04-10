var http = require('http');
var url = require("url")
var app = http.createServer(function (req, res) {
    var arg = url.parse(req.url,true).query
    var strUrl = '/iphone_v3.php?a=search&kw='+arg.keyword+'&client_id=1002&model_id=100&screen_width='+arg.imgWidth+'&screen_height='+arg.imgHeight+'&bizhi_width='+arg.imgWidth+'&bizhi_height='+arg.imgHeight
    var sreq = http.request({
            host:     'api.lovebizhi.com',
            path:     strUrl,
            method:   req.method
        }, function(sres){
            sres.pipe(res);
            sres.on('end', function(){
                console.log('done');
            });
    });
    if (/POST|PUT/i.test(req.method)) {
        req.pipe(sreq);
    } else {
        sreq.end();
    }
});
app.listen(18080);