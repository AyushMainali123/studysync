export interface IBaseRepository<T> {
  findAll(): Promise<T[]>;
  findById(id: string): Promise<T | null>;
}
