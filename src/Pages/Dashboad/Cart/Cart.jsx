import React from 'react';
import useCart from '../../../Hooks/useCart';
import { FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const Cart = () => {
    const [cart, refetch] = useCart();
    const axiosSecure=useAxiosSecure();
    const totallPrice = cart.reduce((total, item) => {
        return total+item.price
    }, 0)

    const handleDelete = (id) => {
        console.log(id);
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then((result) => {
          if (result.isConfirmed) {
              axiosSecure.delete(`carts/${id}`)
                  .then(res => {
                    //   console.log(res.data);
                      refetch()
                      if (res.data.deletedCount > 0) {
                        Swal.fire({
                          title: "Deleted!",
                          text: "Your file has been deleted.",
                          icon: "success",
                        });
                      }
              })
          }
        });

    }
    

    return (
      <div>
        <div className="w-full flex justify-evenly mb-8">
          <h2 className="text-4xl"> Items: {cart.length}</h2>
          <h2 className="text-4xl"> Totall Price: {totallPrice}</h2>
          <button className="btn btn-primary">Pay</button>
        </div>
        <div className="overflow-x-auto w-full">
          <table className="table">
            <thead>
              <tr>
                <th>
                    #
                </th>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={item._id}>
                      <th>
                          { index+1}
                  </th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={item.image}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-ghost badge-sm">
                      {item.name}
                    </span>
                  </td>
                      <td>$ { item.price}</td>
                  <th>
                    <button onClick={()=>handleDelete(item._id)} className="btn btn-ghost btn-md bg-red-500 rounded-full"><FaTrash></FaTrash></button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
};

export default Cart;