import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { getTingkat } from '../utils/tools'; // Import the getTingkat function

interface ModalProps {
  modalType: 'create' | 'edit' | 'delete'; // Type of modal (Create, Edit, Delete)
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  initialData?: {id:number, daerah: string; value: string; tingkat: string }; // Used for 'edit'
}

const Modal: React.FC<ModalProps> = ({ modalType, isOpen, onClose, onSubmit, initialData }) => {
  const formik = useFormik({
    initialValues: {
      daerah: initialData?.daerah || '',
      value: initialData?.value || '',
      // tingkat will be auto-generated, no need for initial value
    },
    validationSchema: Yup.object({
      daerah: Yup.string().required('Daerah is required'),
      value: Yup.number().required('Value is required').min(1, 'Value must be greater than 0'),
    }),
    onSubmit: (values) => {
      // Auto-generate tingkat from the value
      const tingkat = getTingkat(Number(values.value));
    
      // Call the onSubmit prop passed from parent (Dashboard page)
      onSubmit({
        daerah: values.daerah,
        value: values.value,
        tingkat: tingkat,
      });
      formik.resetForm
    },
  });

  return (
    <div
      className={`${
        isOpen ? 'block' : 'hidden'
      } fixed inset-0 z-50 flex justify-center items-center bg-gray-800 bg-opacity-50`}
      role="dialog"
      aria-hidden={!isOpen}
    >
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="flex items-center justify-between border-b pb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {modalType === 'create' && 'Add New Data'}
            {modalType === 'edit' && `Edit Data for ID: ${initialData?.id}`}
            {modalType === 'delete' && `Confirm Delete for ID: ${initialData?.id}`}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-900 text-xl">
            &times;
          </button>
        </div>

        <div className="mt-4">
          {modalType !== 'delete' ? (
            <form onSubmit={formik.handleSubmit}>
              <div className="space-y-4">
                {modalType === 'create' || modalType === 'edit' ? (
                  <>
                    <div>
                      <label htmlFor="daerah" className="block text-sm text-gray-700">
                        Daerah
                      </label>
                      <input
                        type="text"
                        id="daerah"
                        name="daerah"
                        value={modalType === "create" ? formik.values.daerah : initialData?.daerah}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700"
                      />
                      {formik.touched.daerah && formik.errors.daerah ? (
                        <div className="text-red-500 text-sm">{formik.errors.daerah}</div>
                      ) : null}
                    </div>
                    <div>
                      <label htmlFor="value" className="block text-sm text-gray-700">
                        Value
                      </label>
                      <input
                        type="number"
                        id="value"
                        name="value"
                        value={modalType === "create" ? formik.values.value : initialData?.value}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700"
                      />
                      {formik.touched.value && formik.errors.value ? (
                        <div className="text-red-500 text-sm">{formik.errors.value}</div>
                      ) : null}
                    </div>
                  </>
                ) :(
                    <div className='flex justify-end mt-4 space-x-3'>
                      <p>test</p>
                      <button
                    type="button"
                    onClick={() => onSubmit(initialData)} // Call the delete function
                    className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
                  >
                    Delete
                      </button>
                      <button
                  type="button"
                  onClick={onClose}
                  className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
                  </div>
                )}
              </div>

              <div className="flex justify-end mt-4 space-x-3">
                {modalType === 'create' ? (
                  <button
                    type="submit"
                    className="bg-blue-700 text-white py-2 px-4 rounded-md hover:bg-blue-800"
                  >
                    Add Data
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-800"
                  >
                    Save Changes
                  </button>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className='flex justify-end mt-4 space-x-3'>
            <button
          type="button"
          onClick={() => onSubmit(initialData)} // Call the delete function
          className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
        >
          Delete
            </button>
            <button
        type="button"
        onClick={onClose}
        className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300"
      >
        Cancel
      </button>
        </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
