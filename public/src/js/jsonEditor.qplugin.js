function JsonEditor($editor,$textEditor,width,height){
	if(!$editor || !$textEditor ||!($editor instanceof jQuery) || !($textEditor instanceof jQuery)){
		throw "pleace give me a jQueryObject";
	}
	this.editor = $editor;
	this.textEditor = $textEditor;
	this.json;
	this.width = width || 480;
	this.height = height || 600;
	this.init();	
};
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
	this.setJson();
	this.reflashTextEditor();
	this.build(this.json);
	return this;
};



JsonEditor.prototype.setJson = function(){
	var tmpJsonText = this.textEditor.html();
	tmpJsonText = tmpJsonText.replace(/((^|[^\\])(\\\\)*)\\n/g, '$1\\\\n').replace(/((^|[^\\])(\\\\)*)\\t/g, '$1\\\\t');
	try{
		this.json = JSON.parse(tmpJsonText);
		console.log(this.json);
}catch(e){
		alert("bad Json Text");
	}
}
JsonEditor.prototype.reflashTextEditor = function(){
	if(!this.json){
		this.setJson();
	}
	this.textEditor.html(JSON.stringify(this.json,null,3));
}

JsonEditor.prototype.build = function(json,$parent,parentType){
		var $tmp = $("<blockquote></blockquote>");
	for(var item in json){
		if(json[item] instanceof Array){
				//console.log(item + " : ~~~" + parentType);
				//console.log($parent);
				this.build(json[item],$parent + "."+ item,"array");
		}else if(json[item] instanceof Object){

				if(parentType && parentType === "array"){
					//console.log(json[item] + " : ~~~" + parentType);
					this.build(json[item],$parent + "."+item,"array");
				}else if(parentType && parentType === "object"){
					//console.log(item + " : " + json[item] + " : ~~~" + parentType)
					this.build(json[item],$parent + "."+item,"object");
				}else {
					//console.log(item + " : " + json[item] + "~~~" + parentType);
					this.build(json[item],$parent + "."+item,"object");
				} 
				
				//console.log($parent)
				
		}else{
				if(parentType === "array"){
					console.log($parent +" : "+json[item]);
				}else if(parentType === "object"){
					console.log($parent +"." + item + " : " + json[item]);
				}else{
					console.log($parent +"." + item + " : " + json[item]);
				}
				//console.log($parent);
		}
	}
}

