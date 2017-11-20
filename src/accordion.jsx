import React, {Component} from 'react';

import css from "./app.css"

const accordionTrack = [
    {
        id: 1,
        header: "Header for accordion",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna at aliquir. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        id: 2,
        header: "Header for accordion",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        id: 3,
        header: "Header for accordion",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliquaion ullamco laquat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
];


export default class App extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            tracks: accordionTrack,
        };
    }

    render() {
        return(
            <Accordion
                tracks={this.state.tracks}
            />
        );
    }
}

class Accordion extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            openId: null,
        }
    }

    openSection(id) {
        id === this.state.openId ? this.setState({openId: null}) : this.setState({openId: id});
    }

    render() {
        const {tracks} = this.props;
        return(
            <div className="accordion">
                {tracks.map((track) => {
                    return(
                        <Section
                            key={track.id}
                            isOpened={track.id === this.state.openId}
                            text={track.text}
                            id={track.id}
                            openSection={this.openSection.bind(this)}
                            headerText={track.header}
                        />
                    );
                })}
            </div>
        );
    }
}

class Section extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            height: null
        };
    }

    detectHeight() {
        const element = this.hidden;
        element.style.cssText = "position: absolute;" +
            "visibility: hidden;" +
            "height: auto;";
        const height = element.offsetHeight;
        element.removeAttribute("style");
        this.setState({height: height+"px"});
    }

    componentDidMount() {
        this.detectHeight();
        window.addEventListener("resize", this.detectHeight.bind(this), false);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.detectHeight, false);
    }

    render() {
        const { text, openSection, headerText, id, isOpened } = this.props;
        return(
            <div className="accordion__section">
                <div className="accordion__inner">
                    <h3
                        onClick={openSection.bind(null, id)}
                        className="accordion__header">
                        {headerText}
                    </h3>
                    <Hidden
                        height = {isOpened ? this.state.height : '0px'}
                        hiddenRef={el => this.hidden = el}
                        text = {text}
                    />
                </div>
            </div>

        );
    }
}

const Hidden = props => {
    const {text, height, hiddenRef} = props;
    return(
        <div
            style={{height: height}}
            ref={hiddenRef}
            className="accordion__hidden">
            <p className="accordion__text">{text}</p>
        </div>
    );
};