import { useState, useEffect, ReactElement } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { FileUploader } from "@/components/ui/file-uploader";

import {
  getFiles,
  IFile,
  ApiData,
  formatDate,
  importFile,
} from "@/services/File";

function FileList(): ReactElement {
  const [files, setFiles] = useState<IFile[]>([]);

  useEffect(() => {
    getFiles().then((data: ApiData<IFile[]>) => setFiles(data.result.data));
  }, []);

  const handleUploadConfirm = (file: File) => {
    importFile(file).then((data: ApiData<IFile>) => {
      setFiles([...files, data.result.data]);
    });
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-green-800">File List</h1>

        <FileUploader onConfirm={handleUploadConfirm} />
      </div>

      <Table>
        <TableCaption>List of imported files.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>File Name</TableHead>
            <TableHead>Total Items</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Upload</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {files.map((file: IFile) => (
            <TableRow key={file.id}>
              <TableCell>{file.name}</TableCell>
              <TableCell>
                {file.total_done}/{file.total_items}
              </TableCell>
              <TableCell>{file.batch_file_status.display_name}</TableCell>
              <TableCell>{file.batch_file_type.display_name}</TableCell>
              <TableCell>{formatDate(file.created_at)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export { FileList };
