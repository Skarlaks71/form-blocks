import { registerCustomMatcher } from "./matchers"

export const useDSL = () =>  {
  return {
    registerCustomMatcher,
  }
}