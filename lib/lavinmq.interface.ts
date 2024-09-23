import { Type } from "@nestjs/common";

export interface LavinMQConfig {
  url: Required<string>;
}

export interface LavinMQAsyncConfig {
  useExisting?: Type<LavinMQConfig>;
  useClass?: Type<LavinMQConfig>;
  useFactory?: (
    ...args: any[]
  ) => Promise<LavinMQConfig> | LavinMQConfig;
  useValue: any;
  inject?: any[];
}
