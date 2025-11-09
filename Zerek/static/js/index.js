$(() => {
  $("#btn-save").click(() => {
    html2canvas(document.querySelector("#content_ifr").contentDocument.body, {
      useCORS: true,
    }).then((canvas) => {
      const img = canvas.toDataURL("image/png"),
        link = document.createElement("a");
      link.href = img;
      link.download = "result.png";
      link.click();
    });
  });
});
