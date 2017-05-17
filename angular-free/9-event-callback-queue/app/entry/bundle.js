webpackJsonp([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },

/***/ 1:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 注入babel-polyfill
	__webpack_require__(2);
	// 注入angular相关配置，如路由等
	var app_1 = __webpack_require__(299);
	// 获取angular相关依赖
	var angular = __webpack_require__(301);
	var ngRoute = __webpack_require__(303);
	var uiRouter = __webpack_require__(305);
	// 注入控制器
	var login_controller_1 = __webpack_require__(306);
	var accountAdd_controller_1 = __webpack_require__(309);
	// 注入指令
	var sidebar_directive_1 = __webpack_require__(311);
	// 注入服务
	var HttpServices_1 = __webpack_require__(312);
	var AsyncForm_1 = __webpack_require__(313);
	// 注入angular相关依赖
	var dependencies = [
	    ngRoute,
	    uiRouter
	];
	// 获取angular的app
	var ngModule = angular.module('AngularFree', dependencies);
	[
	    login_controller_1.default,
	    accountAdd_controller_1.default,
	    sidebar_directive_1.default,
	    HttpServices_1.default,
	    AsyncForm_1.default
	].forEach(function (service) { return service(ngModule); });
	// 进行angular相关配置
	app_1.default(ngModule, angular);
	// 启动应用
	angular.bootstrap(document, ['AngularFree']);


/***/ },

/***/ 299:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var tslib_1 = __webpack_require__(300);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = function (ngModule, angular) {
	    ngModule.config(['$stateProvider', '$compileProvider', '$httpProvider', function ($stateProvider, $compileProvider, $httpProvider) {
	            $compileProvider.debugInfoEnabled(true);
	            // 未登录则跳转至登录页
	            if (!sessionStorage.getItem('username') && location.href.indexOf('login') === -1) {
	                location.href = 'index.html#/login';
	            }
	            // ui-router路由的参数
	            var routerStates = [{
	                    name: 'login',
	                    url: '/login',
	                    templateUrl: './modules/login/login.template.html',
	                    controller: 'LoginCtrl'
	                }, {
	                    name: 'home',
	                    url: '/home',
	                    templateUrl: './modules/home/home.template.html'
	                }, {
	                    name: 'home.accounts',
	                    url: '/accounts',
	                    templateUrl: './modules/home/account/account.template.html'
	                }, {
	                    name: 'home.accountsadd',
	                    url: '/accountsadd',
	                    templateUrl: './modules/home/account/accountAdd.template.html',
	                    controller: 'AccountAddCtrl'
	                }, {
	                    name: 'home.system',
	                    url: '/system',
	                    templateUrl: './modules/home/system/system.template.html'
	                }];
	            // ui-router路由设置
	            routerStates.forEach(function (stateParams) {
	                $stateProvider.state(tslib_1.__assign({}, stateParams));
	            });
	        }]);
	};


/***/ },

/***/ 306:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var BasicTools_1 = __webpack_require__(307);
	var KeyUp_1 = __webpack_require__(308);
	var angular = __webpack_require__(301);
	var LoginCtrl = (function () {
	    // 注入依赖
	    function LoginCtrl($scope, $timeout) {
	        this.$scope = $scope;
	        this.$timeout = $timeout;
	        // VM用于绑定模板相关内容
	        $scope.VM = this;
	        $scope.VM.username = this.username;
	        $scope.VM.password = this.password;
	        var _loop_1 = function (i) {
	            KeyUp_1.EscKeyUp($scope, function () { BasicTools_1.Notify({ title: "Esc\u6309\u4E0B\u7B2C" + i + "\u6B21\u6CE8\u518C" }); });
	            KeyUp_1.SpaceKeyUp($scope, function () { BasicTools_1.Notify({ title: "Space\u6309\u4E0B\u7B2C" + i + "\u6B21\u6CE8\u518C" }); });
	        };
	        for (var i = 1; i <= 3; i++) {
	            _loop_1(i);
	        }
	        BasicTools_1.Notify({ title: "\u8BF7\u6309\u4E0BEsc\u952E\uFF0C\u6216\u8005Space\u7A7A\u683C\u952E" });
	    }
	    // 登录事件
	    LoginCtrl.prototype.submitForm = function () {
	        var _this = this;
	        if (!this.username || !this.password) {
	            BasicTools_1.Notify({
	                title: "\u8D26\u6237\u548C\u5BC6\u7801\u4E0D\u80FD\u4E3A\u7A7A",
	                type: 'error'
	            });
	            return;
	        }
	        // 登录中提示
	        var loading = BasicTools_1.Notify({
	            title: "\u767B\u5F55\u4E2D",
	            text: "\u8D26\u53F7\uFF1A" + this.username + "\uFF0C\u5BC6\u7801\uFF1A" + this.password,
	            type: 'info',
	            hide: false
	        });
	        // 一秒后，提示登陆成功
	        this.$timeout(function () {
	            if (loading.remove) {
	                loading.remove();
	            }
	            BasicTools_1.Notify({
	                title: "\u767B\u5F55\u6210\u529F",
	                type: 'success'
	            });
	            sessionStorage.setItem('username', _this.username);
	            location.href = 'index.html#/home';
	        }, 1000);
	    };
	    return LoginCtrl;
	}());
	// 获取依赖
	LoginCtrl.$inject = [
	    '$scope',
	    '$timeout'
	];
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = function (ngModule) {
	    ngModule.controller('LoginCtrl', LoginCtrl);
	};


/***/ },

/***/ 307:
/***/ function(module, exports) {

	"use strict";
	// Panel toolbox
	function SetPanelToolbox() {
	    $('.collapse-link').on('click', function () {
	        var $BOX_PANEL = $(this).closest('.x_panel'), $ICON = $(this).find('i'), $BOX_CONTENT = $BOX_PANEL.find('.x_content');
	        // fix for some div with hardcoded fix class
	        if ($BOX_PANEL.attr('style')) {
	            $BOX_CONTENT.slideToggle(200, function () {
	                $BOX_PANEL.removeAttr('style');
	            });
	        }
	        else {
	            $BOX_CONTENT.slideToggle(200);
	            $BOX_PANEL.css('height', 'auto');
	        }
	        $ICON.toggleClass('fa-chevron-up fa-chevron-down');
	    });
	    $('.close-link').click(function () {
	        var $BOX_PANEL = $(this).closest('.x_panel');
	        $BOX_PANEL.remove();
	    });
	}
	exports.SetPanelToolbox = SetPanelToolbox;
	;
	// /Panel toolbox
	function Notify(_a) {
	    var _b = _a.title, title = _b === void 0 ? '' : _b, _c = _a.text, text = _c === void 0 ? '' : _c, _d = _a.type, type = _d === void 0 ? 'info' : _d, _e = _a.styling, styling = _e === void 0 ? 'bootstrap3' : _e, _f = _a.animation, animation = _f === void 0 ? 'slide' : _f, _g = _a.delay, delay = _g === void 0 ? 2000 : _g, _h = _a.hide, hide = _h === void 0 ? true : _h;
	    return new PNotify({
	        title: title,
	        text: text,
	        type: type,
	        styling: styling,
	        animation: animation,
	        delay: delay,
	        hide: hide
	    });
	}
	exports.Notify = Notify;
	function Comfirm(_a) {
	    var title = _a.title, text = _a.text, _b = _a.type, type = _b === void 0 ? 'info' : _b, _c = _a.styling, styling = _c === void 0 ? 'bootstrap3' : _c, _d = _a.animation, animation = _d === void 0 ? 'slide' : _d, _e = _a.delay, delay = _e === void 0 ? 2000 : _e, _f = _a.hide, hide = _f === void 0 ? false : _f, _g = _a.confirm, confirm = _g === void 0 ? {} : _g, _h = _a.cancel, cancel = _h === void 0 ? {} : _h;
	    (new PNotify({
	        title: title,
	        text: text,
	        styling: styling,
	        animation: animation,
	        type: type,
	        icon: 'glyphicon glyphicon-question-sign',
	        hide: hide,
	        confirm: {
	            confirm: true,
	            buttons: [{
	                    text: confirm.text ? confirm.text : '是',
	                    addClass: "btn btn-default",
	                    promptTrigger: true,
	                    click: function (notice, value) {
	                        notice.remove();
	                        notice.get().trigger("pnotify.confirm", [notice, value]);
	                    }
	                }, {
	                    text: cancel.text ? cancel.text : '否',
	                    addClass: "btn btn-default",
	                    click: function (notice) {
	                        notice.remove();
	                        notice.get().trigger("pnotify.cancel", notice);
	                    }
	                }]
	        },
	        history: {
	            history: false
	        }
	    })).get().on('pnotify.confirm', function () {
	        if (typeof confirm.callback === 'function') {
	            confirm.callback();
	        }
	    }).on('pnotify.cancel', function () {
	        if (typeof cancel.callback === 'function') {
	            cancel.callback();
	        }
	    });
	}
	exports.Comfirm = Comfirm;
	function OperationResponse(res, title) {
	    var isError = res.exitValue !== 0;
	    if (isError) {
	        Comfirm({
	            title: title + "\u5931\u8D25",
	            text: "\u662F\u5426\u4E0B\u8F7Dlog\u6587\u4EF6?",
	            type: 'error',
	            confirm: {
	                callback: function () { window.open(res.logAddress, '_blank'); }
	            }
	        });
	    }
	    else {
	        Notify({
	            title: title + "\u6210\u529F",
	            type: 'success',
	            text: res.logAddress
	        });
	    }
	}
	exports.OperationResponse = OperationResponse;
	function FormatJson(txt, compress) {
	    if (typeof txt != 'string') {
	        txt = JSON.stringify(txt, undefined, 2);
	    }
	    var indentChar = '&nbsp;&nbsp;&nbsp;&nbsp;';
	    if (/^\s*$/.test(txt)) {
	        // alert('数据为空,无法格式化! ');
	        return undefined;
	    }
	    try {
	        var data = eval('(' + txt + ')');
	    }
	    catch (e) {
	        alert('数据源语法错误,JSON格式化失败! 错误信息: ' + e.description);
	        return undefined;
	    }
	    ;
	    var draw = [], last = false, This = this, line = compress ? '' : '<br>', nodeCount = 0, maxDepth = 0;
	    var notify = function (name, value, isLast, indent /*缩进*/, formObj) {
	        nodeCount++; /*节点计数*/
	        for (var i = 0, tab = ''; i < indent; i++)
	            tab += indentChar; /* 缩进HTML */
	        tab = compress ? '' : tab; /*压缩模式忽略缩进*/
	        maxDepth = ++indent; /*缩进递增并记录*/
	        if (value && value.constructor == Array) {
	            draw.push(tab + (formObj ? ('"' + name + '" :  ') : '') + '[' + line); /*缩进'[' 然后换行*/
	            for (var i = 0; i < value.length; i++)
	                notify(i, value[i], i == value.length - 1, indent, false);
	            draw.push(tab + ']' + (isLast ? line : (',' + line))); /*缩进']'换行,若非尾元素则添加逗号*/
	        }
	        else if (value && typeof value == 'object') {
	            draw.push(tab + (formObj ? ('"' + name + '" :  ') : '') + '{' + line); /*缩进'{' 然后换行*/
	            var len = 0, i = 0;
	            for (var key in value)
	                len++;
	            for (var key in value)
	                notify(key, value[key], ++i == len, indent, true);
	            draw.push(tab + '}' + (isLast ? line : (',' + line))); /*缩进'}'换行,若非尾元素则添加逗号*/
	        }
	        else {
	            if (typeof value == 'string')
	                value = '"' + value + '"';
	            draw.push(tab + (formObj ? ('"' + name + '" :  ') : '') + value + (isLast ? '' : ',') + line);
	        }
	        ;
	    };
	    var isLast = true, indent = 0;
	    notify('', data, isLast, indent, false);
	    draw = draw.join('').replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
	        var cls = 'number';
	        if (/^"/.test(match)) {
	            if (/:$/.test(match)) {
	                cls = 'key';
	            }
	            else {
	                cls = 'string';
	            }
	        }
	        else if (/true|false/.test(match)) {
	            cls = 'boolean';
	        }
	        else if (/null/.test(match)) {
	            cls = 'null';
	        }
	        return '<span class="' + cls + '">' + match + '</span>';
	    });
	    draw = '<div class="json">' + draw + '</div>';
	    return draw;
	}
	exports.FormatJson = FormatJson;
	;
	function UrlEncode(param, key, encode) {
	    if (param == null)
	        return '';
	    var paramStr = '';
	    var t = typeof (param);
	    if (t == 'string' || t == 'number' || t == 'boolean') {
	        paramStr += '&' + key + '=' + ((encode == null || encode) ? encodeURIComponent(param) : param);
	    }
	    else {
	        for (var i in param) {
	            var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
	            paramStr += UrlEncode(param[i], k, encode);
	        }
	    }
	    return paramStr;
	}
	exports.UrlEncode = UrlEncode;
	;
	function SetDataTable(eleType, destroy) {
	    $(eleType).dataTable({
	        destroy: destroy || true,
	        "language": {
	            "url": "/static/datatable_zh_CN.json"
	        }
	    });
	}
	exports.SetDataTable = SetDataTable;
	;
	function SetTooltip(ele, trigger) {
	    if (ele === void 0) { ele = '[data-toggle="tooltip"]'; }
	    if (trigger === void 0) { trigger = 'click hover'; }
	    var $tooltip = $(ele);
	    $tooltip.tooltip({
	        container: 'body',
	        trigger: trigger
	    });
	}
	exports.SetTooltip = SetTooltip;
	;
	function SetICheck(callback) {
	    // iCheck
	    var $input = $("input.flat");
	    if ($input.length) {
	        $input.iCheck({
	            checkboxClass: 'icheckbox_flat-green',
	            radioClass: 'iradio_flat-green'
	        });
	        $('input').on('ifChecked', function (event) {
	            if (typeof callback === 'function') {
	                callback(event.currentTarget.name, event.currentTarget.value);
	            }
	        });
	    }
	}
	exports.SetICheck = SetICheck;
	;
	function SetSwitchery(callback) {
	    // Switchery
	    if ($(".js-switch")[0]) {
	        var elems = Array.prototype.slice.call(document.querySelectorAll('.js-switch'));
	        elems.forEach(function (html) {
	            var switchery = new Switchery(html, {
	                color: '#26B99A'
	            });
	            html.onchange = function () {
	                var value = html.checked === true ? Number(html.attributes['true'].value) : Number(html.attributes['false'].value);
	                if (typeof callback === 'function') {
	                    callback(html.name, value);
	                }
	            };
	        });
	    }
	}
	exports.SetSwitchery = SetSwitchery;
	;
	function SetDaterangepicker(eleToSet, callback) {
	    var today = new Date();
	    var year = today.getFullYear();
	    var month = today.getMonth() + 1;
	    var date = today.getDate();
	    // daterangepicker
	    $(eleToSet).daterangepicker({
	        singleDatePicker: true,
	        format: 'YYYY-MM-DD',
	        minDate: year + "-" + month + "-" + date,
	        calender_style: "picker_3"
	    }, function (start, end, label) {
	        if (typeof callback === 'function') {
	            callback($(eleToSet).attr("name"), start.toISOString().substring(0, 10));
	        }
	    });
	}
	exports.SetDaterangepicker = SetDaterangepicker;
	function SetDataTableAjax(url) {
	    return {
	        url: url,
	        // dataSrc: "list",
	        data: function (data) {
	            for (var i = 0; i < data.columns.length; i++) {
	                var column = data.columns[i];
	                column.searchRegex = column.search.regex;
	                column.searchValue = column.search.value;
	                delete column.search;
	            }
	            data.accessToken = exports.AccessToken.get();
	            // console.log(AccessToken.get())
	        }
	    };
	}
	exports.SetDataTableAjax = SetDataTableAjax;
	;
	exports.AccessToken = {
	    get: function () {
	        return sessionStorage.getItem('accessToken');
	    },
	    set: function (token) {
	        sessionStorage.setItem('accessToken', token);
	    }
	};
	function FormatDate(str) {
	    // 格式化数字，小于10表示为0x
	    function numStd(num) {
	        if (!num) {
	            return undefined;
	        }
	        var _val = parseInt(num);
	        return (_val < 10) ? ('0' + _val) : ('' + _val);
	    }
	    // 反格式化数字，去掉0
	    function numUnstd(num) {
	        if (!num) {
	            return '';
	        }
	        return parseInt(num);
	    }
	    var _str = str + '';
	    if (!_str) {
	        return '';
	    }
	    // 正则判断当前日期格式
	    var datearr;
	    if (/\d{4}-\d{1,2}-\d{1,2}/.test(_str)) {
	        datearr = _str.split('-');
	        _str = numStd(datearr[0]) + '-' + numStd(datearr[1]) + '-' + numStd(datearr[2]);
	    }
	    else if (/\d{4}\.\d{1,2}\.\d{1,2}/.test(_str)) {
	        datearr = _str.split('-');
	        _str = numStd(datearr[0]) + '-' + numStd(datearr[1]) + '-' + numStd(datearr[2]);
	    }
	    else if ((_str.indexOf('年') > -1) && (_str.indexOf('月') > -1) && (_str.indexOf('日') > -1)) {
	        datearr = _str.split('年');
	        var year = datearr[0];
	        var month = datearr[1].split('月')[0];
	        var day = datearr[1].split('月')[1].replace('日', '');
	        _str = numStd(year) + '-' + numStd(month) + '-' + numStd(day);
	    }
	    else {
	        return str;
	    }
	    return _str;
	}
	exports.FormatDate = FormatDate;
	;
	var BasicTools = {
	    SetPanelToolbox: SetPanelToolbox,
	    Notify: Notify,
	    FormatJson: FormatJson,
	    UrlEncode: UrlEncode,
	    SetDataTable: SetDataTable,
	    SetTooltip: SetTooltip,
	    SetICheck: SetICheck,
	    SetSwitchery: SetSwitchery,
	    SetDaterangepicker: SetDaterangepicker,
	    SetDataTableAjax: SetDataTableAjax,
	    AccessToken: exports.AccessToken,
	    FormatDate: FormatDate
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = BasicTools;


/***/ },

/***/ 308:
/***/ function(module, exports) {

	// 按键事件
	// EscKeyUp(scope, callback);
	// SpaceKeyUp(scope, callback);
	"use strict";
	var KeyUpService = (function () {
	    function KeyUpService() {
	        this.CallbackObjscts = [];
	        this.EscCallbacks = [];
	        this.SpaceCallbacks = [];
	        this.isEventInit = false;
	        // 绑定this
	        this.addEscCallback = this.addEscCallback.bind(this);
	        this.addSpaceCallback = this.addSpaceCallback.bind(this);
	    }
	    // 添加Esc按键队列
	    KeyUpService.prototype.addEscCallback = function (scope, callback) {
	        this.addCallback(this.EscCallbacks, scope, callback);
	    };
	    // 添加Space按键队列
	    KeyUpService.prototype.addSpaceCallback = function (scope, callback) {
	        this.addCallback(this.SpaceCallbacks, scope, callback);
	    };
	    // 添加按键事件队列
	    KeyUpService.prototype.addCallback = function (callbacks, scope, callback) {
	        // 产生随机数
	        var uuid = Math.random().toString(36).substr(2);
	        // 需有回调函数
	        if (typeof callback !== 'function') {
	            console.log('callback is not a function.');
	            return;
	        }
	        // 关联uuid的作用域和回调
	        this.CallbackObjscts[uuid] = { scope: scope, callback: callback };
	        // 添加到队列的头部
	        callbacks.unshift(uuid);
	        // 初始化监听事件
	        if (!this.isEventInit) {
	            this.initEvent();
	            this.isEventInit = true;
	        }
	    };
	    // 执行回调队列
	    KeyUpService.prototype.executeCallback = function (callbacks) {
	        var _this = this;
	        if (!callbacks.length) {
	            return;
	        }
	        // 获取队列头部uuid
	        var uuid = callbacks.shift();
	        // 取出uuid关联的作用域和回调
	        var _a = this.CallbackObjscts[uuid], scope = _a.scope, callback = _a.callback;
	        // 执行回调
	        scope.$apply(callback());
	        // 移除
	        this.CallbackObjscts.splice(this.CallbackObjscts.findIndex(function (item) { return item === _this.CallbackObjscts[uuid]; }), 1);
	    };
	    // 监听按键事件
	    KeyUpService.prototype.initEvent = function () {
	        var that = this;
	        // 添加按键事件监听
	        document.addEventListener('keyup', (function (e) {
	            if (e === void 0) { e = window.event; }
	            if (e && e.keyCode) {
	                switch (e.keyCode) {
	                    case 27:
	                        // Esc按键事件
	                        that.executeCallback(that.EscCallbacks);
	                        break;
	                    case 32:
	                        // Space按键事件
	                        that.executeCallback(that.SpaceCallbacks);
	                        break;
	                }
	            }
	        }).bind(this), true);
	    };
	    return KeyUpService;
	}());
	// 新建按键服务
	var KeyUp = new KeyUpService();
	// 取出Esc按键添加和Space按键添加
	var addEscCallback = KeyUp.addEscCallback, addSpaceCallback = KeyUp.addSpaceCallback;
	exports.EscKeyUp = addEscCallback;
	exports.SpaceKeyUp = addSpaceCallback;
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = KeyUp;


/***/ },

/***/ 309:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var OpenImageDialog_1 = __webpack_require__(310);
	var angular = __webpack_require__(301);
	var AccountAddCtrl = (function () {
	    // 注入依赖
	    function AccountAddCtrl($scope, AsyncForm) {
	        this.$scope = $scope;
	        this.AsyncForm = AsyncForm;
	        this.images = [];
	        // VM用于绑定模板相关内容
	        $scope.VM = this;
	    }
	    // 点击打开选择文件对话框
	    AccountAddCtrl.prototype.openImageDialog = function () {
	        var _this = this;
	        // 调用openImageDialog，返回Promise，传入file、name、url参数
	        OpenImageDialog_1.OpenImageDialog().then(function (_a) {
	            var file = _a.file, url = _a.url, name = _a.name;
	            // 添加进数组
	            _this.images.push({ url: url, name: name });
	            // 需手动刷新数据
	            _this.$scope.$digest();
	            _this.AsyncForm({
	                files: [file],
	                url: 'http://modifyDetail',
	                params: {
	                    gender: 'male'
	                }
	            }).then(function () { console.log('success'); }, function () { console.log('error'); });
	        });
	    };
	    return AccountAddCtrl;
	}());
	// 获取依赖
	AccountAddCtrl.$inject = [
	    '$scope',
	    'AsyncForm'
	];
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = function (ngModule) {
	    ngModule.controller('AccountAddCtrl', AccountAddCtrl);
	};


/***/ },

/***/ 310:
/***/ function(module, exports) {

	"use strict";
	// 打开图片对话框，只接受一张图片上传
	function OpenImageDialog() {
	    // 新建input，作为文件获取
	    var input = document.createElement('input');
	    input.type = 'file';
	    input.name = 'file';
	    input.accept = 'image/*';
	    var resolve;
	    // 新建Promise，并获取resolve函数
	    var promise = new Promise(function (res, rej) {
	        resolve = res;
	    });
	    // 设置input中图片改变时触发事件
	    input.onchange = function () {
	        // 创建fileReader读取文件内容
	        var fileReader = new FileReader();
	        var file = input.files[0];
	        // 读取完毕后，传入文件、图片信息以及名字
	        fileReader.onload = function () {
	            resolve({ file: file, url: fileReader.result, name: input.value.substring(input.value.lastIndexOf('\\') + 1) });
	        };
	        fileReader.readAsDataURL(file);
	    };
	    // 触发表单点击事件
	    input.click();
	    // 返回promise
	    return promise;
	}
	exports.OpenImageDialog = OpenImageDialog;


/***/ },

/***/ 311:
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	/*
	 * [sidebar]
	 *
	 * 侧边栏组件
	 *
	 * created by deleted
	 *
	 */
	exports.default = function (ngModule) {
	    ngModule.directive('sidebar', ['$state', function ($state) {
	            return {
	                restrict: 'AE',
	                templateUrl: './shared/components/sidebar.template.html',
	                transclude: true,
	                replace: false,
	                link: function (scope, element, attrs) {
	                    var menuShowAll = false;
	                    scope.$state = $state;
	                    // 初始化菜单数据
	                    var menus = [{
	                            icon: 'fa-home',
	                            text: '账户管理',
	                            show: false,
	                            childMenus: [{
	                                    href: 'home.accounts',
	                                    text: '账户信息' // text用于储存该菜单显示名称
	                                }, {
	                                    href: 'home.accountsadd',
	                                    text: '新建'
	                                }]
	                        }, {
	                            icon: 'fa-cubes',
	                            text: '系统管理',
	                            show: false,
	                            href: 'home.system'
	                        }];
	                    scope.menus = menus;
	                    // 点击父菜单
	                    scope.toggleMenu = function (menu) {
	                        // 将其他菜单设置为非激活状态
	                        scope.menus.forEach(function (m) { return m.show = false; });
	                        if (menu.childMenus && menu.childMenus.length) {
	                            // 若当前菜单有子菜单，则切换激活状态
	                            menu.show = !menu.show;
	                        }
	                        else if (menu.href) {
	                            // 若当前菜单没有子菜单，则进行跳转 
	                            $state.go(menu.href);
	                        }
	                    };
	                    checkActive();
	                    // 初始化的时候检测菜单是否激活
	                    function checkActive() {
	                        menus.forEach(function (menu) {
	                            menu.show = !!(menu.childMenus && menu.childMenus.find(function (item) { return item.href === $state.current.name; }));
	                        });
	                    }
	                }
	            };
	        }]);
	};


/***/ },

/***/ 312:
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = function (ngModule) {
	    ngModule
	        .factory('qHttp', ['$http', function ($http) { return (function () {
	            function qHttp(config) {
	                return $http(config).then(function (res) { return errCodeHandler(res); }).then(function (res) { return res.data; }).catch(function (res) { errCodeHandler(res); throw (new Error('error response')); });
	            }
	            ['post', 'get', 'delete', 'put'].forEach(function (method) {
	                qHttp[method] = function () {
	                    var obj = [];
	                    for (var _i = 0; _i < arguments.length; _i++) {
	                        obj[_i] = arguments[_i];
	                    }
	                    return $http[method].apply($http, obj).then(function (res) { return errCodeHandler(res); }).then(function (res) { return res.data; }).catch(function (res) { errCodeHandler(res); throw (new Error('error response')); });
	                };
	            });
	            return qHttp;
	        })(); }])
	        .factory('postJSON', ['qHttp', function (qHttp) { return function (url, data, params) { return qHttp({
	            url: url,
	            data: data,
	            params: params,
	            method: 'POST',
	            headers: {
	                'Content-Type': 'application/json;charset=UTF-8'
	            },
	            withCredentials: true,
	            transformRequest: [function (x) { return JSON.stringify(x); }]
	        }); }; }])
	        .factory('putJSON', ['qHttp', function (qHttp) { return function (url, data, params) { return qHttp({
	            url: url,
	            data: data,
	            params: params,
	            method: 'PUT',
	            headers: {
	                'Content-Type': 'application/json;charset=UTF-8'
	            },
	            withCredentials: true,
	            transformRequest: [function (x) { return JSON.stringify(x); }]
	        }); }; }]);
	};
	function errCodeHandler(res) {
	    if (res.status >= 400) {
	        var err = errCodeTranslate(res.data.errorCode);
	        var errText = err ? "\u9519\u8BEF\uFF1A" + err : '';
	        makeToast(errText, 'error');
	    }
	    else if (res.status >= 200) {
	        var body = res.data;
	        if (body.code !== '0') {
	            var err = errCodeTranslate(body.code);
	            var errText = err ? "\u9519\u8BEF\uFF1A" + err : '';
	            makeToast(errText, 'error');
	        }
	    }
	    return res;
	}
	exports.errCodeHandler = errCodeHandler;
	var errCodes = {
	    '0101010101': '名称重复',
	};
	function errCodeTranslate(code) {
	    return errCodes[code] || (code ? "\u9519\u8BEF\u7801" + code : '');
	}


/***/ },

/***/ 313:
/***/ function(module, exports) {

	"use strict";
	// 异步提交带图片表单
	/* 参数:
	 * {
	 * 	files: 传入file input的dom对象,
	 * 	url: 服务器地址,
	 * 	params: 其他需要发送的参数{键：值}
	 *  不应该使用 contentType: 默认为`multipart/form-data`，可用'application/x-www-form-urlencoded'
	 * }
	 * 返回Promise，可使用.then调用
	 */
	var AsyncForm = (function () {
	    function AsyncForm(qHttp, _a) {
	        var url = _a.url, params = _a.params, _b = _a.files, files = _b === void 0 ? [] : _b, contentType = _a.contentType;
	        // 初始化参数
	        this.qHttp = qHttp;
	        this.url = url;
	        this.contentType = contentType;
	        var formData = new FormData();
	        this.formData = formData;
	        // 若有传入文件，则添加
	        if (files) {
	            Array.prototype.forEach.call(files, function (file) {
	                formData.append('file', file);
	            });
	        }
	        // 若有其他参数，则添加
	        Object.keys(params).forEach(function (key) {
	            if (params[key] != null) {
	                formData.append(key, params[key]);
	            }
	        });
	    }
	    AsyncForm.prototype.submit = function () {
	        // 提交，返回promise
	        return this.qHttp.post(this.url, this.formData, {
	            withCredentials: true,
	            headers: {
	                'Content-Type': undefined
	            },
	            transformRequest: function (x) { return x; }
	        });
	    };
	    return AsyncForm;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = function (ngModule) {
	    // 注入qHttp服务
	    ngModule.factory('AsyncForm', ['qHttp', function (qHttp) {
	            return function (config) { return new AsyncForm(qHttp, config).submit(); };
	        }]);
	};


/***/ }

});