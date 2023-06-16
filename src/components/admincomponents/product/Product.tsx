import { useEffect, useState } from "react";
import { useLocation, NavLink, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { addProduct } from "../../../services/admin/product";
import { getCat } from "../../../services/category";

import { Icategory, PIData } from "../../../Interfaces/admin/AdminInterface";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { productSchema } from "../../../validations/adminyupvalidation/product";

const Product = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const products = location?.state?.ele;

  const [cdata, setData] = useState<Icategory[]>([]);
  const [base, setbase] = useState<string>();
  const [getid, setid] = useState<string | null>("");
  const [pro, setPro] = useState<any>();
  const [disable, setdisable] = useState(false);
  const [product, setproduct] = useState<PIData>({
    category: products?.category,
    description: products?.description,
    image: products?.image,
    name: products?.name,
    price: products?.price,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getCat();
        setData(result?.data?.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  //convert image to base64
  const handleImageUpload = (event: any) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base = event.target?.result;
        setbase(String(base));
      };
      reader.readAsDataURL(file);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PIData>({ resolver: yupResolver(productSchema) });

  const onSubmit: SubmitHandler<PIData> = async (data) => {
    setdisable(true);
    data.image = base || product?.image;
    data.category = getid || product?.category;
    data.id = products?._id;

    await addProduct(data);
    setdisable(false);
    toast.success("product added");
    navigate("/products");
  };

  //form onchange
  const handleChange = (e:  React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setproduct({ ...product, [name]: value });
  };
  
  //logout
  const handleLogout = () => {
    toast("bye 😊😊");
    localStorage.clear();
  };

  return (
    <>
      <ul>
        <li>
          <NavLink to="/dashboard">Add Category</NavLink>
        </li>
        <li>
          <NavLink to="/products">All Products</NavLink>
        </li>
        <li>
          <NavLink to="/login" onClick={handleLogout}>logout</NavLink>
        </li>
      </ul>

      <h1>add product</h1>
      <img style={{ width: 40, height: 30 }} src={base || product?.image} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <>
          <label>name</label>
          <br />
          <input className="input"
            type="string"
            value={product?.name}
            {...register("name")}
            onChange={handleChange}
          />
          <br />
          <p style={{ color: "red" }}>{errors?.name?.message}</p>
        </>

        <>
          <label>category</label>
          <br />
          <select className="input"
            {...register("category")}
            onChange={(e) => {
              const getvalue = e.target.value;
              const selectedOption = cdata.find(
                (ele) => ele.name === e.target.value
              );
              const selectedId = selectedOption ? selectedOption._id : null;
              setid(selectedId);
            }}>

            <option>Select an option</option>
            {cdata?.map((ele, index: number) => {
              return (
                <option value={pro?.category} key={index}>
                  {ele.name}
                </option>
              );
            })}
          </select>
          <br />

          <br />

          <label>Image</label>
          <br />
          <input className="input"
            type="file"
            accept="image/*"
            onChangeCapture={handleImageUpload}
            {...register("image")}
          />
          <br />
        </>

        <>
          <label>price</label>
          <br />
          <input className="input"
            type="number"
            value={product?.price}
            {...register("price")}
            onChange={handleChange}
          />
          <br />
          <p style={{ color: "red" }}> {errors?.price?.message}</p>
        </>

        <>
          <label>description</label>
          <br />
          <input className="input"
            type="string"
            value={product?.description}
            {...register("description")}
            onChange={handleChange}
          />
          <br />
          <p style={{ color: "red" }}>{errors?.description?.message}</p>
        </>

        <button disabled={disable}>submit</button>
      </form>
    </>
  );
};

export default Product;
