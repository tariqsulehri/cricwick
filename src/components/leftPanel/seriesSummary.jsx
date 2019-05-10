import React, { Component } from "react";
import config from "../../config.json";
//import http from '../../services/httpService'
import http from "superagent";
import { Link } from 'react-router-dom';
import Articles from '../common/articles';
import LiveMatch from '../common/liveMatch';
import News from '../common/news';
import Tweets from '../common/tweets';
import Videos from '../common/videos';
import Loading from '../common/loading';
import '../../assets/css/home/homeCenterPanel.css';

class SeriesSummary extends Component {
 
  
  
  _isMounted = false;
  
  constructor(props) {
    super(props);

    const {viewable_type, viewable_id, match } =  this.props;

    this.state = {
      seriesData: [],
      isLoading: true,
      isLoaded: false,
      hasMore: true,
      error: null,
      viewable_type: viewable_type,
      viewable_id: viewable_id,
      match : match,
      video_id: null,
      page: 1,
    };
  }

  componentWillUnmount() {
    this._isMounted = false;
    window.removeEventListener('scroll', this.handleScroll);
  }

  componentDidMount = async () => {
    //     this._isMounted = true;
    //     const { viewable_type, viewable_id, page } = this.props;
    //     this.setState({
    //         viewable_id: viewable_id,
    //         viewable_type: viewable_type,
    //         page: page
    //     });

    window.addEventListener('scroll', this.handleScroll);
    await this.loadSeriesRecords();
  };

  componentWillReceiveProps = async (nextProps) => {
    console.log("componentWillReceiveProps Series  Summary : ", nextProps.viewable_id, nextProps.viewable_type );
    await this.setState({
      viewable_id: nextProps.viewable_id,
      viewable_type: nextProps.viewable_type,
      seriesData:[],
      page :  1,
    });

     await this.loadSeriesRecords();
  }


  loadSeriesRecords = async () => {
    // const { viewable_type, viewable_id, page } = this.props
    const { viewable_type, viewable_id, seriesData ,  page } = this.state

    // v2/view_lists/get_list_items_from_viewable?viewable_type=series&viewable_id=350&page=1&telco=mobilink
    const Url = config.apiEndPoint
      + '/v2/view_lists/get_list_items_from_viewable?viewable_type='
      + viewable_type
      + '&viewable_id=' + viewable_id
      + '&page=' + page
      + '&telco=' + config.telco

    console.log(Url);

    await http
      .get(Url)
      .set('Accept', 'application/json')
      .then(res => {
        this.setState({
          isLoading: false,
          isLoaded: true,
          seriesData: [ ...seriesData , ...res.body],
          hasMore: (res.body.length >= 1)
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

    // console.log(hasMore);
    // console.log("offset : ", Math.ceil(offset));
    // console.log("offset : ", height);

    if (hasMore) {
      // console.log("height : ", height);
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



  //  https://back.cricwick.net/api/v2/view_lists/
  //  get_list_items_from_viewable?viewable_type=series&
  //  viewable_id=156&page=1&telco=mobilink

  render() {
    const { seriesData, error, isLoading } = this.state;

    if (error) {
      return <div> Error : {error.message} </div>;
    } else if (isLoading) {
      return (<Loading />)
    } else {
      return (
        <div onScroll={this.handleScroll}>
          {seriesData.map((matches, i) => (
            <div key={i}>
              {/* <div className="card pt-2 pl-3 mb-1">
                        </div> */}
              {matches.data.map((match, i) => (
                <div key={i}>
                  {match.type === "match_object" && (
                    <div className="card border-light shadow-sm bg-white rounded p-3 mb-2">
                      {match.data.match_state !==
                        "Scheduled" ? (
                          <Link to={`/match/${match.data.id}`}>
                            <h6 className="card-title">{matches.title}</h6>
                            <LiveMatch match={match.data} />
                          </Link>
                        )
                        : (
                          <div>
                            <h6 className="card-title"> {matches.title} </h6>
                            <LiveMatch match={match.data} />
                          </div>
                        )}
                    </div>
                  )}

                  {match.type === "videos" && 
                    <div>
                      {match.data.length > 0 &&
                        <Videos match={match.data} firstTitle={true} />
                      }
                    </div>
                  }

                  {match.type === "news" &&
                    match.data.length !== 0 && (
                      <div className="card p-3 mb-1">
                        <News
                          match={
                            match.data.length !== 0
                              ? match.data
                              : null
                          }
                        />
                      </div>
                    )}

                  {match.type === "articles" && (
                    <div>
                      {match.data.length > 0 && <Articles  match={match.data[0]} left_Col={9} right_Col={3} /> }
                    </div>
                  )}

                  {match.type === "tweets" && (
                    <div>
                        {match.data.length > 0 &&  <Tweets match={match.data} />}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      );
    }
  }
}

export default SeriesSummary;
