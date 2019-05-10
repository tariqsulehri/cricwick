import React, { Component } from 'react';
import http from "superagent";
import config from "../../config.json";

class videoDropDown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            isLoaded: false,
            hasMore: true,
            error: null,
            tags: [],
            handleClick: this.props.handleClick,
        };
    }

    componentDidMount = async () => {
        await this.loadTags();
    };

    loadTags = async () => {
        //Required URL :  https://back.cricwick.net/api/v2/user_api/get_tag_options_by_match?match_id=undefined&telco=mobilink
        const Url = config.apiEndPoint
            + '/v2/user_api/get_tag_options_by_match?'
            + 'match_id=undefined'
            + '&telco=' + config.telco

        console.log(Url);

        await http
            .get(Url)
            .set('Accept', 'application/json')
            .then(res => {
                this.setState({
                    isLoading: false,
                    isLoaded: true,
                    tags: res.body,
                });

            }).catch(error => {
                this.setState({
                    isLoaded: false,
                    error: error
                });

            })
    }

    render() {
        const { tags, isLoading, error, handleClick } = this.state;
        if (error) {
            return <div> Error : {error.message} </div>;
        } else if (isLoading) {
            return (<div></div>);
        } else {
            return (
                <div className="dropdown" >
                    <button id="dropdownMenuButton" className="btn btn-primary dropdown-toggle dropdown-button" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        HighLights  <span className="caret pl-2" />
                    </button>
                    <ul className="dropdown-menu dropdown-menu" aria-labelledby="dropdownMenuButton" onClick={handleClick}>
                        {tags.tags.map((tag, i) => (
                            <li key={i} className='dropdown-item' href="https:/" id={tag.id}>{tag.label}</li>
                        ))}
                    </ul>
                </div>
            );
        }
    }
}

export default videoDropDown;
