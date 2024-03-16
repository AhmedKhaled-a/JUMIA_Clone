import { makeStyles } from "@mui/styles";



const useStyles = makeStyles((theme) => ({
    container : {
        // backgroundColor : '#ffffff',
        padding:theme.spacing(8,0,8),
        display:'flex',
        gap:'2px',
    },
    carousel : {
        width:'100%',
        height: '400px'
    },

}))

export default useStyles;