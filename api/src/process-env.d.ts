declare global {
  namespace NodeJS {
    interface ProcessEnv {
      
      MY_SECRET: string;
      
    }
  }
}
export{}