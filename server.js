var http = require('http')
var url = require("url")
var fs = require('fs')
http.createServer(function (request, response) {
  var arg = url.parse(request.url,true).query
  if (arg.keyword && arg.imgWidth && arg.imgHeight) 
  {
    var strUrl = 'http://api.lovebizhi.com/iphone_v3.php?a=search&kw='+arg.keyword+'&client_id=1002&model_id=100&screen_width='+arg.imgWidth+'&screen_height='+arg.imgHeight+'&bizhi_width='+arg.imgWidth+'&bizhi_height='+arg.imgHeight
    http.get(strUrl, function(res){
    	res.setEncoding("utf-8")
    	var bufferHelper = new BufferHelper();
    	res.on("data", function(chunk){
       	bufferHelper.concat(chunk);
    	})
    	res.on("end", function(){
        var result = bufferHelper.toBuffer().toString();
        response.writeHead(200, {'Content-Type': 'text/json'})
        response.write(result)
        response.end()
    	})
	  })
  }	
  else
  {
    response.writeHead(200, {'Content-Type': 'text/json'})
    response.write('You need keyword, imgWidth and imgHeight!')
    response.end()
  }
}).listen(18080)
console.log('GetAppIcon is running.')
