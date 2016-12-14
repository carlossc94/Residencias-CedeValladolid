$(document).foundation();

document.getElementById("uploadbtn").onchange = function () {
	file=this.value;
	file=file.match(/[-_\w]+[.][\w]+$/i)[0];

    document.getElementById("uploadFile").value = file;
};

