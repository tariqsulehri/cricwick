import React, { Component } from 'react';
//import config from '../../config.json';
//import http from '../../services/httpService'
import { NavLink, Route } from 'react-router-dom';

//import http from 'superagent';

//For Series Summary
import SeriesSummary  from './seriesSummary';
import MatchSchedules from './matchSchedules';
import FeaturedVideos from './featuredVideos';
import PointsTable    from '../common/pointsTable';
import VideoPlayer    from '../../components/common/VideoPlayer';

import '../../assets/css/common/shortMenu.css';

class FeaturedSeries extends Component {
  constructor(props) {
    super(props);

    //const {viewable_type, viewable_id, selectedType, seriesTitle, tag_id, video_id, video , telco } = this.props.location.state;
    const { viewable_type, match } = this.props;
    console.log("Match : ",match); 
    this.state = {
      viewable_type: viewable_type,
      viewable_id: match.params.series_id,
      series_title  : match.params.title,
      match: match,
  
      // seriesTitle   : seriesTitle,
      // video_id      : video_id,
      // tag_id        : tag_id,    
      // telco         : telco,
      // video         : video, 
      page: 1
    };
  }

  //  RECEVING PARAMETERS:-  
  //  viewable_type : 'series',
  //  viewable_id   : series.id,
  //  page          : page,
  //  telco         : telco

  //   let Url = 'https://back.cricwick.net/api/v2/view_lists/get_list_items_from_viewable'
  //   Url = Url + `?viewable_type=${series}`
  //             + `&viewable_id=${seriesId}`
  //             + `&page=${page}`
  //             + `&telco=${telco}`

  componentWillReceiveProps = async (nextProps) => {
    const { match } = nextProps;
    const { viewable_type } = this.state;

    // console.log("componentWillReceiveProps featured Series : ", match.params.series_id);

    await this.setState(() => {
      return {
        viewable_type: viewable_type,
        viewable_id: match.params.series_id,
        series_title: match.params.title,
        match: match,
        //  selectedType : nextProps.location.state.selectedType,
      }
    });
  }


  // componentDidMount = async () => {
  //   const {selectedType} = this.props.location.state;
  //   this.setState(()=>{ return{selectedType : selectedType} });
  // }


  // handleClick = async (selectedType) => {
  //   if (!selectedType) {
  //        await this.setState(()=>{ return{selectedType: 'summary'}} );
  //   } else {
  //        await this.setState(()=>{ return { selectedType: selectedType} });
  //   }
  // }

  //  https://back.cricwick.net/api/v2/view_lists/
  //  get_list_items_from_viewable?viewable_type=series&
  //  viewable_id=156&page=1&telco=mobilink

  prepareString(string) {
    let str = string.replace(/-/g, ' ');
    console.log(str);
    return str;
  }


  render() {
    // const { viewable_type, viewable_id, selectedType, video ,video_id, tag_id, page, seriesTitle} = this.state;
    const { match, viewable_type, viewable_id, series_title } = this.state;
    return (
      <div>

        {/* Rendering Series Menu */}
        <div className="card card-block p-3 mb-1">
          <h6 className='menu-buttons-title-heading'>{this.prepareString(match.params.title)}</h6>

          <span className='short-menu-buttons'>
            <NavLink exact className='btn btn-default' to={`${match.url}`}
              activeClassName="short-menu-active"  >Summary     </NavLink>

            <NavLink className='btn btn-default' to={`${match.url}/schedules`}
              activeClassName="short-menu-active"  >Schedules </NavLink>

            <NavLink className='btn btn-default' to={`${match.url}/videos`}
              activeClassName="short-menu-active" >Videos   </NavLink>

            <NavLink className='btn btn-default' to={`${match.url}/pointstable`}
              activeClassName="short-menu-active"  >Points Table </NavLink>
          </span>
        </div>

        <div>
          <Route strictly exact
            path={`${match.url}`}
            render={(props) => <SeriesSummary {...props} 
                         viewable_type={viewable_type} 
                         viewable_id={viewable_id} 
                         selectedType="summary" />}
          />

          <Route strictly exact
            path={`${match.url}/schedules`}
            render={(props) => <MatchSchedules {...props} 
                               viewable_type={viewable_type} 
                               viewable_id={viewable_id} 
                               selectedType="schedules" />}
          />

          <Route path={`${match.url}/videos/:id`}
            render={(props) => (
              <div>
                <VideoPlayer {...props} id={props.match.params.id} 
                              showControlls={true} 
                              width='100%' 
                              height='100%' />
                <div>
                  <FeaturedVideos {...props}
                    viewable_type={viewable_type}
                    viewable_id={viewable_id}
                    series_title={series_title}
                    selectedType="videos" />}
                </div>
              </div>
            )}
          />

          <Route strictly exact
            path={`${match.url}/videos`}
            render={(props) => <FeaturedVideos {...props}  
                                               series_title = {series_title} 
                                               viewable_type={viewable_type} 
                                               viewable_id={viewable_id} 
                                               selectedType="videos" />}
          />

          <Route strictly exact
            path={`${match.url}/pointstable`}
            render={(props) => <PointsTable {...props} 
                                viewable_type={viewable_type} 
                                viewable_id={viewable_id} 
                                selectedType="schedules" />}
          />
        </div>

      </div>
    );
  }
}

export default FeaturedSeries;
