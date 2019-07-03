/**
 *
 * @format
 */

/* eslint func-names: ["error", "as-needed"] */
import "../css/main.scss";

$(document).ready(() => {
  const $buttons = $(".btn");
  // self-executing function/expression
  const style = (() => {
    const styleButtons = function() {
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
          }
        );
      });
    };

    const setPanelHeight = () => {
      const footerHeight = 120;
      $(".panel").height(
        $(window).height() - $("header").height() - footerHeight
      );
    };

    const setAllPanelsWidth = () => {
      const noOfActivePanels = 4 - $(".hidden").length;
      const margin = 16;
      $(".panel").width($(window).width() / noOfActivePanels - margin);
      console.log(`Stop A: ${noOfActivePanels}`);
    };

    styleButtons();
    setPanelHeight();
    setAllPanelsWidth();

    return { setAllPanelsWidth };
  })();

  // self-executing function/expression
  const controlPanelVisibiityWithButtons = (() => {
    // ------------- functions -------------
    const getButtonClass = function(elem) {
      let btnClass = elem.attr("class");
      btnClass = btnClass.split(" "); // "btn btn-html active"
      return btnClass[1]; // btn-html
    };

    const mapBtnClassToPanelClass = function() {
      let panelToHide = ".panel--";

      switch (getButtonClass($(this))) {
        case "btn--html":
          panelToHide += "html";
          break;
        case "btn--css":
          panelToHide += "css";
          break;
        case "btn--js":
          panelToHide += "js";
          break;
        case "btn--output":
          panelToHide += "output";
          break;
        default:
          break;
      }

      $(panelToHide).toggleClass("hidden");
      style.setAllPanelsWidth();
    };

    $buttons.each(function addHandlersOnButtons() {
      $(this).click(mapBtnClassToPanelClass);
    });
  })();

  // --- self-executing function/expression
  const generateWebpageInOutputPanel = (() => {
    const $inputs = $(".panel");
    const $cssInput = $(".panel--css");
    const $htmlInput = $(".panel--html");
    const $jsInput = $(".panel--js");

    // ------------- functions -------------

    const renderView = () => {
      $("iframe")
        .contents()
        .find("head")
        .html(`<style type='text/css'>${$cssInput.val()}</style>`);

      $("iframe")
        .contents()
        .find("body")
        .html($htmlInput.val());

      $("iframe")
        .contents()
        .find("body")
        .append(`<script>${$jsInput.val()}</script>`);
    };

    $inputs.each(function addHandlersOnInputPanels() {
      $(this).on("input", () => {
        renderView();
      });
    });

    const renderInitialView = () => {
      const initilJScript =
        "var msg = document.getElementById('message'); \nmsg.style = 'font-weight: bold; text-decoration: underline'";
      $jsInput.val(initilJScript);

      const initialHtml =
        "<h1>Html is easy</h1>\n<p>Use the buttons to activate the panels and create <span id='message'>your own</span> webpage.</p>";
      $htmlInput.val(initialHtml);

      const initialCss =
        "h1 { \n    color: blue; \n} p {\n    font-size: 1.5em; \n    color: green; \n}";
      $cssInput.val(initialCss);
      renderView();
    };

    renderInitialView();
  })();
});
