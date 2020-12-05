import {Avatar,Divider, Icon,Tooltip} from 'antd'
import '../static/style/components/author.css'

const Author =()=>{

    return (
        <div className="author-div comm-box">
            <div> <Avatar size={100} src="/static/author.jpg" /></div>
            <span className="header-logo">许加路</span><br/><br/>
            <div className="author-introduction">
                致力于云计算行业<br/><Icon type="environment"/>北京&nbsp;&nbsp;&nbsp;中石油数据中心
                <Divider>社交账号</Divider>
                <Tooltip title="https://github.com/xjltruth">
                    <a href="https://github.com/xjltruth" target="_blank">
                        <Avatar size={28} icon="github" className="account" />
                    </a>
                </Tooltip>
                
                <Tooltip title="twitter:@xjltruth">
                    <Avatar size={28} icon="twitter" className="account" />
                </Tooltip>

                <Tooltip title="wechat:xjltruth">
                    <Avatar size={28} icon="wechat" className="account" />
                </Tooltip>
                

            </div>
        </div>
    )

}

export default Author