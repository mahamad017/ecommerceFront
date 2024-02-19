import { useContext, useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import Table from 'react-bootstrap/Table';
import Api from "../../../tools/api";
import { AppContext } from "../../layout/Layout";

export default function MyOrdersPage() {
    const appContext = useContext(AppContext);
    const [orders, setOrders] = useState([]);
    const [cookies] = useCookies(['token']);
    const token = cookies.token;

    useEffect(() => {
        getOrders();
    }, []);
    
    const getOrders = async () => {
        try {
            const response = await Api.fetch({
                url: 'orders',
                method: "GET",
                token: token,
            });
            if (response != null) {
            setOrders(response.data)
            }
        } catch (error) {
            console.error(error);
            appContext.showPopup("An error occurred. Please try again later.");
            }
    };
    
    return <>
        <Table bordered hover variant="dark" responsive="xl" className='mt-3'>
        <thead>
            <tr>
            <th>#</th>
            <th>total</th>
            <th>date</th>
            </tr>
        </thead>
        <tbody>
            {orders && orders.map((order, index) => (
            <tr key={index}>
                <td>{index}</td>
                <td>{order.total}</td>
                <td>{order.date}</td>
            </tr>
            ))}
        </tbody>
            </Table>
        </>
}