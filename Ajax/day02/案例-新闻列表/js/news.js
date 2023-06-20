$(function () {

    

    // 定义时间格式化的过滤器
    template.defaults.imports.dateFormat = function(dtStr){
        let date = new Date(dtStr)
        let y = date.getFullYear()
        let m = date.getMonth() + 1
        let d = date.getDate()
        let hh = date.getHours()
        let mm = date.getMinutes()
        let ss = date.getSeconds()


        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm +':'+ ss

    }

    //获取新闻列表的函数
    function getNewList() {
        $.get('http://www.liulongbin.top:3006/api/news',
            function (res) {
                if (res.status !== 200) {
                    return alert('获取新闻列表数据失败')
                }
                for (let i = 0; i < res.data.length; i++) {
                    //把每一项的tags属性，从字符串改造成字符串的数组
                    res.data[i].tags = res.data[i].tags.split(',')
                }
                console.log(res);
                let htmlStr = template('tpl-news', res)
                $('#news-list').html(htmlStr)
            })
    }
    getNewList()

})