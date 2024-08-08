import * as XLSX from 'xlsx';
import {KakaoAPIInterface} from "./interfaces/kakaoAPI.interface";

export function createExcel(documents:KakaoAPIInterface.Document[] , filePath: string): void {
  const worksheet = XLSX.utils.json_to_sheet(documents);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Documents');

  XLSX.writeFile(workbook, filePath);
}