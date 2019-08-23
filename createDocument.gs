function createD() {
  //スプレッドシート、シート、行数を取得
  var sheet = ss.getSheetByName('rooster設定チェックシート');
  var count = sheet.getLastRow();

  //項目タイトルを覗く2行目~最終行について、ドキュメントを作成する
  for(i = 2; i <= count; i++){
    //タイトル、本文を取得
    var title = sh.getRange("A"+i).getValue();
    var body   = sh.getRange("B"+i).getValue();

    //ドキュメントを作成
    var document = DocumentApp.create(title);
    //本文を書き込む
    document.getBody().setText(body);

    //ドキュメントを格納するフォルダを取得（指定しない場合はマイドライブ直下に作成される）
    //var targetFolder = DriveApp.getFolderById("[フォルダのid]");

    //指定したフォルダに所属（移動）させる
    //var docFile = DriveApp.getFileById(document.getId());
    //targetFolder.addFile(docFile);
  }
}