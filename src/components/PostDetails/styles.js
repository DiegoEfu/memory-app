import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  media: {
    borderRadius: '20px',
    objectFit: 'cover',
    width: '90%',
    maxHeight: '600px',
    marginTop: '10px',
    border: 'solid 5px'
  },
  card: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column-reverse',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
      flexDirection: 'column',
    },
  },
  section: {
    borderRadius: '20px',
    margin: '10px',
    flex: 1,
  },
  imageSection: {
    marginLeft: '20px',
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },
  },
  recommendedPosts: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  loadingPaper: {
    display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', borderRadius: '15px', height: '39vh',
  },
  commentsOuterContainer: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent:"center",
    flexDirection: 'column'
  },
  commentsInnerContainer: {
    width: '80%',
    height: '200px',
    marginRight: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent:"center",
    overflow: 'scroll',
    flexDirection: 'column'
  }
}));