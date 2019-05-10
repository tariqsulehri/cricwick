import React, { Component } from 'react';
import ReactPlayer from 'react-player';

import Loading   from '../../components/common/loading';
import http      from '../../services/httpService';
import config    from '../../config.json';
import {toast}   from 'react-toastify';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { library } from '@fortawesome/fontawesome-svg-core';
import { faFacebookF , faTwitter, faGooglePlusG } from "@fortawesome/free-brands-svg-icons"
import 'react-toastify/dist/ReactToastify.min.css';
import '../../assets/css/common/videoCards.css';

// library.add(Facebook);



class VideoPlayer extends Component {

    constructor(props) {
        super(props);
        const { id } = this.props;
        
        console.log(props);

        this.state = {
            error: null,
            isLoaded: false,
            isLoading: false,
            hasMore: true,
            video: [],
            id: (id ? id : 0),
            baseUrl: config.apiEndPoint,
            telco: config.telco,
            fbUrl  : "https://www.facebook.com/sharer/sharer.php",
            ourTelcoUrl : "https://cricket.jazz.com.pk/"
        }
    }

    componentDidMount = async () => {
       //window.addEventListener('scroll', this.handleScroll);
        await this.loadSeriesRecords();
    }

    componentWillUnmount() {
        //window.removeEventListener('scroll', this.handleScroll);
    }

    componentWillReceiveProps=async (nextProps) =>{
          console.log("Next Props:",nextProps);  
          await this.setState(()=>{
                return{
                     id : nextProps.id,
                }
          })
          await this.loadSeriesRecords();
          this.scrollTop();
    }

    loadSeriesRecords = async () => {
        const {  baseUrl, telco } = this.state;
        const { id } = this.props;

        // 1) All Videos :
        //    Base URL =  https://back.cricwick.net/api
        //    Composed =  /v1/user_api/get_single_video?id=2457&telco=mobilink

        let Url = baseUrl
            + '/v1'
            + '/user_api'
            + '/get_single_video'
            + '?'
            + 'id=' + id
            + '&'
            + 'telco=' + telco 

        console.log(Url);

        try {
            const { data } = await http.get(Url);
            await this.setState(() => {
                return {
                    isLoaded: true,
                    isLoading: false,
                    video: data,
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

    scrollTop=()=>{
        window.scrollTo(0,0);
    }

    handleScroll = async () => {
        // const { hasMore, page } = this.state;
       
        // let offset = (document.documentElement.scrollTop + window.innerHeight);
        // let height = document.documentElement.offsetHeight;

        // // console.log(height, "  = ", Match.ceil(offset));

        // if (Math.ceil(offset) === height) {
        //     console.log("Inside Scroll");
        //     if (!hasMore) {
        //         //console.log("offset : ", Math.ceil(offset));
        //         await this.setState((prevState) => { return { page: prevState.page + 1 } });
        //         await this.loadSeriesRecords();
        //         console.log("HasMore : ", hasMore, " Page:", page);
        //     }
        //     else {
        //         console.log('End of list....');
        //     }
        // }
    }

    render() {
        const { isLoaded, error, video, fbUrl, ourTelcoUrl} = this.state;
        const { showControlls, width, height } =  this.props;

        
        if (error) {
            return (<div> Error : {error.message}</div>);
        } else if (!isLoaded) {
            return (<Loading />);
        } else {
            console.log(this.props);
            return (
                <div id="video-player">
                    <ReactPlayer url={video.video.video_file} controls={showControlls} width={width} height={height} />
                    <h6 className='cardsmall-col-heading-black    mb-2 pl-0 pt-2'>{video.video.title}</h6>
                    <h6 className='cardsmall-col-sub-heading-gray mb-2 pl-0'>{video.video.matchDesc}</h6>
                    <div style={{float:"right"}}>
                    
                    {/* Format : FaceBook Url + ?u= + OutTelco + series/series_id/Title/videos/videoid*/}

                        <span className="social-icons">
                            <FontAwesomeIcon
                                icon={faFacebookF}
                                color='gray'
                                size="3x"
                            />
                        </span>
                        <span className="social-icons">
                            <FontAwesomeIcon
                                icon={faTwitter}
                                color='gray'
                                size="3x"
                            />
                        </span>
                        <span className="social-icons">
                            <FontAwesomeIcon
                                icon={faGooglePlusG}
                                color='gray'
                                size="3x"
                            />
                        </span>

                     </div>
                </div>
            );
        }
    }
}

export default VideoPlayer;
