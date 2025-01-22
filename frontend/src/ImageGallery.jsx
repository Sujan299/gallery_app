import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom'

const ImageGallery = () => {
    const [loading, setLoading] = useState(false)
    const onDrop = async (acceptedFiles) => {
        setLoading(true);
        const formData = new FormData();
        acceptedFiles.forEach(file => {
            formData.append("images", file);
        });

        try {
            const result = await axios.post("http://localhost:8080/api/images/upload-images/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            const { message, success } = result.data;
            if (success) {
                setLoading(false);
                toast['success'](message);
                fetchImages();
                
            }
            // if()
        } catch (err) {
            console.log("Error while uploading", err)
            toast['error'](err);

        }
    }
    const { getRootProps, getInputProps } = useDropzone({ onDrop });
    const [imageList, setImageList] = useState([]);
    const fetchImages = async () => {
        try {
            const result = await axios("http://localhost:8080/api/images");
            const { data } = result.data;
            setImageList(data);
        } catch (err) {
            console.log("Error during fetching images", err)
        }
    }
    useEffect(() => {
        fetchImages();
    }, [])
    console.log(imageList)

    return (
        <div>
            <h1 className='text-center text-5xl font-semibold text-blue-700'>Gallery App | Cloudinary and multer</h1>

            <div className='w-full h-52 flex justify-center items-center font-bold cursor-pointer'>
                <div className='text-4xl w-2/4 h-32 bg-slate-400 rounded-lg text-center items-center flex justify-center' {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>Drag or Drop or Select Files!</p>
                </div>
            </div>
           {
            loading ? <div className='text-center text-3xl mb-4'>Loading ... </div> : null
           }
            <div className='grid md:grid-cols-5 sm:grid-cols-2 grid-cols-1 gap-6 w-5/6 md:mx-24 sm:mx-12 mx-auto justify-items-center'>
                {
                    imageList.map((img) => {
                        return <div key={img._id} className='w-full h-72 overflow-hidden'>
                            <Link to={img._id}>
                                <img src={img.imageURL} className='h-full w-full object-cover rounded-lg'/>
                            </Link>
                        </div>
                    })
                }
            </div>
            <ToastContainer postion="top-right" autoClose={3000} hideProgressBar={false} />
        </div>
    )
}

export default ImageGallery