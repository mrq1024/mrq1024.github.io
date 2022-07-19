const path = require('path')
const {defaultTheme} = require("@vuepress/theme-default")
module.exports = {
    // base:'/blog/',
    title:'mzy1024',
    dest:`dist`,
    // theme: path.resolve(__dirname, './theme/index.js'),
    head: [['link', { rel: 'icon', href: '/images/OIP-C.jpg' }]],
    theme:defaultTheme({
        logo:'/images/OIP-C.jpg',
        locales:{
            lang:'zh-CN',
        },
        contributors:false,
        lastUpdatedText:'上次更新',
        navbar:[
            {
                text:'首页',
                link:'/index.md',
            },
            {
                text:'JavaScript',
                children:[
                    {
                        text:'原生API',
                        link:'/javascript/api/menu.md'
                    },
                    {
                        text:'ES6入门',
                        link:'/javascript/es6/menu.md'
                    },
                    {
                        text:'常用方法',
                        link:'/javascript/methods/menu.md'
                    },
                    {
                        text:'基础部分',
                        link:'/javascript/base/menu.md'
                    },
                ],
            },
            // {
            //     text:'HTML',
            //     link:'/html/index.md'
            // },
            // {
            //     text:'CSS',
            //     link:'/css/index.md'
            // },
            {
                text:'Vue',
                children:[
                    {
                        text:'原理部分',
                        link:'/Vue/core/menu.md'
                    }
                ]
            },
            {
                text:'Kotlin',
                link:'/kotlin/menu.md'
            },
            {
                text:'基本功',
                link:'/algorithm/menu.md'
            },
        ],
        repo:'https://github.com/mrq1024/blog',
        tip:'提示',
        contributorsText:'内容提供',
        backToHome:'首页',
        contributorsText:'创建',
        editLink:false,
    }),
}