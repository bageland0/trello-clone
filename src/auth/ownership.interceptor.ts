import { Injectable, NotFoundException } from '@nestjs/common';
import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class OwnershipInterceptor implements NestInterceptor {
  constructor() {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user.id;

    if (request.method === 'DELETE') {
      return next.handle();
    }
    if (request.method === 'POST' || request.method === 'PATCH') {
      request.body = { ...request.body, userId };
    }
    console.log(request.body);

    console.log(request);
    return next.handle().pipe(
      map((entities) => {
        console.log(typeof entities, entities)
        if (Array.isArray(entities)) {
          return entities.filter((entity) => entity.userId === userId);
        }
        if (entities.userId !== userId) {
          console.log(entities);
          throw new NotFoundException();
        }
        return entities;
      }),
    );
  }
}