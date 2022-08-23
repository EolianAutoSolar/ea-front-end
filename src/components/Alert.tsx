import * as React from 'react';
import Alert from '@mui/material/Alert';



export interface IAlertProps {
    type: "error" | "warning" | "info" | "success";
    message: string;
}

export default function Alerts(props: IAlertProps) {
    const { type, message } = props;

    return (
        <Alert severity={type}>{message}</Alert>
    );
}