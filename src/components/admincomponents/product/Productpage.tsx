import { useEffect, useReducer, useState } from 'react'
import { getProduct, deleteProduct } from '../../../services/product';
import { NavLink, useNavigate } from "react-router-dom"

import { PIData } from '../../../Interfaces/admin/AdminInterface';

import Loader from '../../comman/loaders/Loader';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../style/AllProducts.css";

// admin all product component
const Productpage = () => {
  const [cdata, setData] = useState<PIData[]>([]);
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [disable, setdisable] = useState(false);
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setloading(true);
        const re = await getProduct();
        setData(re?.data?.data);
        setloading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [ignored]);


  //edit product
  const handleedit = (ele: PIData) => {
    navigate("/product", { state: { ele } });
  }

  //delete product by admin
  const delprd = async (id: string) => {
    setdisable(true)
    let answer = prompt("eneter delete to delete product");
    if (answer === 'delete') {
      await deleteProduct(id);
      toast.success("product deleted");
      setdisable(false);
      forceUpdate();
    } else {
      toast.warn("product not deleted");
      setdisable(false);
    }
  }

  //logout admin
  const handleLogout = () => {
    toast("bye 😊😊");
    localStorage.clear();
  };

  return (
    <>
      <ul>
        <li>
          <NavLink to="/dashboard">ADD Category</NavLink>
        </li>
        <li>
          <NavLink to="/product">ADD Product</NavLink>
        </li>
        <li>
          <NavLink to="/login" onClick={handleLogout}>logout</NavLink>
        </li>
      </ul>
      {loading && <Loader />}
      {cdata && cdata.map((ele:any) => {
        return (
          <div className='movie' key={ele._id} >
            <div className='movie'>
              <img src={ele.image} />
            </div>
            <div>
              <p>{ele.name}</p>
            </div>
            <div>
              <span>price:{ele.price}</span>
              <h3>description:{ele.description}</h3>

              <button disabled={disable} onClick={() => handleedit(ele)}>Edit</button>
              <button disabled={disable} onClick={() => delprd(ele._id)}>Delete</button>
            </div>
          </div>
        )
      })}
    </>
  )
}
export default Productpage