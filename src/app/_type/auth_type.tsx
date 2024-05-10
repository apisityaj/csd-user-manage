export type LoginResponse = {
  result: any;
  status: number;
  data: {
    result: {
      accessToken: string;
      id: string;
    }[];
  };
};
