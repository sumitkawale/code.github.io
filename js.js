var f = 0;
var codeHTML = document.getElementById('codeHTML');
var codeJavaScript = document.getElementById('codeJavaScript');
var codeCSS = document.getElementById('codeCSS');

function changeIconColor(element) {
    element.children[0].classList.remove("text-warning");
    element.children[0].classList.remove("text-primary");
    element.children[0].classList.remove("text-danger");
    if (element == document.getElementById('b2')) {
        element.children[0].classList.add("text-dark");
    }
}

function openHTML() {
    codeHTML.hidden = false;
    codeJavaScript.hidden = true;
    codeCSS.hidden = true;
    codeHTML.focus();

    document.getElementById('b1').classList.add("active");
    document.getElementById('b2').classList.remove("active");
    document.getElementById('b3').classList.remove("active");

    document.getElementById('b1').children[0].classList.remove("text-danger");
    document.getElementById('b2').children[0].classList.add("text-warning");
    document.getElementById('b3').children[0].classList.add("text-primary");
    f = 0;
}

function openJS() {
    codeHTML.hidden = true;
    codeJavaScript.hidden = false;
    codeCSS.hidden = true;
    codeJavaScript.focus();
    document.getElementById('b1').classList.remove("active");
    document.getElementById('b2').classList.add("active");
    document.getElementById('b3').classList.remove("active");

    document.getElementById('b1').children[0].classList.add("text-danger");
    document.getElementById('b2').children[0].classList.remove("text-warning");
    document.getElementById('b2').children[0].classList.add("text-dark");
    document.getElementById('b3').children[0].classList.add("text-primary");
    f = 1;
}

function openCSS() {
    codeHTML.hidden = true;
    codeJavaScript.hidden = true;
    codeCSS.hidden = false;
    codeCSS.focus();
    document.getElementById('b1').classList.remove("active");
    document.getElementById('b2').classList.remove("active");
    document.getElementById('b3').classList.add("active");

    document.getElementById('b1').children[0].classList.add("text-danger");
    document.getElementById('b2').children[0].classList.add("text-warning");
    document.getElementById('b3').children[0].classList.remove("text-primary");
    f = 2;
}

var re = true;

var runJSON = (htmlCode) => {
    oldd()
    var jsonData = JSON.stringify(htmlCode);
    localStorage.setItem("testHTML_JSON", jsonData)
    showOutput();
}

var oldd = () => {
    if (re == false) {
        let json = {
            code1: codeHTML.value,
            code2: codeJavaScript.value,
            code3: document.getElementById("codeCSS").value,
            focus: f,
            reload: true
        }
        json = JSON.stringify(json)
        localStorage.setItem("oldData", json)
        window.location.reload()
    } else {
        re = false
    }
}

var check = () => {
    codeHTML.focus();
    var oldData = JSON.parse(localStorage.getItem("oldData"))
    if (oldData != null) {

        if (oldData.reload == true) {
            oldData.reload = false;
            codeHTML.value = oldData.code1;
            codeJavaScript.value = oldData.code2;
            codeCSS.value = oldData.code3;

            if (oldData.focus == 0) {
                openHTML()
            } else if (oldData.focus == 1) {
                openJS()
            } else {
                openCSS()
            }

            let json = JSON.stringify(oldData)
            localStorage.setItem("oldData", json)

            runJSON({
                code: oldData.code1,
                code1: oldData.code2,
                code2: oldData.code3
            });
        }
    }
}

var showOutput = () => {
    var htmlCode = localStorage.getItem("testHTML_JSON");
    htmlCode = JSON.parse(htmlCode);

    document.getElementById('output').innerHTML = htmlCode.code;
    document.getElementById('output1').innerHTML = htmlCode.code1;
    document.getElementById('output2').innerHTML = htmlCode.code2;
    // write code for scroll down....
    window.scrollBy(0, 555);
}