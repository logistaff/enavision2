//
//CSVファイルデータをスプレッドシートに追加(import())
//

function import() {

  // 対象のCSVファイルが置かれているフォルダ名、ファイル名を定義
  var folderName = "エナビジョン出荷依頼";
  var fileName = "enavision" + today;
  //var fileName = "enavision20190913";
  var folders = DriveApp.getFoldersByName(folderName);
  var sh = ss.getSheetByName('エナビジョン出荷依頼');
  var sh2 = ss.getSheetByName('エナビジョン出荷管理');
  
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
          //空白行を探す
          var ro = sh.getLastRow();
          var ro2 = sh2.getLastRow();
          for (var i in csv){

            //見出しcsv[0]をスキップ
            if (i != 0){
              var ronum = ro+Number(i)
              
              csv[i].splice(18, 0, ' ', ' ');
              csv[i][5]="可"
              var aisen = csv[i][11]
              var teikaku = csv[i][10]
              csv[i][10]=aisen
              csv[i][11]=teikaku
              csv[i][19]="=IF(COUNTIF('WML管理表'!C:C,Y"+ronum+"),INDEX('WML管理表'!B:B,MATCH(Y"+ronum+",'WML管理表'!C:C,0)))";
              csv[i][20]="=IF(COUNTIF('SIM管理表'!J:J,Y"+ronum+"),INDEX('SIM管理表'!H:H,MATCH(Y"+ronum+",'SIM管理表'!J:J,0)))";
              csv[i][34]="=IF(COUNTIF('SIM管理表'!J:J,Y"+ronum+"),INDEX('SIM管理表'!G:G,MATCH(Y"+ronum+",'SIM管理表'!J:J,0)))";
              csv[i][40]=today;
              csv[i][42]= csv[i][9];
              
              var kaisenNum = "=IF(COUNTIF('SIM管理表'!J:J,$Y"+ronum+"),INDEX('SIM管理表'!E:E,MATCH($Y"+ronum+",'SIM管理表'!J:J,0)))"
              var simNum = "=IF(COUNTIF('SIM管理表'!J:J,Y"+ronum+"),INDEX('SIM管理表'!F:F,MATCH(Y"+ronum+",'SIM管理表'!J:J,0)))"
              csv[i].push("","","","","","","",kaisenNum,simNum,"","佐川","","佐川");

              var csvkari = [];
              
              for (var item = 2; item<csv[i].length; item++){ 
                if(item==8){continue}
                csvkari.push(csv[i][item]); 
              }
              csv2.push(csvkari);
            }
          }
          //空白行セルからCSVの内容を書き込んでいく
          sh.getRange(ro+1,1,csv2.length,csv2[0].length).setValues(csv2);
          sh2.getRange(ro2+1,7,csv2.length,csv2[0].length).setValues(csv2);
          
          return;
        }
      }
    }
    
  }
}