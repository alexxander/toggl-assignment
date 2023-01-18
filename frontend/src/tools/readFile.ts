/**
 * Read a file and return an array of its non-empty lines
 * @param file
 */
export async function readFile(file: File): Promise<string[]> {
  const reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.addEventListener("error", () => {
      reject(new Error(`Could not read the file "${file.name}"`));
    });
    reader.addEventListener("loadend", (event) => {
      if (!event.target) {
        reject(new Error(`Could not read the file "${file.name}"`));
      } else {
        resolve(
          (event.target.result as string)
            .split(/[\n\r]+/)
            .filter((item) => item.length > 0)
        );
      }
    });
    reader.readAsText(file);
  });
}
