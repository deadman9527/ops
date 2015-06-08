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
        "~name": "op.page_config",

        "~superclass": cb.base,

        ctor: function (options) {
            this.api = "page_config";
            this._super(options);
        },
        postCreate: function () {
            this.$.side_menu.metisMenu();
            this.request("getFullList");
        },
        /*获取年龄类型列表 */
        getPageListArgs: function () {
            var tmpData = this.$.pageKey.val();
            return {
                type: "post",
                data: {id:this.pageId,
                    pageKey:tmpData
                },
                done: cobra.ride(this, function (data) {
                    var totalData = {"data1":"","data2":""};
                    totalData.data1 = data;
                    totalData.data2 = this.fullData;
                    //$.extend(data,this.fullData);
                    $.when(this.compile(this.$.page_list, "page_config>page_list", totalData)).done(cobra.ride(this, function(){
                        this.compile(this.$.pagination, "page_config>pagination", data);
                    }));
                }),
                fail: function (data) {
                    this._msgBox.warn(data.responseBody.responseInfo.reasons.msg);
                }
            };
        },
        goPage:function(pageId){
            this.pageId = pageId;
            this.request('getPageList');
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
                    $.when(this.compile(this.$.full_list, "page_config>full_list", data)).done(cobra.ride(this, function(){
                        if(this.toEdit){
                        var t_data = this.req['getPageList'].data;
                        var data = t_data[this.index];
                        if(data){
                            this.$.page_code.val(data.code);
                            this.$.page_name.val(data.name);
                            this.validateCheckedVal('page_port',data.port_code);
                                $.each(data.user_type,cobra.ride(this, function(n,val){
                                    $(this.$.user_type.find('.icheckbox_square-green').each(function(ix){
                                        if($(this).attr('cb-id') == val){
                                            $(this).addClass('checked');
                                        }
                                    }));
                                }));

                            $(this.$.age_stage.find('.iradio_square-green').each(function(ix){
                                if($(this).attr('cb-id') == data.age_stage_code){
                                    $(this).addClass('checked');
                                }
                            }));
                            $(this.$.page_port.find('.iradio_square-green').each(function(ix){
                                if($(this).attr('cb-id') == data.port_code){
                                    $(this).addClass('checked');
                                }
                            }));
                            this.$.user_type.find('.icheckbox_square-green').length == this.$.user_type.find('.checked').length?this.$.user_type_all.addClass('checked'):'';
                            this.validateCheckedVal('apply',data.apply);
                            this.validateCheckedVal('rule',data.rule_code);
                            this.$.ad_remark.val(data.desc);
                            this.$.page_title.text('修改页面类型');
                            this.$.new_add.show();
                        }else{
                            this._msgBox.warn('没有返回用户类型信息');
                        }
                        }else{
                            this.request('getPageList');
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
            this.request('getPageList');
        },
        /*点击删除按钮 */
        goToDelete:function(pageid){
            this.delId = pageid;
            this.showPopupBox();
        },
        /*点击修改按钮*/
        goToEdit:function(index,id){
            this.toEdit = true;
            this.index = index;
            this.editId = id;
            this.request('getFullList');
        },
        getDelPageListArgs: function () {
            return {
                type: "post",
                data: {id:this.delId
                },
                done: cobra.ride(this, function (data) {
                    /*$.when(this.compile(this.$.page_list, "page_config>page_list", data)).done(cobra.ride(this, function(){
                    }));*/
                    this._msgBox.info('删除成功！');
                    this.request('getPageList');
                }),
                fail: function (data) {
                    this._msgBox.warn(data.responseBody.responseInfo.reasons.msg);
                }
            };
        },
        /*点击新增按钮刷新页面 */
        newAddPage:function(){
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
        /*新增或修改表单提交 */
        submitNewAdd:function(){
            if(this.validateEditForm()){
                this.request('getPageSubmit');
            }
        },
        getPageSubmitArgs: function () {
            var arr1 = [];
            this.$.user_type.find('.checked').each(function(i,val){
                arr1.push($(val).attr('cb-id'));
            });
            return {
                type: "post",
                data: {id:this.editId,
                    code:this.$.page_code.val(),
                    name:this.$.page_name.val(),
                    port:this.$.page_port.find('.checked').attr('cb-id'),
                    user_type:arr1,
                    age_stage_code:this.$.age_stage.find('.checked').attr('cb-id'),
                    rule_code:this.$.rule.find('.checked').attr('cb-id'),
                    remark:this.$.ad_remark.val(),
                    apply:this.$.apply.find('.checked').attr('cb-id')
                },
                done: cobra.ride(this, function (data) {
                    var title='提交结果';
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
            if(this.$.page_code.val()==''){
                err += '页面编码不能为空!<br/>';
            }
            if(this.$.page_name.val()==''){
                err += '页面名称不能为空!<br/>';
            }
            if(this.$.page_port.find('.checked').length==0){
                err += '请选择页面端口!<br/>';
            }
            if(this.$.user_type.find('.checked').length==0){
                err += '请选择用户类型!<br/>';
            }
            if(this.$.age_stage.find('.checked').length==0){
                err += '请选择年龄分类!<br/>';
            }
            if(this.$.rule.find('.checked').length==0){
                err += '请选择排序规则!<br/>';
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
                    this.request('getDelPageList');
                })
            });
        }
    });
    $(function () {
        new op.page_config();
    });
})(cobra);