function movieTop10() {
  var movieList = [];
  var arrangeObj;
  
//  var url = 'https://docs.google.com/spreadsheets/d/112M5G2Bak6wqhMnkACw1PnkiF0lXtQ4vYla_heKTeZ0/edit#gid=0';
//  var SpreadSheet = SpreadsheetApp.openByUrl(url);
//  var range = SpreadSheet.getRange('NewWeekMovie!A2:G11');
  
  var url = 'https://docs.google.com/spreadsheets/d/1B5jxwSf1gEV6VYDv_sl5_6xq6zzCDyCIKcoGzzqvtR8/edit#gid=0';
  var SpreadSheet = SpreadsheetApp.openByUrl(url);
  var range = SpreadSheet.getRange('movieTop10!A2:G11');
  
  var arrangeObj = range.getValues();

  /*
  0 -> id
  1 -> movie name
  2 -> info url
  3 -> pic url
  4 -> star
  5 -> video url
  6 -> IMDb
  */  

  for(var i in arrangeObj) {
    var item = arrangeObj[i];
    movieList[i] = {
      type: 'bubble',
      styles: {
        hero: {
          backgroundColor: "#000000"
        }
      },   
      header: {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "text",
            weight: "bold",
            gravity:"center",
            text: "NO."+item[0]+item[1],
            wrap: true
          },            
        ]
      }, 
      hero: {
          type: "image",
          url: item[3],
          size: "5xl",
          backgroundColor: "#000000",
      },        
     body: {
        type: "box",
        layout: "vertical",
        spacing: "md",
        contents: [          
          {
            type: "text",
            size: "sm",
            color: "#1B2E4F",   
            weight:"bold",
            text: item[1]
          },
          {
            type: "separator"
          },
          {
            type: "text",
            size: "xs",
            color: "#636363",  
            text: "網友滿意度：" + item[4]+ "/5顆星"
          },
          {
            type: "separator"
          },  
          {
            type: "text",
            size: "xs",
            color: "#636363",              
            text: "IMDb：" + item[6] 
          },
          {
            type: "separator"
          }               
        ]
      },                    
      footer: {
        type: "box",
        layout: "vertical",
        spacing: "md",
        contents: [
          {
            type: "button",
            height: "sm",
            style: "primary",
            color: "#4285F4",
            action: {
              type: "uri",
              label: "電影介紹",
              uri: item[2]
            }
          },
           {
            type: "button",
            height: "sm",
            style: "primary",
            color: "#4285F4",
            action: {
              type: "uri",
              label: "預告片",
              uri: item[5]
            }
          }   
        ]
      }     
       
    }
  };  
  
  var retMsg = [{
    type: 'flex',
    altText: 'Yahoo (Released This Week)',
    contents: {
      type: "carousel",
      contents: movieList
    }
  }]  

  return retMsg;
}


