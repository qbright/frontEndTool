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
	var elem = this.build(this.json,this.editor,null,null,this.json);
  this.editor.find("div").css("background","white");
	return this;
};
JsonEditor.prototype.truncate = function(text, length) {
  if (text.length == 0) return '-empty-';
  if(this._doTruncation && text.length > (length || 30)) return(text.substring(0, (length || 30)) + '...');
  return text;
};

JsonEditor.prototype.addUI = function(struct) {
  var self = this;
  var tmp = '<a class="icon" href="#" title="add"><img src="' + this.ADD_IMG + '" border=0/></a>'
  return $("<a></a>").click(function(e) {
    if (struct instanceof Array) {
      struct.push('??');
    } else {
      struct['??'] = '??';
    }
    self.doAutoFocus = true;
    self.rebuild();
    return false;
  });
};
JsonEditor.prototype.deleteUI = function(key, struct, fullDelete) {
  var self = this;
  var tmp = '<a class="icon" href="#" title="delete"><img src="' + this.DELETE_IMG + '" border=0/></a>'
  return $("<a></a>").click(function(e) {
    if (!fullDelete) {
      var didSomething = false;
      if (struct[key] instanceof Array) {
        if(struct[key].length > 0) {
          struct[key] = struct[key][0];
          didSomething = true;
        }
      } else if (struct[key] instanceof Object) {
        for (var i in struct[key]) {
          struct[key] = struct[key][i];
          didSomething = true;
          break;
        }
      }
      if (didSomething) {
        self.rebuild();
        return false;
      }
    }
    if (struct instanceof Array) {
      struct.splice(key, 1);
    } else {
      delete struct[key];
    }
    self.rebuild();
    return false;
  });
};

JsonEditor.prototype.bracketUI = function(key, struct) {
  var self = this;
  var tmp = '<a class="icon" href="#"><strong>[</a>'
  return $("<a></a>").click(function(e) {
    struct[key] = [ struct[key] ];
    self.doAutoFocus = true;
    self.rebuild();
    return false;
  });
};

JsonEditor.prototype.braceUI = function(key, struct) {
  var self = this;
  var tmp = '<a class="icon" href="#"><strong>{</strong></a>'
  return $("<a></a>").click(function(e) {
    struct[key] = { "??": struct[key] };
    self.doAutoFocus = true;
    self.rebuild();
    return false;
  });
};

JsonEditor.prototype.editable = function(text, key, struct, root, kind) {
  var self = this;
  var tmp = '<span class="editable" href="#"></span>';
  var elem = $("<a></a>").text(this.truncate(text)).click(function(e) {
    if (!this.editing) {
      this.editing = true;
      self.edit($(this), key, struct, root, kind);
    }
    return true;
  });

  return elem;
}


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

JsonEditor.prototype.build = function(json, node, parent, key, root) {
  var elem = null;
  if(json instanceof Array){
    var bq = $(document.createElement("BLOCKQUOTE"));
    bq.append($('<div class="brackets">[</div>'));

    bq.prepend(this.addUI(json));
    if (parent) {
      if (this._showWipe) bq.prepend(this.wipeUI(key, parent));
    	bq.prepend(this.deleteUI(key, parent));
    }

    for(var i = 0; i < json.length; i++) {
      var innerbq = $(document.createElement("BLOCKQUOTE"));
      var newElem = this.build(json[i], innerbq, json, i, root);
      if (newElem) if (newElem.text() == "??") elem = newElem;
      bq.append(innerbq);
    }

    bq.append($('<div class="brackets">]</div>'));
    node.append(bq);
  } else if (json instanceof Object) {
    var bq = $(document.createElement("BLOCKQUOTE"));
    bq.append($('<div class="bracers">{</div>'));

    for(var i in json){
      var innerbq = $(document.createElement("BLOCKQUOTE"));
      var newElem = this.editable(i.toString(), i.toString(), json, root, 'key').wrap('<span class="key"></b>').parent();
      innerbq.append(newElem);
      if (newElem) if (newElem.text() == "??") elem = newElem;
      if (typeof json[i] != 'string') {
        innerbq.prepend(this.braceUI(i, json));
        innerbq.prepend(this.bracketUI(i, json));
        if (this._showWipe) innerbq.prepend(this.wipeUI(i, json));
        innerbq.prepend(this.deleteUI(i, json, true));
      }
      innerbq.append($('<span class="colon">: </span>'));
      newElem = this.build(json[i], innerbq, json, i, root);
      if (newElem) if (newElem.text() == "??") elem = newElem;
      bq.append(innerbq);
    }

    bq.prepend(this.addUI(json));
    if (parent) {
      if (this._showWipe) bq.prepend(this.wipeUI(key, parent));
    	bq.prepend(this.deleteUI(key, parent));
    }

    bq.append($('<div class="bracers">}</div>'));
    node.append(bq);
  } else {
    console.log(json);
    elem = this.editable(json.toString(), key, parent, root, 'value').wrap('<span class="val"></span>').parent();
    node.append(elem);
    node.prepend(this.braceUI(key, parent));
    node.prepend(this.bracketUI(key, parent));
    if (parent) {
      if (this._showWipe) node.prepend(this.wipeUI(key, parent));
    	node.prepend(this.deleteUI(key, parent));
    }

  }
  return elem;
};


