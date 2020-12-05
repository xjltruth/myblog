let ipUrl = 'http://xjlblog.cpolar.cn/admin/' 

let servicePath = {
    getArticleById:ipUrl + 'getArticleById/' ,  //  根据ID获得文章详情
    delArticle:ipUrl + 'delArticle/' ,  //  删除文章
    getArticleList:ipUrl + 'getArticleList' ,  //  文章列表 
    getTypeInfo:ipUrl + 'getTypeInfo' ,  //  获得文章类别信息
    addArticle:ipUrl + 'addArticle' ,  //  添加文章
    updateArticle:ipUrl + 'updateArticle' ,  //  修改文章第api地址
    checkLogin:ipUrl + 'checkLogin' ,  //  检查用户名密码是否正确
}

export default servicePath;