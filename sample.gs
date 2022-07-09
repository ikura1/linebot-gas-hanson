const CHANNEL_ACCESS_TOKEN = "チャネルトークンを貼り付ける";
// https://docs.google.com/spreadsheets/d/1QXJn2aHkpC1nhVHvh--cIb5G5T9UvgLAVGrO6Y3zbk4/edit?hl=JA#gid=0
// https://docs.google.com/spreadsheets/d/ここにスプレッドシートIDが入る/edit?hl=JA#gid=0
const SPREADSHEET_ID = "スプレッドシートのIDを貼り付ける"
const COUNT_CELL = "A1";

const LINE_REPLY_URL = "https://api.line.me/v2/bot/message/reply";

// テキストメッセージ送信関数
function sendMessage(replyToken, messageText) {
    // 送信情報
    const postData = {
        replyToken: replyToken,
        messages: [
            {
                type: "text",
                text: messageText,
            },
        ],
    };
    // 送信ヘッダー情報
    const headers = {
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: "Bearer " + CHANNEL_ACCESS_TOKEN,
    };
    // ユーザーに送信する情報
    const replyData = {
        method: "POST",
        headers: headers,
        payload: JSON.stringify(postData),
    };
    // ユーザーに送信
    UrlFetchApp.fetch(LINE_REPLY_URL, replyData);
}

/***
 * 特殊なことを行わない限り上記は編集
***/
// たんを取得する
function getTanFromSpreadSheet() {
    let cell = getCell();
    return cell.getValue();
}

// たんをカウントする
function incrementTanFromSpreadSheet() {
    let cell = getCell();
    if (!cell) {
        cell.setValue("1");
    } else {
        cell.setValue(cell + 1);
    }
}

// カウントしているセルの取得
function getCell() {
    const spreadSheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = spreadSheet.getSheets()[0];
    const cell = sheet.getRange(COUNT_CELL);
    return cell;
}

// Lineに呼び出される関数
function doPost(e) {
    // ユーザーが送ってきた情報
    const event = JSON.parse(e.postData.contents).events[0];
    // ユーザーへの返信lID
    const replyToken = event.replyToken;
    // 送信するメッセージ
    let text = event.message.text;
    if (text === "みずのたん") {
        text = "たん言うな!";
        incrementTanFromSpreadSheet();
    } else if (text === "なんたん") {
        text = getTanFromSpreadSheet() + "たん";
    }
    // ユーザーに送信する
    sendMessage(replyToken, text);
}
