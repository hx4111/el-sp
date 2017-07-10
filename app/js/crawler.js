import cheerio from 'cheerio'
import regs from './regs.js'
import request from 'request'

class Crawler {

    async getHtmlByUrl(url) {
        http.get(url, (res) => {
            let resData = ''

            res.on('data', chunk => {
                resData += chunk
            })
            
            await res.on('end', () => {
                return resData
            })

            await res.on('error', (err) => {
                return err
            })
        })
    }

    findPages(obj) {
        let pageList = []
        pageList.push(obj.url)

        let $ = cheerio.load(obj.html)
        let totalPages = $('.next').attr('data-total-pages')
        if (totalPages && totalPages > 1) {
            for (let i = 2; i < pageCnt; i++) {
                pageList.push(homeUrl + 'page/' + i)
            }
        }
        return pageList
    }

    download(url) {
        request.get(postUrl)
            .on('error', (err) => {
                console.info('request error:' + postUrl)
                console.info(err)
            })
            .pipe(fs.createWriteStream())
    }

    downloadDefaultMainPage(obj) {
        let pageList = findPages(obj)
        let pagePostsUrl = []
        pageList.map( pageUrl => {
            getHtmlByUrl(pageUrl).then( html => {
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
            download(postUrl)
        })
    }

    findPersonalPages(obj) {
        let pageList = []
        let archiveUrl = obj.url + 'archive'
        pageList.push(archiveUrl)


        
    }

    findNextPage(obj, pagelist) {
        getHtmlByUrl(obj.url).then( html => {
            let $ = cheerio.load(html)
            let href = $('#next_page_link').attr('href')
            if (/archivebefore_time=(.*?)/.test(href)) {
                if (RegExp.$1) {
                    pagelist.push(obj.url + 'archive' + RegExp.$1)
                }
            } else {
                return pagelist
            }
        })
    }

    downloadPersonalPage(obj) {
        let pageList = findPersonalPages(obj)

    }

    run(url) {
        if (regs.postReg.test(url)) { // single post
            downloadPost(url)
        } else { // main page
            getHtmlByUrl(url).then( html => {
                if (regs.styleDefault.test(html)) { // default style page 
                    downloadDefaultMainPage({ url, html })
                } else { // personal style page
                    downloadPersonalPage({ url, html })
                }
            })
        }
    }
}

export {
    Crawler
}