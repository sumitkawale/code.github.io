var f = 0;
var theamCode = false;
var editor1, editor2, editor3;
var codeHTML = document.getElementById('codeHTML');
var codeJavaScript = document.getElementById('codeJavaScript');
var codeCSS = document.getElementById('codeCSS');
var output = document.getElementById('output').contentWindow;
// var consoleOutput = document.getElementById("console");
document.write = document.writeln = (msg) => { output.document.body.innerHTML += msg }
function theam(checked = false) {
    let t = document.getElementById("theam")
    let sun = document.getElementById('sunnn')
    let moon = document.getElementById('mooon')
    if (checked == true) {
        t.checked = true;
    }
    if (!t.checked) {
        moon.classList.add("d-none");
        sun.classList.add("d-inline");
        sun.classList.remove("d-none")

        document.body.classList.add("bg-dark");
        codeHTML.classList.add("bg-dark")
        codeJavaScript.classList.add("bg-dark")
        codeCSS.classList.add("bg-dark")

        codeHTML.classList.add("text-white")
        codeJavaScript.classList.add("text-white")
        codeCSS.classList.add("text-white")
        theamCode = true;
    } else {
        moon.classList.remove("d-none");
        sun.classList.add('d-none')
        sun.classList.remove('d-inline')

        document.body.classList.remove("bg-dark");
        codeHTML.classList.remove("bg-dark")
        codeJavaScript.classList.remove("bg-dark")
        codeCSS.classList.remove("bg-dark")

        codeHTML.classList.remove("text-white")
        codeJavaScript.classList.remove("text-white")
        codeCSS.classList.remove("text-white")

        theamCode = false;
    }
    let tt = {
        "theam": theamCode
    }
    tt = JSON.stringify(tt);
    localStorage.setItem("theam", tt);
}

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
    let json = "";
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

            runJSON({
                code: oldData.code1,
                code1: oldData.code2,
                code2: oldData.code3
            });

            json = JSON.stringify(oldData)
            localStorage.setItem("oldData", json)
        }
    }
    let jsonTheam = JSON.parse(localStorage.getItem("theam"));
    theam(!jsonTheam.theam);

    ///////////////////////////////////////////////////////////////
    editor1 = CodeMirror.fromTextArea(codeHTML, {
        mode: "text/html",
        theme: "dracula",
        lineNumbers: true,
        autoCloseTags: true,
        extraKeys: { "Ctrl-J": "toMatchingTag" },
        lineWrapping: true,
        foldGutter: true,
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
        matchTags: { bothTags: true },
        styleActiveLine: true
    });
    editor2 = CodeMirror.fromTextArea(codeJavaScript, {
        mode: "javascript",
        theme: "dracula",
        lineNumbers: true,
        autoCloseBrackets: true,
        matchBrackets: true,
        lineWrapping: true,
        foldGutter: true,
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
        styleActiveLine: true
        
    });
    editor3 = CodeMirror.fromTextArea(codeCSS, {
        mode: "css",
        theme: "dracula",
        autoCloseBrackets: true,
        matchBrackets: true,
        lineNumbers: true,
        autoCloseTags: true,
        lineWrapping: true,
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
        foldGutter: true,
        styleActiveLine: true
    });
}

var showOutput = () => {
    var htmlCode = localStorage.getItem("testHTML_JSON");
    htmlCode = JSON.parse(htmlCode);

    output.document.body.innerHTML = htmlCode.code;
    output.document.getElementById('output1').innerHTML = htmlCode.code1;
    output.document.getElementById('output2').innerHTML = htmlCode.code2;
    // write code for scroll down....
    window.scrollBy(0, -10000);
    window.scrollBy(0, 570);
}
