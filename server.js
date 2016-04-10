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
      var chunks = [];  
      var size = 0;
    	res.on("data", function(chunk){
        chunks.push(chunk);  
        size += chunk.length; 
    	})
    	res.on("end", function(){
        var data = null;  
        switch(chunks.length) {  
          case 0: data = new Buffer(0);  
           break;  
          case 1: data = chunks[0];  
            break;  
          default:  
            data = new Buffer(size);  
            for (var i = 0, pos = 0, l = chunks.length; i < l; i++) {  
              var chunk = chunks[i];  
              chunk.copy(data, pos);  
             pos += chunk.length;  
            }  
            break;  
        }
        response.writeHead(200, {'Content-Type': 'text/json'})
        response.write(data.toString())
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
