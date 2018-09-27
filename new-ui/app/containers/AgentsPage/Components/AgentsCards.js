import React from 'react';
import { FormattedMessage } from 'react-intl';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Card, CardContent, CardHeader, Menu, MenuItem, Dialog, DialogActions, DialogContent, DialogContentText, Button, Slide }  from '@material-ui/core';
import { Link } from 'react-router-dom';

import messages from '../messages';
import menuIcon from '../../../images/menu-icon.svg';
import trashIcon from '../../../images/trash-icon.svg';

const styles = {
    cardsContainer: {
      maxWidth: '990px'
    },
    newAgentCard: {
      border: '1px solid #00bd6f',
      height: '205px',
      width: '205px'
    },
    newAgentCardContent: {
      color: '#00bd6f',
      fontSize: '18px',
      fontFamily: 'Montserrat',
      height: '100%',
      width: '100%',
      alignItems: 'center',
      display: 'grid',
      textAlign: 'center'
    },
    agentCard: {
      border: '1px solid #a2a7b1',
      height: '205px',
      width: '205px'
    },
    agentCardHeader: {
      color: '#4e4e4e',
      fontSize: '22px',
      fontFamily: 'Montserrat',
      textAlign: 'left'
    },
    agentCardContent: {
      color: '#979797',
      fontSize: '14px',
      fontFamily: 'Montserrat',
      textAlign: 'left',
      paddingTop: 0,
    },
    emptyCard: {
      border: 0,
      height: 0,
      width: 245,
      backgroundColor: 'transparent'
    },
    link:{
        textDecoration: 'none'
    },
    menuIcon: {
        float: 'right',
        marginTop: '23px',
        marginRight: '20px',
        cursor: 'pointer',
    },
    trashIcon: {
        position: 'relative',
        top: '2px',
        marginRight: '5px'
    },
    deleteLabel: {
        fontSize: '12px',
        position: 'relative',
        bottom: '2px'
    },
    deleteMessage: {
        color: '#4e4e4e',
        fontSize: '18px',
    },
    deleteQuestion: {
        color: '#4e4e4e',
        fontSize: '14px',
    },
    dialog: {
        border: '1px solid #4e4e4e',
    },
    dialogContent: {
        backgroundColor: '#f6f7f8',
        borderBottom: '1px solid #4e4e4e'
    },
    dialogContentGrid: {
        margin: '40px 0px'
    },
    dialogActions: {
        height: '105px',
        overflowX: 'hidden'
    }
};

function Transition(props) {
    return <Slide direction="up" {...props} />;
  }

/* eslint-disable react/prefer-stateless-function */
class AgentsCards extends React.Component {

    state = {
        selectedAgent: null,
        openDeleteMenu: false,
        openDeleteDialog: false,
        anchorEl: null,
    }

    render(){
        const { anchorEl } = this.state;
        const { classes, agents } = this.props;
        return (
            <Grid className={classes.cardsContainer} justify={window.window.innerWidth < 675 ? 'center' : 'space-between'} container spacing={40}>
                    <Menu
                        id="long-menu"
                        anchorEl={anchorEl}
                        open={this.state.openDeleteMenu}
                        onClose={() => {
                            this.setState({
                                selectedAgent: null,
                                openDeleteMenu: false,
                                anchorEl: null,
                            });
                        }}
                        PaperProps={{
                            style: {
                                maxHeight: 45,
                                overflowY: 'hidden'
                            },
                        }}
                    >
                        <MenuItem onClick={() => {
                            this.setState({
                                openDeleteMenu: false,
                                openDeleteDialog: true,
                                anchorEl: null,
                            });
                        }}>
                            <span className={classes.deleteLabel} >
                                <img className={classes.trashIcon} src={trashIcon}></img>Delete
                            </span>
                        </MenuItem>
                    </Menu>
                    <Dialog
                        open={this.state.openDeleteDialog}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={() => {
                            this.setState({
                                openDeleteDialog: false,
                                selectedAgent: null,
                            });
                        }}
                        maxWidth='xs'
                        className={classes.dialog}
                    >
                        <DialogContent className={classes.dialogContent}>
                            <Grid className={classes.dialogContentGrid}>
                                <DialogContentText>
                                    <span className={classes.deleteMessage}><FormattedMessage {...messages.deleteMessage}/></span>
                                </DialogContentText>
                                <DialogContentText>
                                    <br/><span className={classes.deleteQuestion}><FormattedMessage {...messages.deleteQuestion}/></span>
                                </DialogContentText>
                            </Grid>
                        </DialogContent>
                        <DialogActions className={classes.dialogActions}>
                            <Grid container justify='center' spacing={24}>
                                <Grid item>
                                    <Button variant='raised' onClick={() => {
                                        this.setState({
                                            openDeleteDialog: false,
                                            selectedAgent: null,
                                        });
                                    }}>
                                        <FormattedMessage {...messages.no}/>
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button onClick={() => {
                                        this.props.onDeleteAgent(this.state.selectedAgent);
                                        this.setState({
                                            selectedAgent: null,
                                            openDeleteDialog: false,
                                        });
                                    }}>
                                        <FormattedMessage {...messages.delete}/>
                                    </Button>
                                </Grid>
                            </Grid>
                        </DialogActions>
                    </Dialog>
                    <Grid key='newAgentCard' item>
                        <Link to='/agent/create' className={classes.link}>
                            <Card className={classes.newAgentCard}>
                            <CardContent className={classes.newAgentCardContent}>
                                <FormattedMessage {...messages.createAgent}/>
                            </CardContent>
                            </Card>
                        </Link>
                    </Grid>
                    {agents.map((agent, index) => {

                        return (
                            <Grid key={`agentCard_${index}`} item>
                                    <Card className={classes.agentCard}>
                                        <img
                                            id={`menu_${index}`}
                                            className={classes.menuIcon}
                                            src={menuIcon}
                                            onClick={(evt) => {
                                                this.setState({
                                                    selectedAgent: agent.id,
                                                    openDeleteMenu: true,
                                                    anchorEl: evt.currentTarget,
                                                });
                                            }}
                                        >
                                        </img>
                                        <CardHeader className={classes.agentCardHeader} title={agent.agentName}/>
                                        <CardContent className={classes.agentCardContent}>{agent.description}</CardContent>
                                    </Card>
                            </Grid>
                        );
                    })}
                {[
                    <Grid key="emptyCard_1" className={classes.emptyCard} />,
                    <Grid key="emptyCard_2" className={classes.emptyCard} />,
                    <Grid key="emptyCard_3" className={classes.emptyCard} />
                ]}
            </Grid>
        )
    }
};

AgentsCards.propTypes = {
    classes: PropTypes.object.isRequired,
    agents: PropTypes.array.isRequired,
    onDeleteAgent: PropTypes.func,
};

export default withStyles(styles)(AgentsCards);