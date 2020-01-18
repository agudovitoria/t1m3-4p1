export default interface QueueRepository {
  publish(message: string);
}
