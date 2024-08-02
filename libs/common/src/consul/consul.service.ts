import { Inject, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import * as Consul from 'consul';
import { ConsulOptions, } from 'consul';
import { CONSUL_MODULE_PROVIDER_TOKEN } from './consul.module';
@Injectable()
export class ConsulService {
  private consul: Consul.Consul;

  constructor(@Inject(CONSUL_MODULE_PROVIDER_TOKEN) private readonly _options: ConsulOptions) {
    this.consul = new Consul(_options);
  }

  async getServiceUrl(serviceName: string): Promise<any[]> {
    const services = await this.consul.catalog.service.nodes<any[]>(serviceName);
    // if (services.length > 0) {
    //   const service = services[0];
    //   return `http://${service.ServiceAddress}:${service.ServicePort}`;
    // }
    return services;
  }

  async register(otps: Consul.Agent.Service.RegisterOptions) {
    return await this.consul.agent.service.register(otps);
  }

  async deregister(otps: Consul.Agent.Service.DeregisterOptions) {
    return await this.consul.agent.service.deregister(otps);
  }
}














