import React from 'react';

interface AddCommentProps {
  isVisible: boolean;
}

const AddComment: React.FC<AddCommentProps> = ({ isVisible }) => {
  return (
    <div
      className="px-2 py-4"
      style={{ display: isVisible ? 'block' : 'none' }}
    >
      <div className="w-full mx-auto bg-white border border-gray-300 rounded-lg shadow-sm p-1 cursor-pointer flex items-center justify-center gap-1">
        <input
          type="text"
          className="w-[90%] bg-white p-2 outline-none"
          placeholder="Write a Comment..."
        />
        <button
          className="rounded-full bg-[var(--mainGreen)] px-4 py-2 text-white hover:bg-[var(--mainGreenDark)]"
        >
          Comment
        </button>
      </div>
    </div>
  );
};

export default AddComment;
