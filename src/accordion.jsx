import React, {Component, PureComponent} from 'react';

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

class Section extends PureComponent
{
    constructor(props) {
        super(props);
        this.state = {
            height: null,
        };
    }

    detectHeight() {
        this.hidden.style.transition = "none";
        this.setState({height: this.content.offsetHeight+"px"});
    }

    componentDidMount() {
        this.detectHeight();
        window.addEventListener("resize", this.detectHeight.bind(this), false);
    }

    componentDidUpdate() {
        this.hidden.style.transition = "height .5s"
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
                        contentRef={el => this.content = el}
                        hiddenRef={el => this.hidden = el}
                        text = {text}
                    />
                </div>
            </div>

        );
    }
}

const Hidden = ({text, height, contentRef, hiddenRef}) => {
    return(
        <div
            ref={hiddenRef}
            style={{height: height}}
            className="accordion__hidden">
            <div className="accordion__content" ref={contentRef}>
                <p className="accordion__text">{text}</p>
            </div>
        </div>
    );
};