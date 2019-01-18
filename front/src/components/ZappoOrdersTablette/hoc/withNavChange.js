import React, { Component } from 'react';


const withNavChange = WrapComponent =>
    class extends Component {
        constructor(props) {
            super(props);
            this.state = { 
                link:[true,false,false]
            };
            this.handleChangeLink = this.handleChangeLink.bind(this);
        }


        handleChangeLink(n){
            const link = [false,false,false];
            this.state.link[n] ? link[n]=false : link[n]=true;
            this.setState(prevState => ({link}));
        }

        render() {
            return (
                <WrapComponent {...this.props} handleChangeLink={this.handleChangeLink} {...this.state}/>
            );
        }
    }
    

export default withNavChange;