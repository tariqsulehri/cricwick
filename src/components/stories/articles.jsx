import React, { Component } from 'react';
import Match from 'mathjs';
import Moment from 'moment';
import { Link } from "react-router-dom";
import Loading from "../common/loading";

import http      from '../../services/httpService';
import config  from '../../config.json';

import {toast}   from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import '../../assets/css/common/videoCards.css'

class Articles extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            isLoaded: false,
            isLoading: false,
            hasMore: true,
            seriesData: [],
            page: 1,
            perPage: 5,
            baseUrl: config.apiEndPoint,
            telco : config.telco,
        }
    }

    componentDidMount = async () => {
        window.addEventListener('scroll', this.handleScroll);
        await this.loadSeriesRecords();
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }


    loadSeriesRecords = async () => {
        const { page, perPage, baseUrl, seriesData } = this.state;

        // 1) All Videos :
        //    Base URL =   https://back.cricwick.net/api 
        //    Composed =  /articles?page=1&page_size=6


        let Url = baseUrl
            + '/'
            + 'articles'
            + '?'
            + 'page=' + page
            + '&'
            + 'page_size='
            + perPage

        console.log(Url);

        try {
            const { data } = await http.get(Url);
            this.setState(() => {
                return {
                    isLoaded: true,
                    isLoading: false,
                    seriesData: data.data,
                    hasMore: (data.data.length < perPage)
                }
            });
        } catch (ex) {
            if (ex.response && ex.response.status === 404) {
                toast.error("Errror : ", ex.response.message);
            }
            this.setState({
                isLoaded: false,
                error: ex,
            });
        }
    }

    handleClikc = (article) => {
        this.setState({
            showFull: true, article
        });
    }

    hideDetail = () => {
        this.setState({
            showFull: !this.state.showFull
        });
    }


    handleScroll = async () => {
        const { hasMore, page } = this.state;

        let offset = (document.documentElement.scrollTop + window.innerHeight);
        let height = document.documentElement.offsetHeight;

        console.log(height, "  = ", Match.ceil(offset));

        if (Math.ceil(offset) === height) {
            console.log("Inside Scroll");
            if (!hasMore) {
                //console.log("offset : ", Math.ceil(offset));
                await this.setState((prevState) => { return { page: prevState.page + 1 } });
                await this.loadSeriesRecords();
                console.log("HasMore : ", hasMore, " Page:", page);
            }
            else {
                console.log('End of list....');
            }
        }
    }

    render() {
        const { isLoaded, error, seriesData, showFull, article } = this.state;

        if (error) {
            return (<div> Error : {error.message}</div>);
        } else if (!isLoaded) {
            return (<Loading />);
        } else {
            return (
                <div onScroll={this.handleScroll}>
                    {/* <div hidden={!showFull} onClick={() => this.hideDetail()}>
                        <DetailedNews news={article} />
                    </div> */}
                    {seriesData.map((article, i) => (
                        <div key={article.id} className="flex-d" >
                            <Link to={`/stories/articles/${article.id}`}>
                                <div className="card mb-1 p-2">
                                    <div className='card-body p-0'>

                                        <div className='container' >
                                            <div className='row'>
                                                <div className='col-3 card-col-for-image'>
                                                    <img className='card-image-small'
                                                        src={article.image}
                                                        alt="no Iamge" />
                                                </div>

                                                <div className='col-9 card-col-for-text'>
                                                    <h4 className='cardsmall-col-sub-heading-gray'>
                                                        {article.series_name}
                                                    </h4>

                                                    <h4 className='cardsmall-col-sub-heading-gray'>
                                                        {Moment(new Date(article.created_at)).format("DD MMM,YYYY")}
                                                    </h4>

                                                    <h6 className='card-video-title-text' >
                                                        {article.title}
                                                    </h6>
                                                    <p className='cardsmall-col-bodytext-black'>
                                                        {article.body.substr(5, 200)}
                                                    </p>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            );
        }
    }
}

export default Articles;