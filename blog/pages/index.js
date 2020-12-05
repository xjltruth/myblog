import React,{useState} from 'react'
import Head from 'next/head'
import { Row, Col, List, Icon,Affix, Spin } from 'antd'
import axios from 'axios'
import Header from '../components/Header'
import '../static/style/pages/index.css'
import Author from '../components/Author'
import Footer from '../components/Footer'
import Link from 'next/link'

import servicePath from '../config/apiUrl'

import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';

const Home = (list) => {
    
    const renderer = new marked.Renderer();
    marked.setOptions({
      renderer: renderer,
      gfm: true,
      pedantic: false,
      sanitize: false,
      tables: true,
      breaks: false,
      smartLists: true,
      smartypants: false,
      sanitize:false,
      xhtml: false,
      highlight: function (code) {
              return hljs.highlightAuto(code).value;
      }
  
    }); 

    // console.log(list)
    //---------主要代码-------------start
    const [ mylist , setMylist ] = useState( list.data);
    //---------主要代码-------------end
    const [loading, setLoading] = useState(false)
    const goLoading= ()=>{

        setLoading(true)
      }
    return (
        <div>
            <Head>
                <title>首页 | 技术改变生活-许加路个人博客</title>
                <link rel="icon" href="../static/lu.PNG" mce_href="../static/lu.PNG"  / >
            </Head>
            <Affix offsetTop={0}>
                <Header />
            </Affix>
            <Row className="comm-main" type="flex" justify="center">
                <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
                    <div>
                        <List
                            header={<div >全部文章</div>}
                            itemLayout="vertical"
                            dataSource={mylist}
                            renderItem={item => (
                                <List.Item>
                                    <Spin spinning={loading}>
                                    <div className="list-title" onClick={goLoading}>
                                        <Link href={{ pathname: '/detailed', query: { id: item.id } }}>
                                            <a>{item.title}</a>
                                        </Link>
                                    </div>
                                    <div className="list-icon">
                                        <span><Icon type="calendar" /> {item.addTime}</span>
                                        <span><Icon type={item.icon} /> {item.typeName}</span>
                                        {/* <span><Icon type="fire" /> {item.view_count}</span> */}
                                    </div>
                                    <div className="list-context"
                                    dangerouslySetInnerHTML={{__html:marked(item.introduce)}}
                                    >                                      
                                    </div>
                                    </Spin>
                                </List.Item>
                                
                                
                            )}
                        />
                    </div>
                </Col>

                <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
                    <Author />
                </Col>
            </Row>
            <Footer />
        </div>

    )
}
Home.getInitialProps = async ()=>{
    const promise = new Promise((resolve)=>{
      axios(servicePath.getArticleList).then(
        (res)=>{
          //console.log('远程获取数据结果:',res.data.data)
          resolve(res.data)
        }
      )
    })
  
    return await promise
  }

export default Home