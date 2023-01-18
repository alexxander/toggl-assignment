import { readFile } from "./readFile";

export interface EmailFileData {
  name: string;
  emails: string[];
}

export async function processEmailFileList(
  fileList: FileList
): Promise<EmailFileData[]> {
  return await Promise.all(
    Array.from(fileList).map(async (item) => ({
      name: item.name,
      emails: await readFile(item),
    }))
  );
}
