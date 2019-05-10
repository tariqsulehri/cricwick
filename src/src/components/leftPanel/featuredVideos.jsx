import React, { Component } from "react";
import config from "../../config.json";
//import http from '../../services/httpService'
import { Link } from 'react-router-dom';
import http from "superagent";
import VideoPlayer from '../common/VideoPlayer';
import Loading from '../common/loading';
import VideoCard from '../common/videoCard';
import VideoDropDown from "../common/videoDropDown";

import '../../assets/css/common/videoCards.css';

class FeaturedVideos extends Component {

  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      seriesData: [],
      isLoading: true,
      isLoaded: false,
      hasMore: true,
      error: null,
      viewable_id: this.props.viewable_id,
      series_title: this.props.series_title,
      video: [],
      tags: [],
      page: 1,
      perPage: 10,
      tag_id: 27,
      video_id: '',
      title: '',
      matchDesc: '',
    };

    this.handleChange = this.handleChange.bind(this);

  }


  componentWillUnmount() {
    this._isMounted = false;
    // window.removeEventListener('scroll', this.handleScroll);
  }

  componentDidMount = async () => {
    // window.addEventListener('scroll', this.handleScroll);
    await this.loadSeriesRecords();
    console.log("This is  Component Did Mount : ", this.props.match.params.id);
    // if(this.state.seriesData[0].video){
    //       this.handleClick(this.state.seriesData[0].video);
    // }
    //console.log("Feature Videos Component Will Unmount : ",this.state.seriesData[0].video);
  };

  componentWillReceiveProps = async (nextProps) => {
    console.log("componentWillReceiveProps Featured Videos : ", nextProps.viewable_id, nextProps.viewable_type);
    await this.setState(() => {
      return { viewable_id: nextProps.viewable_id };
    });

    console.log("This is  Video Id Rec Props : ", this.props.match.params.id);

    await this.loadSeriesRecords();
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
    const { viewable_id, page, perPage, seriesData, tag_id } = this.state

    const Url = config.apiEndPoint
      + '/v1/user_api/get_videos_by_series?'
      + 'series_id=' + viewable_id
      + '&page=' + page
      + '&tag_id=' + tag_id
      + '&per_page=' + perPage
      + '&telco=' + config.telco

    console.log(Url);

    await http
      .get(Url)
      .set('Accept', 'application/json')
      .then(res => {
        this.setState(() => {
          return {
            isLoading: false,
            isLoaded: true,
            seriesData: [...seriesData, ...res.body.videos],
            hasMore: (res.body.videos.length < perPage)
          }
        });

      }).catch(error => {
        this.setState({
          isLoaded: false,
          error: error
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
      if (Math.floor(offset) === height) {
        console.log("Inside Scroll");
        console.log("HasMore : ", hasMore, " Page:", page);
        await this.setState({ page: this.state.page + 1 });
        await this.loadSeriesRecords();
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
    const { seriesData, error, isLoading, series_title, viewable_id } = this.state;

    if (error) {
      return <div> Error : {error.message} </div>;
    } else if (isLoading) {
      return (<Loading />);
    } else {
      return (
        <div>
          {seriesData.map((video, i) => (
            <div key={i}>
              <Link to={`/series/${viewable_id}/${series_title}/videos/${video.video.id}`}>
                <VideoCard video={video.video} left_Col={3} right_Col={9} />
              </Link>
            </div>
          ))}

        </div>
      );
    }
  }
}

export default FeaturedVideos;
