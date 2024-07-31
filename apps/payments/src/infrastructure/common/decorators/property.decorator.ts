import { PropertyType } from 'apps/payments/src/domain/enums/property.enum';

export function Property(type: PropertyType) {
  return function (target: any, propertyKey: string) {
    const properties = Reflect.getMetadata(type, target) || [];

    if (propertyKey === 'baseEntity') {
      properties.push('createdAt', 'updatedAt');
    } else {
      properties.push(propertyKey);
    }

    Reflect.defineMetadata(type, properties, target);
  };
}
