import React     from 'react';
import Moment    from 'moment';
// import  Summary from '../summary/summary';
import {NavLink} from 'react-router-dom';

const renderSeries = (props) => {
  const {data} = props;
  return (
      <div>
      {data.map ((series, i) => (
        <div key={series.id}>
           <NavLink  to={`/series/${series.id}/${series.title}`}>       
            <span className="video-series-title"> {series.title} </span>
            <br />
            <span className="video-series-subtitle">
              {Moment (new Date (series.start_date)).format ('DD MMM')} {' - '}
              {Moment (new Date (series.start_date)).format ('DD MMM')}
            </span>
           </NavLink>
           {data.length !== i + 1 ? <hr /> : ''}
        </div>
       ))}
   
      {/* <div>
          <Route path={`/series/:series_id/:title`} component={Summary} />
      </div> */}
        
    </div>
  );
};

export default renderSeries;



// {/* <NavLink
// to={{
//   pathname: `/series/allseries/`,
//   state: {
//     viewable_type: 'series',
//     viewable_id: series.id,
//     page: page,
//     selectedType: 'summary',
//     telco: telco,
//     seriesTitle: series.title,
//   },
// }}
// >  */}