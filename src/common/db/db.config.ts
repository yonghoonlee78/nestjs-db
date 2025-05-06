import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const dbConfig = (
  configService: ConfigService
): TypeOrmModuleOptions => {
  const config: TypeOrmModuleOptions = {
    // Todo: DB Config를 완성시켜주세요.
    type: 'postgres',
    host: '',
    port: 0,
    username: '',
    password: '',
    database: '',
    autoLoadEntities: true,
    synchronize: true,
  };

  console.log('📦 DB 설정 정보:', {
    host: config.host,
    port: config.port,
    username: config.username,
    password: '****',
    database: config.database,
  });

  return config;
};
