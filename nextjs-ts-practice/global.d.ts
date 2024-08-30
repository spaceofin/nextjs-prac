declare global {
  interface Window {
    createButton?: () => void;
  }
  // function createButton(): void;
}

export {};
