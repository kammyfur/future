const ipc = require('electron').remote;

function hexcode(code) {
	hex = code.toString(16);
	if (hex.length == 7) {
		hexstr = "0x0" + hex.toString(16);
	} else if (hex.length == 6) {
		hexstr = "0x00" + hex.toString(16);
	} else if (hex.length == 5) {
		hexstr = "0x000" + hex.toString(16);
	} else if (hex.length == 4) {
		hexstr = "0x0000" + hex.toString(16);
	} else if (hex.length == 3) {
		hexstr = "0x00000" + hex.toString(16);
	} else if (hex.length == 2) {
		hexstr = "0x000000" + hex.toString(16);
	} else if (hex.length == 1) {
		hexstr = "0x0000000" + hex.toString(16);
	} else if (hex.length == 0) {
		hexstr = "0x00000000" + hex.toString(16);
	} else {
		hexstr = "0x" + hex.toString(16)
	}
	return hexstr;
}

if (ipc.getCurrentWindow().debug) {
    document.getElementById('fde-debugger-debug').style.display = "initial";
}

if (true) {

    function toSizePretty(size) {
        if (size > 1024) {
            if (size > 1048576) {
                return (size / (1024 * 1024)).toFixed(3) + " MiB";
            } else {
                return (size / 1024).toFixed(3) + " KiB";
            }
        } else {
            return size + " bytes";
        }
    }
    
    setInterval(() => {
        heapUsed = process.memoryUsage().heapUsed;
        heapTotal = process.memoryUsage().heapTotal;
        rss = process.memoryUsage().rss;
    
        huStr = toSizePretty(heapUsed);
        htStr = toSizePretty(heapTotal);
        rStr = toSizePretty(rss);

        document.getElementById('fdedd-hu').innerHTML = huStr;
        document.getElementById('fdedd-ht').innerHTML = htStr;
        document.getElementById('fdedd-rs').innerHTML = rStr;
    }, 500)

    function switchSummary(el) {
        // if (el.open) {
        //     plist_refresh = 100;
        // } else {
        //     plist_refresh = 5000;
        // }
    }

    plist_refresh = 5000;
    // plist_refresh = 100;
    plist = () => {
        prclst = [];
        ipc.webContents.getAllWebContents().forEach((e, i) => {
            pt = "";
            dtmsg = "";
            if (e.webContents.getTitle().startsWith("devtools://devtools")) {
                pt = "Dev Tools Process";
                prclst.push("<details onclick=\"switchSummary(this);\"><summary>" + "[" + e.webContents.getOSProcessId() + "] (" + e.webContents.getProcessId() + "@" + e.webContents.id + ") " + "devtools" + "</summary><span class='dc'>System Process ID: " + e.webContents.getOSProcessId() + "<br>Future Process ID: " + e.webContents.getProcessId() + "<br>Sandbox Container: " + e.webContents.id + "<br>Process Type: " + pt + "<br><br>" + dtmsg + "<a onclick='require(`electron`).remote.webContents.getAllWebContents()[" + i + "].webContents.destroy();' style='cursor:pointer;' title='Terminate process " + e.webContents.getOSProcessId() + "'>" + "Terminate" + "</a></span></details>");
            } else {
                if (e.webContents.getTitle().startsWith("main.html")) {
                    pt = "Unloaded Process";
                    dtmsg = "<a onclick='require(`electron`).remote.webContents.getAllWebContents()[" + i + "].webContents.toggleDevTools();' style='cursor:pointer;' title='Open/Close Dev Tools for process " + e.webContents.getOSProcessId() + "'>" + "Toggle Dev Tools" + "</a><br><a onclick='require(`electron`).remote.webContents.getAllWebContents()[" + i + "].webContents.reload();' style='cursor:pointer;' title='Restart process " + e.webContents.getOSProcessId() + "'>" + "Restart" + "</a><br>";
                    prclst.push("<details onclick=\"switchSummary(this);\"><summary><i>" + "[" + e.webContents.getOSProcessId() + "] (" + e.webContents.getProcessId() + "@" + e.webContents.id + ") " + "fde-wrapper" + "</i></summary><span class='dc'>System Process ID: " + e.webContents.getOSProcessId() + "<br>Future Process ID: " + e.webContents.getProcessId() + "<br>Sandbox Container: " + e.webContents.id + "<br>Process Type: " + pt + "<br><br>" + dtmsg + "<a onclick='require(`electron`).remote.webContents.getAllWebContents()[" + i + "].webContents.destroy();' style='cursor:pointer;' title='Terminate process " + e.webContents.getOSProcessId() + "'>" + "Terminate" + "</a></span></details>");
                } else {
                    if (e.webContents.getOSProcessId() == 0) {
                        pt = "Dead Process";
                        prclst.push("<details onclick=\"switchSummary(this);\"><summary><s>" + "[" + e.webContents.getOSProcessId() + "] (" + e.webContents.getProcessId() + "@" + e.webContents.id + ") " + e.webContents.getTitle() + "</s></summary><span class='dc'>System Process ID: " + e.webContents.getOSProcessId() + "<br>Future Process ID: " + e.webContents.getProcessId() + "<br>Sandbox Container: " + e.webContents.id + "<br>Process Type: " + pt + "<br><br>" + dtmsg + "<a onclick='require(`electron`).remote.webContents.getAllWebContents()[" + i + "].webContents.destroy();' style='cursor:pointer;' title='Unlock process file for dead process'>" + "Terminate" + "</a></span></details>");
                        // document.getElementById('crashmsg').innerHTML = "CRITICAL_PROCESS_DIED";
                        // document.getElementById('imsg').innerHTML = hexcode(document.getElementById('crashmsg').innerHTML.length + e.webContents.getOSProcessId() + e.webContents.getProcessId() + e.webContents.id).toUpperCase().split("X").join("x");
                        // document.getElementById('crashscreen').style.display = "block";
                    } else {
                        if (e.webContents.id == 1) {
                            pt = "Main Process";
                            dtmsg = "<a onclick='require(`electron`).remote.webContents.getAllWebContents()[" + i + "].webContents.toggleDevTools();' style='cursor:pointer;' title='Open/Close Dev Tools for process " + e.webContents.getOSProcessId() + "'>" + "Toggle Dev Tools" + "</a><br><a onclick='require(`electron`).remote.webContents.getAllWebContents()[" + i + "].webContents.reload();' style='cursor:pointer;' title='Restart process " + e.webContents.getOSProcessId() + "'>" + "Restart" + "</a><br>";
                            prclst.push("<details onclick=\"switchSummary(this);\"><summary><b>" + "[" + e.webContents.getOSProcessId() + "] (" + e.webContents.getProcessId() + "@" + e.webContents.id + ") " + e.webContents.getTitle() + "</b></summary><span class='dc'>System Process ID: " + e.webContents.getOSProcessId() + "<br>Future Process ID: " + e.webContents.getProcessId() + "<br>Sandbox Container: " + e.webContents.id + "<br>Process Type: " + pt + "<br><br>" + dtmsg + "<a onclick='require(`electron`).remote.webContents.getAllWebContents()[" + i + "].webContents.destroy();' style='cursor:pointer;' title='Terminate process " + e.webContents.getOSProcessId() + "'>" + "Terminate" + "</a></span></details>");
                            prclst.push("<details onclick=\"switchSummary(this);\"><summary><b>" + "[" + e.webContents.getOSProcessId() + "] (" + e.webContents.getProcessId() + "@" + e.webContents.id + ") " + e.webContents.getTitle() + "</b></summary><span class='dc'>System Process ID: " + e.webContents.getOSProcessId() + "<br>Future Process ID: " + e.webContents.getProcessId() + "<br>Sandbox Container: " + e.webContents.id + "<br>Process Type: " + pt + "<br><br>" + dtmsg + "<a onclick='require(`electron`).remote.webContents.getAllWebContents()[" + i + "].webContents.destroy();' style='cursor:pointer;' title='Terminate process " + e.webContents.getOSProcessId() + "'>" + "Terminate" + "</a></span></details>");
                        } else {
                            pt = "Normal Process";
                            dtmsg = "<a onclick='require(`electron`).remote.webContents.getAllWebContents()[" + i + "].webContents.toggleDevTools();' style='cursor:pointer;' title='Open/Close Dev Tools for process " + e.webContents.getOSProcessId() + "'>" + "Toggle Dev Tools" + "</a><br><a onclick='require(`electron`).remote.webContents.getAllWebContents()[" + i + "].webContents.reload();' style='cursor:pointer;' title='Restart process " + e.webContents.getOSProcessId() + "'>" + "Restart" + "</a><br>";
                            prclst.push("<details onclick=\"switchSummary(this);\"><summary>" + "[" + e.webContents.getOSProcessId() + "] (" + e.webContents.getProcessId() + "@" + e.webContents.id + ") " + e.webContents.getTitle() + "</summary><span class='dc'>System Process ID: " + e.webContents.getOSProcessId() + "<br>Future Process ID: " + e.webContents.getProcessId() + "<br>Sandbox Container: " + e.webContents.id + "<br>Process Type: " + pt + "<br><br>" + dtmsg + "<a onclick='require(`electron`).remote.webContents.getAllWebContents()[" + i + "].webContents.destroy();' style='cursor:pointer;' title='Terminate process " + e.webContents.getOSProcessId() + "'>" + "Terminate" + "</a></span></details>");
                        }
                    }
                }
            }
        });
        prcStr = prclst.join("");
        document.getElementById('fdedd-prc').innerHTML = prcStr;
        setTimeout(plist, plist_refresh);
    }

    setTimeout(plist, plist_refresh);
}