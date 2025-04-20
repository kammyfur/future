const cipc = require('electron').remote

function processCommand(command) {
    cipc.getCurrentWindow().command = null;
    if (command.startsWith("login:")) {
        user = command.substr(6);
        jsuc='session';document.getElementsByTagName('body')[0].innerHTML = document.getElementsByTagName('body')[0].innerHTML.split("<!--[if JSUC = "+jsuc+"]").join("<!--[if JSUC = "+jsuc+"]/-->").split("[endif JSUC = "+jsuc+"]-->").join("<!--/[endif JSUC = "+jsuc+"]-->").trim();
        // Login the user
        document.getElementById('wv-session').style.display = "flex";// $("#wv-session").fadeIn(200);
        setTimeout(() => {
            document.getElementById('wv-fdm').style.display = "none";// $("#wv-fdm").fadeOut(200);
            document.getElementById('wv-shell').style.display = "flex";// $("#wv-shell").fadeIn(200);
            setTimeout(() => {
                document.getElementById('wv-session').style.display = "none";// $("#wv-session").fadeOut(200);
                setTimeout(() => {
                    cipc.getCurrentWindow().session = user;
                    clearInterval(login);
                }, 500)
            }, 200)
        }, 500)
    }
}

login = setInterval(() => {
    if (typeof cipc.getCurrentWindow().command == "string") {
        buffer = cipc.getCurrentWindow().command;
        cipc.getCurrentWindow().command = null;
        processCommand(buffer);
        // console.log("call, process command");
        // processCommand(cipc.getCurrentWindow().command);
        buffer = undefined;
    } else {
        cipc.getCurrentWindow().command = null;
    }
}, 5000)