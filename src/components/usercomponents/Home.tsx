import { useEffect, useState } from 'react'
import { getCat } from '../../services/category';
import { NavLink } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSelector, useDispatch } from 'react-redux';

import { addToCart, addCustomProduct, cart } from '../../services/product';

import { plus } from '../../state/actions';
import { addcart } from '../../state/actions/CartAction';

import { ICart, Icategory } from '../../Interfaces/admin/AdminInterface';
import Loader from '../comman/loaders/Loader';
import { debounce } from 'lodash';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import './styles/home.css'

const Home = () => {
  const userData = localStorage?.getItem('userdata') || "";
  const user = JSON.parse(userData);
  const userId = user?._id;

  const mystate = useSelector((state: any) => state.change);
  const dispatch = useDispatch();

  const [cat, setcat] = useState<Icategory[]>([]);
  const [cdata, setData] = useState<ICart[]>([]);
  const [counts, setCounts] = useState<{ [key: string]: number }>({});
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState(false);
  const [disable, setdisable] = useState<string>("");


  useEffect(() => {
    const fetchData = async (page: number) => {
      try {
        setLoading(true);
        const re = await addCustomProduct(undefined, undefined, { page });
        if (re?.data?.data) {
          if (page === 1) {
            setData(re?.data?.data);
            setLoading(false);
          }
          else {
            setData((prevProducts: any) => [...prevProducts, ...re?.data?.data]);
            if (re.data.data.length === 0) {
              setHasMore(false); // Set hasMore to false if no more data is returned
            }
          }
        } else {
          setHasMore(false);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData(page);
  }, [page]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const re = await getCat();
        setcat(re?.data?.data);
        const rew = await cart({ userid: userId });
        if (rew?.data?.data) {
          const sumOfQuantities = rew?.data?.data.reduce((sum: number, current: any) => sum + current.quantity, 0);
          dispatch(plus(sumOfQuantities));
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

const name = 'no';
const category = "no";
  // fuction call to get selected category product
  const query = async (data: string | undefined) => {
    setLoading(true)
    const result = await addCustomProduct(data,name );
    setLoading(false);
    setData(result?.data?.data);
  }

  // fuction to search product
  const searchName = async (name?: string) => {

    const result = await addCustomProduct(category, name);
    setData(result?.data?.data);
  }

  const debouncedSearchName = debounce(searchName, 1000);

  function handleKeyDown(event: any) {
    {
      const logvalue = event.target.value;
     
      debouncedSearchName(logvalue);
    }
  }

  // function to add cart item
  const addtocart = async (productId: string) => {
    setdisable(productId)
    let cartData = {
      product: productId,
      user: userId,
      quantity: counts[productId] || 0
    }

    if (cartData.quantity === 0) {
      cartData.quantity = 1
    }
    dispatch(addcart(cartData.quantity));
    await addToCart(cartData);
   
    
    toast.success("item added to cart");

    //redux cart quantity
    const rew = await cart({ userid: userId });
    if (rew?.data?.data) {
      const sumOfQuantities = rew?.data?.data.reduce((sum: number, current: any) => sum + current.quantity, 0);
      dispatch(plus(sumOfQuantities));
    }
    setdisable('');
  }

  // plus cart
  const incrementCount = (productId: string) => {
    setCounts((prevCounts) => ({
      ...prevCounts,
      [productId]: (prevCounts[productId] || 0) + 1
    }));
  };

  //minus cart
  const decrementCount = (productId: string) => {
    setCounts((prevCounts) => ({
      ...prevCounts,
      [productId]: Math.max((prevCounts[productId] || 1) - 1, 0)
    }));
  };
  
  //on logout
  const handleLogout = () => {
    toast("bye 😊😊");
    localStorage.clear();
  };

  return (
    <div className="">
      <NavLink to="/login" onClick={handleLogout} >logout</NavLink><br />
      <NavLink to="/cart" replace>cart{mystate.state}</NavLink><br />
      <NavLink to="/profile" >profile</NavLink><br />
      <NavLink to="/address">Address</NavLink><br />

      <select className="input"
        onChange={(e) => {
          const getvalue = e.target.value;
          const selectedOption = cat.find((ele) => ele.name === e.target.value);
          const selectedId = selectedOption ? selectedOption._id : undefined;
          query(selectedId);
        }}
      >
        <option >Select an option</option>
        {cat?.map((ele, index: number) => {
          return <option key={index}>{ele.name}</option>;
        })}
      </select>

      <input className='input' type="text" placeholder='enter name' required onChange={handleKeyDown}></input>

      <InfiniteScroll
        dataLength={cdata?.length}
        next={() => setPage(page + 1)}
        hasMore={hasMore}
        loader={loading && <Loader />}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {cdata && cdata.map((ele: any, index: number) => {
          const productId = ele._id;
          const count = counts[productId] || 0;

          return (

            <div className='movie' key={index} >

              <div className='movie'>
                <img src={ele.image} />
              </div>

              <div>
                <p>{ele.name}</p>
              </div>

              <div>
                <span>price:{ele.price}</span>
                <h3>description:{ele.description}</h3>
                <button disabled={disable === ele._id} onClick={() => addtocart(ele._id)}> add to cart</button>
                <button onClick={() => incrementCount(productId)}> +</button>
                <h1>{count}</h1>
                <button onClick={() => decrementCount(productId)}>-</button>
              </div>
            </div>
          )
        })}
      </InfiniteScroll>
    </div>
  )
}
export default Home