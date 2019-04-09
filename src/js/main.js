/* eslint-disable no-alert, no-console, no-unused-vars, no-multiple-empty-lines, 
no-trailing-spaces, max-len, padded-blocks */

/* eslint func-names: ["error", "as-needed"] */

$(document).ready(() => {
  const $buttons = $(".btn-primary");

  // self-executing function/expression
  const feature = (function main() {
    const showHidePanel = function () {
      const id = $(this).attr("id");
      let panelId = "#container-";

      switch (id) {
      case "btn-html":
        panelId += "html";
        break;
      case "btn-css":
        panelId += "css";
        break;
      case "btn-js":
        panelId += "js";
        break;
      case "btn-output":
        panelId += "result";
        break;
      default:
        break;
      }

      $(panelId).toggleClass("hidden");
    };

    $buttons.each(function name() {
      $(this).click(showHidePanel);
    });
  }()); // end main()
});
