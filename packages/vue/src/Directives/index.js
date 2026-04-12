import limitChars from "./limitChars"

export default function(app) {
  app.directive('limit-chars', limitChars)
}