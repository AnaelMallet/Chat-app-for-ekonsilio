import { graphqlProps } from "./basicResolvers"

import { Result } from "./Results"

export interface BasicController {
  useCase: any
  executeImplementation(props: graphqlProps): Promise<Result<any>>
}