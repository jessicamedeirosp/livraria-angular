export class Product {
  constructor(
    public id: string,
    public name?: string,
    public author?: string,
    public price?: string
  ) {}

  static fromJson(jsonData: any): Product {
    return Object.assign(new Product(""), jsonData);
  }
}
