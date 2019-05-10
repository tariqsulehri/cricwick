import React, { Component } from 'react';
import request from 'superagent';
import {Link} from 'react-router-dom';
import config  from '../../config.json';
import VideoCard from '../common/videoCard';

class Archives extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            isLoaded: false,
            isLoading: false,
            hasMore: true,
            selectedType : this.props.selectedType,
            seriesData: [],
            baseUrl: config.apiEndPoint,
            telco  : config.telco,
            page: 1,
            perPage: 5,
        };

    }

    componentDidMount = async () => {
        await this.loadSeriesRecords();
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    loadSeriesRecords = async () => {
        const { page, perPage, baseUrl, telco, seriesData } = this.state;

        let Url = '';
        // 1) Featured Videos :
        //    Base URL =  https://back.cricwick.net/api/v1
        //    Composed =  /video/get_by_video_type/archive/1/5?telco=mobilink
        
       Url = baseUrl + "/v1/video/"
            + "get_by_video_type/"
            + "archive/"
            + page
            + "/"
            + perPage
            + "?" 
            + "telco=" + telco

        await request
            .get(Url)
            .set('Accept', 'application/json')
            .then(res => {
                this.setState(()=>{
                    return{
                        isLoaded: true,
                        isLoading: false,
                        seriesData: [...seriesData ,...res.body.videos],
                        hasMore: (res.body.videos.length < perPage)
                    }
                })

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
        const offset = (document.documentElement.scrollTop + window.innerHeight);
        const height = document.documentElement.offsetHeight;
        
        //  console.log("offset : ", Math.ceil(offset));
        //  console.log("height : ", height);

        if (!hasMore) {
            //console.log("offset : ", Math.ceil(offset));
            if (Math.ceil(offset) === height) {
                console.log("Inside Scroll");
                
                await this.setState({ page: this.state.page + 1 });
                await this.loadSeriesRecords();
                
                console.log("HasMore : ", hasMore, " Page:", page);
            }
        } else {
            console.log('End of list....');
        }
    }

    render() {
        const { error, isLoaded, seriesData, selectedType } = this.state;
        const {match} =  this.props;

        if (error) {
            return (<div> Error : {error.message}</div>);
        } else if (!isLoaded) {
            return (<div> Loading Data.... </div>);
        } else {
            //------------------------------------------------------------------- 
            return (
                <div onScroll={this.handleScroll}>
                    {seriesData.map((video, i) => (
                        <Link key={i} to={`${match.url}/${video.id}`}>
                           <VideoCard video={video} left_Col={3} right_Col={9} />
                        </Link>
                    ))}
                </div>
            )
        }
    }
}

export default Archives;
