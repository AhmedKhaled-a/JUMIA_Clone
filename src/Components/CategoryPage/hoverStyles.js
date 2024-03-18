import { makeStyles } from '@mui/styles';


export const hoverStyles = makeStyles({
    card: {
        transition: '0.3s',
        "&:hover": {
            // height: '500px',
            boxShadow: '4px 4px 4px 4px rgb(0 0 0 / 30%)',
            // padding: 2,
            marginBottom : 4,
            marginRight: 4,
        },
    }
});