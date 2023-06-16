import { useEffect, useReducer, useState } from 'react'
import { addresss, deleteAddress, getAddress } from '../../services/user/user';

import { NavLink } from 'react-router-dom';
import { IAddress } from '../../Interfaces/user/AddressInterface';
import Loader from '../comman/loaders/Loader';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles/address.css'

const Address = () => {
    const userData:any = localStorage.getItem("userdata") || "";
    const parsedUser:any = JSON.parse(userData);
    const id = parsedUser._id;

    const [user, setuser] = useState<IAddress>({ home: "", street: "", area: "", city: "", state: "", pincode: "", country: "" });
    const [address, setaddress] = useState([]);
    const [loading, setloading] = useState(true);
    const [disable, setdisable] = useState(false);
    const [form, setform] = useState(false);
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

    const [homeValid, setHomeValid] = useState(false);
    const [streetValid, setStreetValid] = useState(true);
    const [areaValid, setAreaValid] = useState(true);
    const [cityValid, setcityValid] = useState(true);
    const [pincodeValid, setpincodeValid] = useState(true);
    const [stateValid, setstateValid] = useState(true);
    const [countryValid, setcountryValid] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const re = await getAddress({ user: id });
                if (true) {
                    setaddress(re?.data?.data?.address);
                    setloading(false);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [ignored]);


    //onchange for input
    const handleChange: any = (e: any) => {

        const { name, value } = e.target;
        setuser({ ...user, [name]: value });
        
        let isValid = false;
        switch (name) {
            case "home":
                isValid = value.length !== 0 && !isNaN(value);
                setHomeValid(isValid);
                break;
            case "street":
                isValid = value.trim() !== "" && !isNaN(value);
                setStreetValid(isValid);
                break;
            case "area":
                isValid = value.trim() !== "";
                setAreaValid(isValid);
                break;
            case "city":
                isValid = value.trim() !== "";
                setcityValid(isValid);
                break;
            case "pincode":
                isValid = value.trim() !== "" && !isNaN(value);
                setpincodeValid(isValid);
                break;
            case "state":
                isValid = value.trim() !== "";
                setstateValid(isValid);
                break;
            case "country":
                isValid = value.trim() !== "";
                setcountryValid(isValid);
                break;
            default:
                break;
        }
    }

    // add address form submit
    const submitadd = async (e: any) => {
        e.preventDefault();

       if (
            !homeValid ||
            !streetValid ||
            !areaValid ||
            !cityValid ||
            !pincodeValid ||
            !stateValid ||
            !countryValid
        ) {
            return;
        }

        setdisable(true);
        user.user = id;
        const result = await addresss([user]);
        forceUpdate();
        toast.success('address added');
        if (result) {
            setdisable(false);
            setuser({ home: "", street: "", area: "", city: "", state: "", pincode: "", country: "" });
        }
    }

    // delete address
    const addressDelete = async (index: number) => {
        setdisable(true);
        await deleteAddress(id, index);
        forceUpdate();
        toast.success('address deleted');
        setdisable(false);
    }


    return (
        <>
            {loading && <Loader />}
            <NavLink to="/home">back</NavLink><br />
            <div>Address </div>

            <div>
                <button className="button" onClick={() => setform(!form)}>{form ? 'close' : 'add address'}</button>
                {form && (
                    <form onSubmit={submitadd}>
                        <label>Home</label>
                        <br />
                        <input className="input-style"
                            type="text"
                            name="home"
                            value={user.home}
                            onChange={handleChange}></input><br />
                        {!homeValid && <span className="error-message">Please enter a valid home.</span>}
                        <br />

                        <label>StreetNo</label>
                        <br />
                        <input className="input-style"
                            type="text"
                            name="street"
                            value={user.street}
                            onChange={handleChange} ></input><br />
                        {!streetValid && <span className="error-message">Please enter a valid streetno.</span>}
                        <br />

                        <label>Area</label>
                        <br />
                        <input className="input-style"
                            type="text"
                            name="area"
                            value={user.area}
                            onChange={handleChange} ></input><br />
                        {!areaValid && <span className="error-message">Please enter a valid area</span>}
                        <br />

                        <label>City</label>
                        <br />
                        <input className="input-style"
                            type="text"
                            name="city"
                            value={user.city}
                            onChange={handleChange} ></input><br />
                        {!cityValid && <span className="error-message">Please enter a valid city</span>}
                        <br />

                        <label>Pin Code</label>
                        <br />
                        <input className="input-style"
                            type="text"
                            name="pincode"
                            value={user.pincode}
                            onChange={handleChange} ></input><br />
                        {!pincodeValid && <span className="error-message">Please enter a valid pincode</span>}
                        <br />

                        <label>State</label>
                        <br />
                        <input className="input-style"
                            type="text"
                            name="state"
                            value={user.state}
                            onChange={handleChange} ></input><br />
                        {!stateValid && <span className="error-message">Please enter a valid state</span>}
                        <br />

                        <label>Country</label>
                        <br />
                        <input className="input-style"
                            type="text"
                            name="country"
                            value={user.country}
                            onChange={handleChange} ></input><br />
                        {!countryValid && <span className="error-message">Please enter a valid country</span>}
                        <br />
                        <br />
                        <input className="button" disabled={disable} type="submit" value="Submit" />
                    </form>
                )}
            </div>

            {address && address.map((ele:any, index: number) => {
                return (
                    <div key={index}>
                        <br />
                        <p>area:{ele.area}</p>
                        <p>city:{ele.city}</p>
                        <p>country:{ele.country}</p>
                        <p>home:{ele.home}</p>
                        <p>pincode:{ele.pincode}</p>
                        <p>state:{ele.state}</p>
                        <p>street:{ele.street}</p>
                        <button disabled={disable} onClick={() => addressDelete(ele?._id)}>delete</button>
                    </div>
                )
            })}
        </>
    )
}

export default Address