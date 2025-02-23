import { InputHTMLAttributes, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import Button from "../button/button.component";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const MIN_FILE_SIZE = 25 * 1024;

export default function FileInput({
  label = "Upload file",
  error,
  ...props
}: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const isValidFileSize = (file: File) => {
    return file.size <= MAX_FILE_SIZE && file.size >= MIN_FILE_SIZE;
  };

  const handleFile = (selectedFile: File) => {
    if (!isValidFileSize(selectedFile)) {
      toast("Invalid File Size");
      return;
    }
    setFile(selectedFile);
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      handleFile(selectedFile);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      handleFile(droppedFile);
    }
  };

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <div
      className="flex-1 border-gray-500 border-[1px] rounded-lg p-4 flex flex-col items-center gap-4 cursor-pointer hover:opacity-75 active:opacity-95"
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <input
        {...props}
        ref={inputRef}
        name={props.name}
        className="hidden"
        type="file"
        onChange={handleFileChange}
      />
      <div className="w-full bg-gray-500/25 p-2">{label}</div>
      {file && preview ? (
        <div className="mt-4">
          {file.type.startsWith("image/") ? (
            <img
              src={preview}
              alt="Preview"
              className="mx-auto max-h-60 object-contain"
            />
          ) : (
            <embed
              src={preview}
              type="application/pdf"
              className="mx-auto w-full h-60"
            />
          )}
          <div>{file.name} </div>
          <Button className="mt-4 w-full">Change File</Button>
        </div>
      ) : (
        <>
          <img
            src="https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="
            width={100}
            height={100}
          />
          <div>Click to select the document (image or pdf)</div>
          <div className="text-xs -mt-4 opacity-50">
            (size must be higher than 25KB and less than 5MB)
          </div>
        </>
      )}
    </div>
  );
}
