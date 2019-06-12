function doPost(e) {

  var CHANNEL_ACCESS_TOKEN = 'Line api key';
  var msg = JSON.parse(e.postData.contents);
  console.log(msg);

  // 取出 replayToken 和發送的訊息文字
  var replyToken = msg.events[0].replyToken;
  var userMessage = msg.events[0].message.text;
  var msgType = msg.events[0].message.type;
  var replyText;

  if (typeof replyToken === 'undefined') {
    return;
  }

  
  //init function
  relpyText(userMessage);
    switch (msgType) {
        case 'text':
           relpyText();
        break;

        case 'image':
            replyText = [
                {
                    'type': 'text',
                    'text': '你剛剛傳的是圖片喔!'
                },
                {
                  "type": "sticker",
                  "packageId": "144",
                  "stickerId": "2"
                }
            ];
            break;

        case 'sticker':
            replyText = [ 
                {
                    'type': 'text',
                    'text': '你剛剛傳的貼圖好可愛喔!'
                },{
                  "type": "sticker",
                  "packageId": "1",
                  "stickerId": "2"
                }
            ];
            break;

        case 'location':
            replyText = initWeatherLocation(msg.events[0].message.address, msg.events[0].message.latitude, msg.events[0].message.longitude);
            break;

        default:
            replyText = [{
                'type': 'text',
                'text': '未知的訊息格式!'
            }];
            break;
    }
  
    
  //reply function
  var url = 'https://api.line.me/v2/bot/message/reply';
  UrlFetchApp.fetch(url, {
      'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
    },
    'method': 'post',
    'payload': JSON.stringify({
      'replyToken': replyToken,
      'messages': replyText,
    }),
  });
  
  
  //REPLY TEXT
  function relpyText(){
      switch(userMessage)
      {
        case '上班':    
          replyText = [{
            'type': 'text',
            'text': '加油加油',
          }];
          console.log(replyText);
          break;
        case '閉嘴':
          replyText =  [{
            'type': 'text',
            'text': '可以不要那麼兇嗎?',
          }];
          break;
        case '天氣':
          replyText =  [{
            'type': 'text',
            'text': '請傳送現在位置資訊',
          }];
          break;  
        case '早安':
          replyText = [{
            'type': 'text',
            'text': '早起的蟲兒，被鳥吃',
          }];
          break;
        case '晚安':
          replyText = [{
            "type": "sticker",
            "packageId": "1",
            "stickerId": "1"
          }];
          break;
        case '你在哪':
          replyText = [{
            "type": "location",
            "title": "桃園的某個地方",
            "address": "你應該去過吧",
            "latitude": 24.985891,
            "longitude": 121.315847,
          }];
          break;
         case '電影排行':
          replyText = movieTop10();
          break;  
        default:      
          replyText = [
          {
            type: "flex",
            altText: "你的願望是什麼呢 ",
            contents: {
              type: "bubble",         
              header: {
                type: "box",
                layout: "horizontal",
                contents: [
                  {
                    type: "text",
                    align: "center", 
                    weight: "bold",
                    text: "你的願望是什麼呢?"
                  },
                  {
                    type: "separator"
                  }              
                ]
              },    
              hero: {
                type: "image",
                url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXHYDMEdjH8HWDPJDR285dZCgnPKcsmHNbr6PhL_jzjbr5x3g6ag',
                size: "md",
                aspectMode: 'fit',
                aspectRatio: "1:1",
                backgroundColor: "#c0c0c0"
              },
              body: {  
                "type": "box",
                "layout": "vertical",
                "spacing": "md",
                "contents": [
                  {
                    "type": "button",
                    "style": "secondary",
                    "action": {
                     "type": "message",
                      "label": "早安",
                      "text": "早安"
                    }
                  },
                  {
                    "type": "button",
                    "style": "secondary",
                    "action": {
                     "type": "message",
                      "label": "晚安",
                      "text": "晚安"
                    }
                  },
                  {
                    "type": "button",
                    "style": "secondary",
                    "action": {
                     "type": "message",
                      "label": "電影排行",
                      "text": "電影排行"
                    }
                  },
                  {
                    "type": "button",
                    "style": "secondary",
                    "action": {
                     "type": "message",
                      "label": "天氣",
                      "text": "天氣"
                    }
                  }
                ]
                
              }
            }
          }
            
          ];
          break;
      }
  
  
  }
  
  
  
  
  
}
