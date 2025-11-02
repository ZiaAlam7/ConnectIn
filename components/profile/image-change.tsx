"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Pencil, Trash2, X, Loader2 } from "lucide-react";
import { IKUpload, IKImage } from "imagekitio-next";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

interface ProfileImageOverlayProps {
  isOpen: boolean;
  imageType: string;
  onClose: () => void;
  targetImage: string;
  onChangeImage: () => void;
  onDeleteImage: () => void;
}

export function ProfileImageOverlay({
  isOpen = false,
  imageType,
  onClose = () => {},
  targetImage,
  onChangeImage,
  onDeleteImage,
}: ProfileImageOverlayProps) {
  const uploadRef = useRef<HTMLInputElement | null>(null);
  const [isUploading, setIsUploading] = useState(false); // ✅ Spinner control

  const onError = (err: any) => {
    console.log("Error", err);
    setIsUploading(false);
  };

  const onSuccess = async (res: any) => {
    console.log("Upload Success:", res);

    const values = res.url;
    const target = imageType;

    try {
      const response = await axios.post(
        "/api/user-update",
        { target, values },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("Image Changed:", response.data);
      // Wait briefly to show spinner before reload
      setTimeout(() => {
        onChangeImage();
      }, 500);
    } catch (error: any) {
      console.error(
        "Error while changing image:",
        error.response?.data || error.message
      );
      setIsUploading(false);
    }
  };

  // ✅ Show spinner immediately when upload starts
  const onUploadStart = () => {
    console.log("Upload started...");
    setIsUploading(true);
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <Card
        className="w-full max-w-md relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ✅ Spinner overlay */}
        {isUploading && (
          <div className="absolute inset-0 bg-white/70 flex flex-col items-center justify-center z-50">
            <Loader2 className="w-8 h-8 text-[var(--mainGreen)] animate-spin" />
            <p className="mt-2 text-gray-700 font-medium">Uploading image...</p>
          </div>
        )}

        <CardHeader className="flex flex-row items-center justify-between p-4 space-y-0">
          <h3 className="text-lg font-medium">
            {imageType === "profile_image" ? "Profile Image" : "Cover Image"}
          </h3>
          <Button variant="ghost" size="icon" onClick={onClose} disabled={isUploading}>
            <X className="w-4 h-4" />
            <span className="sr-only">Close</span>
          </Button>
        </CardHeader>

        <CardContent className="flex items-center justify-center p-6">
          {imageType === "profile_image" && (
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
          {imageType === "cover_image" && (
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
          <Button
            onClick={() => uploadRef.current?.click()}
            disabled={isUploading}
          >
            <Pencil className="w-4 h-4 mr-2" />
            Change Image
          </Button>

          {/* ✅ Added onUploadStart */}
          <IKUpload
            ref={uploadRef}
            className="hidden"
            onSuccess={onSuccess}
            onError={onError}
            onUploadStart={onUploadStart}
          />

          <Button
            variant="destructive"
            onClick={onDeleteImage}
            disabled={isUploading}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
