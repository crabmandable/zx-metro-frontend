import React, { Component } from 'react';
import './SearchBar.css';
import Autosuggest from 'react-autosuggest';
import lineImages from "../../images/lines"

class SearchBar extends Component {
    constructor()
    {
        super();
        this.state = {
            value: '',
            suggestions: [],
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.selectedLine != this.props.selectedLine) {
            this.onSuggestionsFetchRequested(this.state.value)
        }
    }

    onChange = (event, { newValue }) => {
        this.setState({
            value: newValue
        });
        this.props.onValueUpdated(newValue)
    };

    onSuggestionsFetchRequested = ({ value }) => {
        if (value === undefined) value = this.state.value;
        let stations = [];

        if (!value) {
            stations = this.props.currentStationList;
        } else {
            stations = this.props.currentStationList.filter(s => s.name.toLowerCase().indexOf(value.toLowerCase()) > -1);
        }

        this.setState({
            suggestions: stations,
        });
    };

    onSuggestionsClearRequested = () => {
        //do nothing - suggestions shouldnot be cleared
    };

    renderSuggestion(s) {
        let lines = s.lines.map(l => (
            <img key={l} src={lineImages[l]} className="line-dot" alt={l}/>
        ))
        return (
            <div className="suggestion">
                <p className="station-name">{s.name}</p>
                {lines}
            </div>
        );
    }

    shouldRenderSuggestions() {
        return true;
    }

    render() {
        const { value, suggestions } = this.state;

        const inputProps = {
            placeholder: 'Search for a station',
            value,
            onChange: this.onChange
        };

        return (
            <div className="Search-bar">
                <Autosuggest
                    suggestions={suggestions}
                    alwaysRenderSuggestions={true}
                    shouldRenderSuggestions={(() => true)}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    getSuggestionValue={(s) => s.name}
                    renderSuggestion={this.renderSuggestion}
                    inputProps={inputProps}
                />
            </div>
        );
    }
}

export default SearchBar;
