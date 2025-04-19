"use client";

import React from "react";
import Image from "next/image";
import { IKImage } from "imagekitio-next";

interface CommentProps {
  profileImage: string;
  name: string;
  headline: string;
  comment: string;
}

const CommentComponent: React.FC<CommentProps> = ({
  profileImage,
  name,
  headline,
  comment,
}) => {
  return (
    <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm border">
      <IKImage
        src={profileImage}
        alt={`${name}'s profile picture`}
        className="rounded-full object-cover"
        width={40}
        height={40}
      />
      <div className="flex-1">
        <div className="mb-1">
          <p className="font-semibold text-sm">{name}</p>
          <p className="text-xs text-gray-500">{headline}</p>
        </div>
        <p className="text-sm text-gray-800">{comment}</p>
      </div>
    </div>
  );
};

export default CommentComponent;
