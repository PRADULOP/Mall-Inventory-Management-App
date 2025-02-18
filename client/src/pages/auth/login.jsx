import CommonForm from "@/components/common/form";
import { useToast } from "@/components/ui/use-toast";
import { loginFormControls } from "@/config";
import { loginUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const initialState = {
  email: "",
  password: "",
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();

    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      }
    });
  }

  return (
    <div className="mx-auto w-full max-w-md p-10 bg-white rounded-3xl shadow-xl">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-gray-900">Sign in</h1>
        <p className="mt-2 text-gray-600">
          Don't have an account?  
          <Link className="ml-2 font-medium text-[#8B5CF6] hover:underline" to="/auth/register">
            Register
          </Link>
        </p>
      </div>

      {/* Form - This already includes the submit button */}
      <CommonForm
        formControls={loginFormControls}
        buttonText={"Sign In"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
        className="mt-6"
      />

      {/* Extra */}
      <div className="mt-6 text-center text-gray-500 text-sm">
        <p>Opulent Avenue - Luxury & Elegance</p>
      </div>
    </div>
  );
}

export default AuthLogin;
