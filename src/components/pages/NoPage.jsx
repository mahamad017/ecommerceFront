import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";


export default function NoPage() {
   
    return (
        <Alert variant="danger" className="mt-5 w-2">
            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
            <p>Sorry, you can't.</p>
        </Alert>
    );
       
}
