import React from 'react'

import { AppBar } from 'material-ui'
import '../less/index.less'

import { Spider } from '../js/spider.js'

export default class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            logs: ''
        }
    }

    componentDidMount() {
        let request = {
            option: {
                url: 'http://www.baidu.com'
            }
        }
        let spider = new Spider(request)
        spider.run().then( res => {
            this.setState({
                logs: res
            })
        })
    }

    render() {
        return (
            <div>
                <AppBar title="spider" />
                {this.state.logs}
            </div>
        )    
    }
}