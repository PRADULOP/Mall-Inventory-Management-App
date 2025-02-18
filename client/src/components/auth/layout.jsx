import { useState } from "react";
import { Outlet } from "react-router-dom";

function AuthLayout() {
  // State to track which page is active (Home, About Us, or Stores)
  const [activePage, setActivePage] = useState("home");

  // Store Data with Images
  const stores = [
    { id: "nike", label: "Nike", image: "https://static.nike.com/a/images/f_auto/15feea01-6923-4310-a0d6-f4c3717b52b9/image.jpeg" },
    { id: "adidas", label: "Adidas", image: "https://img.businessoffashion.com/resizer/v2/OX5XLJEISFFD3DEFIIVIFXPDSE.jpg?auth=ab8bf9faab563e2b1b6745c265be0762471d83752cef16353a73b637b6f99fad&width=1440" },
    { id: "puma", label: "Puma", image: "https://www.indiaretailing.com/wp-content/uploads/2024/03/1692853822778-e1709706737926.jpg" },
    { id: "levi", label: "Levi's", image: "https://www.levistrauss.com/wp-content/uploads/2024/06/240624_Levis_Pacific_Mall_Hero.jpg" },
    { id: "zara", label: "Zara", image: "https://cdn.prod.website-files.com/64830736e7f43d491d70ef30/64bfca456e3a5a803618a25d_64a5802512ee9430c0eafec6_64a2d408d2249c6450b8989f_zara-large-p-3200.webp" },
    { id: "h&m", label: "H&M", image: "https://content.jdmagicbox.com/v2/comp/bangalore/f4/080pxx80.xx80.160411122017.q1f4/catalogue/hennes-and-mauritz-mahadevapura-bangalore-readymade-garment-retailers-1epkngd.jpg" }
  ];

  return (
    <div className="flex min-h-screen w-full">
      {/* Left Section (Scrollable) */}
      <div className="w-1/2 bg-[#8B5CF6] text-white flex flex-col overflow-y-auto h-screen px-16 py-12 relative">
        
        {/* Navigation Bar - Moved to Maximum Up */}
        <nav className="absolute top-9 left-0 w-full bg-[#8B5CF6] py-2 z-50 flex justify-between items-center px-16">
          <button 
            onClick={() => setActivePage("home")} 
            className="text-2xl font-bold hover:text-[#FDE68A] transition"
          >
            Opulent Avenue
          </button>
          <ul className="flex space-x-8 text-lg font-semibold">
            <li>
              <button onClick={() => setActivePage("about")} className="hover:text-[#FDE68A] transition">
                About Us
              </button>
            </li>
            <li>
              <button onClick={() => setActivePage("stores")} className="hover:text-[#FDE68A] transition">
                Stores
              </button>
            </li>
          </ul>
        </nav>

        {/* Page Content Based on Active Page */}
        <div className="flex-grow mt-16">
          {activePage === "about" ? (
            /* About Us Page */
            <section className="mt-14 mb-20">
              <h1 className="text-5xl font-extrabold tracking-tight">About Opulent Avenue</h1>
              <p className="mt-6 text-lg opacity-90 font-playfair">
                Welcome to <strong>Opulent Avenue Mall</strong>, the ultimate shopping destination for fashion, lifestyle, and technology.  
                Experience a world of elegance with global brands, exclusive boutiques, and top-tier shopping experiences.
              </p>
              <p className="mt-6 text-lg opacity-90 font-lora italic">
                "Discover a world of luxury, convenience, and endless shopping possibilities."
              </p>
            </section>
          ) : activePage === "stores" ? (
            /* Stores Page */
            <section className="mt-14 mb-40">
              <h1 className="text-5xl font-extrabold tracking-tight">Our Stores</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {stores.map((store) => (
                  <div key={store.id} className="bg-white p-4 rounded-lg shadow-lg text-black transition-transform transform hover:scale-105">
                    <img src={store.image} alt={store.label} className="w-full h-48 object-cover rounded-lg" />
                    <h3 className="text-xl font-semibold mt-4">{store.label}</h3>
                  </div>
                ))}
              </div>
            </section>
          ) : (
            /* Home Page */
            <section className="mt-14 mb-20">
              <h1 className="text-5xl font-extrabold tracking-tight">
                Welcome to <br />
                <span className="text-[#FDE68A]">Opulent Avenue Mall</span>
              </h1>
              <p className="mt-6 text-lg opacity-90 font-serif italic">
                Shop from a variety of stores, explore global brands, and enjoy the best shopping experience under one roof.
              </p>
              <button 
                onClick={() => setActivePage("stores")} 
                className="mt-8 bg-white text-[#8B5CF6] py-3 px-6 rounded-full font-semibold shadow-lg hover:bg-[#FDE68A] transition"
              >
                Explore Stores
              </button>
            </section>
          )}
        </div>

        {/* Footer (Transparent & Stays at Bottom) */}
        <footer className="w-full bg-transparent text-white text-center py-6 mt-auto">
          <div className="max-w-full mx-auto flex flex-col items-center px-0 bg-white/10 backdrop-blur-lg rounded-lg py-6">
            <p className="text-base opacity-80">
              © {new Date().getFullYear()} Opulent Avenue. All Rights Reserved.
            </p>
          </div>
          <div className="border-t border-white/20 mt-4 pt-4 text-sm opacity-70">
            The ultimate shopping destination.
          </div>
        </footer>

      </div>

      {/* Right Section (Fixed) */}
      <div className="w-1/2 flex items-center justify-center bg-gray-100 h-screen">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
