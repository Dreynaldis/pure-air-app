import { useState, useEffect } from "react";
import axios from "axios";
import Modal from "../component/Modal";
import { handleToastError, handleToastSuccess } from "../utils/toast";
import Cookies from "js-cookie";
import { useNavigate, useParams } from "react-router-dom";

interface QualityData {
  id: number;
  daerah: string;
  value: number;
  tingkat: string;
}

const DetailsPage = () => {
  const { id } = useParams<{ id: string }>(); // Get ID from URL parameters
  const [qualityData, setQualityData] = useState<QualityData | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"edit" | "delete">("edit");
  const [currentEditData, setCurrentEditData] = useState<any | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchDetails(Number(id));
    }
  }, [id]);

    const fetchDetails = async (id: number) => {
      console.log(id)
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/quality/${id}`);
      setQualityData(response.data.data[0]);
    } catch (error) {
      console.error("Error fetching data", error);
      handleToastError("Failed to load data");
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleOpenModal = (type: "edit" | "delete", item: QualityData) => {
    setModalType(type);
    setShowModal(true);
    setCurrentEditData(item);
  };

    const handleBack = () => {
      navigate('/dashboard')
  }
  const handleEditSubmit = async (updatedData: { daerah: string; value: number; tingkat: string }) => {
    try {
      let token = Cookies.get("token");
      if (token && qualityData?.id) {
        await axios.put(
          `${import.meta.env.VITE_API_BASE_URL}/quality/${qualityData.id}`,
          updatedData,
          { headers: { authorization: token } }
        );
        fetchDetails(qualityData.id); // Reload data after edit
        setShowModal(false);
        handleToastSuccess("Data updated successfully");
      }
    } catch (error: any) {
     if (error.response.data.message === "Token is required" || error.response.data.message === "Invalid token") {
                    console.error("Token is required")
                    handleToastError("Please login")
                    navigate("/login")
                } else {
                    console.error(`Error updating data: ${id}`, error)
                    handleToastError('Failed to update data, please try again')
                }
    }
  };

  const handleDelete = async () => {
    try {
      let token = Cookies.get("token");
      if (token && qualityData?.id) {
        await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/quality/${qualityData.id}`, {
          headers: { authorization: token },
        });
        setShowModal(false);
        navigate("/dashboard"); // Navigate back to dashboard after delete
        handleToastSuccess("Data deleted successfully");
      }
    } catch (error: any) {
        if (error.response.data.status === "Token is required" || error.response.data.message === "Invalid token") {
            console.error("Token is required")
            handleToastError("Please login")
            navigate("/login")
        } else {
            console.error(`Error deleting data: ${id}`, error)
            handleToastError('Failed to delete data, please try again')
        }
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full md:w-3/4 lg:w-2/3 xl:w-1/2 flex flex-col items-center">
        <h1 className="text-3xl text-center">Details Page</h1>
        {qualityData ? (
          <div className="bg-s1 mt-6 w-full bg-white p-6 border rounded-lg shadow-md">
            <h2 className="text-2xl text-center mb-4">Data Details</h2>
            <div className="space-y-4">
              <div>
                <strong>ID: </strong>
                {qualityData.id}
              </div>
              <div>
                <strong>Daerah: </strong>
                {qualityData.daerah}
              </div>
              <div>
                <strong>Value: </strong>
                {qualityData.value}
              </div>
              <div>
                <strong>Tingkat: </strong>
                {qualityData.tingkat}
              </div>
            </div>

                <div className="mt-6 flex justify-around">
                      <button
                onClick={handleBack}
                className="bg-gray-500 text-white px-5 py-2 rounded-lg"
              >
                back to dashboard
              </button>
            <div className="flex justify-between">
              <button
                onClick={() => handleOpenModal("edit", qualityData)}
                className="bg-blue-500 mx-2 text-white px-5 py-2 rounded-lg"
              >
                Edit
              </button>
              <button
                onClick={() => handleOpenModal("delete", qualityData)}
                className="bg-red-500 mx-2 text-white px-5 py-2 rounded-lg"
              >
                Delete
              </button>
            </div>
            </div>
          </div>
        ) : (
          <p>Loading data...</p>
        )}
      </div>

      <Modal
        modalType={modalType}
        isOpen={showModal}
        onClose={closeModal}
        onSubmit={modalType === "edit" ? handleEditSubmit : handleDelete}
              initialData={currentEditData}

      />
    </div>
  );
};

export default DetailsPage;
