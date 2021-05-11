/**
 *
 * CharacterCard
 *
 */

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
import ExploreIcon from '@material-ui/icons/Explore';
import AudiotrackIcon from '@material-ui/icons/Audiotrack';
import TodayIcon from '@material-ui/icons/Today';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import type { ResultType } from '../../types';

const cardWidth = 250;
const cardHeight = 400;
const useStyles = makeStyles(theme => ({
  root: {
    width: cardWidth,
    height: cardHeight,
  },
  header: {
    height: 80,
  },
  media: {
    height: 200,
    paddingTop: '56.25%', // 16:9
    border: `1px solid grey`,
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  desc: {
    height: 70,
  },
  footer: {
    paddingTop: '5px',
    '& > *': {
      margin: theme.spacing(2),
    },
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));
type Props = {
  result: ResultType,
};

function CharacterCard(props: Props) {
  const classes = useStyles();
  const formatDate = date => {
    const d = new Date(date);
    let month = `${d.getMonth() + 1}`;
    let day = `${d.getDate()}`;
    const year = d.getFullYear();

    if (month.length < 2) month = `0${month}`;
    if (day.length < 2) day = `0${day}`;

    return [year, month, day].join('-');
  };

  const description = props.result.description
    ? props.result.description.substring(0, 50)
    : '';

  const firstLetter = props.result.name
    ? props.result.name.trim().substring(0, 1)
    : 'M';

  const thumbNail = `${props.result.thumbnail.path}.${
    props.result.thumbnail.extension
  }`;

  const compactLength = length => (length > 10 ? '*' : length);
  return (
    <Card className={classes.root}>
      <CardHeader
        className={classes.header}
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {firstLetter}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={props.result.name}
        subheader={formatDate(props.result.modified)}
      />
      <div className="drag-handle">
        <CardMedia
          className={classes.media}
          image={thumbNail}
          title={props.result.name}
        />
      </div>
      <CardContent className={classes.desc}>
        <Typography variant="body2" color="textSecondary" component="p">
          {description}
        </Typography>
      </CardContent>
      <CardActions className={classes.footer}>
        <Badge
          badgeContent={compactLength(props.result.comics.items.length)}
          color="primary"
          overlap="circle"
        >
          <MailIcon />
        </Badge>
        <Badge
          overlap="circle"
          badgeContent={compactLength(props.result.events.items.length)}
          color="secondary"
        >
          <TodayIcon />
        </Badge>
        <Badge
          badgeContent={compactLength(props.result.series.items.length)}
          color="error"
          overlap="circle"
        >
          <AudiotrackIcon />
        </Badge>
        <Badge
          badgeContent={compactLength(props.result.stories.items.length)}
          color="error"
          overlap="circle"
        >
          <ExploreIcon />
        </Badge>
      </CardActions>
    </Card>
  );
}

export default CharacterCard;
export { cardWidth, cardHeight };
