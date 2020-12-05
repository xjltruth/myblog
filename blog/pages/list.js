import React,{useState,useEffect} from 'react'
import Head from 'next/head'
import {Row, Col , List ,Icon ,Breadcrumb,Affix,Spin  } from 'antd'
import Header from '../components/Header'
import Author from '../components/Author'
import Footer from '../components/Footer'
import '../static/style/pages/list.css'
import axios from 'axios'
import  servicePath  from '../config/apiUrl'
import Link from 'next/link'

import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';


const MyList = (list) =>{

  const [mylist, setMylist] = useState(list.data);
  const [loading, setLoading] = useState(false)
    const goLoading= ()=>{

        setLoading(true)
      }
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
  
  useEffect(()=>{
    setMylist(list.data)
   })

  return (
    <>
      <Head>
        <title>{list.data[0].typeName} | 技术改变生活-许加路个人博客</title>
        <link rel="icon" href="../static/lu.PNG" mce_href="../static/lu.PNG"  / >
      </Head>
      <Affix offsetTop={0}>
        <Header />
      </Affix>
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
            <div>
              <div className="bread-div">
                <Breadcrumb>
                  <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                  <Breadcrumb.Item>{list.data[0].typeName}</Breadcrumb.Item>
                </Breadcrumb>
              </div>

            <List
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
                    <span><Icon type="calendar" />{item.addTime}</span>
                    <span><Icon type={item.icon} /> {item.typeName}</span>
                    {/* <span><Icon type="fire" />  {item.view_count}人</span> */}
                  </div>
                  <div className="list-context"
                    dangerouslySetInnerHTML={{ __html: marked(item.introduce) }}
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
      <Footer/>

   </>
  )

} 

MyList.getInitialProps = async (context)=>{

  let id =context.query.id
  const promise = new Promise((resolve)=>{
    axios(servicePath.getListById+id).then(
      (res)=>resolve(res.data)
    )
  })
  return await promise
}

export default MyList
