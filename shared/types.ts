export interface Dog {
  id: number;
  name: string;
  breed: string;
  image: string;
  ownerId: number;
}

export interface Owner {
  id: number;
  name: string;
  job: string;
}
