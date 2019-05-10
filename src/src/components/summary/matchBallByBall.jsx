import React, { Component } from 'react';
import http from 'superagent';
import Match from 'mathjs';
import Loading from '../common/loading';
import '../../assets/css/summary/summary.css';

//https://back.cricwick.net/api/v3/innings/5087/get_previous_overs?over_number=42

class MatchBallByBall extends Component {

    constructor(props) {
        super(props)
        this.state = {
            error: null,
            isLoaded: false,
            isLoading: false,
            hasMore: true,
            tempData: [],
            over : null,
            seriesData: [],
            inning: this.props.inning,
            overNumber:this.props.inning.overs,
            pageSize: 5,
            baseUrl: 'https://back.cricwick.net/api',
        };
    }

    componentDidMount() {
        console.log("From Ball by Ball : ",this.props);
        this.loadSeriesRecords();
    }

    loadSeriesRecords = async () => {
        const { baseUrl, inning, overNumber, seriesData, pageSize } = this.state;

        // console.log("in side Ball by Ball : " ,inning, overNumber);
        // const { match } = this.props;

        // console.log("Match from Parent Object : " , match);
        // https://back.cricwick.net/api/v3/innings/5288/get_previous_overs?over_number=96
        //Home Series Api  

        const Url = baseUrl + '/'
            + 'v3'
            + '/'
            + 'innings'
            + '/'
            + inning.id
            + '/'
            + 'get_previous_overs'
            + '?'
            + 'over_number=' + overNumber

        console.log(Url);
        //console.log(hasMore);
        await http
            .get(Url)
            .set('Accept', 'application/json')
            .then(res => {
                this.setState({
                    isLoaded: true,
                    isLoading: false,
                    seriesData: [...seriesData ,...res.body.overs],
                    hasMore: (res.body.overs.length < pageSize)
                });
            })
            .catch(error => {
                this.setState({
                    isLoaded: false,
                    error
                });
            });
    }

    handleClickOnOver = (over) => {
        this.setState({ over: over });
    }

    selectedOverDetail = () => {
        const { over } = this.state;

        if(!over) return (''); 

        return (
            <div className='card card-block pl-3 pt-4 pb-3 pr-2 mb-1'>
                 <div className='uppercase' > {over.title} {" - Commentary"}   </div>
                 <hr/>
                 {over.balls.slice(0, over.balls.length).reverse().map((ball, i) => (
                    <div key={i} style={{ width: 100 + "%" }}>
                        <div key={i}>
                            <div style={{ float: 'left', width: 15 + '%', paddingBottom: 8 + 'px' }}>
                                <span className='badge badge-primary'>
                                    {this.renderBallScore(ball)}
                                </span> <br />
                                <span className='commentry-text'>
                                    {ball.title}
                                </span> <br />
                            </div>

                            <div style={{ float: 'right', width: 85 + '%', paddingBottom: 8 + 'px' }} >
                                <span className='commentry-text'> {ball.commentary} </span>
                            </div>
                        </div >

                        <br />
                        <br />
                        <hr />

                    </div>
                ))}
            </div>
        )
    }

    renderBallScore = (ball) => {
        console.log(ball)
        let ballResult = '';

            // if (ball.runs_scored > 0) {
                ballResult +=  ball.runs_scored;
                // return ballResult;
            // }

            if(ball.wicket){
                ballResult = 'wkt';
                // return ballResult;
            }   
            
            if(ball.no_ball){
                ballResult += 'nb';
                // return ballResult;
            }   
            
            
             if (ball.extra_leg_bye > 0  ){
                  ballResult += 'lb';
             }

            // if (ball.extra_leg_bye > 0  ){
            //     ballResult = ball.runs_scored + 'lb';
            //     return ballResult;
            // }

            if (ball.wide_ball){
                  ballResult += 'wb';
                //   return ballResult;
            }  
            
            return ballResult;
            
    }

    handleScroll = async () => {
        const { hasMore } = this.state;
        console.log(this.state.hasMore);
        if (!hasMore) {
            let elem = document.getElementById('overs');
            var offset = elem.scrollLeft;

            // console.log(this.state.overNumber);

            if (Match.ceil(offset) === 0) {
                console.log('scrolling')
                await this.setState((prevState)=>{ return {overNumber: (prevState.overNumber - prevState.pageSize)} });
                await this.loadSeriesRecords();
            }
        } else {
            console.log("Further Scrolling Not Possible.....")
        }

    }


    renderOversDetail = (overs) => {
        //https://back.cricwick.net/api/v3/innings/5068/get_previous_overs?over_number=1
        //console.log(overs[0].overs);

        //  const _overs =  overs.sort((obj1, obj2) => {
        //           return obj1.title -  obj2.title
        //  });

        let allOvers = overs.slice(0,overs.length).reverse();        //reverse();
        // console.log(allOvers);
        return (
            allOvers.map((over,i) => (
                <div key={i} className='card card-for-scroll p-1' onClick={() => this.handleClickOnOver(over)} style={{ cursor: 'pointer' }}  >
                    <div className='uppercase' > {over.title} </div>
                    {over.balls.slice(0, over.balls.length).reverse().map((ball, i) => (
                        <span key={i} className='badge badge-primary'>
                            {this.renderBallScore(ball)}
                        </span>
                    ))}
                </div>
            ))
        );
    }

    render() {
        const { error, isLoaded, seriesData } = this.state;

        if (error) {
            return (<div> Error : {error.message}</div>);
        } else if (!isLoaded) {
            return (<Loading />);
        } else {

            return (
                <div>
                    <div id='overs' className='scrolling-wrapper mb-1' onScroll={this.handleScroll}>
                        {this.renderOversDetail(seriesData)}
                    </div>

                    <div>
                         {this.selectedOverDetail()}
                    </div>
                </div>
            );
        }
    }
}

export default MatchBallByBall;