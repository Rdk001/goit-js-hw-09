const t=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]");let d=null;function n(){document.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}e.disabled=!0,t.addEventListener("click",(function(){d=setInterval(n,1e3),t.disabled=!0,e.disabled=!1})),e.addEventListener("click",(function(){clearInterval(d),e.disabled=!0,t.disabled=!1}));
//# sourceMappingURL=01-color-switcher.f18a7a0e.js.map