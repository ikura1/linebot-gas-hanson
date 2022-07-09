const CHANNEL_ACCESS_TOKEN = "チャネルトークンを貼り付ける";

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

// Lineに呼び出される関数
function doPost(e) {
    // ユーザーが送ってきた情報
    const event = JSON.parse(e.postData.contents).events[0];
    // ユーザーへの返信lID
    const replyToken = event.replyToken;
    // 送信するメッセージ
    const text = "🍣食べたい！🍣";
    // ユーザーに送信する
    sendMessage(replyToken, text);
}
