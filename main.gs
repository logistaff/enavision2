//Gmailで「未読＆CSVファイル添付されている」メールを抽出　(kensaku())
//GOOGLEドライブへCSVファイルを保存 (fetchFile())
//CSVファイルデータをスプレッドシートに追加(import())  の呼び出し
//追加データをメールで知らせる

//書き込む対象のSpread Sheetを定義
var ss = SpreadsheetApp.getActiveSpreadsheet();
//var sh = ss.getSheetByName('ena1');

var SEARCH_TERM = 'label:エナビ確認済-出荷依頼 csv is:unread';
var myFolder = DriveApp.getFolderById("1lcHVxYbjsIDQZRSLpoUH7xUWSCtMcUWU");
var myThreads = GmailApp.search(SEARCH_TERM, 0, 1); //条件にマッチしたスレッドを検索して取得
var myMessages = GmailApp.getMessagesForThreads(myThreads); //スレッドからメールを取得し二次元配列で格納

var today = new Date();
today = Utilities.formatDate(today,"JST","yyyyMMdd");


function kensaku(){
  //メールがあるかチェック
  if (myThreads != false){
    Logger.log("OK")
    csv_down();
    //LINE();
  }else{
    Logger.log("データ無し")
  }
}


function csv_down(){
  //ドライブにメールのCSVファイルを保存
  for(var i in myMessages){
      for(var j in myMessages[i]){
        myMessages[i][j].markRead();//既読にする
        var attachments = myMessages[i][j].getAttachments(); //添付ファイルを取得
       
        for(var k in attachments){
          myFolder.createFile(attachments[k].setName("enavision" + today)); //ドライブに添付ファイルを保存
        }
      }
  }
  //import関数の呼び出し
  import();
  //mail();
}


