import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FormControl, FormHelperText } from 'material-ui/Form'
import TextField from 'material-ui/TextField'
import { withStyles } from 'material-ui/styles'
import Dialog from 'material-ui/Dialog'
import AppBar from 'material-ui/AppBar'
import Slide from 'material-ui/transitions/Slide'
import IconButton from 'material-ui/IconButton'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import CloseIcon from 'material-ui-icons/Close'
import { connect } from 'react-redux'
import { editTweetValue, closeTweet } from '../../actions'
import TwitterService from '../../services/twitter'

const styles = {
  root: {
    width: '100%',
    marginBottom: 20
  },
  pomp: {
    color: '#333',
    textAlign: 'center'
  },
  pompHeading: {
    paddingTop: '0.5em',
    fontSize: '3rem'
  },
  pompCount: {
    paddingTop: '0.25em',
    marginBottom: '0.5em',
    fontSize: '10rem',
    fontStyle: 'italic'
  }
}

class Tweet extends Component {
  constructor (props) {
    super(props)

    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleKeyPress (e) {
    if (e.shiftKey && e.key === 'Enter') {
      e.preventDefault()
      TwitterService.postTweet(this.props.tweetValue.trim())
        .catch(error => console.log(error))
    }
  }

  handleChange (e) {
    this.props.editTweetValue(e.target.value)
  }

  render () {
    let error = false

    if (this.props.tweetValue.length > 140) {
      error = true
    }

    const { classes } = this.props

    return (
      <Dialog
        fullScreen
        open={this.props.isOpenTweet}
        onRequestClose={this.props.closeTweet}
        transition={<Slide direction="up" />}
      >
        <AppBar>
          <Toolbar>
            <IconButton color="contrast" onClick={this.props.closeTweet} aria-label="Close">
              <CloseIcon />
            </IconButton>
            <Typography type="title" color="inherit">
              Tweet
            </Typography>
          </Toolbar>
        </AppBar>

        <FormControl
          className={classes.root}
          error={error}
          style={{ paddingTop: 56 }}
        >
          <TextField
            id="multiline-flexible"
            label="Tweet"
            multiline
            rowsMax="4"
            value={this.props.tweetValue}
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
          />

          <FormHelperText>
            ( Shift + Enter ) {this.props.tweetValue.length} / 140
          </FormHelperText>
        </FormControl>
      </Dialog>
    )
  }
}

Tweet.propTypes = {
  classes: PropTypes.object,
  tweetValue: PropTypes.string.isRequired,
  editTweetValue: PropTypes.func.isRequired,
  closeTweet: PropTypes.func.isRequired,
  isOpenTweet: PropTypes.bool.isRequired
}

const mapStateToProps = state => {
  return {
    tweetValue: state.tweetValue,
    isOpenTweet: state.isOpenTweet
  }
}

const mapDispatchToProps = {
  editTweetValue,
  closeTweet
}

const styled = withStyles(styles)(Tweet)

export default connect(mapStateToProps, mapDispatchToProps)(styled)
