let HCMode = false;

function toggleHighContrastMode() {

    let ulList = document.querySelectorAll("ul"), olList = document.querySelectorAll("ol"),
        stubList = document.getElementsByClassName('articleStub'), i;
    if (!HCMode) {
        // Change colours to high contrast
        document.body.style.backgroundColor = 'white';
        document.querySelector("main").style.backgroundColor = 'black';
        if (document.getElementById('articleStub') != null) {
            document.getElementById('articleStub').style.backgroundColor = 'black';
            document.getElementById('articleStub').style.border = "1px solid blue";
        }
        document.body.style.color = 'white';

        if (ulList.length > 0) {
            for (i = 0; i < ulList.length; i++) {
                ulList[i].style.backgroundColor = "black";
                ulList[i].style.border = "1px solid blue";
            }
        }

        if (olList.length > 0) {
            for (i = 0; i < olList.length; i++) {
                olList[i].style.backgroundColor = "black";
                olList[i].style.border = "1px solid blue";
            }
        }

        if (stubList.length > 0) {
            for (i = 0; i < stubList.length; i++) {
                stubList[i].style.backgroundColor = "black";
                stubList[i].style.border = "1px solid blue";

            }
        }

    } else if (HCMode) {
        // Change colours back to normal
        document.body.style.backgroundColor = '';
        document.querySelector("main").style.backgroundColor = '';
        if (document.getElementById('articleStub') != null) {
            document.getElementById('articleStub').style.backgroundColor = '';
            document.getElementById('articleStub').style.border = "";
        }
        document.body.style.color = '';

        if (ulList.length > 0) {
            for (i = 0; i < ulList.length; i++) {
                ulList[i].style.backgroundColor = "";
                ulList[i].style.border = "";
            }
        }

        if (olList.length > 0) {
            for (i = 0; i < olList.length; i++) {
                olList[i].style.backgroundColor = "";
                olList[i].style.border = "";
            }
        }

        if (stubList.length > 0) {
            for (i = 0; i < stubList.length; i++) {
                stubList[i].style.backgroundColor = "";
                stubList[i].style.border = "";

            }
        }
    }

    HCMode = !HCMode;
}