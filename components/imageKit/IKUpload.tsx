"use client";
import React, { useState } from "react";
import { IKUpload } from "imagekitio-next";
import { Loader2 } from "lucide-react";
import  { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";

interface FileUploadProps {
    onSucess: (res: IKUploadResponse) => void
    onProgress : (progress: number) => void
    fileType? : "image" | "video"
}


export default function imagekitUpload({
    onSucess,
    onProgress,
    fileType = "image"
}: FileUploadProps) {

    const [uploading, setUploading] = useState(false)
    const [error, setError] = useState<string | null>(null)

  const onError = (err: {message : string}) => {
    console.log("Error", err);
    setError(err.message)
    setUploading(false)
  };
  
  const handleSuccess = (res: IKUploadResponse) => {
    console.log("Success", res);
    setUploading(false)
    setError(null)
    onSucess(res)
  };
  
  const  handleStartUpload = () => {
    setUploading(true)
    setError(null)
  };
  
  const handleProgress = (evt: ProgressEvent) => {
    if(evt.lengthComputable && onProgress){
        const percentComplete = (evt.loaded / evt.total) * 100
        onProgress(Math.round(percentComplete))
    }
  };

  const validateFile = (file: File ) => {
    if(fileType === "video"){
        if(!file.type.startsWith("video/")){
            setError("please upload a video file")
            return false
        }
        if(file.size > 100 * 1024 * 1024){
            setError("video must be less then 100 MB")
            return false
        }
    }
    else {
        const validTypes = ['image/jpeg', 'image/png','image/webp']
        if(!validTypes.includes(file.type)){
            setError("please upload a valid image file (JPG, PNG WebP)")
            return false
        }
        if(file.size > 5 * 1024 * 1024){
            setError("Image must be less then 5 MB")
            return false
        }
    }
    return false
  }

  return (
    <div className="space-y-2">
     
        <IKUpload
          fileName="test-upload.jpg"
          useUniqueFileName={true}
          validateFile={validateFile}
         
          
          onError={onError}
          onSuccess={handleSuccess}
          onUploadProgress={handleProgress}
          onUploadStart={handleStartUpload}
          folder={fileType === "video"?"videos/*":"images/*"}
          style={{display: 'none'}} // hide the default input and use the custom upload button
        />
        {
            uploading && 
            <div>
                <Loader2/>
            </div>
        }
     
    </div>
  );
}