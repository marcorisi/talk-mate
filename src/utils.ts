const isDevelopment = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === undefined;

class Logger {
  private shouldPrintToConsole: boolean;

  constructor() {
    this.shouldPrintToConsole = isDevelopment;
  }

  log(...args: any[]): void {
    if (this.shouldPrintToConsole) {
      console.log(...args);
    }
  }

  warn(...args: any[]): void {
    if (this.shouldPrintToConsole) {
      console.warn(...args);
    }
  }

  error(...args: any[]): void {
    if (this.shouldPrintToConsole) {
      console.error(...args);
    }
  }
}

// Create a singleton instance
const logger = new Logger();

export { logger };
