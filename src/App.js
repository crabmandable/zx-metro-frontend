import React, { Component } from 'react';
const axios = require('axios');
import logo from '../images/zxmetro_logo.png';
import './App.css';
import SearchBar from './components/SearchBar'
import LineSelector from './components/LineSelector'
import StationTimes from './components/StationTimes'

class App extends Component {

    constructor ()
    {
        super();
        this.state = {
            currentStations: [],
            selectedLine: null,
            selectedStation: null,
            allStations: [],
            lines: null,
            dataWasFetched: false,
        };
    }

    componentDidMount() {
        axios.get('/home')
            .then(res => {
                console.log(res.data)
                if (!res.data.stations || !res.data.lines || res.data.stations.length < 1 || res.data.lines.length < 1) {
                    this.setState({error: "Unable to fetch line and station information"});
                } else {
                    this.setState({
                        allStations: Object.values(res.data.stations),
                        lines: res.data.lines,
                        dataWasFetched: true,
                        selectedLine: null,
                    });
                    this.lineWasSelected();
                }
            })
            .catch(err => {
                this.setState({error: "Unable to fetch line and stations information"});
            })
    }

    componentDidUpdate(prevProps, prevState)
    {
        if (prevState.selectedLine != this.state.selectedLine) {
            this.lineWasSelected();
        }
    }

    lineWasSelected() {
        if (!this.state.selectedLine) {
            this.setState({
                currentStations: this.state.allStations
            })
        }
        else {
            let line = this.state.lines[this.state.selectedLine];
            if (!line) {
                console.error("invalid line in state");
                this.setState({error: "There was an unexpected problem."});

            } else {
                this.setState({
                    currentStations: Object.values(line.stations),
                })
            }
        }
    }

    onLineSelected(line) {
        this.setState({
            selectedLine: line
        })
    }

    onSearchUpdated(value) {
        let stations = [];

        if (!value) {
            stations = this.state.currentStations;
        } else {
            stations = this.state.currentStations.filter(s => s.name.toLowerCase().indexOf(value.toLowerCase()) > -1);
        }

        if (stations.length > 0) {
            this.setState({
                selectedStation: stations[0],
            })
        }
    }

    render() {
        let { currentStations } = this.state;
        let content = (
            <div className="content">
                <StationTimes
                    station={this.state.selectedStation}
                />
                <LineSelector
                    onLineSelected={this.onLineSelected.bind(this)}
                />
                <SearchBar
                    currentStationList={currentStations}
                    selectedLine={this.state.selectedLine}
                    onValueUpdated={this.onSearchUpdated.bind(this)}
                />
            </div>
        );

        if (!this.state.dataWasFetched) {
            content = (
                <div className="spinner">
                    <div className="double-bounce1"></div>
                    <div className="double-bounce2"></div>
                </div>
            )
        }

        if (this.state.error) {
            content = (
                <div className="content">
                    <p className="error">
                        {this.state.error}
                    </p>
                </div>
            );
        }

        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>Select a station to view times</p>
                </header>
                {content}
            </div>
        );
    }
}

export default App;
