import { useEffect, useReducer, useState } from "react";
import { addToCart, cart, deletCart } from "../../services/product";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import {  toast } from 'react-toastify';

import { plus } from "../../state/actions";

import { ICart } from "../../Interfaces/admin/AdminInterface";

import Loader from '../comman/loaders/Loader';

import "./styles/cart.css";
import 'react-toastify/dist/ReactToastify.css';

const Cart = () => {
  const userData:any = localStorage?.getItem('userdata') || ""
  const parsedUser:any = JSON.parse(userData);
  const userid = parsedUser?._id

  const dispatch = useDispatch();
 
  const [cdata, setData] = useState<ICart[]>([]);
  const [loading,setloading] = useState(false);
  const [disable, setdisable] = useState<number>(-1);
  const [premove, setRemove] = useState<string>("");
  

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setloading(true)
      const re = await cart({ userid: userid });
     
      if (re?.data?.data) {
        setData(re?.data?.data);
        const sumOfQuantities = re?.data?.data.reduce((sum: number, current: any) => sum + current.quantity, 0);
        dispatch(plus(sumOfQuantities));
        setloading(false);
      }  
    } catch (error) {
      console.error(error);
    }};


  //plus quantity
  const PlusQuantity = async (itemId: number, quantityChange: number) => {
   setdisable(itemId);
    const tempStata = cdata;
    tempStata[itemId].quantity = quantityChange + 1;
    setData([...tempStata]);

    const pid =  tempStata[itemId].product;
    const cartItem = {
      product: pid,
      user: userid,
      quantity: tempStata[itemId]?.quantity as number,
    };
    await addToCart(cartItem);  
    await fetchData();
    setdisable(-1);
  }

  //  minus quantity
  const MinusQuantity = async (itemId: number, quantityChange: number) => {
    setdisable(itemId);
    const tempState= cdata;  
    tempState[itemId].quantity = quantityChange -1;
    setData([...tempState]);
    
    
    if(tempState[itemId] && tempState[itemId].quantity === 0){
      const  product = tempState[itemId].product
       const user= tempState[itemId].user
      tempState.splice(itemId,1);
      
      setData([...tempState]);
      await deletCart(user,product)
      
    }     
    else{  
    const pid =  tempState[itemId].product;
    const cartItem = {
      product:pid ,
      user: userid,
      quantity: tempState[itemId]?.quantity as number,
    };
    await addToCart(cartItem);
    setdisable(-1);
    await fetchData();
    }}

  //delete cart item
  const remove = async (item: string) => {
    setRemove(item)
    const de = {
      product: item,
      user: userid
    }
    await deletCart(de.user, de.product);
    toast.success("product removed");
    setRemove("");
    fetchData();
   }

  return (
    <>
      <NavLink to="/home" replace>back</NavLink><br />
      {cdata.length === 0 && <h1>cart is empty</h1>}
      {loading && <Loader/>}
      {cdata &&
        cdata.map((ele:any, index: number) => {
          return (
            <div className="card" key={index}>
                  <div >
                    <div>
                      <img src={ele.item[0].image} className="card-img" />
                      <p>name:{ele.item[0].name}</p>
                      <span>descrption:{ele.item[0].description}</span>
                      <p>price:{ele.item[0].price}</p>

                      <button disabled={premove===ele.item[0]._id} onClick={() => remove(ele.item[0]._id)}>remove</button>
                    </div>
                  </div>  
              <p>quantity:{ele.quantity}</p>
              <button disabled={disable === index} onClick={() => { PlusQuantity(index, ele.quantity) }}>+</button>
              <button  disabled={disable=== index} onClick={() => MinusQuantity(index, ele.quantity)}>-</button>
            </div>
          );
        })}
    </>
  );
};

export default Cart;


