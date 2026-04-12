export default function useMoney() {
  const configMoney = {
    'data-maska-tokens': '9:[0-9]:repeated',
    'data-maska-reversed': true,
  }

  const docMask = { 'data-maska': "['###.###.###-##', '##.###.###/####-##']" }
  const docCPF = '###.###.###-##'
  const docCNPJ = '##.###.###/####-##'
  const dateMask = '##/##/####'
  const dateMonthMask = '##/####'
  const cepMask = '#####-###'

  return {
    configMoney,
    docMask,
    dateMask,
    docCNPJ,
    docCPF,
    dateMask,
    dateMonthMask,
    cepMask,
  }
}