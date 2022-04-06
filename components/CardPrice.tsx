import {useState, Fragment, useEffect} from 'react';
import {Alert} from 'react-bootstrap';

export default function CardPrice(params: {id: string}) {
    const [price, setPrice] = useState<number>(-1);
    const { id } = params;

    useEffect((() => {
        setPrice(-1);
        fetch(`${process.env.NEXT_PUBLIC_SMOLBLOG_API_BASE}card/${id}/usercollections`)
            .then(response => response.json())
            .then(body => setPrice(body.price))
            .catch(error => console.error(error));
    }), [id])

    if ( price < 0 ) return <Fragment />;

    return (
        <Alert variant="success">Today&apos;s market price: {`\$${price}`}</Alert>
    );
}