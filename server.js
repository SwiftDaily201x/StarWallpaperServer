var http = require('http');
var app = http.createServer(function (req, res) {
    var arg = url.parse(request.url,true).query
      if (arg.keyword && arg.imgWidth && arg.imgHeight) 
      {
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
    } 
    else
    {
        response.writeHead(200, {'Content-Type': 'text/json'})
        response.write('You need keyword, imgWidth and imgHeight!')
        response.end()
    }
});
app.listen(18080);