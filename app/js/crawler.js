import cheerio from 'cheerio'
import regs from './regs.js'
import request from 'request'

class Crawler {

    getHtmlByUrl(url) {
        return new Promise((resolve, reject) => {
            http.get(url, (res) => {
                let resData = ''

                res.on('data', chunk => {
                    resData += chunk
                })
                res.on('end', () => {
                    resolve(resData)
                })
            })
        }) 
    }

    findPages(homeUrl) {
        let pageList = []
        pageList.push(homeUrl)

        return getHtmlByUrl(homeUrl).then( html => {
            regs.defaultPages.test(html)
            let pageCnt = RegExp.$1
            if (pageCnt && pageCnt > 2) {
                for (let i = 2; i < pageCnt; i++) {
                    pageList.push(homeUrl + 'page/' + i)
                }
            }
            return pageList
        })
    }

    downloadDefaultMainPage(url) {
        findPages(url).then( pageList => {
            let pagePostsUrl = []
            pageList.map( itemUrl => {
                getHtmlByUrl(itemUrl).then( html => {
                    let $ = cheerio.load(html)
                    $('.meta-item .post-date').each( (index, ele) => {
                        let href = $(ele).attr('href')
                        if (href) {
                            pagePostsUrl.push(href)
                        }
                    })
                })
            })
            pagePostsUrl.map( postUrl => {
                request.get(postUrl)
                    .on('error', (err) => {
                        console.info('request error:' + postUrl)
                        console.info(err)
                    })
                    .pipe(fs.createWriteStream())
            })
        })
    }

    run(url) {
        if (regs.postReg.test(url)) { // single post
            downloadPost(url)
        } else { // main page
            getHtmlByUrl(url).then( html => {
                if (regs.styleDefault.test(html)) { // default style page 
                    downloadDefaultMainPage(url)
                } else { // personal style page
                    downloadPersonalPage(url)
                }
            })
        }
    }
}

export {
    Crawler
}