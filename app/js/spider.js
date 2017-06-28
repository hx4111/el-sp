import request from 'request'
import cheerio from 'cheerio'

class Spider {
    constructor({option, data = null}) {
        this.option = option
        this.data = data
    }

    run() {
        return new Promise((resolve, reject) => {
            request('http://news.shu.edu.cn/Default.aspx?tabid=446',function(err,result){
                if(err){
                    console.log(err);
                }
                console.log(result.body);
            })
            /*request(this.option.url, (err, res, body) => {
                console.info('request of ' + this.option.url)
                console.error(err)
                console.info(res)
                console.info(body)
                resolve(body)
            })*/
        })
    }
}

export {
    Spider
}