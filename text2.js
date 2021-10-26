const html = `
  <button id="send">Send message</button>
  <p>Message arrival: <span id="msg"></span></p>
  <script>
    window.addEventListener("message", function (e) {
      if (e.source !== parent) return;
      document.getElementById("msg").textContent = e.data;
    });

    document.getElementById("send").addEventListener("click", function() {
          parent.postMessage("response", "*");
    });
  </script>
`;

reearth.ui.show(html);

reearth.on("message", msg => {
  console.log("message received:", msg);
});

reearth.ui.postMessage("hello world");