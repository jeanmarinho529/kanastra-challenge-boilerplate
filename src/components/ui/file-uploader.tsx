import { useState, useRef } from "react";

import { FileModalUpload } from "@/components/ui/file-modal-upload";

type FileUploaderProps = {
  onConfirm: (file: File) => void;
};

const FileUploader = ({ onConfirm }: FileUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList && fileList.length > 0) {
      setSelectedFile(fileList[0]);
      setIsModalOpen(true);
    }
  };

  const handleUploadCancel = () => {
    setSelectedFile(null);
    setIsModalOpen(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <>
      {selectedFile && isModalOpen && (
        <FileModalUpload
          file={selectedFile}
          onClose={handleUploadCancel}
          onConfirm={() => onConfirm(selectedFile)}
        />
      )}

      <div className="flex flex-col gap-6">
        <div>
          <input
            ref={fileInputRef}
            onChange={handleFileChange}
            type="file"
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,text/csv"
          />
        </div>
      </div>
    </>
  );
};

export { FileUploader };
