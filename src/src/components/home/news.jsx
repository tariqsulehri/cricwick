import React, { Component } from 'react';

class News extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        const { news } = this.props;
        return (
                <ul>
                    {news.data.map((news, i) => (
                        <li key={news.id} style={{ marginLeft: 0, padding: 0 }}>{news.title}</li>
                    ))}
                </ul>
        );
    }
}
export default News;