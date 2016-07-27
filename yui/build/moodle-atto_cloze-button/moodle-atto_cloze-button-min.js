YUI.add("moodle-atto_cloze-button",function(e,t){var n="atto_cloze",r={ANSWER:"atto_cloze_answer",ANSWERS:"atto_cloze_answers",ADD:"atto_cloze_add",CANCEL:"atto_cloze_cancel",DELETE:"atto_cloze_delete",FEEDBACK:"atto_cloze_feedback",FRACTION:"atto_cloze_fraction",LEFT:"atto_cloze_col0",RIGHT:"atto_cloze_col1",MARKS:"atto_cloze_marks",SUBMIT:"atto_cloze_submit",TOLERANCE:"atto_cloze_tolerance",TYPE:"atto_cloze_qtype"},i={FORM:'<div class="atto_cloze"><form class="atto_form"><p>{{qtype}}<label for="{{elementid}}_mark">{{get_string "defaultmark" "core_question"}}</label><input id="{{elementid}}_mark" type="text" class="{{CSS.MARKS}}" value="{{marks}}" /><div class="{{CSS.ANSWERS}}"><ol>{{#answerdata}}<li><div><div class="{{../CSS.LEFT}}"><button class="{{../CSS.ADD}}" title="{{get_string "addmoreanswerblanks" "qtype_calculated"}}">+</button><button class="{{../CSS.DELETE}}" title="{{get_string "delete" "core"}}">-</button><br /><label id="{{id}}_grade">{{get_string "grade" "core"}}</label><select id="{{id}}_grade" value="{{fraction}}" class="{{../CSS.FRACTION}}" selected><option value="{{fraction}}">{{fraction}}%</option>{{#../fractions}}<option value="{{fraction}}">{{fraction}}%</option>{{/../fractions}}</select></div><div class="{{../CSS.RIGHT}}"><label for="{{id}}_answer">{{get_string "answer" "core"}}</label><input id="{{id}}_answer" type="text" class="{{../CSS.ANSWER}}" value="{{answer}}" />{{#if ../numerical}}<label for="{{id}}_tolerance">{{{get_string "tolerance" "qtype_calculated"}}}</label><input id="{{id}}_tolerance" type="text" class="{{../../CSS.TOLERANCE}}" value="{{tolerance}}" />{{/if}}<label for="{{id}}_feedback">{{get_string "feedback" "core"}}</label><input id="{{id}}_feedback" type="text" class="{{../CSS.FEEDBACK}}" value="{{feedback}}" /></div></div>{{/answerdata}}</ol><p><button class="{{CSS.ADD}}" title="{{get_string "addmoreanswerblanks" "qtype_calculated"}}">+</button></div></p><p><button type="submit" class="{{CSS.SUBMIT}}">{{get_string "common:insert" "editor_tinymce"}}</button><button type="submit" class="{{CSS.CANCEL}}">{{get_string "cancel" "core"}}</button></p></form></div>',OUTPUT:"&#123;{{marks}}:{{qtype}}:{{#answerdata}}~%{{fraction}}%{{answer}}{{#if tolerance}}:{{tolerance}}{{/if}}{{#if feedback}}#{{feedback}}{{/if}}{{/answerdata}}&#125;",TYPE:'<div class="atto_cloze"><form ="atto_form"><div class="{{CSS.TYPE}}">{{#types}}<div class="option"><label for="qtype_qtype_{{type}}"><input name="qtype" id="qtype_qtype_{{type}}" value="{{type}}" type="radio"><span class="typename">{{type}}</span><span class="typesummary"><p>{{summary}}</p></span></label></div>{{/types}}</div><p><button type="submit" class="{{CSS.SUBMIT}}">{{get_string "common:insert" "editor_tinymce"}}</button><button type="submit" class="{{CSS.CANCEL}}">{{get_string "cancel" "core"}}</button></p></form></div>'},s=[{fraction:100},{fraction:50},{fraction:33.333},{fraction:25},{fraction:20},{fraction:16.667},{fraction:14.2857},{fraction:12.5},{fraction:0},{fraction:-12.5},{fraction:-14.2857},{fraction:-16.667},{fraction:-20},{fraction:-25},{fraction:-33.333},{fraction:-50},{fraction:-100}];e.namespace("M.atto_cloze").Button=e.Base.create("button",e.M.editor_atto.EditorPlugin,[],{_form:null,_answerdata:null,_qtype:null,_marks:null,_currentSelection:null,initializer:function(){this._groupFocus={};var e=this.get("host").editor.ancestor("form");if(!e||!e.test('[action="question.php"]'))return;this.addButton({icon:"icon",iconComponent:"qtype_multianswer",callback:this._displayDialogue}),this._marks=1},_displayDialogue:function(){var t=this.get("host");this._currentSelection=t.getSelection();if(this._currentSelection===!1)return;this._answerdata=[{id:e.guid(),answer:this._currentSelection.toString(),feedback:"",fraction:100,tolerance:0}];var r=this.getDialogue({headerContent:M.util.get_string("pluginname",n),bodyContent:'<div style="height:500px"></div>',width:500},!0),i=this._resolveSubquestion();i&&this._parseSubquestion(i),r.show(),r.set("bodyContent",this._getDialogueContent()),this._dialogue=r},_getDialogueContent:function(){var t,n;return this._qtype?(t=e.Handlebars.compile(i.FORM),n=e.Node.create(t({CSS:r,answerdata:this._answerdata,elementid:e.guid(),fractions:s,qtype:this._qtype,marks:this._marks,numerical:this._qtype==="NUMERICAL"||this._qtype==="NM"})),this._form=n,n.one("."+r.SUBMIT).on("click",this._setSubquestion,this),n.one("."+r.CANCEL).on("click",this._cancel,this),n.delegate("click",this._deleteAnswer,"."+r.DELETE,this),n.delegate("click",this._addAnswer,"."+r.ADD,this),n):(t=e.Handlebars.compile(i.TYPE),n=e.Node.create(t({CSS:r,types:this.get("questiontypes")})),this._form=n,n.one("."+r.SUBMIT).on("click",function(e){e.preventDefault();var t=this._form.one("form").getDOMNode().qtype;t&&(this._qtype=t.value,this._dialogue.set("bodyContent",this._getDialogueContent()))},this),n.one("."+r.CANCEL).on("click",function(e){e.preventDefault(),this._dialogue.hide()},this),n)},_parseSubquestion:function(t){var n=/\{([0-9]*):([_A-Z]+):(\\.|[^]*?)\}/g,r=n.exec(t);if(!r)return;this._marks=r[1],this._qtype=r[2],this._answerdata=[];var i=r[3].match(/(\\.|[^~])*/g);if(!i)return;i.forEach(function(t){var n=/^(%(-?[\.0-9]+)%|(=?))([^#]*)#?(.*)/.exec(t);if(n&&n[4]){if(this._qtype==="NUMERICAL"||this._qtype==="NM"){var r=/^([^:]*):?(.*)/.exec(n[4])[2]||0;this._answerdata.push({answer:n[4].replace(/:.*/,""),id:e.guid(),feedback:n[5],tolerance:r,fraction:n[3]?100:n[2]||0});return}this._answerdata.push({answer:n[4],id:e.guid(),feedback:n[5],fraction:n[3]?100:n[2]||0})}},this)},_addAnswer:function(t){t.preventDefault();var n=this._form.all("."+r.ADD).indexOf(t.target);this._getFormData()._answerdata.splice(n,0,{answer:"",id:e.guid(),feedback:"",fraction:0,tolerance:0}),this._dialogue.set("bodyContent",this._getDialogueContent())},_deleteAnswer:function(e){e.preventDefault();var t=this._form.all("."+r.DELETE).indexOf(e.target);this._getFormData()._answerdata.splice(t,1),this._dialogue.set("bodyContent",this._getDialogueContent
())},_cancel:function(e){e.preventDefault(),delete this._qtype,this._dialogue.hide()},_setSubquestion:function(t){t.preventDefault();var n=e.Handlebars.compile(i.OUTPUT);this._getFormData();var s=n({CSS:r,answerdata:this._answerdata,qtype:this._qtype,marks:this._marks}),o=this.get("host");this._dialogue.hide(),o.focus(),o.setSelection(this._currentSelection),o.insertContentAtFocusPoint(s),delete this._qtype,delete this._answerdata},_getFormData:function(){this._answerdata=[];var t=this._form.all("."+r.ANSWER),n=this._form.all("."+r.FEEDBACK),i=this._form.all("."+r.FRACTION),s=this._form.all("."+r.TOLERANCE);for(var o=0;o<t.size();o++)this._answerdata.push({answer:t.item(o).getDOMNode().value,id:e.guid(),feedback:n.item(o).getDOMNode().value,fraction:i.item(o).getDOMNode().value,tolerance:s.item(o)?s.item(o).getDOMNode().value:0}),this._marks=this._form.one("."+r.MARKS).getDOMNode().value;return this},_getAnchor:function(e,t){if(!e.hasChildNodes())return{anchor:e,offset:t};var n=e.firstChild;while(t>n.textContent.length)t-=n.textContent.length,n=n.nextSibling;return this._getAnchor(n,t)},_getOffset:function(e,t){if(!e.contains(t))return;if(e===t)return 0;var n=0,r=e.firstChild;while(!r.contains(t))n+=r.textContent.length,r=r.nextSibling;return n+this._getOffset(t,r)},_resolveSubquestion:function(){var e=this.get("host"),t=e.getSelectionParentNode(),n=/\{[^]*?\}/g;if(!t)return;var r=t.textContent.match(n);if(!r)return;var i,s=this.get("host").getSelection(),o="",u=0;if(!s||s.length===0)return!1;var a=this._getOffset(t,s[0].startContainer)+s[0].startOffset,f=this._getOffset(t,s[0].endContainer)+s[0].endOffset;return r.forEach(function(n){i=t.textContent.indexOf(n,u),u=i+n.length;if(i<a&&f<u){o=n;var r=this._getAnchor(t,i),l=this._getAnchor(t,u);s[0].setStart(r.anchor,r.offset),s[0].setEnd(l.anchor,l.offset),this.get("host").setSelection(s),this._currentSelection=e.getSelection()}},this),o}},{ATTRS:{questiontypes:[]}})},"@VERSION@",{requires:["escape","moodle-tinymce_cloze-editor"]});
