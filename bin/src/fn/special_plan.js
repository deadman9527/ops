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
        "~name": "op.special_plan",

        "~superclass": cb.base,
        __q:0,
        ctor: function (options) {
            this.api = "special_plan";
            this._super(options);
        },
        postCreate: function () {
            this.p_id = this.getQuery('p_id')
            this.$.side_menu.metisMenu();
            this.perfid= [];
            //init upload
            this.createUploadXLS();

            //this.$.start_time.datetimepicker({value: '', step: 5});
            this.$.start_time.datetimepicker({
                yearOffset:0,
                lang:'ch',
                timepicker:false,
                format:'Y-m-d',
                formatDate:'Y-m-d'
            });
            this.$.end_time.datetimepicker({
                yearOffset:0,
                lang:'ch',
                timepicker:false,
                format:'Y-m-d',
                formatDate:'Y-m-d'
            });
            //this.$.end_time.datetimepicker({value: '', step: 5});
            this.request('getCatList');
        },
        getSpecialPlanListArgs: function () {
            return {
                type: "post",
                data: {page:this.pageId,
                    column_id:this.$.category.val(),
                    sell_start_time:this.$.start_time.val(),
                    sell_end_time:this.$.end_time.val(),
                    p_id:this.p_id
                },
                done: cobra.ride(this, function (data) {
                    $.when(this.compile(this.$.specialplan_list, "special_plan>specialplan_list", data)).done(cobra.ride(this, function(){
                        $.when(this.compile(this.$.pagination, "special_plan>pagination", data)).done(cobra.ride(this, function(){
                        }));
                    }));
                }),
                fail: function (data) {
                    this._msgBox.warn(data.responseBody.responseInfo.reasons.msg);
                }
            };
        },
        getCatListArgs: function () {
            return {
                type: "post",
                data: {},
                done: cobra.ride(this, function (data) {
                    $.when(this.compile(this.$.category, "special_plan>category_list", data)).done(cobra.ride(this, function(){
                        this.request("getSpecialPlanList");
                    }));
                }),
                fail: function (data) {
                    this._msgBox.warn(data.responseBody.responseInfo.reasons.msg);
                }
            };
        },
        goPage:function(pageId){
            this.pageId = pageId;
            this.request('getSpecialPlanList');
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
        // select all checkbox
        selectAllChk : function(){
            var ele=arguments[arguments.length-1][0];
            var chk=this.$.specialplan_list.find("input");
            ele.checked ? chk.prop("checked", true) : chk.prop("checked", false);
        },
        // select single checkbox
        selectItem : function(){
            var chk=this.$.specialplan_list.find("input").length;
            var chk_checked=this.$.specialplan_list.find("input:checked").length;
            (chk == chk_checked) ? this.$.checkAllBtn.prop("checked", true) : this.$.checkAllBtn.prop("checked", false); //判断是否勾选全选按钮
        },
        searchResult:function(){
            this.request("getSpecialPlanList");
        },
        // delete data by id
        goToDelete:function(id){
            this.perfid = [];
            this.perfid.push(id);
            this.showPopupBox();
        },
        // delete data by all checked values
        goToDeleteByIds:function(){
            this.$.specialplan_list.find('.checked').each(cobra.ride(this, function(i,val){
                  this.perfid.push($(val).attr('cb-id'));
            }));
            this.perfid.length>0?this.showPopupBox():this._msgBox.warn('未选中任何专场！');

        },
        /*删除时的弹出框 */
        showPopupBox:function(){
            this.popup_dialog = new cobra.modal({
                title : '删除年龄类型',
                tip : '',
                content : '<div class="ibox-content"><p style="text-align: center;">确定要删除该专场吗？</p></div>',
                confirm : cobra.ride(this, function(){
                    this.request('getDelSpecialSpan');
                })
            });
        },
        //Import data from user excel files
        importDataFromExcel:function(){

        },
        showRowHover:function(n,ele){
            if(n=='1'){
                //ele.addClass('hover');
                ele.attr("old-bg",ele.css("background-color"));
                ele.css("background-color","#eee");
            }else{
                //ele.removeClass('hover');
                ele.css("background-color",ele.attr("old-bg"));
            }
        },
        getDelSpecialSpanArgs:function(){
            return {
                type: "post",
                data: {id:this.perfid,
                    pageId:this.pageId
                },
                done: cobra.ride(this, function (data) {
                    this._msgBox.info('删除成功！');
                    this.request('getSpecialPlanList');
                }),
                fail: function (data) {
                    this._msgBox.warn(data.responseBody.responseInfo.reasons.msg);
                }
            };
        },
        goToEditOrderId:function(n,ele){
            n=="1" && ele.removeAttr("readonly").addClass("enable") || ele.attr("readonly","true").removeClass("enable");
        },
        editOrderId:function(id,nodeId){
            this.sortId = this.$[nodeId].val();
            this.orderId = id;
            this.request('editOrderId');
        },
        editOrderIdArgs:function(){
            return {
                type: "post",
                data: {id:this.orderId,
                sort:this.sortId
                },
                done: cobra.ride(this, function (data) {
                    this._msgBox.info('修改成功！');
                    this.request('getSpecialPlanList');
                }),
                fail: function (data) {
                    this._msgBox.warn(data.responseBody.responseInfo.reasons.msg);
                }
            };

        },
        /* 页面单选按钮的事件*/
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
        /* checkbox选中所有  */
        selectAll:function(name){
            var ele = arguments[arguments.length - 1];
            ele.toggleClass('checked');
            var t = this.$[name].find('.icheckbox_square-green');
            ele.hasClass('checked')?t.addClass('checked'):t.removeClass('checked')
        },
        createUploadXLSOpt:function(){
            var that=this;
            var opt={
                'formData': {
                    'timestamp': new Date().getTime(),
                    'sid':that.__sid?that.__sid:''
                },
                'fileSizeLimit' : '3MB',
                'buttonClass': 'btn btn-sm btn-primary',
                'width': 80,
                'height': 30,
                'fileTypeDesc' : '请选择Excel表格文件（.xls）',
                'fileTypeExts' : '*.xls',
                'multi': false,
                'swf':that.host[that.host.use]+'/op/src/plugins/uploadify/uploadify.swf',
                //TODO：zt 修正上传文件路径
                'uploader': that.host[that.host.use]+'/m.php?m=PmsBrand&a=upload_brand&p_id=' + that.p_id,
                'buttonText': '导入Excel',
                "button_placeholder":'',
                'onUploadProgress' : function(file, bytesUploaded, bytesTotal, totalBytesUploaded, totalBytesTotal) {
                    console.log('上传中');
                    this.button.html('正在导入...');
                },
                'onUploadError': function() {
                    this.queueData.queueBytesUploaded=0;
                    that.$.loading.hide();
                    clearInterval(that.__si);
                    this.button.html('导入Excel');
                    that._msgBox.error('上传失败，请稍后重试');
                },
                'onUploadStart':function(){
                    console.log('开始上传');
                    that.$.loading.show();
                    that.__si=setInterval(function(){
                        that.__q++;
                        var _str='';
                        for(var i=that.__q % 8;i>0;i--){
                            _str+=". "
                        }
                        that.$.loading.html('<p>正在导入，可能需要较长时间，请勿关闭页面'+_str+'</p>');
                    },500);
                    this.queueData.queueBytesUploaded=0
                },
                'onUploadSuccess': function() {
                    console.log('上传结果');
                    that.$.loading.hide();
                    this.button.html('导入Excel');
                    console.log(11);
                    clearInterval(that.__si);
                    this.queueData.queueBytesUploaded=0;
                    try{
                        console.log(arguments);
                        console.log(data);
                        var data=$.parseJSON(arguments[1]);

                        if(!data || data==''){
                            throw new Error('数据接口异常，请重试');
                        }

                        var _data={};
                        _data.total=data.responseBody.data.count;
                        _data.suc=data.responseBody.data.suc;
                        _data.fail=data.responseBody.data.fail;
                        _data.errs=data.responseBody.data.errors;
                        _data.sucs=data.responseBody.data.sucs;

                        var title='导入结果 - 总共${total}条记录  成功${suc}条  失败${fail}条';
                        var result=$("<div></div>");
                        $.when(that.compile(result, "special_plan>import_excel_result",_data)).done(cobra.ride(that, function() {
                            var resultOpt={
                                width:_data.fail==0?350:600,
                                height:_data.fail==0?150:400,
                                closeX:true,
                                title: that.parse(title, _data),
                                content:_data.fail==0? "<div style='text-align: center;font-size: 16px;line-height: 50px;color:#E62D8B;font-weight: bold;'>导入成功</div>" :result.html(),
                                'buttons':[
                                    {
                                        'value':'确定',
                                        'type':'',
                                        'click':function(){
                                            that.$.loading.show();
                                            window.location.reload();
                                        }
                                    }
                                ],
                                clickCloseX:function(){
                                    that.$.loading.show();
                                    window.location.reload();
                                }
                            }
                            miniDialog(resultOpt);
                        })).fail(function() {});
                    }catch(e){
                        console.log(e);
                        that.$.loading.hide();
                        clearInterval(that.__si);
                        this.button.html('导入Excel');
                        that._msgBox.error('上传失败，请稍后重试');
                    }
                }
            }
            return opt;
        },
        createUploadXLS:function() {
            this.$["uploadXls"].uploadify(this.createUploadXLSOpt());

        }
    });
    $(function () {
        window._sf=new op.special_plan();
    });
})(cobra);