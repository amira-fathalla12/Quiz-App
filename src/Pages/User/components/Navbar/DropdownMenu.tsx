import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../redux/store";
import { clearUser } from "../../../../redux/slices/userSlice";

export default function DropdownMenu() {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(clearUser());
    navigate("/login");
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex w-full justify-center gap-x-8 items-center border-l border-gray-300 bg-white px-3 py-2  font-semibold text-gray-900  hover:bg-gray-50">
          <div>
            <p>{user?.first_name + " " + user?.last_name}</p>
            <p className="text-olive">{user?.role}</p>
          </div>

          <ChevronDownIcon
            aria-hidden="true"
            className="-mr-1 size-5 text-gray-400"
          />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="py-1">
          <MenuItem>
            <Link
              to="change-password"
              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
            >
              Change Password
            </Link>
          </MenuItem>
          <MenuItem>
            <div
              onClick={logout}
              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100
               data-[focus]:text-gray-900 data-[focus]:outline-none cursor-pointer"
            >
              Log out
            </div>
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
}
