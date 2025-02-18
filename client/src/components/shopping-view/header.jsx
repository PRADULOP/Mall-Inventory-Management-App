import { Slack, LogOut, Menu, ShoppingCart, UserCog, Camera } from "lucide-react"; // Added Camera icon
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"; // Sidebar Components
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { logoutUser } from "@/store/auth-slice";
import UserCartWrapper from "./cart-wrapper";
import { useEffect, useState } from "react";
import { fetchCartItems } from "@/store/shop/cart-slice";
import { Label } from "../ui/label";
import axios from "axios"; // Import Axios

function MenuItems() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [openImageSearch, setOpenImageSearch] = useState(false); // Toggle sidebar
  const [imageSearchResults, setImageSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  function handleNavigate(getCurrentMenuItem) {
    sessionStorage.removeItem("filters");
    const currentFilter =
      getCurrentMenuItem.id !== "home" &&
      getCurrentMenuItem.id !== "products" &&
      getCurrentMenuItem.id !== "search"
        ? {
            category: [getCurrentMenuItem.id],
          }
        : null;

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));

    location.pathname.includes("listing") && currentFilter !== null
      ? setSearchParams(
          new URLSearchParams(`?category=${getCurrentMenuItem.id}`)
        )
      : navigate(getCurrentMenuItem.path);
  }

  // Handle Image Upload
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
  
    const formData = new FormData();
    formData.append("file", file);
  
    setSearching(true);
  
    try {
      const response = await axios.post("http://localhost:5050/api/shop/image-search", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      setImageSearchResults(response.data.results);
    } catch (error) {
      console.error("Image search failed:", error);
      setImageSearchResults([]);
    } finally {
      setSearching(false);
    }
  };
  


  const handleOpenProductDialog = (product) => {
    if (!product) return;
  
    // Ensure `_id` exists by mapping `id` to `_id`
    const formattedProduct = {
      ...product,
      _id: product._id || product.id, // Use `_id` if available, otherwise use `id`
    };
  
    if (!formattedProduct._id) return;
  
    setSelectedProduct(formattedProduct);
    setOpenDialog(true);
  };
  
  
  
  
  
  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row text-white">
      <div className="flex flex-col lg:flex-row gap-6">
        {shoppingViewHeaderMenuItems.map((menuItem) => (
          <Label
            onClick={() => handleNavigate(menuItem)}
            className="text-sm font-medium cursor-pointer px-3 py-2 rounded-md transition-all duration-300 
                       hover:bg-white/20 hover:text-[#FDE68A] hover:shadow-md"
            key={menuItem.id}
          >
            {menuItem.label}
          </Label>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* 🔍 Image Search Sidebar Trigger (Placed after "Accessories" & "Search") */}
        <Sheet open={openImageSearch} onOpenChange={setOpenImageSearch}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="relative bg-black-800 text-white">
            <Camera className="w-6 h-6" />
            <span className="sr-only">Search by Image</span>
          </Button>
        </SheetTrigger>

        <SheetContent side="right" className="w-96 p-6">
          <h2 className="text-xl lg:text-2xl font-lora font-bold text-gray-900 tracking-wider uppercase">
            Upload an Image to Search
          </h2>

          {/* Custom File Upload Button */}
          <div className="mt-4 flex flex-col items-center">
            <label htmlFor="imageUpload" className="cursor-pointer">
              <div className="bg-black text-white flex items-center gap-2 px-4 py-2 rounded-lg 
                              font-semibold hover:bg-gray-900 hover:scale-105 transition-all duration-300">
                <Camera className="w-5 h-5" />
                <span>Upload Image</span>
              </div>
            </label>
            <input type="file" id="imageUpload" accept="image/*" onChange={handleImageUpload} className="hidden" />
          </div>

          {/* Image Preview */}
          {selectedImage && (
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-700">Preview:</h3>
              <img src={selectedImage} alt="Uploaded" className="w-full h-48 object-cover rounded-lg mt-2 shadow-md" />
            </div>
          )}

          {/* Searching Status */}
          {searching && <p className="mt-4 text-sm text-gray-500 animate-pulse">Searching for similar products...</p>}

          {/* Display Search Results */}
          {imageSearchResults.length > 0 && (
            <div className="mt-6">
              <h3 className="font-medium text-gray-900">Matching Products:</h3>
              <div className="space-y-4">
                {imageSearchResults.map((product) => (
                  <div
                    key={product.id}
                    className="flex gap-3 items-center border-b pb-2 transition-transform hover:scale-105 cursor-pointer"
                    onClick={() => handleOpenProductDialog(product)}
                  >
                    <img src={product.image} alt={product.title} className="w-16 h-16 object-cover rounded shadow-sm" />
                    <div>
                      <p className="font-semibold text-gray-800">{product.title}</p>
                      <p className="text-sm text-gray-500">₹{product.salePrice || product.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
      {/* Product Details Dialog */}
      {selectedProduct && (
        <ProductDetailsDialog
          open={openDialog}
          setOpen={setOpenDialog}
          productDetails={selectedProduct}
        />
      )}
      </div>
    </nav>
  );
}

function HeaderRightContent() {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutUser());
  }

  useEffect(() => {
    dispatch(fetchCartItems(user?.id));
  }, [dispatch]);

  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-4">
      {/* Cart Icon */}
      <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
        <Button
          onClick={() => setOpenCartSheet(true)}
          variant="outline"
          size="icon"
          className="relative bg-black-800 text-white"
          
        >
          <ShoppingCart className="w-6 h-6 " />
          <span className="absolute top-[-5px] right-[2px] font-bold text-sm">
            {cartItems?.items?.length || 0}
          </span>
          <span className="sr-only">User cart</span>
        </Button>
        <UserCartWrapper
          setOpenCartSheet={setOpenCartSheet}
          cartItems={
            cartItems && cartItems.items && cartItems.items.length > 0
              ? cartItems.items
              : []
          }
        />
      </Sheet>

      {/* User Profile Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-black">
            <AvatarFallback className="bg-white text-black font-extrabold">
              {user?.userName[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-56">
          <DropdownMenuLabel>Logged in as {user?.userName}</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => navigate("/shop/account")}>
            <UserCog className="mr-2 h-4 w-4" />
            Account
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}




function ShoppingHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-black">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        
        {/* Logo & Brand Name */}
        <Link 
          to="/shop/home" 
          className="flex items-center gap-2 transition-all duration-300 ease-in-out 
                     hover:text-[#FDE68A] hover:scale-105 hover:shadow-lg"
        >
          <Slack className="h-6 w-6 transition-all duration-300 ease-in-out" color="#ffffff" />
          <span className="font-bold text-white">Opulent Avenue</span>
        </Link>

        {/* Menu Items (Visible on Large Screens) */}
        <div className="hidden lg:block">
          <MenuItems />
        </div>

        {/* User Profile & Cart Section */}
        <HeaderRightContent />
      </div>
    </header>
  );
}

export default ShoppingHeader;



