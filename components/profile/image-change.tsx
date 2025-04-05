"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Pencil, Trash2, X } from "lucide-react";
import { IKUpload } from "imagekitio-next";
import { useRef, useState } from "react";
import axios from "axios";
import { IKImage } from "imagekitio-next";

interface ProfileImageOverlayProps {
  isOpen: boolean;
  imageType: string;
  onClose: () => void;
  targetImage: string;
  onChangeImage: () => void;
  onDeleteImage: () => void;
}

export function ProfileImageOverlay({
  isOpen,
  imageType,
  onClose,
  targetImage,
  onChangeImage,
  onDeleteImage,
}: ProfileImageOverlayProps) {
  if (!isOpen) return null;

  const onError = (err: any) => {
    console.log("Error", err);
  };

  const onSuccess = async (res: any) => {
    console.log("Success", res);

    const imageKitUrl = res.url;

    try {
      const response = await axios.post(
        "/api/imagekit-update",
        { imageKitUrl, imageType },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Image Changed:", response.data);
    } catch (error: any) {
      console.error(
        "Error while changing image:",
        error.response?.data || error.message
      );
    }
    onChangeImage();
  };

  const uploadRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between p-4 space-y-0">
          <h3 className="text-lg font-medium">Profile Image</h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
            <span className="sr-only">Close</span>
          </Button>
        </CardHeader>
        <CardContent className="flex items-center justify-center p-6">
          {imageType === "profile" && (
            <div className="relative w-40 h-40 overflow-hidden rounded-full">
              <IKImage
                src={targetImage}
                alt="Profile Picture"
                className="rounded-full object-cover"
                width={160}
                height={160}
              />
            </div>
          )}
          {imageType === "cover" && (
            <div className="relative w-[480px] h-[180px] overflow-hidden rounded-t-xl flex items-center justify-center">
              <IKImage
                src={targetImage}
                alt="Cover Picture"
                className="rounded-t-xl object-cover object-center"
                width={480}
                height={180}
              />
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between p-4">
          <Button onClick={() => uploadRef.current?.click()}>
            <Pencil className="w-4 h-4 mr-2" />
            Change Image
          </Button>

          <IKUpload
            ref={uploadRef}
            className="hidden" // Hides the default UI
            onSuccess={onSuccess}
          />
          <Button variant="destructive" onClick={onDeleteImage}>
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
