//メール送信

function mail() {
  var to = "yoshiosmile68@gmail.com";
  var title = "エナビジョン出荷依頼 合計数";
  var body = "";
  
  var row = sh.getLastRow();
  for(var i=1;i<row+1;i++){
    var day = sh.getRange(i,7).getValue();
    day = Utilities.formatDate(day,"JST","MMdd");
    var patern = sh.getRange(i,10).getValue();
    var other = sh.getRange(i,35).getValue();
    body += "出荷日:" + day + "  パターン:" + patern + "\n" +other+ "\n\n";
  }
  
   MailApp.sendEmail(to,title, body);
}