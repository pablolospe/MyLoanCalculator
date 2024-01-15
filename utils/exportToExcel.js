import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";

export const exportToExcel = (csvData, header, fileName) => {
    const fileType ="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";
    const formattedDate = new Date().toISOString().replace(/T/, " ").replace(/\..+/, "");
    console.log(formattedDate);
    const newFileName = `${fileName}_${formattedDate}${fileExtension}`;
    // const ws = XLSX.utils.json_to_sheet(csvData);
    // const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const headerData = Object.entries(header).map(([key, value]) => ({ 'Campo': key, 'Valor': value }));

  // Crea las hojas de trabajo
    const ws1 = XLSX.utils.json_to_sheet(headerData);
    const ws2 = XLSX.utils.json_to_sheet(csvData);

    // Crea un nuevo libro de trabajo y añade las hojas de trabajo
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws1, 'Encabezado');
    XLSX.utils.book_append_sheet(wb, ws2, 'Cuotas');

    // Escribir el libro de trabajo en un buffer
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

    // Crear un blob a partir del buffer y descargarlo usando FileSaver.saveAs
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, newFileName);
  };
