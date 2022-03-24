import { ArrowLeftIcon } from '@heroicons/react/outline';
import clsx from 'clsx';
import { FormikProps, useFormik } from 'formik';
import { memo, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';

import localStorage from '../../services/local-storage';

type FormValues = {
  id?: number;
  name: string;
  description: string;
  price: number | undefined;
  quantityAvailable: number | undefined;
  quantityOrdered: number | undefined;
};

export function getFormFieldProps<V extends Record<string, unknown>>({
  errors,
}: FormikProps<V>) {
  return <K extends keyof V>(fieldName: K) => ({
    htmlFor: fieldName,
    error:
      typeof errors[fieldName] === 'string'
        ? String(errors[fieldName]).toString()
        : undefined,
  });
}

export function getFieldProps<V extends Record<string, unknown>>({
  values,
  handleBlur,
  handleChange,
}: FormikProps<V>) {
  return <K extends keyof V>(fieldName: K) => ({
    id: fieldName,
    name: fieldName,
    onBlur: handleBlur,
    onChange: handleChange,
    value:
      values[fieldName] === undefined || values[fieldName] === null
        ? ''
        : String(values[fieldName]).toString(),
  });
}

function AddEditInventory() {
  const { id } = useParams<string>();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState<FormValues>({
    name: '',
    description: '',
    price: undefined,
    quantityAvailable: undefined,
    quantityOrdered: undefined,
  });
  useEffect(() => {
    // @ts-ignore
    return localStorage.getItem('inventoryData').map((item) => {
      if (id == item.id) {
        setInitialData(item);
      }
    });
  }, [id]);
  const validationSchema = yup.object({
    name: yup.string().required('Inventory name is required.'),
    description: yup.string().required('Description is required.'),
    price: yup
      .number()
      .required('Price must be greater than 0..')
      .min(1)
      .typeError('Please enter a numeric value.'),
    quantityAvailable: yup
      .number()
      .required('Available quantity is required.')
      .min(0)
      .typeError('Please enter a numeric value.'),
    quantityOrdered: yup
      .number()
      .required('Ordered quantity is required.')
      .min(0)
      .typeError('Please enter a numeric value.'),
  });

  const handleFormSubmit = (values: FormValues) => {
    const localData = localStorage.getItem('inventoryData') as FormValues[];
    values.id = localData.length + 1;
    localData.unshift(values);
    localStorage.setItem('inventoryData', localData);
    navigate('/');
  };

  const handleEditSubmit = (values: FormValues) => {
    const items = localStorage.getItem('inventoryData') as FormValues[];
    items[items.findIndex((el) => el.id == id)] = values;
    localStorage.setItem('inventoryData', items);
    navigate('/');
  };

  const formikProps = useFormik<FormValues>({
    onSubmit: (values: FormValues) =>
      id ? handleEditSubmit(values) : handleFormSubmit(values),
    initialValues: initialData,
    enableReinitialize: true,
    validationSchema,
  });

  const {
    name: nameError,
    price: priceError,
    description: descriptionError,
    quantityAvailable: availableQtyError,
    quantityOrdered: orderedQtyError,
  } = formikProps.errors;

  const {
    name: nameTouched,
    price: priceTouched,
    description: descriptionTouched,
    quantityAvailable: availableQtyTouched,
    quantityOrdered: orderedQtyTouched,
  } = formikProps.touched;

  const formFieldProps = getFormFieldProps(formikProps);
  const fieldProps = getFieldProps(formikProps);

  return (
    <div className="md:pl-64">
      <div className="px-10 pt-10">
        <Link to="/" className="mr-10 flex items-center justify-start">
          <ArrowLeftIcon className="mr-1 h-4 w-4" />
          <p>Back</p>
        </Link>
        <h1 className="mt-5 text-left text-3xl">
          {id ? 'Edit' : 'Add'} Inventory
        </h1>
      </div>
      <form onSubmit={formikProps.handleSubmit} className="p-10 text-left">
        <div className="">
          <div className="relative mr-5 mt-5 inline-block w-[45%] text-left">
            <label
              {...formFieldProps('name')}
              className="mr-5 block text-neutral-700"
            >
              Name:
            </label>
            <input
              {...fieldProps('name')}
              className={clsx(
                'w-full rounded-md border border-neutral-400 p-1',
                nameError && nameTouched ? 'border-red-700' : '',
              )}
            />
            {nameError && nameTouched && (
              <small className="absolute left-0 -bottom-5 text-red-700">
                {nameError}
              </small>
            )}
          </div>
          <div className="relative mr-5 mt-5 inline-block w-[45%] text-left">
            <label
              {...formFieldProps('description')}
              className="mr-5 block text-neutral-700"
            >
              Description:
            </label>
            <input
              {...fieldProps('description')}
              className={clsx(
                'w-full rounded-md border border-neutral-400 p-1',
                descriptionError && descriptionTouched ? 'border-red-700' : '',
              )}
            />
            {descriptionError && descriptionTouched && (
              <small className="absolute left-0 -bottom-5 text-red-700">
                {descriptionError}
              </small>
            )}
          </div>
          <div className="relative mr-5 mt-5 inline-block w-[45%] text-left">
            <label
              {...formFieldProps('price')}
              className="mr-5 block text-neutral-700"
            >
              Price:
            </label>
            <input
              {...fieldProps('price')}
              className={clsx(
                'w-full rounded-md border border-neutral-400 p-1',
                priceError && priceTouched ? 'border-red-700' : '',
              )}
            />
            {priceError && priceTouched && (
              <small className="absolute left-0 -bottom-5 text-red-700">
                {priceError}
              </small>
            )}
          </div>
          <div className="relative mr-5 mt-5 inline-block w-[45%] text-left">
            <label
              {...formFieldProps('quantityAvailable')}
              className="mr-5 block text-neutral-700"
            >
              Quantity Available:
            </label>
            <input
              {...fieldProps('quantityAvailable')}
              className={clsx(
                'w-full rounded-md border border-neutral-400 p-1',
                availableQtyError && availableQtyTouched
                  ? 'border-red-700'
                  : '',
              )}
            />
            {availableQtyError && availableQtyTouched && (
              <small className="absolute left-0 -bottom-5 text-red-700">
                {availableQtyError}
              </small>
            )}
          </div>
          <div className="relative mr-5 mt-5 inline-block w-[45%] text-left">
            <label
              {...formFieldProps('quantityOrdered')}
              className="mr-5 block text-neutral-700"
            >
              Quantity Ordered:
            </label>
            <input
              {...fieldProps('quantityOrdered')}
              className={clsx(
                'w-full rounded-md border border-neutral-400 p-1',
                orderedQtyError && orderedQtyTouched ? 'border-red-700' : '',
              )}
            />
            {orderedQtyError && orderedQtyTouched && (
              <small className="absolute left-0 -bottom-5 text-red-700">
                {orderedQtyError}
              </small>
            )}
          </div>
        </div>
        <div className="mt-8 block w-1/2 text-left">
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            {id ? 'Edit Inventory' : 'Add Inventory'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default memo(AddEditInventory);
