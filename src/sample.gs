const CHANNEL_ACCESS_TOKEN = "チャネルトークンを貼り付ける";

// テキストメッセージ送信関数
function sendMessage(replyToken, messageText) {
    // 送信情報
    let postData = {
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
    let replyData = {
        method: "POST",
        headers: headers,
        payload: JSON.stringify(postData),
    };
    // ユーザーに送信
    const url = "https://api.line.me/v2/bot/message/reply";
    UrlFetchApp.fetch(url, replyData);
}

/***
 * 特殊なことを行わない限り上記は編集
***/

function doPost(e) {
    // ユーザーが送ってきた情報
    let event = JSON.parse(e.postData.contents).events[0];
    // ユーザーへの返信lID
    const replyToken = event.replyToken;
    // 送信するメッセージ
    let text = "🍣食べたい！🍣";
    // ユーザーに送信する
    sendMessage(replyToken, text);
}
