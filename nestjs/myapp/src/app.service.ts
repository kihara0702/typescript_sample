import { Injectable } from '@nestjs/common';
import { NestedService } from './nested.service';

@Injectable()
export class AppService {
  constructor(private readonly myService: NestedService) {}
  getHello(): string {
    return 'Hello World!' + this.myService.getHello();
  }
}
