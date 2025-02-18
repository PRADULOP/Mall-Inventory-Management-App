import CommonForm from "@/components/common/form";
import { useToast } from "@/components/ui/use-toast";
import { registerFormControls } from "@/config";
import { registerUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

function AuthRegister() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();
    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
        navigate("/auth/login");
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
        <h1 className="text-4xl font-extrabold text-gray-900">Create an Account</h1>
        <p className="mt-2 text-gray-600">
          Already have an account?  
          <Link className="ml-2 font-medium text-[#8B5CF6] hover:underline" to="/auth/login">
            Login
          </Link>
        </p>
      </div>

      {/* Form - This already includes the submit button */}
      <CommonForm
        formControls={registerFormControls}
        buttonText={"Sign Up"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
        className="mt-6"
      />

      {/* Extra */}
      <div className="mt-6 text-center text-gray-500 text-sm">
        <p>Opulent Avenue - Elevate Your Experience</p>
      </div>
    </div>
  );
}

export default AuthRegister;
