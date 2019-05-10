import React, { Component } from "react";
import config from "../../config.json";
import http from "superagent";
import VideoPlayer from '../common/VideoPlayer';
import Loading from '../common/loading';
import VideoCard from '../common/videoCard';
import VideoDropDown from "../common/videoDropDown";

import '../../assets/css/common/videoCards.css';

class MatchVideos  extends Component { 

  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      seriesData: [],
      isLoading: true,
      isLoaded: false,
      hasMore: true,
      error: null,
      match_id: this.props.match_id,
      video: [],
      tags: [],
      page: 1,
      perPage: 10,
      tag_id: 33,
      video_id: '',
      title: '',
      matchDesc: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  //  RECEVING PARAMETERS:-  
  //  viewable_type : 'series',
  //  viewable_id   : series.id,
  //  page          : page,
  //  telco         : telco

  //   let Url = //https://back.cricwick.net/api/v2/user_api/get_new_timeline_items?match_id=2955&page=1&tag_id=33&per_page=10&telco=mobilink

  componentWillUnmount() {
    this._isMounted = false;
    window.removeEventListener('scroll', this.handleScroll);
  }

  componentDidMount = async () => {
    window.addEventListener('scroll', this.handleScroll);
    await this.loadSeriesRecords();

    // if(this.state.seriesData[0].video){
    //       this.handleClick(this.state.seriesData[0].video);
    // }
    //console.log("Feature Videos Component Will Unmount : ",this.state.seriesData[0].video);

  };

  componentWillReceiveProps = async (nextProps) => {
    console.log('component Will Recevie Props NextProps :', nextProps);
    await this.setState(() => {
      return {
        match_id: nextProps.match_id,
        // video: nextProps.video
      }
    });
    // await this.handleClick(nextProps.video)
  }

  // componentDidUpdate(prevProps) {
  //   // Typical usage (don't forget to compare props):
  //   if (this.props.userID !== prevProps.userID) {
  //     this.fetchData(this.props.userID);
  //   }
  // }

  loadSeriesRecords = async () => {
    // const { viewable_type, viewable_id, page } = this.props
    const { match_id, page, perPage, seriesData, tag_id } = this.state

   //https://back.cricwick.net/api/v2/user_api/get_new_timeline_items?match_id=2955&page=1&tag_id=33&per_page=10&telco=mobilink

    const Url = config.apiEndPoint
      + '/v2/user_api/get_new_timeline_items?'
      + 'match_id=' + match_id
      + '&page=' + page
      + '&tag_id=' + tag_id
      + '&per_page=' + perPage
      + '&telco=' + config.telco

    console.log(Url);

    await http
      .get(Url)
      .set('Accept', 'application/json')
      .then(res => {
        this.setState(()=>{
          return {
            isLoading: false,
            isLoaded: true,
            seriesData: [...seriesData, ...res.body.timeline],
            hasMore: (res.body.timeline.length < perPage)
          }
        });

      }).catch(error => {
        this.setState(()=>{
          return {
            isLoaded: false,
            error: error
          }
        });
      })

  }


  handleScroll = async () => {
    const { hasMore, page } = this.state;
    const offset = (document.documentElement.scrollTop + window.innerHeight);
    const height = document.documentElement.offsetHeight;

    if (!hasMore) {
      //console.log("offset : ", Math.ceil(offset));
      // console.log("offset : ", Math.floor(offset));
      // console.log("height : ", height);
      if (Math.ceil(offset) === height) {
        console.log("Loading new Records....");
        
        await this.setState({ page: this.state.page + 1 });
        await this.loadSeriesRecords();

        console.log("HasMore : ", hasMore, " Page:", page);
      }
    } else {
      console.log('End of list....');
    }
  }

  handleClick = async (video) => {
    await this.setState({
      video_id: video.id,
      videoFile: video.video_file,
      video: video,
      title: video.title,
      matchDesc: video.match_desc
    });
    // console.log('Clicker on Video', video);
  }

  handleChange = async (e) => {
    console.log("Selected", e.status);
  }

  //  https://back.cricwick.net/api/v2/view_lists/
  //  get_list_items_from_viewable?viewable_type=series&
  //  viewable_id=156&page=1&telco=mobilink

  render() {
    const { seriesData, error, isLoading, videoFile, title ,matchDesc } = this.state;
    if (error) {
      return <div> Error : {error.message} </div>;
    } else if (isLoading) {
      return (<Loading />);
    } else {

      return (
          <div>
               {/* <div className="card p-2" id="video-player">
                   <VideoPlayer
                      fileUrl={videoFile}
                      title={title}
                      matchDesc={matchDesc}
                      showControlls={true} width='100%' height='100%' />
                  <br /> <br />
                  <VideoDropDown handleClick={(e) => this.handleChange()} /> 
              </div>  */}

              {seriesData.map((video, i) => (
                  <div key={i}>
                      <VideoCard video={video.video} left_Col={3} right_Col={9}/>
                  </div>
              ))}
          </div>
      );
    }
  }
}

export default MatchVideos;
