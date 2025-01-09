import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { DeleteIcon, EditIcon, ViewIcon } from "../SvgIcons/SvgIcons";

interface Actions {
  openEdit: () => void;
  openDelete: () => void;
}

export default function ActionsMenu({
  openEdit,
  openDelete,
}: Actions) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex w-full justify-center gap-x-8 bg-white px-3 py-2  font-semibold text-gray-900  hover:bg-gray-50">
          <EllipsisVerticalIcon aria-hidden="true" className="-mr-1 size-5" />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-35 origin-top-right rounded-md
         bg-white shadow-lg ring-1
          ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform 
          data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="py-1">
          <MenuItem>
            <button
              className="w-full flex items-center gap-x-2 px-4 py-2 text-sm
             text-gray-700
              data-[focus]:bg-gray-100
               data-[focus]:text-gray-900 data-[focus]:outline-none"
            >
              <ViewIcon />
              view
            </button>
          </MenuItem>
          <MenuItem>
            <button
              className="w-full flex items-center gap-x-2 px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
              onClick={openEdit}
            >
              <EditIcon />
              Edit
            </button>
          </MenuItem>
          <MenuItem>
            <button
              className="w-full flex items-center gap-x-2 px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
              onClick={openDelete}
            >
              <DeleteIcon />
              Delete
            </button>
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
}
