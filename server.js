var http = require('http')
var url = require("url")
var fs = require('fs')
http.createServer(function (request, response) {
  var arg = url.parse(request.url,true).query
  if (arg.keyword && arg.imgWidth && arg.imgHeight) 
  {
    var strUrl = 'http://api.lovebizhi.com/iphone_v3.php?a=search&kw='+arg.keyword+'&client_id=1002&model_id=100&screen_width='+arg.imgWidth+'&screen_height='+arg.imgHeight+'&bizhi_width='+arg.imgWidth+'&bizhi_height='+arg.imgHeight
	  console.log(strUrl)
    http.get(strUrl, function(res){
    	res.setEncoding("utf-8")
    	var resData = []
    	res.on("data", function(chunk){
       	 	resData.push(chunk)
    	})
    	res.on("end", function(){
        response.writeHead('aaa')
        console.log(resData.toString())
        response.write(resData.toString())
        response.end()
    	})
	  })
  }	
}).listen(18080)
console.log('GetAppIcon is running.')