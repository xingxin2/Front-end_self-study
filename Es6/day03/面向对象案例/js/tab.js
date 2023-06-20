 let that;
class Tab {
    constructor(id) {
        // 获取元素
        that = this;
        this.main = document.querySelector(id);
        // 将获取li和section单独获取出来封装在一个新的函数里
        // this.lis = this.main.querySelectorAll('li');
        // this.sections = this.main.querySelectorAll('section');
        this.add = this.main.querySelector('.tabadd');   //获取➕
        // li 的父元素获取
        this.ul = this.main.querySelector('.fisrstnav ul:first-child');
        //section 的父元素获取
        this.tabscon = this.main.querySelector('.tabscon');
        //定义要放在调用前
        this.init();
    }
    // 初始化
    init() {
        this.updateNode();
        //加号➕初始化不需要循环，放在循环外边
        this.add.onclick = this.addTab;
        // 初始化操作让相关元素绑定事件
        for (let i = 0; i < this.lis.length; i++) {
            this.lis[i].index = i;
            this.lis[i].onclick = this.toggleTab;
            this.remove[i].onclick = this.removeTab;
            this.spans[i].ondblclick = this.editTab;
            this.sections[i].ondblclick = this.editTab;

        }
    }
    updateNode() {
        // 获取多个元素都放在这个函数里面
        this.lis = this.main.querySelectorAll('li');
        this.sections = this.main.querySelectorAll('section');
        // 获取所有的叉叉
        this.remove = this.main.querySelectorAll('.icon-guanbi');
        this.spans = this.main.querySelectorAll('.fisrstnav li span:first-child');
        this.tabscons = this.main.querySelectorAll('.fisrstnav li span:first-child');

    }
    // 1.切换功能
    toggleTab() {
        // console.log(this.index);
        //排他思想，清除放在上面
        that.clearClass();  //要用that
        this.className = 'liactive';
        that.sections[this.index].className = 'conactive';
    }
    //清除其他人的className
    clearClass() {
        for (let i = 0; i < this.lis.length; i++) {
            this.lis[i].className = '';
            this.sections[i].className = '';

        }
    }
    // 2.增加功能
    addTab() {

        that.clearClass();
        // console.log('➕');
        // 1.创建li元素和section元素
        let li = `<li class="liactive"><span>测试</span><span class="iconfont icon-guanbi"></span></li>`;
        let section = `<section class="conactive">测试</section>`;
        // 2.把这两个元素追加到对应的父元素当中去
        that.ul.insertAdjacentHTML('beforeend', li);
        that.tabscon.insertAdjacentHTML('beforeend', section);
        that.init();
    }
    // 3.删除功能
    removeTab(e) {
        e.stopPropagation();                //取消冒泡，防止点击×的时候进行切换操作
        let index = this.parentNode.index;
        // console.log(index);
        // 删除索引号对应的li和section
        that.lis[index].remove();        
        that.sections[index].remove();        
        that.init();
        // 当我们删除的不是选中状态的li的时候，原先的li保持不变
        if(document.querySelector('.liactive')) return;
        // 当我们删除了选中状态这个li的时候，让它的前一个li处于选中状态
        index--;
        //手动调用点击事件，不需要鼠标触发
        //&&如果前面的为真才执行后面的，如果前面为假就不执行
        that.lis[index] && that.lis[index].click();
    }
    // 4.修改功能
    editTab() { 
        // 先获取选中文本框前的文字
        let str = this.innerHTML;
        // console.log('选中');
        //双击禁止选中文字
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        this.innerHTML = '<input type="text" />';
        let input = this.children[0];
        input.value = str;
        input.select();
        input.onblur = function(){
            this.parentNode.innerHTML = this.value;
        };
        input.onkeyup = function(e){
            if(e.key === "Enter"){
                this.parentNode.innerHTML = this.value;
            }
        };
        
    }
}
new Tab('#tab');