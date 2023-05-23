declare module "*.svg" {
  const content: any;
  export default content;
}

declare module "*.png" {
  const value: any;
  export default value;
}
declare interface NodeModule {
  hot: {
    accept(path: string, callback: () => void): void;
    dispose(callback: () => void): void;
  };
}
