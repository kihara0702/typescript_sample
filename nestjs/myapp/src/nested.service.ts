import { Injectable } from '@nestjs/common';

@Injectable()
export class NestedService {
  getHello(): string {
    return 'My Service';
  }
}
