!function(factory){"function"==typeof define&&define.amd?define(factory):factory()}((function(){"use strict";function _defineProperty(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function _objectSpread2(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?ownKeys(Object(source),!0).forEach((function(key){_defineProperty(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}var findLastIndex=function(array,predicate){for(var l=array.length;l--;)if(predicate(array[l],l,array))return l;return-1};window.customSelect=function(state){return _objectSpread2(_objectSpread2({},state),{},{display:"",options:[],currentIndex:-1,query:"",previousDisplay:"",needsHiddenInput:!1,get activeDescendant(){return this.currentIndex>-1?"listbox-".concat(this.selectId,"-item-").concat(this.currentIndex):null},get hasValue(){return this.multiple?this.value.length>0:Boolean(this.value)},get enabledLength(){return this.options.filter((function(o){return!o.disabled&&!o.hidden})).length},get placeholderMarkup(){return'<span class="custom-select--placeholder">'.concat(this.placeholder,"</span>")},init:function($watch){var _this=this;this.$refs.container&&this.$refs.menu?(this.options=this.parseOptions(),this.value&&this.multiple&&!Array.isArray(this.value)&&(this.value=[this.value]),this.updateDisplay(this.value),$watch("value",(function(value){_this.updateDisplay(value)})),$watch("query",(function(value){return _this.filter(value)})),$watch("wireFilter",(function(){_this.$nextTick((function(){_this.options=_this.parseOptions()}))})),$watch("selected",(function(value){return _this.onSelectedChanged(value)})),this.needsHiddenInput=this.multiple&&void 0!==this.wireFilter):setTimeout((function(){return _this.init($watch)}),250)},filter:function(value){var _this2=this,optionsToHide=this.options.filter((function(o){return o.hidden=!1,!String(o.value).toLowerCase().includes(value)&&!String(o.text).toLowerCase().includes(value)})).map((function(o){return o.hidden=!0,_this2.optionIndex(o.value)}));optionsToHide.length?Array.from(this.$refs.menu.children).forEach((function(child){var index=Number(child.dataset.index);optionsToHide.includes(index)?child.classList.add("hidden"):child.classList.remove("hidden")})):Array.from(this.$refs.menu.children).forEach((function(child){return child.classList.remove("hidden")}))},parseOptions:function(){var _this3=this;return Array.from(this.$refs.menu.children).filter((function(child){return child.classList.contains("custom-select--option")})).map((function(child,index){return child.setAttribute("data-index",index),child.setAttribute("id","listbox-".concat(_this3.selectId,"-item-").concat(index)),JSON.parse(child.dataset.option)}))},isChosen:function(value){return this.multiple?(Array.isArray(this.value)||(this.value=[this.value]),this.value.includes(value)):value===this.value},chooseForMultiple:function(value){this.isChosen(value)?(this.optional||this.value.length>1)&&(this.value.splice(this.value.indexOf(String(value)),1),this.updateDisplay(this.value)):this.value.push(value),this.setHiddenInputSelection(this.value),0===this.value.length&&this.closeMenu()},setHiddenInputSelection:function(value){this.needsHiddenInput&&window.sessionStorage.setItem("cs-".concat(this.selectId,"-selected"),JSON.stringify(value))},clear:function(){var _this4=this;if(!this.needsHiddenInput)return this.value=this.multiple?[]:null;this.value.forEach((function(v){return _this4.choose(v)})),window.sessionStorage.removeItem("cs-".concat(this.selectId,"-selected")),window.sessionStorage.setItem("cs-".concat(this.selectId,"-cleared"),"1")},choose:function(value,$event){if(this.shouldChoose(value,$event)){if(this.multiple)return this.chooseForMultiple(value);this.value=this.optional&&this.value===value?null:value,this.closeMenu()}},shouldChoose:function(value){var $event=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;if(!this.needsHiddenInput||!$event)return!0;var lastEvent=window.sessionStorage.getItem("cs-".concat(this.selectId,"-last-event"));if(null!==window.sessionStorage.getItem("cs-".concat(this.selectId,"-cleared"))&&(window.sessionStorage.removeItem("cs-".concat(this.selectId,"-cleared")),window.sessionStorage.setItem("cs-".concat(this.selectId,"-temp-selected"),JSON.stringify([]))),lastEvent!==String($event.timeStamp))return window.sessionStorage.setItem("cs-".concat(this.selectId,"-last-event"),String($event.timeStamp)),!0;var selected=JSON.parse(window.sessionStorage.getItem("cs-".concat(this.selectId,"-selected"))||JSON.stringify([]));return null!==window.sessionStorage.getItem("cs-".concat(this.selectId,"-temp-selected"))&&(selected=selected.filter((function(o){return o===value})),window.sessionStorage.removeItem("cs-".concat(this.selectId,"-temp-selected")),window.sessionStorage.setItem("cs-".concat(this.selectId,"-selected"),JSON.stringify(selected))),this.value=[],this.value=selected,!1},closeMenu:function(){this.open=!1,this.focusButton()},onOptionSelect:function(){if(!(this.currentIndex<0)){var option=this.options[this.currentIndex];option&&!option.disabled&&this.choose(option.value)}},optionChildren:function(){return this.$refs.menu?Array.from(this.$refs.menu.children).filter((function(child){return child.classList.contains("custom-select--option")})):[]},updateDisplay:function(value){var _this5=this;if(!value)return this.display=this.placeholderMarkup;this.$nextTick((function(){if(_this5.multiple)return _this5.updateDisplayForMultiple(value);var $li=_this5.optionChildren()[_this5.optionIndex(value)];_this5.display=$li?$li.children[0].innerHTML:_this5.placeholderMarkup}))},updateDisplayForMultiple:function(value){var length=value.length;if(0===length)return this.previousDisplay="",this.display=this.placeholderMarkup;var $li=this.optionChildren()[this.optionIndex(value[0])];if(!$li&&!this.previousDisplay)return this.display="".concat(length," Selected");var display=$li?$li.children[0].innerHTML:this.previousDisplay;this.previousDisplay=display,length-1>0&&(display+='<span class="text-xs text-cool-gray-500 flex items-center">+ '.concat(length-1,"</span>")),this.display=display},optionIndex:function(value){return this.options.findIndex((function(o){return o.value===value}))},onMouseEnter:function(value){this.selected=value,this.currentIndex=this.optionIndex(value)},onSelectedChanged:function(value){var _this6=this;if(this.open){var index=this.optionIndex(value);index<0||this.$nextTick((function(){var $li=_this6.optionChildren()[index];if($li){var filterHasFocus=_this6.filterable&&document.activeElement===_this6.$refs.filter;$li.focus(),filterHasFocus&&_this6.focusFilter()}}))}},onArrowUp:function(){var _this7=this;if(0===this.enabledLength)return this.currentIndex=-1,void(this.selected=null);var prevIndex=findLastIndex(this.options,(function(o,index){return!o.disabled&&!o.hidden&&index<_this7.currentIndex}));prevIndex<0&&(prevIndex=findLastIndex(this.options,(function(o){return!o.disabled&&!o.hidden}))),this.currentIndex=prevIndex,this.selected=this.options[this.currentIndex].value},onArrowDown:function(){var _this8=this;if(0===this.enabledLength)return this.currentIndex=-1,void(this.selected=null);var nextIndex=this.options.findIndex((function(o,index){return index>_this8.currentIndex&&!o.disabled&&!o.hidden}));(-1===nextIndex||nextIndex+1>this.options.length)&&(nextIndex=this.options.findIndex((function(o){return!o.disabled&&!o.hidden}))),this.currentIndex=nextIndex,this.selected=this.options[this.currentIndex].value},onHome:function(){if(0===this.enabledLength)return this.currentIndex=-1,void(this.selected=null);this.currentIndex=this.options.findIndex((function(o){return!o.disabled&&!o.hidden})),this.selected=this.options[this.currentIndex].value},onEnd:function(){if(0===this.enabledLength)return this.currentIndex=-1,void(this.selected=null);this.currentIndex=findLastIndex(this.options,(function(o){return!o.disabled&&!o.hidden})),this.selected=this.options[this.currentIndex].value},focusButton:function(){var _this9=this;this.$nextTick((function(){return _this9.$refs.button.focus()}))},focusFilter:function(){var _this10=this;this.$nextTick((function(){return _this10.$refs.filter&&_this10.$refs.filter.focus()}))},focusMenu:function(){var _this11=this;this.$nextTick((function(){return _this11.$refs.menu&&_this11.$refs.menu.focus()}))},onShiftTab:function(){this.filterable?this.focusFilter():this.closeMenu()},highlightSelectedOption:function(){this.multiple?this.currentIndex=this.optionIndex(this.value[0]):this.currentIndex=this.value?this.optionIndex(this.value):0,this.currentIndex<0&&this.enabledLength>0&&(this.currentIndex=0),this.selected=this.currentIndex>-1?this.options[this.currentIndex].value:null},toggle:function(){this.open=!this.open,this.open&&this.openMenu()},openMenu:function(){var _this12=this;this.$refs.container&&this.$refs.menu?(this.$nextTick((function(){_this12.positionMenu(),_this12.refreshOptionsIfNeeded()})),this.highlightSelectedOption(),this[this.filterable?"focusFilter":"focusMenu"]()):setTimeout((function(){return _this12.openMenu()}),250)},refreshOptionsIfNeeded:function(){var children=this.optionChildren();children.length&&children[0].getAttribute("id")||(this.options=this.parseOptions())},positionMenu:function(){var _this13=this;if(this.$refs.container)if(this.fixedPosition)this.positionFixedMenu();else{this.$refs.container.classList.remove("custom-menu-top");var menuHeight=this.$refs.menu.offsetHeight,largestHeight=window.innerHeight-menuHeight-10;this.$refs.menu.getBoundingClientRect().top>largestHeight&&this.$refs.container.classList.add("custom-menu-top")}else setTimeout((function(){return _this13.positionMenu()}),250)},positionFixedMenu:function(){this.$refs.container.style.position="absolute",this.$refs.container.style.top=null;var _this$$refs$button$ge=this.$refs.button.getBoundingClientRect(),width=_this$$refs$button$ge.width,buttonLeft=_this$$refs$button$ge.left,buttonTop=_this$$refs$button$ge.top,menuHeight=this.$refs.menu.offsetHeight,largestHeight=window.innerHeight-menuHeight-10,top=this.$refs.menu.getBoundingClientRect().top;if(top>largestHeight){var menuTop=buttonTop-menuHeight-10;this.$refs.container.style.top="".concat(menuTop,"px")}else this.$refs.container.style.top="".concat(top,"px");this.$refs.container.style.position="fixed",this.$refs.container.style.width="".concat(width,"px"),this.$refs.container.style.left="".concat(buttonLeft,"px")}})}}));
//# sourceMappingURL=form-components.js.map
