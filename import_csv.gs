//
//CSVファイルデータをスプレッドシートに追加(import())
//



//書き込む対象のSpread Sheetを定義
var ss = SpreadsheetApp.getActiveSpreadsheet();
var sh = ss.getSheetByName('ena1');

function import() {

  // 対象のCSVファイルが置かれているフォルダ名、ファイル名を定義
  var folderName = "(仮)エナビジョン";
  var fileName = "enavision" + today;
  var folders = DriveApp.getFoldersByName(folderName);

  //フォルダとファイルの検索
  while (folders.hasNext()) {
    var folder = folders.next();
    if (folder.getName() == folderName) {
      var files = DriveApp.getFilesByName(fileName);
      
      while (files.hasNext()) {
        var file = files.next();
        if (file.getName() == fileName) {
          
          //設定しないでShift_JISのままだと文字化けする
          var data = file.getBlob().getDataAsString("Shift_JIS"); 

          var csv = Utilities.parseCsv(data);
          
          //「csv」から1行目（見出し行）以降をループで「csv2」へ新たに格納
          var csv2 = []
          for (var i = 1; i<csv.length; i++){
            csv2.push(csv[i]);
          }

          //空白行を探す
          var ro = sh.getLastRow()+1;
          
          //空白行セルからCSVの内容を書き込んでいく
          sh.getRange(ro,1,csv2.length,csv2[0].length).setValues(csv2);
          
          return;
        }
      }
    }
    
  }
}