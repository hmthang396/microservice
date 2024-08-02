import { DataSource } from 'typeorm';

export abstract class AbstractRepository {
  constructor(private readonly dataSource: DataSource) {}

  public getDataSource(): DataSource {
    return this.dataSource;
  }
}
