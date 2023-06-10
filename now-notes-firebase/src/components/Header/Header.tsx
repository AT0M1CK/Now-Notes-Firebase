import {
  MdClose,
  MdMenu,
  MdOutlineDashboardCustomize,
  MdRefresh,
  MdSearch,
  MdSettings,
} from "react-icons/md";
import { TbUser } from "react-icons/tb";
import Button from "../UI/Button";
import { useContext } from "react";
import { MainContext } from "../Contexts/MainContext";
import { auth } from "../../firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

/**
 * header component for the dashboard
 *
 * @return {*}
 */
const Header = () => {
  const { title } = useContext(MainContext);

  const navigate = useNavigate();

  const signUserOut = () => {
    signOut(auth).then(() => {
      console.log("User signed out");
      navigate("/");
    });
  };

  return (
    <>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-1.5 dark:bg-gray-800">
        <div className="flex flex-row justify-between items-center w-full ">
          <div className="flex gap-20 items-center ">
            <div className="flex flex-row">
              <Button
                customCssProps=" text-gray-600  right-2.5 bottom-1"
                type="button"
                colorScheme="white"
                radius="full"
                variant="ghost"
                padding="normal"
                buttonSize="lg"
                iconOnly
                icon={<MdMenu size={24} />}
              ></Button>
              {/* add div instead of button */}
              <div className=" flex flex-row text-center align-middle items-center rounded-md text-gray-600 justify-center whitespace-nowrap w-40">
                <span className="flex justify-center text-xl font-medium items-center">
                  {title}
                </span>
              </div>
            </div>
            <div className="flex bg-gray-100 rounded-md py-1 px-2 flex-row w-128">
              <Button
                customCssProps=" text-gray-600 right-2.5 bottom-1"
                type="button"
                colorScheme="white"
                radius="full"
                variant="ghost"
                padding="small"
                buttonSize="xs"
                iconOnly
                icon={<MdSearch size={21} />}
              ></Button>

              <input
                type="search"
                id="default-search"
                className="block w-full p-2 border-transparent focus:border-transparent  focus:ring-0 focus:ring-offset-0 text-base text-gray-900 rounded-lg bg-gray-100 "
                placeholder="Search notes..."
                required
              />

              <Button
                customCssProps=" text-gray-600 right-2.5 bottom-1"
                type="button"
                colorScheme="white"
                radius="full"
                variant="ghost"
                padding="small"
                buttonSize="sm"
                iconOnly
                icon={<MdClose size={21} />}
              ></Button>
            </div>
          </div>

          <div className="flex flex-row md:gap-6 sm:gap-4 items-center ">
            <div className="flex flex-row">
              <Button
                customCssProps=" text-gray-600 right-2.5 bottom-1"
                type="button"
                colorScheme="white"
                radius="full"
                variant="ghost"
                padding="normal"
                buttonSize="lg"
                iconOnly
                icon={<MdRefresh size={24} />}
              ></Button>
              <Button
                customCssProps=" text-gray-600 right-2.5 bottom-1"
                type="button"
                colorScheme="white"
                radius="full"
                variant="ghost"
                padding="normal"
                buttonSize="lg"
                iconOnly
                icon={<MdSettings size={24} />}
              ></Button>
            </div>
            <div className="flex flex-row">
              <Button
                customCssProps=" text-gray-600 right-2.5 bottom-1"
                type="button"
                colorScheme="white"
                radius="full"
                variant="ghost"
                padding="normal"
                buttonSize="lg"
                iconOnly
                icon={<MdOutlineDashboardCustomize size={24} />}
              ></Button>
              <Button
                customCssProps=" text-gray-600 right-2.5 bottom-1"
                type="button"
                colorScheme="white"
                radius="full"
                onClick={() => {
                  signUserOut();
                }}
                variant="ghost"
                padding="normal"
                buttonSize="lg"
                iconOnly
                icon={<TbUser size={24} />}
              ></Button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
