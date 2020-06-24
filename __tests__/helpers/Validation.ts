import { validateSync } from 'class-validator';

export default function validateModelObject(modelObject: any): { [key: string]: string } {
  const errorResponse = validateSync(modelObject);
  const errorList = {};

  errorResponse.forEach((error) => {
    const { property } = error;
    errorList[`${property}`] = error.constraints;
  });

  return errorList;
}
