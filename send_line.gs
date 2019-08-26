

var body = "\n\n";
  
var row = sh.getLastRow();
for(var i=1;i<row+1;i++){
    var day = sh.getRange(i,7).getValue();
  day = Utilities.formatDate(day,"JST","MMdd");
  var patern = sh.getRange(i,10).getValue();
  var other = sh.getRange(i,35).getValue();
  body += "出荷日:" + day + "  パターン:" + patern + "\n" +other+ "\n\n";
}


function sendHttpPost(message){
  var token = 'QPttx7MIkwOgUk5Nb2PbsYCRI1quZolyOjqJFv4BNiw'; // トークンを入力
  var options =
   {
     "method"  : "post",
     "payload" : "message=" + message,
     "headers" : {"Authorization" : "Bearer "+ token}
     
   };

   UrlFetchApp.fetch("https://notify-api.line.me/api/notify",options);
}

function LINE(){
  sendHttpPost(body);
}

