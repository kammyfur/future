if (require('fs').existsSync("./user/main.json")) {
	global.langprop = require("./user/main.json").lang;
} else {
	global.langprop = "en";
}

function loadLang() {
	global.lang = require('../lang/' + langprop + ".json");
	
	Array.from(document.getElementsByTagName("lang")).forEach(el => {
		if (el.getAttribute("parent") == null) {
			el.innerHTML = lang[el.getAttribute("string")];
		} else {
			el.innerHTML = lang[el.getAttribute("parent")][el.getAttribute("string")];
		}
	});
	Array.from($("[lang^='::'")).forEach(el => { el.title = lang[el.getAttribute("lang").replace("::", "")]; });
	Array.from($("[langph^='::'")).forEach(el => { el.placeholder = lang[el.getAttribute("langph").replace("::", "")]; });

	fs = require("fs");
	langfiles = fs.readdirSync("./lang");
	llparray = [];
	langfiles.forEach(el => {
		if (el != "langlist.json" && el != "processor.js") {
			if (el.replace(".json", "") == langprop) {
				pvtmp = "selected ";
			} else {
				pvtmp = "";
			}
			llparray.push("<option " + pvtmp + "value=\"" + el.replace(".json", "") + "\">" + require("../lang/" + el).$name + "</option>");
			langListPretty = llparray.join("");
			if (document.getElementById("langlist")) {
				document.getElementById("langlist").innerHTML = langListPretty;
			}
		}
	});
	fs = undefined;
}

loadLang();