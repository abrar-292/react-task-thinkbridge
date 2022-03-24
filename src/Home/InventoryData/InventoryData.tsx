import { PencilIcon, TrashIcon } from '@heroicons/react/outline';
import { memo } from 'react';
import { Link } from 'react-router-dom';

import { Inventory } from '../../types/data';
type Props = {
  inventoryData: Inventory[];
  onDelete: (id: number, isModal: boolean) => void;
};
function InventoryData({ inventoryData, onDelete }: Props) {
  return (
    <>
      {inventoryData.map((inventory) => (
        <tr key={inventory.name}>
          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-left text-sm font-medium text-gray-900 sm:pl-6">
            {inventory.name}
          </td>
          <td className="whitespace-nowrap px-3 py-4 text-left text-sm text-gray-500">
            {inventory.description}
          </td>
          <td className="whitespace-nowrap px-3 py-4 text-left text-sm text-gray-500">
            {inventory.price}
          </td>
          <td className="whitespace-nowrap px-3 py-4 text-left text-sm text-gray-500">
            {inventory.quantityAvailable}
          </td>
          <td className="whitespace-nowrap px-3 py-4 text-left text-sm text-gray-500">
            {inventory.quantityOrdered}
          </td>
          <td className="relative flex py-4 pl-3 pr-4 text-left text-sm font-medium sm:pr-6">
            <Link
              to={'/edit/' + inventory.id}
              className="mr-3 text-left text-indigo-600 hover:text-indigo-900"
            >
              <PencilIcon className="h-6 w-6" />
            </Link>
            <button
              onClick={() => {
                onDelete(inventory.id!, true);
              }}
              className="text-left text-indigo-600 hover:text-indigo-900"
            >
              <TrashIcon className="h-6 w-6" />
            </button>
          </td>
        </tr>
      ))}
    </>
  );
}

export default memo(InventoryData);
