import React, { Component }       from  'react';
import request                    from  'superagent';
import Match                      from  'mathjs';
import RankingContentsIdentifire  from  './rankingContentsIdentifire'; 
import SeriesContentsIdentifire   from  './seriesContentsIdentifire';
import OtherContentsIdentifire    from  './otherContentsIdentifire';

import '../../assets/css/home/homeCenterPanel.css';
//import axios from 'axios';

class HomeCenterPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            isLoading: false,
            homeContents: [],
            hasMore: true,
            view: 'home',
            webuser: 1,
            page: 1,
            perPage: 5,
            ranking: [],
            series: [],
            match: null,
            baseUrl: 'http://back.cricwick.net/api/v3/view_lists'
        };
    }

    

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
        this.loadSeriesRecord();

    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }


    handleScroll = () => {
        
        let offset = (document.documentElement.scrollTop + window.innerHeight);
        let height = document.documentElement.offsetHeight;

       //console.log("offset : ", Math.ceil(offset));
       //console.log("height : ", height);


        if (Match.ceil(offset) === height) {
            this.setState({ page: this.state.page + 1 });
            this.loadSeriesRecord();
        }

    }

    loadSeriesRecord = () => {
      const {homeContents, hasMore, view ,webuser, page, perPage} =  this.state;
        // fetch("http://back.cricwick.net/api/v3/view_lists/get_by_name?view=home")
        //Home Series Api  
        const Url = this.state.baseUrl + '/'
            + 'get_by_name?view=' + view
            + '&web_user=' + webuser
            + '&page=' + page
            + '&per_page=' + perPage;
 
        //console.log(Url);
        //console.log(hasMore);
         
        request
            .get(Url)
            .set('Accept','application/json')
            .then(res => {
                this.setState({
                    isLoaded: true,
                    isLoading: false,
                    homeContents: [...homeContents, ...res.body],
                    hasMore: (res.length < perPage)
                });
            })
            .catch(error => {
                this.setState({
                    isLoaded: false,
                    error
                });
           });
    }

    render() {
        const { error, isLoaded, homeContents } = this.state;

        //let genericHome =  homeContents.filter(x => x.type === 'generic-home');

        if (error) {
            return (<div> Error : {error.message}</div>);
        } else if (!isLoaded) {
            return (<div> Loading Data.... </div>);
        } else {

            return (

                <div onScroll={this.handleScroll}>

                    {/* Itreate top level contents line Series and Other Data */}
                    {homeContents.map((series, cnt) => (
                        <div key={cnt}>

                            <div className="home-div">

                                {/* Check Either the Current Level of Itration is a ( SERIES) */}
                                {series.type === 'series' &&
                                    series.data.map((matches, mat) => (

                                        <div key={mat} >
                                            {/* Render Series Contents Matches/Videos/Articles/Tweets etc */}
                                            {matches.data.map((match, i) => (
                                                <div key={i}>
                                                    <SeriesContentsIdentifire match={match}
                                                        printSeriesTitle={i}
                                                        seriesTitle={series.title}
                                                        contentType={matches.type} />
                                                </div>
                                            ))}
                                            {/* ----------------- End Series Contents ------------- */}
                                        </div>
                                    ))}
                                    
                                {/* -------------------------------------------------------------------------- */}
                                {/* Check Either the Current Level of Itration Itration is VIDEO */}
                                {series.type === 'video' &&
                                    <div>
                                        <OtherContentsIdentifire contents={series}
                                            contentType={series.type}
                                            typeVideo={'video'}
                                        />
                                    </div>
                                }

                                {/* ------------------------------------------------------------------------- */}
                                {/* Check Either the Current Level of Itration Itration is GENERIC-HOME */}
                                {series.type === 'generic-home' &&
                                    <div>
                                        <OtherContentsIdentifire contents={series}
                                            contentType={series.type}
                                        />

                                    </div>
                                }
                                {/* ------------------------------------------------------------------------- */}

                                {/* Check Either the Current Level of Itration is RANKING */}
                                {series.type === 'ranking' &&
                                    <div>
                                        <RankingContentsIdentifire contents={series}
                                            contentType={series.type}
                                            
                                        /> 
                                    </div>
                                }
                                {/* ------------------------------------------------------------------------- */}

                            </div>
                        </div>

                    ))}
                    {/* -------------END OF ITRATION--------------------------- */}

                </div>
            )

        }
    }
}

export default HomeCenterPanel;
