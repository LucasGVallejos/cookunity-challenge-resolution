import { DeleteResult, Repository, ObjectLiteral } from 'typeorm';
import { BaseInterfaceRepository } from './base.interface.repository';

export abstract class BaseAbstractRepository<T extends Object> implements BaseInterfaceRepository<T> {

    private entity: Repository<T>;

    protected constructor(entity: Repository<T>) {
        this.entity = entity;
    }

    public async create(data: T): Promise<T> {
        return await this.entity.save(data);
    }

    public async findOneByCondition(filterCondition: any): Promise<T | null> {
        return await this.entity.findOne(filterCondition);
    }

    public async findByCondition(filterCondition: any): Promise<T[]> {
        return await this.entity.find(filterCondition);
    }

    public async findAll(findManyOptions?: any): Promise<T[]> {
        return await this.entity.find(findManyOptions);
    }

    public async update(data: T): Promise<T> {
        return await this.entity.save(data);
    }

    public async bulkUpdate(data: T[]) : Promise<T[]> {
        return await this.entity.save(data, {chunk: 10})
    }

    public async remove(id: string): Promise<DeleteResult> {
        return await this.entity.delete(id);
    }

}