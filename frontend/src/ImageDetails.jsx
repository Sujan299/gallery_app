import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios'


const ImageDetails = () => {
    const [imageDetails, setImageDetails] = useState(null);
    const { id } = useParams();
    useEffect(() => {
        const imageDetails = async () => {
            const result = await axios(`http://localhost:8080/api/images/` + id);
            const data = result.data.data;
            console.log(data)
            setImageDetails(data);
        }
        imageDetails();
    }, [id])
    return (
        <div className="image_details max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
            <div className="flex flex-col items-center">
                <img
                    className="w-64 h-64 object-cover rounded-lg"
                    src={imageDetails?.imageURL}
                    alt={imageDetails?.originalName}
                />
                <h1 className="mt-4 text-xl font-bold text-gray-800">
                    {imageDetails?.originalName}
                </h1>
                <p className="mt-2 text-gray-600">{imageDetails?.mimeType}</p>
                <p className="mt-1 text-sm text-gray-500">
                    Size: {imageDetails?.size} bytes
                </p>
            </div>
        </div>

    )
}

export default ImageDetails