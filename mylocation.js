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
  <h1>My location</h1>
  <p>Latitude: <span id="lat">-</span></p>
  <p>Longitude: <span id="lon">-</span></p>
  <p>Accuracy: <span id="accuracy">-</span>km</p>
  <p>
    <button id="update">Update</button>
    <button id="jump">Jump</button>
  </p>
</div>
<script>


  let lat, lng, accuracy;

  
  const update = () => {
    function success(pos){
      lat = pos.coords.latitude;
      lng = pos.coords.longitude;
      accuracy = pos.coords.accuracy;
    }
    
    function fail(pos){
      alert('位置情報の取得に失敗しました。エラーコード：');
    }
  
    return navigator.geolocation.getCurrentPosition(success,fail);
  };
  //プラグイン側からreearthにメッセージを送っている
  const send = () => {
    // WORKSHOP: HERE IS CODE TO SEND DATA TO RE:EARTH
    parent.postMessage({ lat, lng, accuracy }, "*");
  };

  document.getElementById("update").addEventListener("click", update);
  document.getElementById("jump").addEventListener("click", send);

  const updateExtended = e => {
    if (e && e.horizontally) {
      document.documentElement.classList.add("extendedh");
    } else {
      document.documentElement.classList.remove("extendedh");
    }
    if (e && e.vertically) {
      document.documentElement.classList.add("extendedv");
    } else {
      document.documentElement.classList.remove("extendedv");
    }
  };

  addEventListener("message", e => {
    if (e.source !== parent || !e.data.extended) return;
    updateExtended(e.data.extended);
  });

  updateExtended(${JSON.stringify(reearth.widget.extended || null)});
  update();
</script>
`;
//こっから上はiframeで実行
//こっから下はweb assembly

reearth.ui.show(html);
reearth.on("update", () => {
  reearth.ui.postMessage({
    extended: reearth.widget.extended
  });
});

// WORKSHOP: HERE IS CODE TO MOVE CAMERA
reearth.on("message", msg => {
  reearth.visualizer.camera.flyTo({
    lat: msg.lat,
    lng: msg.lng,
    height: 10,
    heading: 0,
    pitch: -Math.PI/2,
    roll: 0,
  }, {
    duration: 2
  });
});