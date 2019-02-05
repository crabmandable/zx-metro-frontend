import React, { Component } from 'react';
import "./StationTimes.css"
const axios = require('axios');
import lineImages from "../../images/lines"

class StationTimes extends Component {

    constructor()
    {
        super();
        this.state = {
            trains: [],
            timesKnown: false,
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.station && !prevProps.station) {
            this.updateTimes();
        } else if (this.props.station && prevProps.station && this.props.station.code != prevProps.station.code) {
            this.updateTimes();
        }
    }

    updateTimes() {
        this.setState({
            timesKnown: false,
        })
        axios.get('/station/' + this.props.station.code)
            .then(res => {
                this.setState({
                    trains: res.data,
                    timesKnown: true,
                })
            })
            .catch(error => {
                this.setState({
                    error: "Unable to get times.",
                })
            })
    }

    render() {

        let err;
        if(this.state.error) {
            err = (<div className="error">{this.state.error}</div>);
        }

        console.log(this.state.trains)
        let trainTimes = this.state.trains.map((t, i) => {
            return (
                <li className="train-sched" key={i}>
                    <p className="dest">{t.Destination}</p>
                    <img src={lineImages[t.Line]} className="line-dot" alt={t.Line}/>
                    <p className="minutes">{t.Min}</p>
                </li>
            )
        });

        if (!this.state.timesKnown) {
            trainTimes = (
                <div className="spinner">
                    <div className="double-bounce1"></div>
                    <div className="double-bounce2"></div>
                </div>
            );
        } else if (this.state.trains.length <= 0) {
            trainTimes = (
                <div>No trains</div>
            );
        }
        
        if (this.props.station) {
            return (
                <div className="Station-times">
                    <h4 className="time-title">{this.props.station.name}</h4>
                    {err}
                    {trainTimes}
                </div>
            );
        } else {
            return (<div className="Station-times"></div>);
        }
    }
}

export default StationTimes;
