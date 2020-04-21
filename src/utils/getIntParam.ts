import { BadRequestError } from 'routing-controllers'

export function getIntParam(source: string): Promise<number> {
  return new Promise((resolve: Function, reject: Function) => {
    const parsedParam = parseInt(source, 10);

    if (!isNaN(parsedParam)) {
      resolve(parsedParam)
    } else {
      reject(new BadRequestError(`Parameter '${source}' must be an integer`))
    }
  })
}