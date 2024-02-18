import { useContext,useEffect } from "react";
import { AppContext } from "../../layout/Layout";
import { Button } from "react-bootstrap";
import Api from "../../../tools/api";

export default function Cart() {
  const appContext = useContext(AppContext);
  const cart = appContext.cart;
  const sendOrder = async () => {
  try {
            const response = await Api.fetch({
            url: `orders`,
            method: "POST",
            body: cart,
            showPopup: appContext.showPopup,
            });
            console.log(response)
            if (response != null) {
            appContext.showPopup(response.message);
            }
        } catch (error) {
            console.error(error);
            appContext.showPopup("An error occurred. Please try again later.");
            }
        window.location.href = '/'
    };
  useEffect(() => {
    console.log('cart in component:', appContext.cart);
  }, [appContext.cart]);
  return (
    <div>
      {cart == null || cart.length === 0 ? (
        <h1>No Product has been found!</h1>
      ) : (
        <div>
          {cart.map((product, index) => (
            <div key={index}>
              <p>{product.name}</p>
              <p>price: {product.price}$</p>
            </div>
          )) }
          <Button variant="success" onClick={() => {sendOrder()}}>submit</Button>
        </div>
      )}
    </div>
  );
}