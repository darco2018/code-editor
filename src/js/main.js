/* eslint-disable no-alert, no-console, no-unused-vars, no-multiple-empty-lines, 
no-trailing-spaces, max-len, padded-blocks */

/* eslint func-names: ["error", "as-needed"] */

$(document).ready(() => {
  // self-executing function/expression
  const controlPanelVisibiityWithButtons = (() => {
    const $buttons = $(".btn-primary");

    // ------------- functions -------------

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

    $buttons.each(function addHandlersOnButtons() {
      $(this).click(showHidePanel);
    });
  })();

  // --- self-executing function/expression
  const generateWebpageInOutputPanel = (() => {
    const $cssInput = $("#css-input");
    const $htmlInput = $("#html-input");
    const $jsInput = $("#js-input");
    const $inputs = $(".input");
    const $frameBody = $("#iframe-result")
      .contents()
      .find("body");

    const $myFrameHead = $("#iframe-result")
      .contents()
      .find("head");

    // ------------- functions -------------

    const renderView = () => {
      $frameBody.html($htmlInput.val());
      $myFrameHead.append(`<style>${$cssInput.val()}</style>`);
      $frameBody.append(`<script>${$jsInput.val()}</script>`);
    };

    $inputs.each(function addHandlersOnInputPanels() {
      $(this).on("input", () => {
        renderView();
      });
    });

    const renderInitialView = () => {
      const initilJScript = "document.body.append(document.createTextNode('This text is generated "
        + "with JavaScript and styled with CSS'))";
      $jsInput.val(initilJScript);

      const initialHtml = "<h1>Html is simple</h1>";
      $htmlInput.val(initialHtml);

      const initialCss = "body{font-size: 1.5em;background: yellow;color: blue}";
      $cssInput.val(initialCss);
      renderView();
    };

    renderInitialView();
  })();
});
