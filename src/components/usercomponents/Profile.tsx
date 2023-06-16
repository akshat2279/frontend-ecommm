import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { updateUser } from "../../services/product";
import { loginuser } from "../../state/actions/AuthAction";

import { IUser } from "../../Interfaces/user/ProfileInterface";

import "../usercomponents/styles/InputStyle.css";
import "./styles/address.css";

const Profile = () => {
  const loginstate = useSelector((state: any) => state.savelogin);
  const dispatch = useDispatch();

  const [locals, setlocal] = useState<any>();
  const [disable, setdisable] = useState(false);
  const [user, setuser] = useState<IUser>({
    FirstName: "",
    LastName: "",
    Email: "",
    image: "",
    Phone: "",
  });

  useEffect(() => {
    const userData = localStorage.getItem("userdata") || "";
    const user = JSON.parse(userData);
    setlocal(user);
  }, []);

  // convert image to base64
  const handleImageUpload = (event: any) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base = event.target?.result;
        setuser({ ...user, image: base });
      };
      reader.readAsDataURL(file);
    }
  };

  // handle form data onchange
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setuser({ ...user, [name]: value });
  };

  //update user api call
  const submitedit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setdisable(true);
    const userData: any = localStorage.getItem("userdata") || {};
    const parsedUser: any = JSON.parse(userData);
    const Email = parsedUser.Email;

    user.Email = Email;
    user.FirstName = user.FirstName || parsedUser.FirstName;
    user.LastName = user.LastName || parsedUser.LastName;
    user.Phone = user.Phone || parsedUser.Phone;
    user.image = user.image || loginstate.image;

    await updateUser({ user });
    dispatch(loginuser(user));
    setuser({ FirstName: "", LastName: "", Email: "", image: "", Phone: "" });
    setdisable(false);
  };

  return (
    <div>
      <NavLink to="/home">back</NavLink>
      <br />
      <div>
        <h4>Profile</h4>
        <form onSubmit={submitedit}>
          <div>
            <img
              src={loginstate?.state?.image}
              style={{ width: 50, height: 40 }}
            />
            <br />

            <label>FirstName</label>
            <br />
            <input
              className="input-style"
              type="text"
              value={user.FirstName}
              name="FirstName"
              placeholder={loginstate?.state?.FirstName}
              onChange={handleChange}
            ></input>
            <br />

            <label>LastName</label>
            <br />
            <input
              className="input-style"
              type="text"
              value={user.LastName}
              name="LastName"
              placeholder={loginstate?.state?.LastName}
              onChange={handleChange}
            ></input>
            <br />

            <label>Email</label>
            <br />
            <input
              className="input-style"
              type="text"
              value={user.Email}
              placeholder={locals?.Email}
              readOnly
            ></input>
            <br />

            <label>Phone</label>
            <br />
            <input
              className="input-style"
              type="text"
              name="Phone"
              value={user.Phone}
              placeholder={loginstate?.state?.Phone}
              onChange={handleChange}
            ></input>
            <br />

            <label>Image</label>
            <br />
            <input
              src={loginstate?.state?.image}
              className="input-style"
              type="file"
              accept="image/*"
              onChangeCapture={handleImageUpload}
              alt="profile"
            ></input>

            <br />
            <br />
            <input
              className="button"
              disabled={disable}
              type="submit"
              value="Submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
