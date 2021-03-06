import React, {Component} from "react";
import {connect} from "react-redux";
import {NavLink} from "react-router-dom"
import {Card, CardHeader, CardText, Dialog, FlatButton, RaisedButton, TextField} from "material-ui";
import {apiAuthenticate, apiGetAccountInformation} from "../../actions/user-actions";
import {colors, dimensions, pages} from "../../util/constants";
import {strings} from "../../strings";
import "animate.css";

const styles = {
    card: {
        width: dimensions.formCardWidth,
        margin: "auto",
        marginTop: dimensions.formCardMarginTop,
    },
    cardHeader: {
        backgroundColor: colors.primaryColor,
    },
    cardBody: {
        padding: dimensions.bigSpacing,
        paddingTop: dimensions.defaultSpacing,
    },
    textField: {
        borderColor: colors.primaryColor,
        color: colors.primaryColor,
        width: "100%",
    },
    button: {
        marginTop: dimensions.bigSpacing,
        width: "100%",
    },
    actionLinksContainer: {
        marginTop: dimensions.defaultSpacing,
        color: colors.hint,
    },
};

class Login extends Component {
    constructor(props) {
        super(props);
        this.authenticate = this.authenticate.bind(this);
        this.getAccountInformation = this.getAccountInformation.bind(this);
        this.handleLoginSuccessful = this.handleLoginSuccessful.bind(this);

        let dialogTitle;
        let dialogMessage;
        let param = this.props.history.location.search;
        switch (param) {
            case pages.paramRegistered:
                dialogTitle = strings.registered;
                dialogMessage = strings.registeredSuccessfully;
                break;

            case pages.paramRecoveryInitiated:
                dialogTitle = strings.recoveryInitiated;
                dialogMessage = strings.recoveryInitiatedSuccessfully;
                break;

            case pages.paramRecovered:
                dialogTitle = strings.recoverCompleted;
                dialogMessage = strings.recoverCompletedSuccessfully;
                break;

            default:
                dialogTitle = "";
                dialogMessage = "";
        }

        this.state = {
            username: "",
            password: "",
            failAnimationActive: false,
            loginOngoing: false,
            param: param,
            dialogTitle: dialogTitle,
            dialogMessage: dialogMessage,
            authenticated: false,
        };
    }

    componentWillReceiveProps(nextProps) {
        let authenticated = nextProps.user.token !== undefined;
        let loginSuccessful = nextProps.user.mail !== undefined;

        if (loginSuccessful) {
            this.handleLoginSuccessful();
        } else if (authenticated) {
            this.handleAuthenticationSuccessful();
        } else {
            this.handleLoginFailed();
        }
    }

    // send login request to api
    authenticate() {
        this.props.authenticate(this.state.username, this.state.password);
        this.setState({
            loginOngoing: true,
        });
    }

    getAccountInformation() {
        this.props.getAccountInformation()
    }

    handleAuthenticationSuccessful() {
        this.setState({
            authenticated: true,
        });
        this.props.getAccountInformation();
    }

    handleLoginSuccessful() {
        this.props.history.push(pages.root);
    }

    handleLoginFailed() {
        this.setState({
            password: "",
            failAnimationActive: true,
            loginOngoing: false,
            authenticated: false,
        });
    }

    onUsernameChanged = (event) => {
        this.setState({
            username: event.target.value,
        });
    };

    onPasswordChanged = (event) => {
        this.setState({
            password: event.target.value,
        });
    };

    onKeyPress = (event) => {
        if (event.key === "Enter") {
            this.authenticate();
        }
    };

    onAnimationEnd = () => {
        this.setState({
            failAnimationActive: false,
        });
    };

    handleCloseDialog = () => {
        this.setState({
            param: undefined,
        });
    };

    render() {
        const actions = [
            <FlatButton
                label={strings.ok}
                primary={true}
                keyboardFocused={true}
                onClick={this.handleCloseDialog}
            />,
        ];
        return (
            <div>
                {!this.state.authenticated &&
                <Card className={this.state.failAnimationActive ? "shake animated" : ""}
                      onAnimationEnd={this.onAnimationEnd}
                      style={styles.card}>
                    <CardHeader title={strings.login} style={styles.cardHeader} titleColor={colors.light}/>
                    <CardText style={styles.cardBody}>
                        <TextField value={this.state.username}
                                   onChange={this.onUsernameChanged}
                                   onKeyPress={this.onKeyPress}
                                   style={styles.textField}
                                   floatingLabelText={strings.username}
                                   underlineFocusStyle={styles.textField}
                                   floatingLabelFocusStyle={styles.textField}/>
                        <br/>
                        <TextField value={this.state.password}
                                   onChange={this.onPasswordChanged}
                                   onKeyPress={this.onKeyPress}
                                   type="password"
                                   style={styles.textField}
                                   floatingLabelText={strings.password}
                                   underlineFocusStyle={styles.textField}
                                   floatingLabelFocusStyle={styles.textField}/>
                        <br/>
                        <RaisedButton label={strings.ok}
                                      primary={true}
                                      onClick={this.authenticate}
                                      disabled={this.state.loginOngoing}
                                      style={styles.button}/>
                        <div style={styles.actionLinksContainer}>
                            <span>{strings.forgotPassword} </span>
                            <NavLink exact to={pages.resetPassword}>{strings.resetPassword}</NavLink>
                            <br/>
                            <span>{strings.noAccountYet} </span>
                            <NavLink exact to={pages.registration}>{strings.registration}</NavLink>
                        </div>
                    </CardText>
                </Card>}
                < Dialog
                    title={this.state.dialogTitle}
                    actions={actions}
                    modal={false}
                    open={!!this.state.param}
                    onRequestClose={this.handleCloseDialog}>
                    {this.state.dialogMessage}
                </Dialog>

            </div>
        );
    }
}

// subscribes store to Login.props
const mapStateToProps = state => {
    return {
        user: state.user
    }
};

const mapActionsToProps = {
    authenticate: apiAuthenticate,
    getAccountInformation: apiGetAccountInformation,
};

export default connect(mapStateToProps, mapActionsToProps)(Login);