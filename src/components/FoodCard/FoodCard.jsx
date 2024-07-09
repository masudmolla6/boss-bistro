import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useCart from "../../Hooks/useCart";

const FoodCard = ({ item }) => {
  const { _id, name, recipe, image, price, category } = item;
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [refetch]=useCart()

  const handleAddToCart = () => {
    // console.log(user.email);
    if (user && user?.email) {
      // send Cart Item To The Database.
      const cartItem = {
        menuId: _id,
        email: user?.email,
        name,
        image,
        price
      }

      axiosSecure.post("/carts", cartItem)
        .then((res) => {
        console.log(res.data);
        if (res.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${name} Added To Your Cart`,
            showConfirmButton: false,
            timer: 1500,
          });
          // refetch cart To Update The cart item Count
          refetch()
        }
      });

    }
    else {
      Swal.fire({
        title: "You Are Not LogIn.",
        text: "Please LogIn To  Add To The Cart.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, LogIn !",
      }).then((result) => {
        if (result.isConfirmed) {
          // Send The User To The logIn Page.
          navigate("/login", { state: { from: location } })
        }
      });
    }
  }

  
    return (
      <div className="card bg-base-100 w-96 shadow-xl">
        <figure>
          <img src={image} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {name}
            <div className="badge badge-secondary">${price}</div>
          </h2>
          <p>{recipe}</p>
          <div className="card-actions justify-end">
            <div className="badge badge-outline">Fashion</div>
            <div className="badge badge-outline">
              <Link onClick={()=>{handleAddToCart()}}>Add To Cart</Link>
            </div>
          </div>
        </div>
      </div>
    );
};

export default FoodCard;