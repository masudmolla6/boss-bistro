import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Provider/AuthProvider";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import SocialLogin from "../../components/SocialLogin/SocialLogin";

const SignUp = () => {
  const axiosPublic = useAxiosPublic();

  const { user, createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();

    console.log(user);

      const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm();
    
    const onSubmit = (data) => {
        console.log(data)
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                updateUserProfile(data.name, data.photoUrl)
                    .then(() => {
                      // create User Entery In the Database.

                      const userInfo = {
                        name: data.name,
                        email:data.email
                      }

                      axiosPublic.post("/users", userInfo)
                        .then(res => {
                          if (res.data.insertedId) {
                            console.log("User Added To The Database");
                          reset();
                          Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title:
                              "Your work has been saved",
                            showConfirmButton: false,
                            timer: 1500,
                          });
                          navigate("/");
                        }
                      })
                    })
                    .catch((error) => {
                      console.error(error);
                    });
            })
            .catch(error => {
                console.error(error);
            })
    };

    return (
      <>
        <Helmet>
          <title>Bistro Boss | SignUp</title>
        </Helmet>
        <div className="hero bg-base-200 min-h-screen">
          <div className="hero-content flex-col">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold">Sign Up now!</h1>
            </div>
            <div className="card bg-base-100 w-96 max-w-sm shrink-0 shadow-2xl">
              <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    {...register("name", { required: true })}
                    placeholder="Name"
                    className="input input-bordered"
                  />
                  {errors.name && <span>This field is required</span>}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">PhotoUrl</span>
                  </label>
                  <input
                    type="text"
                    {...register("photoUrl", { required: true })}
                    placeholder="PhotoUrl"
                    className="input input-bordered"
                  />
                  {errors.photoUrl && <span>This field is required</span>}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    {...register("email", { required: true })}
                    placeholder="email"
                    className="input input-bordered"
                  />
                  {errors.email && <span>This field is required</span>}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    {...register("password", {
                      required: true,
                      minLength: 6,
                    })}
                    placeholder="password"
                    className="input input-bordered"
                  />
                  {errors.password?.type === "required" && (
                    <p className="text-orange-700" role="alert">
                      password is required
                    </p>
                  )}
                  {errors.password?.type === "minLength" && (
                    <p className="text-orange-700" role="alert">
                      password Must be 6 character
                    </p>
                  )}
                </div>
                <div className="form-control mt-6">
                  <input
                    className="btn btn-primary"
                    type="submit"
                    value="SignUp"
                  />
                </div>
            </form>
              <p className="px-8">Already Have an Account <Link to="/login">LogIn</Link></p>
              <SocialLogin></SocialLogin>
            </div>
          </div>
        </div>
      </>
    );
};

export default SignUp;