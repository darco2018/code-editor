/* eslint-disable no-alert, no-console, no-unused-vars, no-multiple-empty-lines, 
no-trailing-spaces, max-len, padded-blocks */

/* eslint func-names: ["error", "as-needed"] */

$(document).ready(() => {
  // self-executing function/expression
  const style = (() => {
    const styleButtons = function () {
      const $buttons = $(".btn");

      $buttons.each(function addActiveBehaviour() {
        $(this).addClass("active");

        $(this).click(() => {
          $(this).toggleClass("active");
          $(this).removeClass("highlight");
        });

        $(this).hover(
          () => {
            $(this).addClass("highlight");
          },
          () => {
            $(this).removeClass("highlight");
          },
        );
      });
    };

    const setPanelHeight = () => {
      $(".panel").height($(window).height() - $("header").height() - 120);
    };

    const setPanelWidth = () => {
      const noOfActivePanels = 4 - $(".hidden").length;
      $(".panel").width($(window).width() / noOfActivePanels - 16);
      console.log(`Stop A: ${noOfActivePanels}`);
    };

    styleButtons();
    setPanelHeight();
    setPanelWidth();

    return { setPanelWidth };
  })();

  // self-executing function/expression
  const controlPanelVisibiityWithButtons = (() => {
    const $buttons = $(".btn");

    // ------------- functions -------------

    const getButtonClass = function (elem) {
      let btnClass = elem.attr("class");
      btnClass = btnClass.split(" "); // "btn btn-html active"
      return btnClass[1]; // btn-html
    };

    const showHidePanel = function () {
      let panelClass = ".panel--";

      switch (getButtonClass($(this))) {
      case "btn--html":
        panelClass += "html";
        break;
      case "btn--css":
        panelClass += "css";
        break;
      case "btn--js":
        panelClass += "js";
        break;
      case "btn--output":
        panelClass += "output";
        break;
      default:
        break;
      }

      $(panelClass).toggleClass("hidden"); // Jquery  itselfhas toggle() to show/hide
      style.setPanelWidth();
    };

    $buttons.each(function addHandlersOnButtons() {
      $(this).click(showHidePanel);
    });
  })();

  // --- self-executing function/expression
  const generateWebpageInOutputPanel = (() => {
    const $cssInput = $(".panel--css");
    const $htmlInput = $(".panel--html");
    const $jsInput = $(".panel--js");
    const $inputs = $(".panel");
    const $frameBody = $("iframe")
      .contents()
      .find("body");

    const $myFrameHead = $("iframe")
      .contents()
      .find("head");

    // ------------- functions -------------

    $myFrameHead.append("<style type='text/css'>");

    const renderView = () => {
      $("iframe")
        .contents()
        .find("body")
        .html($htmlInput.val());
      $myFrameHead.find("<style>").html($cssInput.val());
      $frameBody.append(`<script>${$jsInput.val()}</script>`);
    };

    $inputs.each(function addHandlersOnInputPanels() {
      // alternative events: "change keyup paste"
      $(this).on("input", () => {
        renderView();
      });
    });

    const renderInitialView = () => {
      const initilJScript = "document.body.append( document.createTextNode( 'This text is generated "
        + "with JavaScript and styled with CSS' ));";
      $jsInput.val(initilJScript);

      const initialHtml = "<h1>Html is easy</h1>\n<p>Use the buttons to activate the panels and create your own webpage.</p>";
      $htmlInput.val(initialHtml);

      const initialCss = "body { \n    font-size: 1.5em; \n    color: blue; \n}";
      $cssInput.val(initialCss);
      renderView();
    };

    renderInitialView();
  })();
});
