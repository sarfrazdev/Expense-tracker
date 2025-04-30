import React from 'react';
import { LuUpload, LuUser, LuTrash } from 'react-icons/lu';

const ProfilePhotoSelector = ({ image, setImage }) => {
    const inputRef = React.useRef(null);
    const [previewUrl, setPreviewUrl] = React.useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const preview = URL.createObjectURL(file);
            setPreviewUrl(preview);
        }
    };

    const handleRemoveImage = () => {
        setImage(null);
        setPreviewUrl(null);
    };

    const onChooseFile = () => {
        inputRef.current.click();
    };

    return (
        <div className="flex justify-center mb-6 mt-6">
            <input
                type="file"
                accept="image/*"
                ref={inputRef}
                onChange={handleImageChange}
                className="hidden"
            />

            {!image ? (
                <div className=" rounded-full p-5">
                    <LuUser className="w-16 h-16 text-gray-400" />
                    <button
                        type="button"
                        className=" p-2 flex items-center bg-primary text-white rounded-full -bottom-1 ml-[50px]"
                        onClick={onChooseFile}
                    >
                        <LuUpload className="w-5 h-5" />
                    </button>
                </div>
            ) : (
                <div className="flex flex-col items-center space-y-2">
                    <img
                        src={previewUrl}
                        alt="Selected profile"
                        className="w-24 h-24 rounded-full object-cover border"
                    />
                    <button
                        type="button"
                        className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
                        onClick={handleRemoveImage}
                    >
                        <LuTrash className="w-5 h-5" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProfilePhotoSelector;
