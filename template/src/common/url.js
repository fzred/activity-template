var url= Object.create(null);
url.getUrlByRelative=function (path) {
	var a=document.createElement("a")
	a.href=path;
	return a.href;
}

export default url;