import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const Header = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    localStorage.setItem("user", "");
    // navigating to the login page
    navigate("/login");
    toast({
      title: "Successfully Logout  🔴",
    });
  };

  return (
    <header className="p-4 pb-0 border-b shadow-lg bg-gray-100 md:flex md:items-center md:justify-between md:pb-4">
      <div className="mb-4 flex items-center justify-between md:mb-0">
        <h1 className="leading-none text-2xl text-gray-darkest">
          <a
            href="@"
            className="no-underline text-gray-darkest hover:text-black"
          >
            Logo
          </a>
        </h1>
        <a href="#" className="text-black md:hidden hover:text-orange">
          <i className="fa fa-2x fa-bars"></i>
        </a>
      </div>

      <nav>
        <ul className="list-reset md:flex md:items-center">
          <li className="md:ml-4">
            <Button onClick={handleLogout}>Logout</Button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
