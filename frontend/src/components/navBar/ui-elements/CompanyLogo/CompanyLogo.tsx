import { Link } from "react-router-dom";
import Logo from "../../../../assets/AcebookLogo.png"

export const CompanyLogo = () => {
  return (
    <Link to="/" className="flex items-center">
      <span className="self-center text-xl font-bold text-gray-800 whitespace-nowrap dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400">
      <img src={Logo} alt="Company Logo" className="h-8 w-8 mr-2 border-none mb-2" />
      </span>
    </Link>
  );
};
