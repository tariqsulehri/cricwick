import React, {Component} from 'react'

class HeaderLiveMatch extends Component{
       constructor(props){
            super(props)
           
            this.state = {
                  match : ''

            }
       }

       render(){
           return(
               <div> This is Match Header</div>
           );
       }

}


export default HeaderLiveMatch;