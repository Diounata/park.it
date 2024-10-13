export interface UseCase {
  handle(input: any): Promise<any>;
}
