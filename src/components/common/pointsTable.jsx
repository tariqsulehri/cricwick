import React, { Component } from 'react';
import config from '../../config.json';
import http from 'superagent';
import Loading from '../common/loading';
import '../../assets/css/ranking/ranking.css';

class PointsTable extends Component {
    state = {
        error: null,
        isLoaded: false,
        isLoading: false,
        hasMore: true,
        seriesData: [],
        page: 1,
        perPage: 5,
        showFull: false,
    }

    componentDidMount = async () => {
        await this.loadSeriesRecords();
    }

    loadSeriesRecords = async () => {
        const { viewable_id } = this.props;

        // 1) All Videos :
        //    Base URL =   https://back.cricwick.net/api
        //    Composed =  /series_points_table/284

        const Url = config.apiEndPoint
            + '/'
            + 'series_points_table'
            + '/'
            + viewable_id

        console.log(Url);

        try {
            await http
                .get(Url)
                .then(res => {
                    this.setState(() => {
                        return {
                            isLoaded: true,
                            isLoading: false,
                            seriesData: res.body,
                            hasMore: true
                        }
                    });
                })
        } catch (error) {
            this.setState({
                isLoaded: false,
                error: error
            });
        }


    }

    handleClikc = (article) => {
        this.setState({
            showFull: true, article
        });
    }

    hideDetail = () => {
        this.setState({
            showFull: !this.state.showFull
        });
    }


    renderPointTable = (data) => {
        return (
            <div>
                <table className='table table-striped table-condensed table-hover table-borderless rank-table'>
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Team's</th>
                            <th>Mat</th>
                            <th>Won</th>
                            <th>Lost</th>
                            <th>Tie's</th>
                            <th>Pts</th>
                            <th>NRR</th>

                        </tr>
                    </thead>
                    <tbody>
                        {data.map((points, i) => (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{points.team}</td>
                                <td>{points.match_played}</td>
                                <td>{points.match_won}</td>
                                <td>{points.match_lost}</td>
                                <td>{points.match_tied}</td>
                                <td>{points.points}</td>
                                <td>{points.net_run_rate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    render() {
        const { seriesData, error, isLoaded } = this.state;

        if (error) {
            return (<div> Error : {error.response}</div>);
        } else if (!isLoaded) {
            return (<Loading />);
        } else {
            console.log(seriesData['points_table'].length);
            return (
                <div>
                    {/* <!-- This  following Code is for  ODI/T20/TEST Ranking  --> */}
                    <div className="card border-light shadow bg-white rounded p-3 mb-1">
                        {seriesData['points_table'].length > 0 ? 
                           this.renderPointTable(seriesData['points_table'])
                        : <h6>Points Table not available yet...</h6> }
                    </div>
                </div>
            );
        }
    }
}

export default PointsTable;