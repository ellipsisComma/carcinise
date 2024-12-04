# Carcinise

A bookmarklet that carcinises the page. I briefly went slightly insane while working on this.

**What's a bookmarklet?** Bookmarklets are small tools that sit in your bookmarks toolbar. They look like bookmarks, but when you click them they don't take you to a new location, they they add features or apply changes to the current page. These changes reset when you refresh or leave the page. Think of them as lightweight browser extensions.

## Installation

Create a new bookmark on your toolbar and set the address/URL to the content of [`carcinise.min.js`](./carcinise.min.js).

## Effects

Carcinise currently affects:

* text
* images (in `<img>`, `<picture>`, and `<svg>`)
* background-images (i.e. elements with the `background-image` CSS property in their computed styles)
* video poster images
* cursor
* favicons
* iframes

It currently reads the light DOM and open shadow DOMs.

## To-do

- [X] carcinise cursor
- [ ] improve favicon replacement to affect all sites
- [X] do not carcinise inline scripts and styles
- [ ] use the speech synthesis browser API to replace audio elements with clickable widgets that read the crab emoji out loud
- [ ] as above, but replacing videos with CSS-animated crab emojis
- [ ] improving background-image replacement and, if possible, applying it to `<svg>` elements after removing contents
- [ ] intelligently replacing pseudo-element content (only replacing it if it's visually displayed *and* non-empty)
- [ ] (low-priority) remove need for setting `outerHTML` by creating and appending replacement elements from scratch
