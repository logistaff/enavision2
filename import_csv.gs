//
//CSVファイルデータをスプレッドシートに追加(import())
//

function import() {

  // 対象のCSVファイルが置かれているフォルダ名、ファイル名を定義
  var folderName = "エナビジョン出荷依頼";
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
          for (var i in csv){

            if (i != 0){
              csv[i].splice(18, 0, ' ', ' ');
              
              var csvkari = [];
              for (var item = 2; item<csv[i].length; item++){  
                if(item==5){
                  csv[i][item]="可"
                }
                if(item==8){
                  continue
                }
                csvkari.push(csv[i][item]); 
              }
              csv2.push(csvkari);   
            }
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