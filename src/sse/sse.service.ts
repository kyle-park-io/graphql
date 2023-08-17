import { Injectable, MessageEvent } from '@nestjs/common';
import { Observable, interval, map } from 'rxjs';

@Injectable()
export class SseService {
  test(): Observable<MessageEvent> {
    return interval(1000).pipe(map((_) => ({ data: { hello: 'world' } })));
  }
}
