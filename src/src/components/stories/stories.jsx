import React, { Component } from 'react';
import LatestNews from './latestNews';
import Articles from './articles';
import { NavLink, Route, Switch, Redirect } from 'react-router-dom';
import DetailedNews from './detailedNews';

class Stories extends Component {

    constructor(props) {
        super(props);

        const { match } = this.props;

        this.state = {
            error: null,
            isLoaded: false,
            isLoading: false,
            hasMore: true,
            seriesData: [],
            baseUrl: 'https://back.cricwick.net/api',
            page: 1,
            perPage: 5,
            selectedType: (match.params.selectedType ? match.params.selectedType : ''),
            id: (match.params.id ? match.params.id : 0),
        }
    }


    //URL FOR Particular NEWS : https://back.cricwick.net/api/articles/629

    componentWillReceiveProps = (nextProps) => {
        const { match } = nextProps;
        
        this.setState(() => {
            return {
                id: match.params.id,
                selectedType: match.params.selectedType
            }
        })
    }


    render() {
        const { selectedType, id } = this.state;
        const { match } = this.props;
        return (
            <div>
                <div className='card card-block pl-2 pt-3 pb-3 mb-1'>
                    {/* <h6 className='menu-buttons-title-heading'>{seriesData.match.series.title}</h6> */}
                    <span className='short-menu-buttons'>
                        <NavLink className='btn btn-default'
                            to={`${match.url}/news`}
                            activeClassName= {"short-menu-active"}>Latest news </NavLink>
                        <NavLink className='btn btn-default'
                            to={`${match.url}/articles`}
                            activeClassName="short-menu-active">Articles    </NavLink>
                    </span>

                </div>

                <div>
                       <Route exact path={`${match.url}`}
                            render={() => (
                                 <LatestNews/>
                                // <Redirect to={`${match.url}/news`}/> 
                            )}
                        />

                        <Route path={`${match.url}/news/:id`}
                            render={({ match }) => (
                                <div>
                                    <DetailedNews selectedType="news" id={match.params.id}/>  
                                    <LatestNews/>
                                </div>
                            )}
                        />

                        <Route path={`${match.url}/articles/:id`}
                            render={({ match }) => (
                                <div>
                                    <DetailedNews selectedType="articles" id={match.params.id}/> 
                                    <Articles/>
                                </div>
                            )}
                        />

                       <Route path={`${match.url}/news`}
                            render={() => (
                                 <LatestNews/>
                                // <Redirect to={`${match.url}/news`}/> 
                            )}
                        />

                       <Route path={`${match.url}/articles`}
                            render={({ match }) => (
                                <div>
                                    <Articles/>
                                </div>
                            )}
                        />
 
                </div>
            </div>
        );

    }
}

export default Stories;

