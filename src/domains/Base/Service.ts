export interface Service<T> {
  getById(id: number): Promise<T>;
  getList(): Promise<T[]>;
  create(entity: T): Promise<T>;
  update(entity: T): Promise<T>;
  delete(id: number): Promise<void>;
}
