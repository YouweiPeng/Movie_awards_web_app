import {hideAlert } from '../store/slices/interfaceSlice';
import AlertTitle from '@mui/material/AlertTitle';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useDispatch, useSelector } from 'react-redux';
const AlertMsg = () => {
    const dispatch = useDispatch();
    const { visible, message, severity } = useSelector(state => state.interfaceSlice.alert);
    return (  
        <Snackbar
        open={visible}
        autoHideDuration={1500}
        onClose={() => dispatch(hideAlert())}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
        <Alert                     
            onClose={() => dispatch(hideAlert())} 
            severity={severity}
            sx={{
                width: '400px',
                padding: '16px',
                fontSize: '1.2rem',
            }}>
        <AlertTitle>{severity}</AlertTitle>
            {message}
        </Alert>
    </Snackbar>
    );
}
 
export default AlertMsg;