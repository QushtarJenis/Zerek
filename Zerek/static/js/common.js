window.$qar = {
  defaultLanguage: "kz",
  siteLanguges: ["kz", "ru", "en", "zh-cn", "tr", "tote", "latyn"],
  getCurrentLanguage: () => {
    let pathName = window.location.pathname.startsWith("/")
        ? window.location.pathname.substring(1)
        : window.location.pathname,
      pArr = pathName ? pathName.split("/") : [],
      currentLanguge = pArr.length > 0 ? pArr[0].toLowerCase() : "";
    return $qar.siteLanguges.includes(currentLanguge)
      ? currentLanguge
      : $qar.defaultLanguage;
  },
  getCurrentTheme: () => {
    const skin = localStorage.getItem("skin");
    if (skin && ["light", "dark"].includes(skin)) return skin;
    const theme = document.body.getAttribute("data-pc-theme");
    return theme ? theme : "light";
  },
  setLoadingStatus: (status = "show") => {
    switch (status) {
      case "show":
        {
          $(".container").addClass("d-none");
        }
        break;

      case "hide":
        {
          $("body").removeClass("d-none");
        }
        break;
    }
  },
  setBtnStatus: (btn, status) => {
    if (status === "loading") {
      btn.setAttribute("data-old-html", btn.innerHTML);
      btn.innerHTML =
        `<span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                             <span role="status">` +
        btn.getAttribute("data-loading-text") +
        `</span>`;
      btn.disabled = true;
    } else if (status === "reset") {
      btn.innerHTML = btn.getAttribute("data-old-html");
      btn.disabled = false;
    }
  },
  removeFormInvalidFeedback: (form) => {
    const isInvalidElements = form.querySelectorAll(".is-invalid"),
      invalidFeedbackElements = form.querySelectorAll(".invalid-feedback");

    isInvalidElements.forEach((element) =>
      element.classList.remove("is-invalid")
    );
    invalidFeedbackElements.forEach((element) => element.remove());
  },
  showFormInputError: (input, message) => {
    const form = input.closest("form");
    $qar.removeFormInvalidFeedback(form);
    input.classList.add("is-invalid");

    var invalidFeedback = document.createElement("div");
    invalidFeedback.classList.add("invalid-feedback");
    invalidFeedback.innerText = message;
    input.after(invalidFeedback);
    input.focus();
    input.addEventListener(
      "change",
      () => {
        $qar.removeFormInvalidFeedback(form);
      },
      { once: true }
    );
    input.addEventListener(
      "keyup",
      () => {
        $qar.removeFormInvalidFeedback(form);
      },
      { once: true }
    );
    input.addEventListener(
      "input",
      () => {
        $qar.removeFormInvalidFeedback(form);
      },
      { once: true }
    );
  },
  showMessage: (status, message, timer) => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: !timer || isNaN(timer) ? 3000 : parseInt(timer),
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
    Toast.fire({
      icon: status,
      showClass: { backdrop: "swal2-backdrop-hide" },
      title: message,
    });
  },
  removeCustomModal: () => {
    if (document.querySelector("#qar-custom-modal")) {
      if (
        document
          .querySelector("#qar-custom-modal")
          .classList.contains("show") &&
        $qar.qarModal
      ) {
        $qar.qarModal.hide();
        $qar.qarModal = null;
        return;
      }
      document.querySelector("#qar-custom-modal").remove();
    }
    if (document.querySelector(".modal-backdrop")) {
      document.querySelector(".modal-backdrop").remove();
    }
    document.querySelectorAll("script[data-modal]").forEach((script) => {
      script.remove();
    });
  },
  showCustomModal: async (url, width) => {
    $qar.removeCustomModal();
    const res = await fetch(url, { method: "GET" }),
      resData = await res.text(),
      qarModalNode = document.createElement("div");
    qarModalNode.classList.add("modal");
    qarModalNode.setAttribute("id", "qar-custom-modal");
    qarModalNode.setAttribute("tabindex", "-1");
    qarModalNode.innerHTML =
      `<div class="modal-dialog"><div class="modal-content">` +
      resData +
      `</div></div>`;
    if (width && !isNaN(width)) {
      qarModalNode.querySelector("div.modal-dialog").style.width = width + "px";
      qarModalNode.querySelector("div.modal-dialog").style.maxWidth =
        width + "px";
    }
    $qar.qarModal = new bootstrap.Modal(qarModalNode, {
      backdrop: true,
      keyboard: true,
      focus: true,
    });
    qarModalNode.addEventListener("shown.bs.modal", function (event) {
      document
        .querySelector("#qar-custom-modal")
        .querySelectorAll("script")
        .forEach((originalScript) => {
          const newScript = document.createElement("script");
          Array.from(originalScript.attributes).forEach((attr) => {
            newScript.setAttribute(attr.name, attr.value);
          });
          newScript.textContent = originalScript.textContent;
          document.body.appendChild(newScript);
          originalScript.parentNode.removeChild(originalScript);
        });
    });
    qarModalNode.addEventListener("hidden.bs.modal", function (event) {
      $qar.removeCustomModal();
    });
    $qar.qarModal.show();
  },
  getDataTableLanguage: () => {
    const dataTableLanguage = document.querySelector("#dataTableLanguage");
    return {
      sSearch: dataTableLanguage.querySelector('div[data-key="sSearch"]')
        .innerHTML,
      sProcessing: dataTableLanguage.querySelector(
        'div[data-key="sProcessing"]'
      ).innerHTML,
      sLengthMenu: dataTableLanguage.querySelector(
        'div[data-key="sLengthMenu"]'
      ).innerHTML,
      sZeroRecords: dataTableLanguage.querySelector(
        'div[data-key="sZeroRecords"]'
      ).innerHTML,
      sInfo: dataTableLanguage.querySelector('div[data-key="sInfo"]').innerHTML,
      sInfoEmpty: dataTableLanguage.querySelector('div[data-key="sInfoEmpty"]')
        .innerHTML,
      sInfoFiltered: dataTableLanguage.querySelector(
        'div[data-key="sInfoFiltered"]'
      ).innerHTML,
      sInfoPostFix: dataTableLanguage.querySelector(
        'div[data-key="sInfoPostFix"]'
      ).innerHTML,
      sUrl: dataTableLanguage.querySelector('div[data-key="sUrl"]').innerHTML,
      oPaginate: {
        sFirst: dataTableLanguage.querySelector(
          'div[data-key="oPaginate"] > div[data-key="sFirst"]'
        ).innerHTML,
        sPrevious: dataTableLanguage.querySelector(
          'div[data-key="oPaginate"] > div[data-key="sPrevious"]'
        ).innerHTML,
        sNext: dataTableLanguage.querySelector(
          'div[data-key="oPaginate"] > div[data-key="sNext"]'
        ).innerHTML,
        sLast: dataTableLanguage.querySelector(
          'div[data-key="oPaginate"] > div[data-key="sLast"]'
        ).innerHTML,
      },
    };
  },
  getMultiLanguageJson: function (form) {
    var multiLanguageArr = [];
    form.querySelectorAll("[data-multilanguage]").forEach(function (v) {
      var multilanguage = v.getAttribute("data-multilanguage").toLowerCase(),
        name = v.getAttribute("name"),
        elementId = v.getAttribute("id"),
        nameParts = name.split("_"),
        columnName = nameParts.length > 0 ? nameParts[0] : "",
        language = nameParts.length > 1 ? nameParts[1] : "",
        columnValue = "";

      switch (multilanguage) {
        case "input":
        case "textarea":
          {
            columnValue = v.value;
          }
          break;
        case "tinymce":
          {
            columnValue = tinymce.get(elementId).getContent();
          }
          break;
      }
      multiLanguageArr.push({
        columnName: columnName,
        language: language,
        columnValue: columnValue,
      });
    });
    return JSON.stringify(multiLanguageArr);
  },
  bindTinymceEditor: function (mode) {
    if (!document.querySelectorAll(".tinymce-editor")) return;
    document.querySelectorAll(".tinymce-editor").forEach(function (v, i) {
      const elementId = v.getAttribute("id");

      // const originalLanguage = $qar.getCurrentLanguage();
      // let language = originalLanguage.toLowerCase(),
      //   isRtlUI = false,
      //   imeEnabled = false;

      // switch (language) {
      //   case "zh-cn":
      //     language = "zh_CN";
      //     break;
      //   case "kz":
      //     language = "kk";
      //     break;
      //   case "tote":
      //     language = "kz";
      //     isRtlUI = true;
      //     imeEnabled = true;
      //     break;
      // }
      const language = "kz",
        isRtlUI = true,
        imeEnabled = true;

      mode = mode ? mode : $qar.getCurrentTheme();

      tinymce.init({
        selector: "#" + elementId,
        directionality: "rtl", //isRtlUI ? "rtl" : "ltr",
        height: 480,
        cleanup: true,
        contextmenu: false,
        // paste_as_text: true,
        language: language,
        rtl_ui: isRtlUI,
        relative_urls: true,
        remove_script_host: true,
        // Note: `rtl_ui` and `imeEnabled` are not standard TinyMCE options.
        // You might need to implement custom functionality to support these features.
        branding: false,
        schema: "html5",
        elementpath: false,
        statusbar: false,
        menubar: false,
        skin: mode === "light" ? "oxide" : "oxide-dark",
        content_css: mode === "light" ? "writer" : mode,
        content_style: "body { font-family: kaznet; }",
        font_family_formats: "Arial=arial,helvetica,sans-serif;",
        font_formats:
          "Andale Mono=andale mono,times; Arial=arial,helvetica,sans-serif",
        plugins:
          "inputkzchar link image lists charmap preview anchor pagebreak searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking table directionality emoticons",
        toolbar: [
          "undo redo bold italic underline strikethrough blockquote forecolor backcolor alignleft aligncenter alignright alignjustify ltr rtl",
          "bullist numlist outdent indent customFontSelect fontsizeinput link unlink media table removeformat", //customImage customSocial customUpload
        ],
        setup: (editor) => {
          editor.customConfig = {
            imeEnabled: imeEnabled,
            language: language,
          };
          editor.ui.registry.addIcon(
            "customFontSelectIcon",
            `<?xml version="1.0" encoding="UTF-8"?><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20px" height="16px" viewBox="0 0 20 16" version="1.1"><defs><filter id="alpha" filterUnits="objectBoundingBox" x="0%" y="0%" width="100%" height="100%">  <feColorMatrix type="matrix" in="SourceGraphic" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/></filter><mask id="mask0">  <g filter="url(#alpha)"><rect x="0" y="0" width="20" height="16" style="fill:rgb(0%,0%,0%);fill-opacity:0.4;stroke:none;"/>  </g></mask><clipPath id="clip1">  <rect x="0" y="0" width="20" height="16"/></clipPath><g id="surface5" clip-path="url(#clip1)"><path style=" stroke:none;fill-rule:nonzero;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 16 5 C 13.789062 5 12 6.789062 12 9 L 12 11 C 12 13.210938 13.789062 15 16 15 C 16.765625 15 17.480469 14.785156 18.085938 14.414062 C 18.242188 14.757812 18.59375 15 19 15 C 19.554688 15 20 14.554688 20 14 L 20 6 C 20 5.445312 19.554688 5 19 5 C 18.59375 5 18.246094 5.242188 18.085938 5.585938 C 17.480469 5.214844 16.765625 5 16 5 Z M 18 9 L 18 11 C 18 12.101562 17.101562 13 16 13 C 14.898438 13 14 12.101562 14 11 L 14 9 C 14 7.898438 14.898438 7 16 7 C 17.101562 7 18 7.898438 18 9 Z M 18 9 "/></g></defs><g id="surface1"><use xlink:href="#surface5" mask="url(#mask0)"/><path style=" stroke:none;fill-rule:nonzero;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 6.4375 1.648438 C 6.289062 1.257812 5.914062 1 5.5 1 C 5.085938 1 4.710938 1.257812 4.5625 1.648438 L 0.0625 13.648438 C -0.132812 14.164062 0.132812 14.742188 0.648438 14.9375 C 1.164062 15.132812 1.742188 14.867188 1.933594 14.351562 L 3.007812 11.5 L 7.992188 11.5 L 9.0625 14.351562 C 9.257812 14.867188 9.835938 15.128906 10.351562 14.933594 C 10.867188 14.742188 11.128906 14.164062 10.933594 13.648438 Z M 7.242188 9.5 L 3.757812 9.5 L 5.5 4.847656 Z M 7.242188 9.5 "/></g></svg>`
          );

          // editor.ui.registry.addButton("customFontSelect", {
          //   icon: "customFontSelectIcon",
          //   tooltip: "Change font family",
          //   onAction: function () {},
          // });

          editor.ui.registry.addMenuButton("customFontSelect", {
            icon: "customFontSelectIcon",
            tooltip: "Change font family",
            fetch: (callback) => {
              const items = [
                {
                  type: "menuitem",
                  text: "KazNet",
                  onAction: () => {
                    editor.execCommand("fontName", false, "KazNet");
                  },
                },
                {
                  type: "menuitem",
                  text: "UKK RKK1",
                  onAction: () => {
                    editor.execCommand("fontName", false, "UKK RKK1");
                  },
                },
                {
                  type: "menuitem",
                  text: "UKK TZK1",
                  onAction: () => {
                    editor.execCommand("fontName", false, "UKK TZK1");
                  },
                },
                {
                  type: "menuitem",
                  text: "UKIJ Tuz Tom",
                  onAction: () => {
                    editor.execCommand("fontName", false, "UKIJ Tuz Tom");
                  },
                },
                {
                  type: "menuitem",
                  text: "UKIJ Chiwer Kesme",
                  onAction: () => {
                    editor.execCommand("fontName", false, "UKIJ Chiwer Kesme");
                  },
                },
                {
                  type: "menuitem",
                  text: "ALKATIP Tor Tom",
                  onAction: () => {
                    editor.execCommand("fontName", false, "ALKATIP Tor Tom");
                  },
                },
                {
                  type: "menuitem",
                  text: "ALKATIP Basma Tom",
                  onAction: () => {
                    editor.execCommand("fontName", false, "ALKATIP Basma Tom");
                  },
                },
                {
                  type: "menuitem",
                  text: "ALKATIP Jornal Tom",
                  onAction: () => {
                    editor.execCommand("fontName", false, "ALKATIP Jornal Tom");
                  },
                },
                {
                  type: "menuitem",
                  text: "KazakhSoft Asilya",
                  onAction: () => {
                    editor.execCommand("fontName", false, "KazakhSoft Asilya");
                  },
                },
                {
                  type: "menuitem",
                  text: "KazakhSoft Qaniq",
                  onAction: () => {
                    editor.execCommand("fontName", false, "KazakhSoft Qaniq");
                  },
                },
                {
                  type: "menuitem",
                  text: "KazakhSoft Baspa",
                  onAction: () => {
                    editor.execCommand("fontName", false, "KazakhSoft Baspa");
                  },
                },
                {
                  type: "menuitem",
                  text: "KazakhSoft Sulus",
                  onAction: () => {
                    editor.execCommand("fontName", false, "KazakhSoft Sulus");
                  },
                },
                {
                  type: "menuitem",
                  text: "Romantik",
                  onAction: () => {
                    editor.execCommand("fontName", false, "Romantik");
                  },
                },
                {
                  type: "menuitem",
                  text: "Romantik",
                  onAction: () => {
                    editor.execCommand("fontName", false, "Romantik");
                  },
                },
                {
                  type: "menuitem",
                  text: "Romantik",
                  onAction: () => {
                    editor.execCommand("fontName", false, "Romantik");
                  },
                },
                {
                  type: "menuitem",
                  text: "Romantik",
                  onAction: () => {
                    editor.execCommand("fontName", false, "Romantik");
                  },
                },
                {
                  type: "menuitem",
                  text: "Romantik",
                  onAction: () => {
                    editor.execCommand("fontName", false, "Romantik");
                  },
                },
                {
                  type: "menuitem",
                  text: "Romantik",
                  onAction: () => {
                    editor.execCommand("fontName", false, "Romantik");
                  },
                },
                {
                  type: "menuitem",
                  text: "Romantik",
                  onAction: () => {
                    editor.execCommand("fontName", false, "Romantik");
                  },
                },
                {
                  type: "menuitem",
                  text: "Romantik",
                  onAction: () => {
                    editor.execCommand("fontName", false, "Romantik");
                  },
                },
                {
                  type: "menuitem",
                  text: "Romantik",
                  onAction: () => {
                    editor.execCommand("fontName", false, "Romantik");
                  },
                },
                {
                  type: "menuitem",
                  text: "Romantik",
                  onAction: () => {
                    editor.execCommand("fontName", false, "Romantik");
                  },
                },
                {
                  type: "menuitem",
                  text: "Romantik",
                  onAction: () => {
                    editor.execCommand("fontName", false, "Romantik");
                  },
                },
                {
                  type: "menuitem",
                  text: "Romantik",
                  onAction: () => {
                    editor.execCommand("fontName", false, "Romantik");
                  },
                },
                {
                  type: "menuitem",
                  text: "Romantik",
                  onAction: () => {
                    editor.execCommand("fontName", false, "Romantik");
                  },
                },
                {
                  type: "menuitem",
                  text: "Romantik",
                  onAction: () => {
                    editor.execCommand("fontName", false, "Romantik");
                  },
                },
                {
                  type: "menuitem",
                  text: "Romantik",
                  onAction: () => {
                    editor.execCommand("fontName", false, "Romantik");
                  },
                },
                {
                  type: "menuitem",
                  text: "Romantik",
                  onAction: () => {
                    editor.execCommand("fontName", false, "Romantik");
                  },
                },
                {
                  type: "menuitem",
                  text: "Romantik",
                  onAction: () => {
                    editor.execCommand("fontName", false, "Romantik");
                  },
                },
                {
                  type: "menuitem",
                  text: "Romantik",
                  onAction: () => {
                    editor.execCommand("fontName", false, "Romantik");
                  },
                },
                {
                  type: "menuitem",
                  text: "Romantik",
                  onAction: () => {
                    editor.execCommand("fontName", false, "Romantik");
                  },
                },
                {
                  type: "menuitem",
                  text: "Romantik",
                  onAction: () => {
                    editor.execCommand("fontName", false, "Romantik");
                  },
                },
                {
                  type: "menuitem",
                  text: "Romantik",
                  onAction: () => {
                    editor.execCommand("fontName", false, "Romantik");
                  },
                },
                {
                  type: "menuitem",
                  text: "Romantik",
                  onAction: () => {
                    editor.execCommand("fontName", false, "Romantik");
                  },
                },
                {
                  type: "menuitem",
                  text: "Romantik",
                  onAction: () => {
                    editor.execCommand("fontName", false, "Romantik");
                  },
                },
                {
                  type: "menuitem",
                  text: "Romantik",
                  onAction: () => {
                    editor.execCommand("fontName", false, "Romantik");
                  },
                },
                {
                  type: "menuitem",
                  text: "Romantik",
                  onAction: () => {
                    editor.execCommand("fontName", false, "Romantik");
                  },
                },
                {
                  type: "menuitem",
                  text: "Romantik",
                  onAction: () => {
                    editor.execCommand("fontName", false, "Romantik");
                  },
                },
                {
                  type: "menuitem",
                  text: "Romantik",
                  onAction: () => {
                    editor.execCommand("fontName", false, "Romantik");
                  },
                },
                {
                  type: "menuitem",
                  text: "Romantik",
                  onAction: () => {
                    editor.execCommand("fontName", false, "Romantik");
                  },
                },
                {
                  type: "menuitem",
                  text: "Romantik",
                  onAction: () => {
                    editor.execCommand("fontName", false, "Romantik");
                  },
                },
                {
                  type: "menuitem",
                  text: "Romantik",
                  onAction: () => {
                    editor.execCommand("fontName", false, "Romantik");
                  },
                },
                {
                  type: "menuitem",
                  text: "UKIJ Nasq",
                  onAction: () => {
                    editor.execCommand("fontName", false, "UKIJ Nasq");
                  },
                },
              ];
              callback(items);
            },
          });

          // editor.ui.registry.addIcon(
          //   "customImageIcon",
          //   '<svg fill="#000000" width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19,13a1,1,0,0,0-1,1v.38L16.52,12.9a2.79,2.79,0,0,0-3.93,0l-.7.7L9.41,11.12a2.85,2.85,0,0,0-3.93,0L4,12.6V7A1,1,0,0,1,5,6h7a1,1,0,0,0,0-2H5A3,3,0,0,0,2,7V19a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V14A1,1,0,0,0,19,13ZM5,20a1,1,0,0,1-1-1V15.43l2.9-2.9a.79.79,0,0,1,1.09,0l3.17,3.17,0,0L15.46,20Zm13-1a.89.89,0,0,1-.18.53L13.31,15l.7-.7a.77.77,0,0,1,1.1,0L18,17.21ZM22.71,4.29l-3-3a1,1,0,0,0-.33-.21,1,1,0,0,0-.76,0,1,1,0,0,0-.33.21l-3,3a1,1,0,0,0,1.42,1.42L18,4.41V10a1,1,0,0,0,2,0V4.41l1.29,1.3a1,1,0,0,0,1.42,0A1,1,0,0,0,22.71,4.29Z"/></svg>'
          // );
          // editor.ui.registry.addIcon(
          //   "customUploadIcon",
          //   '<svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g><path fill="none" d="M0 0h24v24H0z"/><path d="M15 4H5v16h14V8h-4V4zM3 2.992C3 2.444 3.447 2 3.999 2H16l5 5v13.993A1 1 0 0 1 20.007 22H3.993A1 1 0 0 1 3 21.008V2.992zM13 12v4h-2v-4H8l4-4 4 4h-3z"/></g></svg>'
          // );
          // editor.ui.registry.addIcon(
          //   "customSocialIcon",
          //   '<svg fill="#000000" width="24px" height="24px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4.67a2.14 2.14 0 0 0 2.19-2.09A2.14 2.14 0 0 0 8 .5a2.14 2.14 0 0 0-2.24 2.08 1.93 1.93 0 0 0 .22.9L3.3 6.16a2.19 2.19 0 0 0-1.11-.3A2.14 2.14 0 0 0 0 8a2.14 2.14 0 0 0 2.19 2 2.14 2.14 0 0 0 1-.23l2.77 2.78a2.06 2.06 0 0 0-.18.83A2.14 2.14 0 0 0 8 15.5a2.09 2.09 0 1 0 0-4.17 2.25 2.25 0 0 0-1.18.33L4.09 9a1.77 1.77 0 0 0 .15-.31h7.52A2.19 2.19 0 0 0 13.81 10 2.14 2.14 0 0 0 16 8a2.2 2.2 0 0 0-4.3-.52H4.3a1.74 1.74 0 0 0-.14-.38l2.67-2.72A2.33 2.33 0 0 0 8 4.67zm0-1.24a.89.89 0 0 0 .94-.85.89.89 0 0 0-.94-.84.89.89 0 0 0-1 .84.89.89 0 0 0 1 .85zM2.19 8.8a.9.9 0 0 0 .94-.8.9.9 0 0 0-.94-.84.9.9 0 0 0-.95.84.91.91 0 0 0 .95.8zM14.76 8a1 1 0 0 1-1.89 0 1 1 0 0 1 1.89 0zm-5.87 5.42a.89.89 0 0 1-.94.84.85.85 0 1 1 0-1.69.89.89 0 0 1 .94.85z"/></svg>'
          // );

          // editor.ui.registry.addButton("customImage", {
          //   icon: "customImageIcon",
          //   tooltip: "Insert/edit image",
          //   onAction: function () {
          //     // Implement your image insertion logic here
          //     $qar.showCustomModal(
          //       "/" + $qar.getCurrentLanguage() + "/Modal/UploadEditorImage"
          //     );
          //   },
          // });

          // editor.ui.registry.addButton("customUpload", {
          //   icon: "customUploadIcon",
          //   tooltip: "Upload file",
          //   onAction: function () {
          //     // Implement your file upload logic here
          //     $qar.showCustomModal(
          //       "/" + $qar.getCurrentLanguage() + "/Modal/UploadEditorFile"
          //     );
          //   },
          // });

          // editor.ui.registry.addButton("customSocial", {
          //   icon: "customSocialIcon",
          //   tooltip: "Insert embed code",
          //   onAction: function () {
          //     // Implement your embed code insertion logic here
          //     $qar.showCustomModal(
          //       "/" + $qar.getCurrentLanguage() + "/Modal/EditorSocialEmbedcode"
          //     );
          //   },
          // });
        },
        init_instance_callback: (editor) => {
          const skin = $qar.getCurrentTheme();
          $("[data-skin]").removeClass("active");
          $(`[data-skin="${skin}"]`).addClass("active");
          $("body")
            .attr("data-pc-theme", skin)
            .find(".container")
            .removeClass("d-none");
        },
        relative_urls: false,
        remove_script_host: false,
        convert_urls: true,
      });
    });
  },
  getUppyLanguage: () => {
    switch ($qar.getCurrentLanguage()) {
      case "en": {
        return Uppy.locales.en_US;
      }
      case "zh-cn": {
        return Uppy.locales.zh_CN;
      }
      case "ru": {
        return Uppy.locales.ru_RU;
      }
      case "tr": {
        return Uppy.locales.tr_TR;
      }
      case "tote": {
        return Uppy.locales.tote_KZ;
      }
      case "latyn": {
        return Uppy.locales.latyn_KZ;
      }
      default: {
        return Uppy.locales.kk_KZ;
      }
    }
  },
};
