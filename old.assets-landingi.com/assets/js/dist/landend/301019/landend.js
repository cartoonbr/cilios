(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){'use strict';var _counters=require('./landend/counter/v2/counters');(function(){document.querySelectorAll('.widget-counter').forEach(function(counter){return(0,_counters.initialize)(counter);});})();},{"./landend/counter/v2/counters":2}],2:[function(require,module,exports){'use strict';Object.defineProperty(exports,"__esModule",{value:true});var localStorageAvailable=void 0;function initialize(counter){var end=buildEndDate(counter);var timer=void 0;timer=setInterval(function(){return showRemaining(counter,end,function(){return clearInterval(timer);});},1000);}
function showRemaining(counter,end,clearIntervalCallback){var repeat=Number(counter.getAttribute('data-repeat'));var version=counter.getAttribute('data-version');var now=new Date();var distance=end-now;var days=void 0;var hours=void 0;var minutes=void 0;var seconds=void 0;var secondAsMilliseconds=1000;var minuteAsMilliseconds=secondAsMilliseconds*60;var hourAsMilliseconds=minuteAsMilliseconds*60;var dayAsMilliseconds=hourAsMilliseconds*24;if(distance<0){if(!version||parseInt(version,10)<2||!repeat||repeat<=0){clearIntervalCallback();days=0;hours=0;minutes=0;seconds=0;}else{while(distance<0){end.setDate(end.getDate()+repeat);distance=end-now;}}}
if(distance>=0){days=Math.floor(distance/dayAsMilliseconds);hours=Math.floor(distance%dayAsMilliseconds/hourAsMilliseconds);minutes=Math.floor(distance%hourAsMilliseconds/minuteAsMilliseconds);seconds=Math.floor(distance%minuteAsMilliseconds/secondAsMilliseconds);}
counter.querySelectorAll('.widget-text[data-format]').forEach(function(textWidget){textWidget.textContent=calculateWidgetValue(textWidget,days,hours,minutes,seconds);});if(counter.querySelectorAll('.widget-text').length===0){counter.textContent=calculateWidgetValue(counter,days,hours,minutes,seconds);}}
function calculateWidgetValue(widget,days,hours,minutes,seconds){return widget.getAttribute('data-format').replace('%dddd',('000'+days).slice(-4)).replace('%ddd',('00'+days).slice(-3)).replace('%dd',('0'+days).slice(-2)).replace('%d',days).replace('%hh',('0'+hours).slice(-2)).replace('%mm',('0'+minutes).slice(-2)).replace('%ss',('0'+seconds).slice(-2)).replace('%h',hours).replace('%m',minutes).replace('%s',seconds);}
function buildEndDate(counter){var date=counter.getAttribute('data-date');var version=counter.getAttribute('data-version');var uid=counter.getAttribute('id');var endDate=new Date(date);if(counter.getAttribute('data-repeat')==='-1'){if(isLocalStorageAvailable()){endDate=getEndDateFromLocalStorage(counter);}
if(!endDate){endDate=getEndDateFromCookies(counter);}
if(!endDate){endDate=new Date();saveEndDate(endDate,uid);}
endDate.setMinutes(endDate.getMinutes()+parseInt(date,10));}
if(!version){endDate.setTime(endDate.getTime()+endDate.getTimezoneOffset()*60*1000);}
return endDate;}
function isLocalStorageAvailable(){var storage=void 0;var value='__storage_test__';if(undefined!==localStorageAvailable){return localStorageAvailable;}
if(!window||!window.localStorage){return false;}
try{storage=window.localStorage;storage.setItem(value,value);storage.removeItem(value);return true;}catch(e){return e instanceof DOMException&&([22,1014].includes(e.code)||['QuotaExceededError','NS_ERROR_DOM_QUOTA_REACHED'].includes(e.name))&&storage&&storage.length!==0;}}
function getEndDateFromCookies(counter){var uid=counter.getAttribute('id');var cookieArray=document.cookie?document.cookie.split(';'):[],Cookies={};for(var c in cookieArray){if(cookieArray.hasOwnProperty(c)&&typeof c==='string'){var temp=cookieArray[c].split('=');Cookies[temp[0].replace(/\s/g,'')]=temp[1];}}
if(Cookies['count-'+uid]){return new Date(Cookies['count-'+uid]);}
return null;}
function getEndDateFromLocalStorage(counter){var uid=counter.getAttribute('id');var json=window.localStorage.getItem('count-'+uid);if(json){try{var data=JSON.parse(json);if(!localStorageIsExpired(data)){return new Date(data.value);}
window.localStorage.removeItem('count-'+uid);}catch(e){return null;}}
return null;}
function localStorageIsExpired(data){if(!data.value||!data.expires){return true;}
var now=new Date();var expires=new Date(data.expires);return now.getTime()>expires.getTime();}
function saveEndDate(endDate,uid){var exp=new Date();exp.setMonth(exp.getMonth()+1);if(isLocalStorageAvailable()){var data={value:endDate.getTime(),expires:new Date(exp).getTime()};window.localStorage.setItem('count-'+uid,JSON.stringify(data));return;}
document.cookie='count-'+uid+'='+endDate+';expires='+new Date(exp)+';path='+window.location.pathname;}
exports.initialize=initialize;},{}]},{},[1]);