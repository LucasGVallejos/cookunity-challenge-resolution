import { DeleteResult } from 'typeorm';

export interface BaseInterfaceRepository<T> {
    create(data: T | any): Promise<T>;

    findOneByCondition(filterCondition: any): Promise<T | null>;

    findByCondition(filterCondition: any): Promise<T[]>;

    findAll(findManyOptions?: any): Promise<T[]>;

    update(data: T | any): Promise<T>;

    bulkUpdate(data: T[]) : Promise<T[]>;

    remove(id: string): Promise<DeleteResult>;
}