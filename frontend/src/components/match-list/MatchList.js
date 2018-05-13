import React, {Component} from 'react';
import Match from "../match/Match";
import {Col, Container, Row} from "react-grid-system";
import {Card, CardActions, CardHeader, CardText, FlatButton} from "material-ui";
import {colors, dimensions} from "../../util/constants";
import {connect} from "react-redux";
import {apiLoadMatchList} from "../../actions/match-list-actions";

function team(name, fifaCode, code) {
    return {
        name: name,
        fifaCode: fifaCode,
        flagImageUrl: require('../../images/flags/' + code + '.svg'),
    };
}

let match = {
    team1: team('Schweiz', 'SUI', 'ch'),
    team2: team('Deutschland', 'GER', 'de'),
    timestamp: 1523372144130,
    stadium: 'Luzhniki-Stadion',
};

const styles = {
    card: {
        margin: dimensions.defaultSpacing,
    },
    cardHeader: {
        backgroundColor: colors.cardHeaderBackground,
    },
    cardBody: {
        paddingBottom: "0",
    },
};

class MatchList extends Component {

    constructor(props) {
        super(props);
        this.buildMatchList = this.buildMatchList.bind(this);
    }

    buildMatchList() {
        this.props.buildMatchList();
    }

    render() {
        return (
            <div>
            
            {this.props.matchList.map((phase, i) => {     
                console.log(phase);                 
                // Return the element. Also pass key     
                //return (<Answer key={i} answer={answer} />) 

                return (<Card style={styles.card}>
                    <CardHeader
                        title={phase.name}
                        actAsExpander={true}
                        showExpandableButton={true}
                        style={styles.cardHeader}
                    />

                    <CardText expandable={true} style={styles.cardBody}>
                        <Row>
                            {phase.games.map((game) => {
                                let match = {
                                    team1: team(game.home.name, game.home.countryFifaCode, 'ch'),
                                    team2: team(game.away.name, game.away.countryFifaCode, 'de'),
                                    timestamp: Date.parse(game.date),
                                    stadium: game.stadium.name,
                                };

                                return <Match match={match}/>

                            })}
                        </Row>
                    </CardText>
                </Card>);

            })}

        </div>

        );
    }
}

const mapStateToProps = state => {
    return {
        matchList: state.matchList
    }
};

const mapActionsToProps = {
    buildMatchList: apiLoadMatchList
};

export default connect(mapStateToProps, mapActionsToProps)(MatchList);