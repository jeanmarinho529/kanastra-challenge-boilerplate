interface FileModalUploadProps {
  file: File;
  onClose: () => void;
  onConfirm: (file: any) => void;
}

const FileModalUpload = ({
  file,
  onClose,
  onConfirm,
}: FileModalUploadProps): JSX.Element => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-green-800 text-lg font-bold mb-4">File Detail</h2>

        <p>
          <strong>File Name:</strong> {file.name}
        </p>

        <p>
          <strong>Type:</strong> {file.type}
        </p>

        <p>
          <strong>Size:</strong> {file.size} bytes
        </p>

        <div className="flex justify-end mt-6">
          <button onClick={onClose} className="mr-2">
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="rounded-lg bg-green-800 text-white px-3 py-2 border-none"
          >
            Import
          </button>
        </div>
      </div>
    </div>
  );
};

export { FileModalUpload };
