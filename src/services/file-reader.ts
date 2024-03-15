const cache = new WeakMap<File, ArrayBuffer>();

export async function readFile(file: File) {
  if (cache.has(file)) return cache.get(file)!;

  return new Promise<ArrayBuffer>((res, rej) => {
    const reader = new FileReader();
    reader.onload = () => res(reader.result as ArrayBuffer);
    reader.onerror = (e) => rej(new Error("Failed to read file"));
    reader.readAsArrayBuffer(file);
  });
}

export async function readFileAsText(file: File) {
  return new Promise<string>((res, rej) => {
    const reader = new FileReader();
    reader.onload = () => res(reader.result as string);
    reader.onerror = (e) => rej(new Error("Failed to read file"));
    reader.readAsText(file);
  });
}
