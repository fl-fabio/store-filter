import { Product } from "interfaces/Product";

export const getUniqueValues = (products: Product[], key: keyof Product): string[] => {
    const unique = products.map((product) => product[key])
                           .filter((value, index, self) => self.indexOf(value) === index);
  
    return unique as string[];
  }
  
  export default getUniqueValues;