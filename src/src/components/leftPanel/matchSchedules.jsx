import React, { Component } from "react";
import config from "../../config.json";
//import http from '../../services/httpService'
import http from "superagent";
import Loading from '../common/loading';
import { Link } from 'react-router-dom';
import ScheduleMatches from "../common/scheduleMatches.jsx";
// import LiveMatch from '../common/liveMatch';
import '../../assets/css/common/scheduledMatches.css';

class MatchSchedules extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pointTable: false,
            seriesData: [],
            isLoading: true,
            isLoaded: false,
            hasMore: true,
            tmpData: [],
            selectedType: "Summary",
            error: null,
            page: 1,
            perPage: 0,
        };
    }

    //  RECEVING PARAMETERS:-
    //  viewable_type : 'series',
    //  viewable_id   : series.id,
    //  page          : page,
    //  telco         : telco

    //   let Url = 'https://back.cricwick.net/api/series_schedule/350/schedule?page=1'

    componentDidMount = async () => {
        const { viewable_id } = this.props
        await this.setState(() => {
            return { viewable_id: viewable_id };
        });

        window.addEventListener('scroll', this.handleScroll);
        await this.loadSeriesRecords();
    };


    componentWillReceiveProps = async (nextProps) => {
        // console.log("componentWillReceiveProps Match Schedule : ", nextProps.match);
        await this.setState(() => {
            return { viewable_id: nextProps.match.series_id };
        });
        // await this.handleClick(nextProps.video)
    }


    componentWillUnmount = async () => {
        window.removeEventListener('scroll', this.handleScroll);
    }

    loadSeriesRecords = async () => {
        const { seriesData, viewable_id, page } = this.state;

        const Url =
            config.apiEndPoint
            + "/"
            + "series_schedule"
            + "/"
            + viewable_id + // Series ID stored in ==> viewable_id
            "/" +
            "schedule" +
            "?" +
            "page=" + page;

        console.log(Url);

        await http
            .get(Url)
            .set("Accept", "application/json")
            .then(res => {
                this.setState(() => {
                    return {
                        isLoading: false,
                        isLoaded: true,
                        seriesData: [...seriesData,
                        ...res.body.live_matches,
                        ...res.body.recent_matches,
                        ...res.body.upcoming_matches],
                        hasMore: ((res.body.live_matches + res.body.recent_matches.length + res.body.upcoming_matches.length) !== 0),
                    }
                });
                // live_matches, recent_matches, upcoming_matches

            })
            .catch(error => {
                this.setState(() => {
                    return {
                        isLoaded: false,
                        error: error
                    }
                });
            });
    };

    handleScroll = async () => {
        const { hasMore, page } = this.state;
        const offset = (document.documentElement.scrollTop + window.innerHeight);
        const height = document.documentElement.offsetHeight;

        // console.log("offset : ", Math.ceil(offset));
        // console.log("height : ", height);
        console.log("Match Schedules Loadding Required : ", hasMore);

        if (hasMore) {
            if (Math.ceil(offset) === height) {
                console.log("Loading More Records.....");

                await this.setState({ page: this.state.page + 1 });
                await this.loadSeriesRecords();

                console.log("HasMore : ", hasMore, " Page:", page);
            }
        } else {
            console.log('End of list....');
        }
    }

    render() {
        const { seriesData, error, isLoading } = this.state;

        if (error) {
            return <div> Error : {error.message} </div>;
        } else if (isLoading) {
            return (<Loading />);
        } else {
            return (
                <div onScroll={this.handleScroll}>
                    {seriesData.map((match, i) => (
                        <div key={i} className='card border-light shadow-sm bg-white rounded p-3 mb-2'>
                            {match.match_state !== 'Scheduled'
                                ?
                                <Link to={`/match/${match.id}`}>
                                    <ScheduleMatches match={match} />
                                </Link>
                                :
                                <ScheduleMatches match={match} />}
                        </div>
                    ))}

                    {/* {seriesData['recent_matches'].map((match, i) => (
                        <div key={i} className='card p-3 mb-1'>
                            {match.match_state !== 'Scheduled'
                                ?
                                <Link to={{ pathname: '/summary/', state: { match: match } }}>
                                    <ScheduleMatches match={match} />
                                </Link>
                                :
                                <ScheduleMatches match={match} />}
                        </div>
                    ))}

                    <div>
                        {seriesData['upcoming_matches'].map((match, i) => (
                            <div ksy={i} className='card p-3 mb-1'>
                                <ScheduleMatches match={match} />
                            </div>
                        ))}
                    </div> */}

                </div>
            );
        }
    }
}

export default MatchSchedules;
