import React, { useState } from 'react';
import EmojiPicker from "emoji-picker-react";
import { LuImage, LuX } from "react-icons/lu";

const EmojiPickerPopup = ({ icon, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <div 
                onClick={() => setIsOpen(true)} 
                className="cursor-pointer flex flex-col items-center rounded-lg border p-2"
            >
                <div className="text-2xl">
                    {icon ? (
                        <span className="text-4xl">{icon}</span>  
                    ) : (
                        <LuImage />
                    )}
                </div>
                <p>{icon ? "Change Icon" : "Pick Icon"}</p>
            </div>

            {isOpen && (
                <div className="relative mt-2">
                    <button
                        className="absolute right-2 top-2 text-xl"
                        onClick={() => setIsOpen(false)}
                    >
                        <LuX />
                    </button>
                    <EmojiPicker
                        onEmojiClick={(emojiData, event) => {
                            onSelect(emojiData.emoji);
                            setIsOpen(false); // Close after selecting
                        }}
                    />
                </div>
            )}
        </div>
    );
}

export default EmojiPickerPopup;
