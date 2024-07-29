import { DataSource } from 'typeorm';
import { AbstractEntity } from '../entities';

export abstract class AbstractRepository<TEntity extends AbstractEntity> {
  constructor(private readonly dataSource: DataSource) {}

  public getDataSource(): DataSource {
    return this.dataSource;
  }
}
