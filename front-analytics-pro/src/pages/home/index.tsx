import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <>
      <nav className="flex justify-between gap-2 bg-red-400 text-gray-50">
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </nav>
    </>
  );
};
