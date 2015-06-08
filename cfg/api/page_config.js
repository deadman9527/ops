/****************************************************************************
 Copyright (c) 2014 Louis W M Wu

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
cobra.add({
    /* 用户类型配置 */
    "getPageList" : {
        url : "/m.php?m=PmsWebConfig&a=getWebConfigList",
        dev_url : "../../../stub/page_list.json"
    },
    /* 删除用户类型 */
    "getDelPageList" : {
        url : "/m.php?m=PmsWebConfig&a=delete",
        dev_url : "../../../stub/del_page_list.json"
    },
/*    "getPageDetail" : {
        url : "/page_detail.html",
        dev_url : "../../../stub/page_detail.json"
    },*/
    "getPageSubmit" : {
        url : "/m.php?m=PmsWebConfig&a=edit",
        dev_url : "../../../stub/page_submit.json"
    },
    "getFullList" : {
        url : "/m.php?m=PmsAdv&a=getUserAgeList",
        dev_url : "../../../stub/full_list.json"
    }
});