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
        "~name": "op.usertype_config",

        "~superclass": cb.base,

        ctor: function (options) {
            this.api = "usertype_config";
            this._super(options);
        },
        postCreate: function () {
            this.$.side_menu.metisMenu();
            this.request("getUserTypeList");
        },
        getUserTypeListArgs: function () {
            return {
                type: "post",
                data: {userKey:this.$.userKey.val(),
                       pageId:this.pageId
                },
                done: cobra.ride(this, function (data) {
                    $.when(this.compile(this.$.usertype_list, "usertype_config>usertype_list", data)).done(cobra.ride(this, function(){
                        this.compile(this.$.pagination, "usertype_config>pagination", data);
                        this.$.loading.hide();
                    }));
                }),
                fail: function (data) {
                    this._msgBox.warn(data.responseBody.responseInfo.reasons.msg);
                }
            };
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
        searchResult:function(){
            this.$.loading.show();
            this.request('getUserTypeList');
        },
        goToDelete:function(userid){
            this.userid = userid;
            this.showPopupBox();
        },
        goToEdit:function(id){
            this.editId = id;
            this.request('getUserTypeDetail');
        },
        getDelUserTypeListArgs: function () {
            return {
                type: "post",
                data: {id:this.userid
                },
                done: cobra.ride(this, function (data) {
                    /*$.when(this.compile(this.$.usertype_list, "usertype_config>usertype_list", data)).done(cobra.ride(this, function(){
                    }));*/
                    this._msgBox.info('删除成功！');
                    this.request('getUserTypeList');
                }),
                fail: function (data) {
                    this._msgBox.warn(data.responseBody.responseInfo.reasons.msg);
                }
            };
        },
        getUserTypeDetailArgs: function () {
            return {
                type: "post",
                data: {id:this.editId
                },
                done: cobra.ride(this, function (data) {
                   var data = data.data;
                   if(data){
                       this.$.user_code.val(data.code);
                       this.$.type_name.val(data.type);
                       this.validateCheckedVal('port',data.port);
                       this.validateCheckedVal('pc_first',data.pc_first);
                       this.validateCheckedVal('mob_first',data.mob_first);
                       this.validateCheckedVal('pc_ag',data.pc_ag);
                       this.validateCheckedVal('mob_ag',data.mob_ag);
                       this.validateCheckedVal('apply',data.apply);
                       this.$.usertype_title.text('修改用户类型');
                       this.$.new_add.show();
                   }else{
                   this._msgBox.warn('没有返回用户类型信息');
                   }
                }),
                fail: function (data) {
                    this._msgBox.warn(data.responseBody.responseInfo.reasons.msg);
                }
            };
        },
        newAddUserType:function(){
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
        showHover:function(n,ele){
            if(n=='1'){
                ele.addClass('hover');
            }else{
                ele.removeClass('hover');
            }
        },
        checkSelectEvent:function(name, val){
            var ele = arguments[arguments.length - 1];
            ele.toggleClass('checked');
            var sc = ele.closest('.radio').siblings().find('.checked');
            sc.removeClass('checked');
            if(ele.hasClass('checked')){
                this[name] = val;
            }else{
                this[name] = '';
            }
        },
        submitNewAdd:function(){
            if(this.validateEditForm()){
                this.request('getUserTypeSubmit');
            }
        },
        goPage:function(pageId){
            this.pageId = pageId;
            this.request('getUserTypeList');
        },
        getUserTypeSubmitArgs: function () {
            return {
                type: "post",
                data: {id:this.editId,
                    code:this.$.user_code.val(),
                    type:this.$.type_name.val(),
                    port:this.$.port.find('.checked').attr('cb-id'),
                    pc_first:this.$.pc_first.find('.checked').attr('cb-id'),
                    mob_first:this.$.mob_first.find('.checked').attr('cb-id'),
                    pc_ag:this.$.pc_ag.find('.checked').attr('cb-id'),
                    mob_ag:this.$.mob_ag.find('.checked').attr('cb-id'),
                    apply:this.$.apply.find('.checked').attr('cb-id')
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
                    //this._msgBox.info('提交成功！');
                    //window.location.reload();
                }),
                fail: function (data) {
                    this._msgBox.warn(data.responseBody.responseInfo.reasons.msg);
                }
            };
        },
        /*删除时的弹出框 */
        showPopupBox:function(){
            this.popup_dialog = new cobra.modal({
                title : '删除年龄类型',
                tip : '',
                content : '<div class="ibox-content"><p style="text-align: center;">确定要删除该年龄类型吗？</p></div>',
                confirm : cobra.ride(this, function(){
                    this.request('getDelUserTypeList');
                })
            });
        },
        validateEditForm:function(){
            var err='';
            if(this.$.user_code.val()==''){
                err += '用户编码不能为空!<br/>';
            }
            if(this.$.type_name.val()==''){
                err += '类型名称不能为空!<br/>';
            }
            if(this.$.port.find('.checked').length==0){
                err += '请选择注册端口!<br/>';
            }
            if(this.$.pc_first.find('.checked').length==0){
                err += '请选择PC首单!<br/>';
            }
            if(this.$.mob_first.find('.checked').length==0){
                err += '请选择移动首单!<br/>';
            }
            if(this.$.pc_ag.find('.checked').length==0){
                err += '请选择PC复购!<br/>';
            }
            if(this.$.mob_ag.find('.checked').length==0){
                err += '请选择移动复购!<br/>';
            }
            if(this.$.apply.find('.checked').length==0){
                err += '请选择是否启用!<br/>';
            }
            if (err && err!=''){
                this._msgBox.warn(err);
                return false;
            }else{
                return true;
            }
        }

    });
    $(function () {
        new op.usertype_config();
    });
})(cobra);