function JsonEditor($editor,$textEditor,width,height){
	if(!$editor || !$textEditor ||!($editor instanceof jQuery) || !($textEditor instanceof jQuery)){
		throw "pleace give me a jQueryObject";
	}
	this.editor = $editor;
	this.textEditor = $textEditor;
	this.jsonString = this.textEditor.text().trim();
	this.width = width || 480;
	this.height = height || 600;
	this.init();	
}
JsonEditor.prototype.init = function(){
	var width = this.width + "px",
		height = this.height + "px";
	this.editor.css({
		"width":width,
		"height":height
	}).addClass("editor-wrap");
	this.textEditor.css({
		"width":width,
		"height":height
	}).addClass("editor-wrap");
	$(".editor-wrap").wrapAll("<div class='editor'></div>");
	$(".editor").width((this.width * 2 + 60)+ "px");
	if(!this.jsonString){//如果textarea没有值
		//TODO
	}
}