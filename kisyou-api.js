const html = `
<style>
  body { margin: 0; }
  .extendedh { width: 100%; }
  .extendedv { height: 100%; }
  #wrapper {
    border: 2px solid blue;
    border-radius: 5px;
    background-color: rgba(111, 111, 111, 0.5);
    box-sizing: border-box;
    /*width: 300px;*/
  }
</style>
<div class="wrapper">
<table>
<tr class="publishingOffice">
  <th>発表者</th>
  <td></td>
</tr>
<tr class="reportDatetime">
  <th>報告日時</th>
  <td></td>
</tr>
<tr class="targetArea">
  <th>対象地域</th>
  <td></td>
</tr>
<tr class="today">
  <th>今日の天気</th>
  <td></td>
</tr>
<tr class="tomorrow">
  <th>明日の天気</th>
  <td></td>
</tr>
<tr class="dayAfterTomorrow">
  <th>明後日の天気</th>
  <td></td>
</tr>
<tr class="todayMaxTemp">
  <th>今日の最低気温</th>
  <td></td>
</tr>
<tr class="todayMinTemp">
  <th>今日の最高気温</th>
  <td></td>
</tr>
</table>
</div>
<script>
const cb = (block) => {
  console.log(block);
  let area_code = "130000";
  if (block && block.property && block.property.default && block.property.default.code1) {
    area_code = block.property.default.code1+ '';

    fetch("https://www.jma.go.jp/bosai/forecast/data/forecast/"+area_code+".json")
    .then(r => r.json())
    .then(weather =>{
        console.log(weather);
        // 特定の地域(今回は東京)だけ選択して変数に詰め直す
        let area = weather[0].timeSeries[0].areas[0];
        // 最低最高気温
        let area2 = weather[0].timeSeries[2].areas[0];
        console.log("areaだよ");
        console.log(area2);
        // 発表者と報告日時の情報を画面に書き出す
        document.getElementsByClassName("publishingOffice")[0].lastElementChild.textContent =
          weather[0].publishingOffice;
        document.getElementsByClassName("reportDatetime")[0].lastElementChild.textContent =
          weather[0].reportDatetime;
        // 特定地域の情報を画面に書き出す
        document.getElementsByClassName("targetArea")[0].lastElementChild.textContent =
          area.area.name;
        document.getElementsByClassName("today")[0].lastElementChild.textContent =
          area.weathers[0];
        document.getElementsByClassName("tomorrow")[0].lastElementChild.textContent =
          area.weathers[1];
        document.getElementsByClassName("dayAfterTomorrow")[0].lastElementChild.textContent =
          area.weathers[2];
        document.getElementsByClassName("todayMaxTemp")[0].lastElementChild.textContent =
          area2.temps[0];
        document.getElementsByClassName("todayMinTemp")[0].lastElementChild.textContent =
          area2.temps[1];
      })
      .catch(error => {
        console.error('通信に失敗しました', error);
      })






  } else {
    console.log("no area code");
  }
};

addEventListener("message", e => {
  if (e.source !== parent) return;
  console.log("e.dataが何なのか見たい");
  console.log(JSON.stringify(e.data));
  cb(e.data);
});

cb(${JSON.stringify(reearth.block)});



</script>
`;
reearth.ui.show(html);

reearth.on("update", () => {
  reearth.ui.postMessage(reearth.block);
});
