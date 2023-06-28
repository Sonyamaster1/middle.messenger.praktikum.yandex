type Handler = (...args: unknown[]) => void;
export default class EventBus {
  private listeners: Record<string, Handler[]> = {};

  on(event: string, callback: Handler) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event]?.push(callback);
  }

  off(event: string, callback: Handler) {
    this.listeners[event] = this.listeners[event].filter(
      listener => listener !== callback,
    );
  }

  emit(event: string, ...args: unknown[]): void {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event]!.forEach(listener => {
      listener(...args);
    });
  }
}
