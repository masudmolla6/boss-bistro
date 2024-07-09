import { FaGoogle } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";

const SocialLogin = () => {
    const { googleSignIn } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const handleGoogleSignIn = () =>{
        googleSignIn()
            .then(result => {
                const user = result.user;
                console.log(user);
                const userInfo = {
                    email: user?.email,
                    name:user?.displayName
                }

                axiosPublic.post("users", userInfo)
                    .then(res => {
                        console.log(res.data);
                        navigate("/")
                })
            })
            .catch(error =>{
                console.error(error);
            })
    }
    return (
      <div className="p-4">
        <div className="divider">OR</div>
        <div className="flex justify-center items-center">
          <button onClick={handleGoogleSignIn} className="btn btn-outline btn-accent">
            <FaGoogle></FaGoogle>
            SignIn With Google
          </button>
        </div>
      </div>
    );
};

export default SocialLogin;