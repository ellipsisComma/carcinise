javascript: (() => {
	const crab = `🦀`;
	const crabImgText = `<text x="50%" y=".9em" font-size="9" text-anchor="middle">${crab}</text>`;
	const crabImg = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10">${crabImgText}</svg>`)}`;
	const crabFrame = `<svg viewBox="0 0 10 10">${crabImgText}</svg>`;
	const check = () => Math.random() < 0.25;

	if (!document.getElementById(`crab-style`)) {
		const style = document.head.appendChild(document.createElement(`style`));
		style.id = `crab-style`;
		style.innerHTML = `.carcinised-bg {background: url("${crabImg}") center no-repeat !important; background-size: contain !important;}`;
	}

	function carciniseStr(string) {
		return string.replaceAll(/\d+|\p{Emoji}|(?!<[\p{L}])([\p{L}]+?)(?![\p{L}])/gmu, match => check() ? crab : match);
	}

	function carciniseElementProperties(node) {
		if (getComputedStyle(node).getPropertyValue(`background-image`) !== `none`) node.classList.add(`carcinised-bg`);
		switch (node.tagName) {
		case `INPUT`:
		case `TEXTAREA`:
			[`value`, `placeholder`].forEach(attr => node[attr] = carciniseStr(node[attr]));
			break;
		case `IMG`:
			node.src = node.srcset = crabImg;
			node.alt = carciniseStr(node.alt);
			break;
		case `PICTURE`:
			node.querySelectorAll(`source`).forEach(source => source.src = source.srcset = crabImg);
			break;
		case `VIDEO`:
			node.poster = crabImg;
			break;
		case `svg`:
			node.innerHTML = crabImgText;
			node.querySelector(`text`).setAttribute(`font-size`, parseInt(Math.max(node.getAttribute(`width`), node.getAttribute(`height`), node.getAttribute(`viewBox`).split(/\s+/)[2], node.getAttribute(`viewBox`).split(/\s+/)[3])) * 0.9);
			break;
		case `IFRAME`:
			node.outerHTML = crabFrame;
			break;
		}
	}

	function carcinise(element) {
		[...element.childNodes].forEach(node => {
			if (typeof node === `undefined`) return;
			switch (node.nodeType) {
			case 3:
				node.textContent = carciniseStr(node.textContent);
				break;
			case 1:
				if (check()) carciniseElementProperties(node);
			case 9:
			case 11:
				if (node.hasChildNodes()) carcinise(node);
				break;
			}
		});
	}

	carcinise(document.body);
	document.title = carciniseStr(document.title);

	document.querySelectorAll(`[rel~="icon"], [href$=".ico"]`).forEach(icon => icon.href = crabImg);
})()
