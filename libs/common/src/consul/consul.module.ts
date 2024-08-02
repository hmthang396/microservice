import { DynamicModule, Module, ModuleMetadata, Provider, Type } from '@nestjs/common';
import { ConsulService } from './consul.service';
import { ConsulOptions } from 'consul';

export const CONSUL_MODULE_PROVIDER_TOKEN = `CONSUL_OPTIONS`;
export interface ConsulOptionsFactory {
  createConsulOptions(): Promise<ConsulOptions> | ConsulOptions;
}
export interface ConsulAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  useExisting?: Type<ConsulOptionsFactory>;
  useClass?: Type<ConsulOptionsFactory>;
  useFactory?: (...args: any[]) => Promise<ConsulOptions> | ConsulOptions;
}

@Module({
  providers: [],
  exports: [],
})
export class ConsulModule {
  static forRoot(options: ConsulOptions): DynamicModule {
    return {
      module: ConsulModule,
      providers: [
        {
          provide: CONSUL_MODULE_PROVIDER_TOKEN,
          useValue: options,
        },
        {
          provide: ConsulService,
          useFactory: () => {
            return new ConsulService(options);
          },
        },
      ],
      exports: [CONSUL_MODULE_PROVIDER_TOKEN, ConsulService],
    };
  }

  static forRootAsync(options: ConsulAsyncOptions): DynamicModule {
    const consulService: Provider = {
      inject: [CONSUL_MODULE_PROVIDER_TOKEN],
      provide: ConsulService,
      useFactory: (options: ConsulOptions) => new ConsulService(options),
    };

    const asyncProviders = this.createAsyncOptionsProvider(options);
    return {
      module: ConsulModule,
      providers: [...asyncProviders, consulService],
      exports: [CONSUL_MODULE_PROVIDER_TOKEN, consulService],
      imports: [...(options.imports || [])],
    };
  }

  private static createAsyncOptionsProvider(options: ConsulAsyncOptions): Provider[] {
    if (options.useFactory) {
      return [
        {
          provide: CONSUL_MODULE_PROVIDER_TOKEN,
          useFactory: options.useFactory,
          inject: options.inject || [],
        },
      ];
    }
    return [
      {
        provide: CONSUL_MODULE_PROVIDER_TOKEN,
        useFactory: async (optionsFactory: ConsulOptionsFactory): Promise<ConsulOptions> =>
          await optionsFactory.createConsulOptions(),
        inject: options.useClass ? [options.useClass] : [],
      },
    ];
  }
}
