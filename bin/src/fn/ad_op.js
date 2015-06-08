/****************************************************************************
 Copyright (c) 2014 Louis Y P Chen.

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:
 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/
/**
 * Created by Louis W M Wu on 2014/12/24.
 */

(function (cb) {
    cb._({
        "~name": "op.ad_op",
        "uQueue":[],
        "cQ":[],
        "~superclass": cb.base,
        "upload_tpl":'<div class="thumb_list" {{?it.src}} {{??}} init="true" {{?}} cb-node="{{=it.name}}_{{=it.id}}" cb-event="mouseover~showDelectImgItem:1;mouseout~showDelectImgItem:0">\
                            <span cb-node="{{=it.name}}_del_{{=it.id}}" {{?it.src}}style="display:block;"{{?}} class="delete_img_register" cb-event="click~removeImg:{{=it.name}},{{=it.id}}"><i class="fa fa-trash-o"></i></span>\
                            <div class="" cb-node="{{=it.name}}_btn_{{=it.id}}" id="{{=it.name}}_btn_{{=it.id}}"></div>\
                            <img cb-node="{{=it.name}}_img_{{=it.id}}" src="{{?it.src}}{{=it.src}}{{?}}" _src="{{?it.src}}{{=it.src}}{{?}}" width="130" height="90" style="margin-top:-102px;position:absolute"/>\
                        </div>',
        ctor: function (options) {
            this.api = "ad_op";
            this._super(options);
        },
        postCreate: function () {
            this.$.loading.show();
            this.$.side_menu.metisMenu();
            this.$.starttime.datetimepicker({value: '', timepicker:false,format:'Y-m-d',formatDate:'Y-m-d'});
            this.$.endtime.datetimepicker({value: '', timepicker:false,format:'Y-m-d',formatDate:'Y-m-d'});
            this.$.start.datetimepicker({value: '', step: 5});
            this.$.end.datetimepicker({value: '', step: 5});
            this.ad_id = [];
            $.each({
                'ad_img_upload': 1
            }, cobra.ride(this,function(item, count) {
                this.makeUpload(item,count);
            }));
            this.request('getAdFullList');
        },
        /*获取广告位列表 */
        getAdFullListArgs: function () {
            return {
                type: "post",
                data: {
                },
                done: cobra.ride(this, function (data) {
                    this.AdPoData = data;
                    this.compile(this.$.adListUp, 'ad_op>ad_position', data)
                    $.when(this.compile(this.$.ad_rule, 'ad_op>ad_position', data)).done(cobra.ride(this, function(){
                        this.request('getFullList');
                    }));
                }),
                fail: function (data) {
                    this._msgBox.warn(data.responseBody.responseInfo.reasons.msg);
                }
            };
        },
        getAdOpListArgs: function () {
            var arr1 = [], arr2=[];
            this.$.user_type_up.find('.checked').each(function(i,val){
                arr1.push($(val).attr('cb-id'));
            });
            this.$.age_stage_up.find('.checked').each(function(i,val){
                arr2.push($(val).attr('cb-id'));
            });
            return {
                type: "post",
                data: {ad_order:this.$.adListUp.val(),
                    apply:this.$.apply_status.val(),
                    user_type:arr1,
                    age_stage:arr2,
                    start_time:this.$.starttime.val(),
                    end_time:this.$.endtime.val(),
                    p:this.pageId
                },
                done: cobra.ride(this, function (data) {
                    var totalData = {"data1":"","data2":"","data3":""};
                    this.$.loading.hide();
                    totalData.data1 = data;
                    totalData.data2 = this.fullData,
                    totalData.data3 = this.AdPoData,
                    //$.extend(data,this.fullData,this.AdPoData);
                    $.when(this.compile(this.$.ad_op_list, 'ad_op>ad_op_list', totalData)).done(cobra.ride(this, function(){
                        this.compile(this.$.pagination, "ad_op>pagination", data);
                    }));
                }),
                fail: function (data) {
                    this._msgBox.warn(data.responseBody.responseInfo.reasons.msg);
                }
            };
        },
        goPage:function(pageId){
            this.pageId = pageId;
            this.request('getAdOpList');
        },
        sideMenu:function(){
            var t = arguments[arguments.length - 1];
            if(t.hasClass('showMenu')){
                t.removeClass('showMenu');
                this.$.body.removeClass('body-small');
                this.$.sideBar.hide();
                this.$.mainContent.addClass('full');
            }else{
                t.addClass('showMenu');
                this.$.body.addClass('body-small');
                this.$.sideBar.show();
                this.$.mainContent.removeClass('full');
            }
        },
        /* 获取用户及年龄列表*/
        getFullListArgs: function () {
            return {
                type: "post",
                data: {
                },
                done: cobra.ride(this, function (data) {
                    this.fullData = data;
                    this.compile(this.$.full_list_down, "ad_op>full_list_down", data);
                    $.when(this.compile(this.$.full_list_up, "ad_op>full_list_up", data)).done(cobra.ride(this, function(){
                        if(this.toEdit){
                        var t_data = this.req['getAdOpList'].data;
                        var data = t_data[this.index];
                        this.$.new_add.show();
                        this.$.page_title.html('修改广告');
                        if(data){
                            this.ad_id = data.ad_id;
                            this.$.ad_name.val(data.ad_name);
                            data.user_type.length>0 && $.each(data.user_type,cobra.ride(this, function(n,val){
                                $(this.$.user_type_down.find('.icheckbox_square-green').each(function(ix){
                                    if($(this).attr('cb-id') == val){
                                        $(this).addClass('checked');
                                    }
                                }));
                            }));
                            data.age_stage.length>0 && $.each(data.age_stage,cobra.ride(this, function(n,val){
                                $(this.$.age_stage_down.find('.icheckbox_square-green').each(function(ix){
                                    if($(this).attr('cb-id') == val){
                                        $(this).addClass('checked');
                                    }
                                }));
                            }));
                            this.$.ad_rule.val(data.ad_position_code);
                            this.$.ad_url.val(data.ad_url);
                            this.$.start.val(data.start_time);
                            this.$.end.val(data.end_time);
                            $(this.$.add_effect.find('.iradio_square-green').each(function(ix){
                                if($(this).attr('cb-id') == data.ad_status_code){
                                    $(this).addClass('checked');
                                }
                            }));
                            this.$.user_type_down.find('.icheckbox_square-green').length == this.$.user_type_down.find('.checked').length?this.$.checkAllUserDown.addClass('checked'):'';
                            this.$.age_stage_down.find('.icheckbox_square-green').length == this.$.age_stage_down.find('.checked').length?this.$.checkAllAgeDown.addClass('checked'):'';
                            this.$.ad_order.val(data.order_num);
                            this.$.ad_remark.val(data.remark);
                            this.fill_img_upload_input(data.ad_img);
                        }else{
                            this._msgBox.warn('没有返回用户类型信息');
                        }
                        }else{
                            this.request('getAdOpList');
                        }
                    }));
                }),
                fail: function (data) {
                    this._msgBox.warn(data.responseBody.responseInfo.reasons.msg);
                }
            };
        },
        /* checkbox选中所有  */
        selectAll:function(name){
            var ele = arguments[arguments.length - 1];
            ele.toggleClass('checked');
            var t = this.$[name].find('.icheckbox_square-green');
            ele.hasClass('checked')?t.addClass('checked'):t.removeClass('checked')
        },
        /*点击查询按钮*/
        searchResult:function(){
            this.request('getAdOpList');
        },
        /*点击删除按钮 */
        goToDelete:function(adid){
            this.ad_id = [];
            this.ad_id.push(adid);
            this.showPopupBox();
        },
        deleteResult:function(){
            this.$.ad_op_list.find('.checked').each(cobra.ride(this, function(i,val){
                this.ad_id.push($(val).attr('cb-id'));
            }));
            this.ad_id.length>0?this.showPopupBox():this._msgBox.warn('未选中任何广告！');
        },
        /*点击修改按钮*/
        goToEdit:function(index){
            this.toEdit = true;
            this.index = index;
            this.request('getFullList');
        },
        getDelAdOpListArgs: function () {
            return {
                type: "post",
                data: {adid:this.ad_id
                },
                done: cobra.ride(this, function (data) {
                    this._msgBox.info('删除成功！');
                    this.request('getAdOpList');
                }),
                fail: function (data) {
                    this._msgBox.warn(data.responseBody.responseInfo.reasons.msg);
                }
            };
        },
        /*点击新增按钮刷新页面 */
        newAddAd:function(){
                window.location.reload();
        },
        validateCheckedVal:function(name, val){
            var p = this.$[name].find('.iradio_square-green');
            p.removeClass('checked');
            switch(val){
                case "0":
                    p.each(function(i,val){
                        $(val).attr('cb-id')=='0'?$(val).addClass('checked'):'';
                    });
                    break;
                case "1":
                    p.each(function(i,val){
                        $(val).attr('cb-id')=='1'?$(val).addClass('checked'):'';
                    });
                    break;
                case "2":
                    p.each(function(i,val){
                        $(val).attr('cb-id')=='2'?$(val).addClass('checked'):'';
                    });
                    break;
                case "-1":
                    p.each(function(i,val){
                        $(val).attr('cb-id')=='-1'?$(val).addClass('checked'):'';
                    });
                    break;
            }
        },
        /* 页面单选按钮的时间*/
        showHover:function(n,ele){
            if(n=='1'){
                ele.addClass('hover');
            }else{
                ele.removeClass('hover');
            }
        },
        checkSelectEvent:function(selfName,allName){
            var ele = arguments[arguments.length - 1];
            /*if checkbox */
            ele.toggleClass('checked');
            if(ele.hasClass('icheckbox_square-green')) {
                var t1 = this.$[selfName], t2 = this.$[allName]
                t1.find('.checked').length == t1.find('.icheckbox_square-green').length ? t2.addClass('checked') : t2.removeClass('checked');
            }else{
                var sc = ele.closest('.radio').siblings().find('.checked');
                sc.removeClass('checked');
            }
        },
        /*新增或修改表单提交 */
        submitNewAdd:function(){
            if(this.validateEditForm()){
                this.request('getAdOpSubmit');
            }
        },
        getAdOpSubmitArgs: function () {
            var arr1 = [], arr2=[];
            this.$.user_type_down.find('.checked').each(function(i,val){
                    arr1.push($(val).attr('cb-id'));
            });
            this.$.age_stage_down.find('.checked').each(function(i,val){
                arr2.push($(val).attr('cb-id'));
            });
            return {
                type: "post",
                data: {ad_id:this.ad_id,
                    ad_name:this.$.ad_name.val(),
                    ad_rule:this.$.ad_rule.val(),
                    ad_img:this.$.ad_img_upload_input.val(),
                    user_type:arr1,
                    age_stage:arr2,
                    ad_url:this.$.ad_url.val(),
                    ad_effect:this.$.add_effect.find('.checked').attr('cb-id'),
                    ad_order:this.$.ad_order.val(),
                    ad_remark:this.$.ad_remark.val(),
                    begin_time:this.$.start.val(),
                    end_time:this.$.start.val()
                },
                done: cobra.ride(this, function (data) {
                    var title='提交结果';
                    var result=$("<div></div>");
                    var resultOpt={
                        width:350,
                        height:150,
                        closeX:true,
                        title: this.parse(title, data),
                        content:"<div style='text-align: center;font-size: 16px;line-height: 50px;color:#E62D8B;font-weight: bold;'>提交成功!</div>",
                        'buttons':[
                            {
                                'value':'确定',
                                'type':'',
                                'click':function(){
                                    window.location.reload();
                                }
                            }
                        ],
                        clickCloseX:function(){
                            window.location.reload();
                        }
                    }
                    miniDialog(resultOpt);
                }),
                fail: function (data) {
                    this._msgBox.warn(data.responseBody.responseInfo.reasons.msg);
                }
            };
        },
        /*新增或修改表单验证 */
        validateEditForm:function(){
            var err='';
            if(this.$.ad_name.val()==''){
                err += '广告名称不能为空!<br/>';
            }
            if(this.$.user_type_down.find('.checked').length==0){
                err += '用户类型不能为空!<br/>';
            }
            if(this.$.age_stage_down.find('.checked').length==0){
                err += '年龄类型不能为空!<br/>';
            }
            if(this.$.ad_rule.val()==''){
                err += '广告位不能为空!<br/>';
            }
/*            if(this.$.ad_img_upload_input.val()==''){
                err += '广告图片不能为空!<br/>';
            }*/
            if(this.$.ad_url.val()==''){
                err += '广告URL不能为空!<br/>';
            }
            if(this.$.add_effect.find('.checked').length==0){
                err += '是否有效不能为空!<br/>';
            }
            if(this.$.ad_order.val()==''){
                err += '排序不能为空!<br/>';
            }
            if (err && err!=''){
                this._msgBox.warn(err);
                return false;
            }else{
                return true;
            }
        },
        /*删除时的弹出框 */
        showPopupBox:function(){
            this.popup_dialog = new cobra.modal({
                title : '删除页面类型',
                tip : '',
                content : '<div class="ibox-content"><p style="text-align: center;">确定要删除该页面类型吗？</p></div>',
                confirm : cobra.ride(this, function(){
                    this.request('getDelAdOpList');
                })
            });
        },
        /* add for img upload*/
        createOpt:function(name,id,btn_txt){
            var that=this,_id=id,_name=name;
            var opt={
                '__name':_name,
                '__sid':_id,
                'formData': {
                    'timestamp': new Date().getTime(),
                    'token': 'A'
                },
                'fileSizeLimit' : '3MB',
                'buttonClass': 'uploadify-button uploadify-button2',
                'width': 130,
                'height': 90,
                'multi': false,
                'swf': that.host[that.host.use] + '/op/src/plugins/uploadify/uploadify.swf',
                //'swf':'http://localhost:63342/operating/bin/src/plugins/uploadify/uploadify.swf',
                'uploader': that.host.imageUploadUrl,
                'buttonText': btn_txt || '点击上传<br/>',
                'onUploadProgress' : function(file, bytesUploaded, bytesTotal, totalBytesUploaded, totalBytesTotal) {
                    //this.button.html(totalBytesUploaded/totalBytesTotal);
                    var percentage = Math.round(totalBytesUploaded / totalBytesTotal * 100) - 1;
                    (percentage>100) && (percentage=100);
                    this._ps.find(".uploadify-progress-bar").css('width', percentage + "%").html(percentage + '%');
                    this.button.html('正在上传');
                },
                'onUploadError': function() {
                    //console.log(arguments)
                    this.queueData.queueBytesUploaded=0
                    this._ps.find(".uploadify-progress-bar").css('width', "100%").css('background','red').html('上传出错');
                },
                'onUploadStart':function(){
                    this.queueData.queueBytesUploaded=0
                    var _sid=this.getSetting('__sid');
                    var _name=this.getSetting('__name');
                    var _ele=that.$[this.settings.__name+'_'+this.settings.__sid];
                    this._ps=$('<div class="uploadify-progress-register" style="position: absolute;top: 40%;"><div class="uploadify-progress-bar"></div></div>');
                    _ele.append(this._ps);
                },
                itemTemplate: '',
                'onUploadSuccess': function() {
                    //console.log(arguments);
                    this._ps.remove();
                    this.queueData.queueBytesUploaded=0;
                    var _sid=this.getSetting('__sid');
                    var _name=this.getSetting('__name');
                    var _ele=that.$[this.settings.__name+'_'+this.settings.__sid];

                    var data=$.parseJSON(arguments[1]),thumb='',url='';
                    !(data && data.responseBody.data )&& (this.button.html('点击上传')) && (that._msgBox.warn('图片上传失败，请检查图片是否异常'));
                    if(data && data.responseBody.data && data.responseBody.data.status==1){
                        thumb=data.responseBody.data.thumb;
                        url=data.responseBody.data.url;
                        this.button.html('');
                        that.$[_name+'_'+_sid].removeAttr('init');
                        url && (that.$[_name+'_img_'+_sid].attr('_src',url).attr('src',url));
                        that.checkUploadElement(_name);
                    }else{
                        this.button.html('点击上传')
                        that._msgBox.error('图片上传失败，请稍后重试');
                    }
                }
            }
            return opt;
        },
        makeUpload:function(name,count,src,btn_txt){
            var that=this;
            //最大值
            count && (that.cQ[name]=count);
            //大框框
            var _box=that.$[name];
            //item
            var _id=that.uQueue[name]|| 1200;

            var _sid=name+'_btn_'+_id;
            var _item=$(that.doT(that.upload_tpl,{name:name,id:_id,src:src}));
            src ? (_box.html(_item)) :(_box.html(_item));
            var _btn=that.$[_sid];
            _btn && _btn.uploadify(that.createOpt(name,_id,btn_txt));
            that.uQueue[name]=++_id;
        },
        removeImg:function(name,id){
            var that=this;
            that.$[name+'_'+id].remove();
            that.checkUploadElement(name);
        },
        checkUploadElement:function(name){
            //ele
            var that=this;
            if(that.$[name].children().length==0){
                that.makeUpload(name);
            }else if(that.$[name].children().length<=that.cQ[name]-1){
                var _items=that.$[name].children();
                (!_items.filter("div[init]").length>0) && (that.makeUpload(name));
            }
            //input
            var _imgs=that.$[name].find('img');
            //console.log(_imgs);
            //console.log(that.$[name+'_input']);
            var _arr=[]
            cobra.ride(that,$.each(_imgs,function(i,e){
                $(e).attr('_src') && _arr.push($(e).attr('_src'));
            }));
            that.$[name+'_input'].val(_arr.join(','));
        },
        showDelectImgItem:function(n,ele){
            //console.log(arguments);
            if(n=='1'){
                (!ele.attr('init')) && (ele.find('.delete_img_register').show());
            }else{
                ele.find('.delete_img_register').hide()
            }
        },
        fill_images_input:function(name,url){
            if (!url) return false;
            var that = this;
            this.$[name+'_input'].val(url);
            if (url.indexOf(',') < 0) {
                that.makeUpload(name, that.cQ[name], url, ' ');
                that.$[name].children().filter("div[init]").remove();
            } else {
                var arr = url.split(',').reverse();
                cobra.ride(that, $.each(arr, function(i, e) {
                    that.makeUpload(name, that.cQ[name], e, ' ');
                }));
                (that.$[name].children().length>arr.length) && (that.$[name].children().filter("div[init]").remove());
            }
        },
        fill_img_upload_input:function(url){
            this.fill_images_input('ad_img_upload',url)
        }
    });
    $(function () {
        new op.ad_op();
    });
})(cobra);