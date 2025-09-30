import React from "react";
import Link from "next/link";
import { FaCartShopping } from "react-icons/fa6";
import { cn } from "@/lib/utils";


interface Props{
    mobile?: boolean
}


const NavItems = ({mobile}: Props) => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [isClient, setIsClient] = React.useState(false);
  const [cartCount, setCartCount] = React.useState(0);

  React.useEffect(() => {
    setIsClient(true);
    const checkLoginAndCart = async () => {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      setIsLoggedIn(!!token);
      const storedName = typeof window !== "undefined" ? localStorage.getItem("username") : "";
      setUsername(storedName || "User");
      // Lấy số lượng sản phẩm trong giỏ hàng
      if (token) {
        try {
          const res = await import("@/service/CartService");
          const cart = await res.getCart(token);
          setCartCount(cart?.items?.length || 0);
        } catch (e) {
          setCartCount(0);
        }
      } else {
        setCartCount(0);
      }
    };
    checkLoginAndCart();
    window.addEventListener("storage", checkLoginAndCart);
    window.addEventListener("user-login", checkLoginAndCart);
    return () => {
      window.removeEventListener("storage", checkLoginAndCart);
      window.removeEventListener("user-login", checkLoginAndCart);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    window.location.reload();
  };

  if (!isClient) return null;
  return (
    <div className={cn("flex items-center justify-center gap-6", mobile ? "flex-col" : "flex-row")}> 
      {isLoggedIn ? (
        <>
          <Link href="/profile" className="text-lg font-medium text-gray-900 hover:underline">{username}</Link>
          <Link href="/orders" className="text-lg font-medium text-gray-900 hover:text-gray-700 transition">Orders</Link>
          <button className="nav-btn" onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <Link href="/signin" className="nav-btn">Login</Link>
      )}
      {isLoggedIn && (
        <Link href="/cart" className="relative flex items-center h-[60px] w-[60px] justify-center cursor-pointer">
          <FaCartShopping className="text-4xl" />
          {cartCount > 0 && (
            <span className="absolute top-0 right-0 px-2 py-1 bg-black rounded-full text-white">{cartCount}</span>
          )}
        </Link>
      )}
    </div>
  );
};

export default NavItems;
