/* eslint-disable no-alert, no-console, no-unused-vars, no-multiple-empty-lines, 
no-trailing-spaces, max-len, padded-blocks */

/* eslint func-names: ["error", "as-needed"] */

$(document).ready(() => {
  // self-executing function/expression
  const controlPanelDisplayWithButtons = (function main() {
    const $buttons = $(".btn-primary");

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
  }()); // end main1()

  // self-executing function/expression
  const loadDataToOutputPanel = (function main() {
    const $cssInput = $("#css-input");
    const $htmlInput = $("#html-input");
    const $myFrameBody = $("#iframe-result")
      .contents()
      .find("body");

    const $myFrameHead = $("#iframe-result")
      .contents()
      .find("head");

    // ------------- functions -------------

    const renderView = () => {
      $myFrameBody.html($htmlInput.val());
      $myFrameHead.append(`<style>${$cssInput.val()}</style>`);
    };

    $htmlInput.on("input", () => {
      renderView();
    });

    $cssInput.on("input", () => {
      renderView();
    });

    /* 
    $cssInput.on("input", () => {
      // const middle = "body{background:white}";
      $myFrameHead.append(start + middle + end);
    }); */
  }()); // end main2()
}); // end ready()
