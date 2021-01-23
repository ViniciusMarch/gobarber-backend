export default interface IStorageProvider {
  saveFile(file: string): Promise<string>; // Recebo o nome do arquivo e devolvo o caminho completo
  deleteFile(file: string): Promise<void>;
}
