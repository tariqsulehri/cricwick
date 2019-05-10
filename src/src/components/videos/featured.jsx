import React, { Component } from 'react';
import config from "../../config.json";
import {Link} from 'react-router-dom';
import Loading from "../common/loading";
import request from 'superagent';
import OtherVideoCardLink from '../videos/otherVideoCardLink';
import '../../assets/css/videos/videos.css';

class Featured extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            isLoaded: false,
            isLoading: false,
            hasMore: true,
            seriesData: [],
            selectedType: this.props.selectedType,
            baseUrl: 'https://back.cricwick.net/api/v1',
            page: 1,
            perPage: 5,
            telco: config.telco,
            video: [],
            tag_id: 27,
            video_id: '',
            videoFile: '',
            title: '',
            matchDesc: '',
            showVideo: false,
        };
        // this.handleChange = this.handleChange.bind(this);
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
        //    Composed =  /video/get_by_video_type/in_house_content/1/5?telco=mobilink
        //             =  https://back.cricwick.net/api/v1/video/get_by_video_type/in_house_content/1/5?telco=mobilink


        Url = baseUrl + "/video"
            + "/"
            + "get_by_video_type"
            + "/"
            + "in_house_content"
            + "/"
            + page
            + "/"
            + perPage
            + "?"
            + "telco=" + telco

            console.log(Url);

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
                console.log("HasMore : ", hasMore, " Page:", page);
                await this.setState({ page: this.state.page + 1 });
                await this.loadSeriesRecords();
            }
        } 
        else{
             console.log('End of list....');
        }
    }

    handleChange = async (e) => {
        console.log("Selected", e.status);
    }

    handleClick = async (video) => {
        await this.setState(()=>{
            return{
                video_id: video.id,
                videoFile: video.video_file,
                video: video,
                title: video.title,
                matchDesc: video.match_desc,
                showVideo: true
            }
        });

    }

    render() {
        const { error, isLoaded, seriesData, selectedType} = this.state;
        const {match} = this.props;

        if (error) {
            return (<div> Error : {error.message}</div>);
        } else if (!isLoaded) {
            return (<Loading />);
        } else {
            //------------------------------------------------------------------- 
            return (
                <div onScroll={this.handleScroll}>
                   {/* <div hide={!showVideo} className="card p-2" id="video-player">
                        <VideoPlayer
                            fileUrl={videoFile}
                            title={title}
                            matchDesc={matchDesc}
                            showControlls={true} width='100%' height='100%' />
                        <br /> <br />
                    </div> */}

                    {seriesData.map((video, i) => (
                        <Link to={`${match.url}/${video.id}`}>
                              <OtherVideoCardLink key={i} video={video} selectedType={selectedType} left_Col={3} right_Col={9} onClick={() => this.handleClick(video)} />
                        </Link>
                    ))}
                    
                </div>
            )
        }
    }
}

export default Featured;
