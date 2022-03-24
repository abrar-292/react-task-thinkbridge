import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import localStorage from '../services/local-storage';
import { Inventory, staticData } from '../types/data';

import DeleteInventory from './DeleteInventory';
import InventoryData from './InventoryData/InventoryData';

export function Home() {
  const [inventoryData, setInventoryData] = useState<Inventory[]>([]);
  const [id, setId] = useState<number>(0);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  useEffect(() => {
    const localData = localStorage.getItem('inventoryData') as Inventory[];
    if (!localData.length) {
      localStorage.setItem('inventoryData', staticData);
    }
    setInventoryData(localData);
  }, []);

  const handleDeleteAction = (invId: number) => {
    localStorage.removeItem('inventoryData');
    localStorage.setItem(
      'inventoryData',
      inventoryData.filter((item) => item.id !== invId),
    );
    setInventoryData(inventoryData.filter((item) => item.id !== invId));
    setDeleteModal(false);
  };

  return (
    <>
      {deleteModal && (
        <DeleteInventory
          isOpen={deleteModal}
          id={id}
          closeModal={(modal) => setDeleteModal(modal)}
          deleteAction={(invId) => handleDeleteAction(invId)}
        />
      )}
      <div className="flex flex-1 flex-col md:pl-64">
        <main className="flex-1">
          <div className="py-6">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="sm:flex sm:items-center">
                <div className="text-left sm:flex-auto">
                  <h1 className="text-xl font-semibold text-gray-900">
                    Inventories
                  </h1>
                  <p className="mt-2 text-sm text-gray-700">
                    A list of all the inventories in your account including
                    their name, description, price, etc...
                  </p>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                  <Link
                    to="/add"
                    className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                  >
                    Add Inventory
                  </Link>
                </div>
              </div>
              <div className="mt-8 flex flex-col justify-start">
                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                      <table className="min-w-full divide-y divide-gray-300">
                        <thead className="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                            >
                              Name
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Description
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Price
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Quantity Available
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Quantity Ordered
                            </th>
                            <th
                              scope="col"
                              className="relative py-3.5 pl-3 pr-4 text-left sm:pr-6"
                            >
                              <span className="py-3.5 text-left text-left text-sm font-semibold text-gray-900">
                                Action
                              </span>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                          <InventoryData
                            inventoryData={inventoryData}
                            onDelete={(Id, isModal) => {
                              setDeleteModal(isModal);
                              setId(Id);
                            }}
                          />
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                {!inventoryData.length && (
                  <span className="my-5">No inventory is found</span>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
