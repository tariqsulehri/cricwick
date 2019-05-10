import React, { Component } from 'react';
import Moment    from 'moment';
import Loading   from '../common/loading';
import http      from '../../services/httpService';
import config  from '../../config.json';
// import DetailedNews from './detailedNews';
import  { Link }  from "react-router-dom";
import {toast}   from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import '../../assets/css/videos/videos.css';
import '../../assets/css/common/videoCards.css'

class LatestNews extends Component {

    constructor(props) {
        super(props)
        // console.log( "Latest News : ", this.props);
        this.state = {
            error: null,
            isLoaded: false,
            isLoading: false,
            hasMore: true,
            seriesData: [],
            page: 1,
            perPage: 5,
            news_id: this.props.id,
            selectedType: this.props.selectedType,
            news: [],
            showFull: false,
            baseUrl: config.apiEndPoint,
            telco : config.telco,
        }

    }

    componentDidMount = async () => {
        window.addEventListener('scroll', this.handleScroll);
        await this.loadSeriesRecords();
        if (this.state.news_id > 0) {
            await this.loadSelectedNews();
        }
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    loadSeriesRecords = async () => {
        const { page, perPage, baseUrl } = this.state;

        // 1) All Videos :
        //    Base URL =  https://back.cricwick.net/api/news?page=1&page_size=6
        //    Composed =  /news?page=1&page_size=5

        let Url = baseUrl
            + '/'
            + 'news'
            + '?'
            + 'page=' + page
            + '&'
            + 'page_size='
            + perPage

        console.log("Latest News ",Url);

        try {
            const { data } = await http.get(Url);
            this.setState(() => {
                return {
                    isLoaded:   true,
                    isLoading:  false,
                    seriesData: data.data,
                    hasMore: (data.data.length < perPage)
                }
            });
        } catch (ex) {
            if (ex.response && ex.response.status === 404) {
                toast.error("Errror : ",ex.response.message);
            }
            this.setState({
                isLoaded: false,
                error: ex,
            });
        } 
            
        // await request
        //     .get(Url)
        //     .set('Accept', 'application/json')
        //     .then(res => {
        //         this.setState(() => {
        //             return {
        //                 isLoaded: true,
        //                 isLoading: false,
        //                 seriesData: res.body,
        //                 hasMore: (res.body.length < perPage)
        //             }
        //         });
        //     })
        //     .catch(error => {
        //         this.setState({
        //             isLoaded: false,
        //             error
        //         });
        //     });
    }

    handleScroll = async () => {
        const { hasMore, page } = this.state;

        let offset = (document.documentElement.scrollTop + window.innerHeight);
        let height = document.documentElement.offsetHeight;

        // console.log(height, "  = ", Match.ceil(offset));

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

    hideDetail = () => {
        this.setState((prevState) => {
            return {
                showFull: false,
                news_id: 0,
                news: []
            }
        });
    }

    render() {
        const { isLoaded, error, seriesData } = this.state;

        if (error) {
            return (<div> Error : {error.message}</div>);
        } else if (!isLoaded) {
            return (<Loading />);
        } else {
            return (
                <div onScroll={this.handleScroll}>
                    {seriesData.map((news, i) => (
                        <div key={news.id} className="flex-d">
                            <Link to={`/stories/news/${news.id}`}>
                                <div className="card border-light shadow-sm bg-white rounded mb-2 p-2">
                                    <div className='card-body p-0'>
                                        <div className='container'>
                                            <div className='row'>
                                                <div className='col-3 card-col-for-image'>
                                                    <img className='card-image-small'
                                                        src={news.image}
                                                        alt="no Iamge" />
                                                </div>

                                                <div className='col-9 card-col-for-text'>
                                                    <span className='cardsmall-col-sub-heading-gray'> {news.series_name} </span>
                                                    <span className='cardsmall-col-sub-heading-gray' style={{ float: 'right' }}>
                                                        {Moment(new Date(news.created_at)).format("DD MMM,YYYY")}
                                                    </span>

                                                    <h6 className='cardsmall-col-sub-heading-black'>
                                                        {news.title}
                                                    </h6>
                                                    <div className='cardsmall-col-bodytext-black pt-1'>
                                                        <span dangerouslySetInnerHTML={{ __html: news.body.substr(5, 200) }} />
                                                    </div>

                                                    {!isLoaded && <Loading />}

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

export default LatestNews;