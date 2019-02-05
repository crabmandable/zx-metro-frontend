import React, { Component } from 'react';
import lineImages from "../../images/lines"
import cancel from "../../images/cancel.png"
import "./LineSelector.css"

class LineSelector extends Component {

    constructor(){
        super();
        this.state = {
            selected: ""
        };
    }

    lineSelected(line) {
        this.setState({
            selected: line,
        });
        this.props.onLineSelected(line);
    }

    buttonClass(key) {
        return "line-selector-button " + (key == this.state.selected ? "selected" : "")
    }

    render() {
        let lineButts = Object.keys(lineImages).map(key => (
            <button
                className={this.buttonClass(key)}
                key={key}
                onClick={this.lineSelected.bind(this, key)}
            >
                <img src={lineImages[key]} className="line-button-img"/>
            </button>
        ));

        lineButts.unshift((
            <button key="none" className={this.buttonClass("")} onClick={this.lineSelected.bind(this, "")}>
                <img src={cancel} className="line-button-img"/>
            </button>
        ));

        return (
            <div className="Line-selector">
                <h5>Filter by line (X means all)</h5>
                {lineButts}
            </div>
        );
    }
}
export default LineSelector;
