import { FaGoogle } from "react-icons/fa";

const LoginWithGoogle = () => {
  const requestGoogleLoginPage = () => {
    const popupWidth = 500;
    const popupHeight = 600;    
    const left = window.screenX + (window.innerWidth - popupWidth)/1.7 ;
    const top = window.screenY + (window.innerHeight - popupHeight) ;
    window.open(
      `http://localhost:3500/auth/google`,
      "Google Login",
      `width=${popupWidth},height=${popupHeight},top=${top},left=${left}`
    );
  };

  return (
    <button
      className="bg-white hover:bg-gray-100 p-2 pt-3 text-sm my-1 mb-4 rounded-md w-full"
      onClick={requestGoogleLoginPage}
    >
      <div className="inline-flex space-x-3 -space-y-1">
        <FaGoogle />
        <p>Login With Google!</p>
      </div>
    </button>
  );
};

export default LoginWithGoogle;
