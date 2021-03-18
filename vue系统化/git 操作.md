Git 

https://juejin.im/post/6844903895160881166

git clone 慢

将地址连接中的 github.com 替换为 github.com.cnpmjs.org

提交步骤

https://zybuluo.com/wangwangheng/note/53297

0、git pull 每次修改之前更新代码；

git stash // 有冲突时，暂存更改,可选，

git stash apply // 解决完冲突，可选，还原更改

1、git status // 列出有哪些更改

2、git add . 添加全部 或者 git add 文件名 ：添加单独文件

3、git commit -a -m “备注”

git fetch 可选

4、git pull —-rebase

​	4.1 如果有冲突，解决完冲突之后，先执行git add . ,在执行git rebase —continue,

   	   git reabse —continue 会自动完成git commit ，所以不用手动执行git commit 

5、git push 

· git add -A  提交所有变化

· git add -u  提交被修改(modified)和被删除(deleted)文件，不包括新文件(new)

· git add .  提交新文件(new)和被修改(modified)文件，不包括被删除(deleted)文件


本地git操作出现443，将全局的地址修改为
>  git config --global remote.origin.url "https://github.com.cnpmjs.org/JJFranklin/FE_markdown.git"


core.quotepath=false
user.email=JJFranklin@https://github.com
user.name=JJFranklin
remote.origin.url=https://github.com.cnpmjs.org/JJFranklin/FE_markdown.git
http.sslbackend=openssl