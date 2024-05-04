import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);
  const [customername, setCustomername] = useState("");
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("http://localhost:4000/products");
        console.log(res.data);
        setData(res.data);
      } catch (error) {
        console.log("error", error);
      }
    };

    getData();
  }, []);

  const addProduct = async () => {
    try {
      const res = await axios.post("http://localhost:4000/products", {
        customerName: customername,
        product: product,
        quantity: quantity,
        totalPrice: total,
      });
      console.log("post", res.data);
      setData([...data, res.data]);
    } catch (error) {
      console.log("error", error);
    }
    closeModal();
  };

  const closeModal = async () => {
    setCustomername("");
    setProduct("");
    setQuantity(0);
    setTotal(0);
    setModal(false);
  };
  const openModal = async () => {
    setModal(true);
  };

  return (
    <div className="App container-sm">
      <div className="heading alert alert-primary">
        <h1>Dashboard</h1>
      </div>
      <table className="table ">
        <thead>
          <tr>
            <td>Order Id</td>
            <td>Customer Name</td>
            <td>Product</td>
            <td>Quantity</td>
            <td>Total Price</td>
          </tr>
        </thead>
        <tbody>
          {data.map((ele) => (
            <tr key={ele._id}>
              <td>{ele._id}</td>
              <td>{ele.customerName}</td>
              <td>{ele.product}</td>
              <td>{ele.quantity}</td>
              <td>{ele.totalPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={openModal} className="btn btn-outline-primary">Add Order</button>
      {modal && (
        <div className="modal1">
          <input
                type="text"
                className="form-control"
                value={customername}
                onChange={(e) => setCustomername(e.target.value)}
                placeholder="Customer Name"
            />
            <input
                type="text"
                className="form-control"
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                placeholder="Product"
            />
            <input
                type="number"
                className="form-control"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Quantity"
            />
            <input
                type="number"
                className="form-control"
                value={total}
                onChange={(e) => setTotal(e.target.value)}
                placeholder="Total Price"
            />
            <div className="buttons">
                <button className="btn btn-success" onClick={addProduct}>Add</button>
                <button className="btn btn-danger" onClick={closeModal}>Cancel</button>
            </div>
        </div>
      )}
    </div>
  );
}

export default App;
