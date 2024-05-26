import { OwnershipGuard } from './ownership.guard';

describe('AuthGuard', () => {
  it('should be defined', () => {
    expect(new OwnershipGuard()).toBeDefined();
  });
});
