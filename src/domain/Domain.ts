export default interface DomainMapper<T, U> {
  fromRequest(request: any): T;
  toResponse(domain: T): any;
  fromEntity(entity: U): T;
  toEntity(domain: T): U;
}
