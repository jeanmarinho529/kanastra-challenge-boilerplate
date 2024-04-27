import { format } from "date-fns";
import axios from "axios";

const API_URL = "http://0.0.0.0:85/api/v1";

export type IFileStatus = {
  id: number;
  display_name: string;
  name: string;
  created_at: string;
};

export type IFileType = {
  id: number;
  display_name: string;
  name: string;
  created_at: string;
};

export type IFile = {
  id: number;
  batch_file_status_id: number;
  batch_file_type_id: number;
  name: string;
  path: string;
  total_items: number;
  total_done: number;
  total_failed: number;
  created_at: string;
  batch_file_status: IFileStatus;
  batch_file_type: IFileType;
};

export function formatDate(date: string): string {
  return format(new Date(date), "MM/dd/yy hh:mm a");
}

export type ApiData<T> = {
  result: {
    data: T;
  };
  status: boolean;
  status_code: number | string;
  paginate: object;
};

export async function getFiles(): Promise<ApiData<IFile[]>> {
  const response = await axios.get(`${API_URL}/batch-files?per_page=999`);
  return response.data;
}

export async function importFile(file: File): Promise<ApiData<IFile>> {
  const formData = new FormData();

  formData.append("file_type_name", "billing");
  formData.append("file", file);

  const response = await axios.post(`${API_URL}/batch-files/`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
}
