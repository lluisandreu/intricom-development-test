import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export type DataType = 'DB' | 'FS';

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) {}

  get dataType(): DataType {
    // Tipo de persistencia: DB (base de datos) | FS (fichero)
    return this.configService.getOrThrow<DataType>('DATA_TYPE');
  }

  get fsFolder(): string {
    // Ruta de la carpeta donde se guardarán los ficheros (si DATA_TYPE=FS)
    return this.configService.getOrThrow<string>('FS_FOLDER');
  }
}
