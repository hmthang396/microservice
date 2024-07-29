export interface IPspTransactionRepository<Entity, EntityManager> {
  getEntityManager(): EntityManager;
  create(entity: Entity): Promise<Entity>;
}
