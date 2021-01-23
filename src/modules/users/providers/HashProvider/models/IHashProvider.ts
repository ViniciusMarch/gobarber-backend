export default interface IHashProvider {
  generateHash(payload: string): Promise<string>;
  compateHash(payload: string, hashed: string): Promise<boolean>;
}
