/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */
// @flow
import React, { useEffect, memo } from 'react';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import ContainerDimensions from 'react-container-dimensions';
import GridLayout from 'react-grid-layout';
import './grid.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import { useInjectSaga } from '../../utils/injectSaga';
import { useInjectReducer } from '../../utils/injectReducer';
import { makeSelectCharacters } from './selectors';
import saga from './saga';
import { fetchCharacters } from './actions';
import reducer from './reducer';
import type {
  CharacterRequestType,
  CharacterResponseDataType,
} from '../../types';
import { ResultType } from '../../types';
import CharacterCard, {
  cardHeight,
  cardWidth,
} from '../../components/CharacterCard';

const key = 'home';
type Props = {
  onFetchCharacters: (request: CharacterRequestType) => void,
  characters: CharacterResponseDataType,
};

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  grid: {
    width: '100%',
  },

  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export function HomePage(props: Props) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const [value, setValue] = React.useState('');
  const classes = useStyles();

  useEffect(() => {
    props.onFetchCharacters({ name: '' });
  }, []);

  const handleInputChange = event => {
    setValue(event.target.value);
    props.onFetchCharacters({ name: event.target.value });
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Marvel Characters List
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              value={value}
              onChange={handleInputChange}
            />
          </div>
        </Toolbar>
      </AppBar>
      <div className={classes.grid}>
        <ContainerDimensions>
          {({ width }) => {
            const columns = Math.floor(width / cardWidth);
            let cardList = null;
            if (props.characters) {
              cardList = props.characters.results.map(
                (r: ResultType, index) => (
                  <div
                    key={`${r.id}`}
                    data-grid={{
                      i: index.toString(),
                      x: index % columns,
                      y: Math.floor(index / columns),
                      w: 1,
                      h: 1,
                    }}
                  >
                    <CharacterCard result={r} />
                  </div>
                ),
              );
            }
            return (
              <GridLayout
                className="layout"
                cols={columns}
                isResizable={false}
                isBounded
                draggableHandle=".drag-handle"
                rowHeight={cardHeight + 10}
                onLayoutChange={() => {}}
                width={width}
                compactType="horizontal"
              >
                {cardList}
              </GridLayout>
            );
          }}
        </ContainerDimensions>
      </div>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  characters: makeSelectCharacters(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onFetchCharacters: req => dispatch(fetchCharacters(req)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HomePage);
