# Carcinise

A bookmarklet that carcinises the page. I briefly went slightly insane while working on this.

**What's a bookmarklet?** Bookmarklets are small tools that sit in your bookmarks toolbar. They look like bookmarks, but when you click them they don't take you to a new location, they they add features or apply changes to the current page. These changes reset when you refresh or leave the page. Think of them as lightweight browser extensions.

## Installation

Create a new bookmark on your toolbar and set the address/URL to this code (this is also the content of `carcinise.min.js`):

```javascript
javascript:(()=>{let e=`🦀`,t=`<text x="50%" y=".9em" font-size="9" text-anchor="middle">${e}</text>`,r=`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10">${t}</svg>`)}`,a=`<svg viewBox="0 0 10 10">${t}</svg>`,s=()=>.25>Math.random();if(!document.getElementById("crab-style")){let c=document.head.appendChild(document.createElement("style"));c.id="crab-style",c.innerHTML=`.carcinised-bg{background:url("${r}") center no-repeat!important; background-size:contain!important;}`}function i(t){return t.replaceAll(/\d+|\p{Emoji}|(?!<[\p{L}])([\p{L}]+?)(?![\p{L}])/gmu,t=>s()?e:t)}function o(e){switch("none"!==getComputedStyle(e).getPropertyValue("background-image")&&e.classList.add("carcinised-bg"),e.tagName){case"INPUT":case"TEXTAREA":["value","placeholder"].forEach(t=>e[t]=i(e[t]));break;case"IMG":e.src=e.srcset=r,e.alt=i(e.alt);break;case"PICTURE":e.querySelectorAll("source").forEach(e=>e.src=e.srcset=r);break;case"VIDEO":e.poster=r;break;case"svg":e.innerHTML=t,e.querySelector("text").setAttribute("font-size",.9*parseInt(Math.max(e.getAttribute("width"),e.getAttribute("height"),e.getAttribute("viewBox").split(/\s+/)[2],e.getAttribute("viewBox").split(/\s+/)[3])));break;case"IFRAME":e.outerHTML=a}}function n(e){[...e.childNodes].forEach(e=>{if(void 0!==e)switch(e.nodeType){case 3:e.textContent=i(e.textContent);break;case 1:s()&&o(e);case 9:case 11:e.hasChildNodes()&&n(e)}})}n(document.body),document.title=i(document.title),document.querySelectorAll(`[rel~="icon"],[href$=".ico"]`).forEach(e=>e.href=r)})()
```

## Effects

Carcinise currently affects:

* text
* images (in `<img>`, `<picture>`, and `<svg>`)
* background-images (i.e. elements with the `background-image` CSS property in their computed styles)
* video poster images
* favicons
* iframes

## To-do

- [ ] use the speech synthesis browser API to replace audio elements with clickable widgets that read the crab emoji out loud
- [ ] as above, but replacing videos with CSS-animated crab emojis
- [ ] improving background-image replacement and, if possible, applying it to `<svg>` elements after removing contents
- [ ] intelligently replacing pseudo-element content (only replacing it if it's visually displayed *and* non-empty)
- [ ] (low-priority) remove need for setting `outerHTML` by creating and appending replacement elements from scratch