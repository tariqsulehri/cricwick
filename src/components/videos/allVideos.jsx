import React, { Component } from 'react';
//import http from '../../services/httpService';
import Match from 'mathjs';
import {Link} from 'react-router-dom';
import request from 'superagent';
import Loading from '../common/loading';
import config  from '../../config.json';
import CardImage from '../common/cardImage';

class AllVideos extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            isLoaded: false,
            isLoading: false,
            hasMore: true,
            seriesData: [],
            selectedType: 'All_Videos',
            baseUrl: config.apiEndPoint,
            telco  : config.telco,
            page: 1,
            perPage: 5
        };

    }

    componentDidMount = async () => {
        window.addEventListener('scroll', this.handleScroll);
        await this.loadSeriesRecords();
    }

    componentWillUnmount(){
      window.removeEventListener('scroll', this.handleScroll);
    }

    loadSeriesRecords = async () => {
        const { page, perPage, baseUrl, seriesData,  telco } = this.state;
        //https://back.cricwick.net/api/v1/user_api/get_new_series?page=1&per_page=5&telco=mobilink
        //Show All Videos : https://back.cricwick.net/api/v1/user_api/get_videos_by_series?series_id=350&page=1&tag_id=27&per_page=10&telco=mobilink

        let Url = '';
        // 1) All Videos :
        //    Base URL =  https://back.cricwick.net/api/v1
        //    Composed =  /user_api/get_new_series?page=1&per_page=5&telco=mobilink

        Url = baseUrl + "/v1/user_api/"
            + "get_new_series"
            + "?"
            + "page="
            + page
            + "&"
            + "per_page=" + perPage
            + "&telco=" + telco

        // try {
        //     const { data } = await http.get(Url);
        //     this.setState({
        //         seriesData : data 
        //     })
        //     console.log(this.state.seriesData);
        // } catch (ex) {
        //     alert("Bad Request......", ex);
        // }
   
        console.log(Url);

        await request
            .get(Url)
            .set('Accept', 'application/json')
            .then(res => {
                this.setState(()=>{
                    return{
                        isLoaded: true,
                        isLoading: false,
                        seriesData: [...seriesData, ...res.body.series],
                        hasMore: (res.body.length < perPage)
                    }
                });

            })
            .catch(error => {
                this.setState(()=>{
                    return{
                        isLoaded: false,
                        error
                    }
                });
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
        const { error, isLoaded, seriesData } = this.state;
        if (error) {
            return (<div> Error : {error.message}</div>);
        } else if (!isLoaded) {
            return (<Loading/>);
        } else {
            //------------------------------------------------------------------- 
            return (
 
                
                <div onScroll={this.handleScroll}>
                    {seriesData.map((series, i) => (
                        <div key={i} className='card p-2 border-0'>
                            <div>
                                <Link to={`/series/${series.id}/${series.title.replace(/\s+/g, '-')}/videos`}>
                                    <span className='cardsmall-col-heading-gray'> {series.title}</span>
                                    <span className='cardsmall-col-heading-gray' style={{ float: 'right' }}> Show All </span>
                                </Link>
                            </div>
                            <hr/>

                            <div className='card-columns'>
                                {series.videos.slice(0, 3).map((video, i) => (
                                    <div key={i}>
                                       <Link to={`/series/${series.id}/${series.title.replace(/\s+/g,'-')}/videos/${video.video.id}`}>
                                             <CardImage image={video.video.thumb} title={video.video.match_obj.title} detail={video.video.title} />
                                       </Link>
                                    </div>
                                ))}
                            </div>
                            <hr/>
                        </div>
                    ))}
                </div>
            )
        }
    }
}

export default AllVideos;

