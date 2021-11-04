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
    width: 300px;
  }
  .extendedh body, .extendedh #wrapper { width: 100%; }
  .extendedv body, .extendedv #wrapper { height: 100%; }
</style>
<div id="wrapper">
<table>
<tr id="publishingOffice">
  <th>発表者</th>
  <td></td>
</tr>
<tr id="reportDatetime">
  <th>報告日時</th>
  <td></td>
</tr>
<tr id="targetArea">
  <th>対象地域</th>
  <td></td>
</tr>
<tr id="today">
  <th>今日の天気</th>
  <td></td>
</tr>
<tr id="tomorrow">
  <th>明日の天気</th>
  <td></td>
</tr>
<tr id="dayAfterTomorrow">
  <th>明後日の天気</th>
  <td></td>
</tr>
<tr id="todayMaxTemp">
  <th>今日の最低気温</th>
  <td></td>
</tr>
<tr id="todayMinTemp">
  <th>今日の最高気温</th>
  <td></td>
</tr>
</table>
</div>
<script>
fetch("https://www.jma.go.jp/bosai/forecast/data/forecast/130000.json")
  .then(r => r.json())
  .then(wether =>{
      console.log(weather);
      // 特定の地域(今回は東京)だけ選択して変数に詰め直す
      let area = weather[0].timeSeries[0].areas[0];
      // 最低最高気温
      let area2 = weather[0].timeSeries[2].areas[0];
      console.log("areaだよ");
      console.log(area2);
      // 発表者と報告日時の情報を画面に書き出す
      document.getElementById("publishingOffice").lastElementChild.textContent =
        weather[0].publishingOffice;
      document.getElementById("reportDatetime").lastElementChild.textContent =
        weather[0].reportDatetime;
      // 特定地域の情報を画面に書き出す
      document.getElementById("targetArea").lastElementChild.textContent =
        area.area.name;
      document.getElementById("today").lastElementChild.textContent =
        area.weathers[0];
      document.getElementById("tomorrow").lastElementChild.textContent =
        area.weathers[1];
      document.getElementById("dayAfterTomorrow").lastElementChild.textContent =
        area.weathers[2];
      document.getElementById("todayMaxTemp").lastElementChild.textContent =
        area2.temps[0];
      document.getElementById("todayMinTemp").lastElementChild.textContent =
        area2.temps[1];
    })
</script>
`;
reearth.ui.show(html);
