import { isValidInputType } from "../utils/useSearch";
import useParse from "../utils/useParse";

const { castPrimitive } = useParse()

/**
 * Lista de estratégias para processar segmentos da DSL.
 * Cada matcher possui um teste de detecção e uma função de aplicação no objeto de resultado.
 */
const DSL_MATCHERS = [
  {
    // Breakpoints: sm12, md6, etc.
    test: (part) => part.match(/^(sm|md|lg|xl)(\d+)$/),
    apply: (result, match) => {
      const [_, bp, val] = match;
      result.colProps = { ...result.colProps, [bp]: val }
    }
  },
  {
    // Coluna base: "12", "6"
    test: (part) => /^\d+$/.test(part) ? part : null,
    apply: (result, part) => {
      result.colProps = { ...result.colProps, cols: part }
    }
  },
  {
    // Tipos de Input e Componentes Especiais
    test: (part) => isValidInputType(part) ? part : null,
    apply: (result, part) => {
      if (['checkbox', 'radio'].includes(part)) {
        result.component = part;
      } else if (['date', 'datetime-local', 'month', 'time', 'week'].includes(part)) {
        result.component = 'flatpickr';
      } else if (['range', 'color', 'file', 'image', 'reset', 'submit'].includes(part)) {
        // Fallback de segurança para tipos complexos que seu framework trata como texto
        result.iProps = { ...result.iProps, type: 'text' }
      } else {
        result.iProps = { ...result.iProps, type: part }
      }
    }
  },
  {
    // Chave=Valor: name=Pedro, age=30|n
    test: (part) => part.match(/^(?<key>\w+)=(?<value>.+)$/),
    apply: (result, match) => {
      const { key, value } = match.groups;
      result.iProps = { ...result.iProps, [key]: castPrimitive(value) }
    }
  },
  {
    // Select específico
    test: (part) => part === 'select' ? part : null,
    apply: (result) => {
      result.component = 'select';
      // Mantendo sua lógica de redução padrão para objetos do Select
      result.iProps = { ...result.iProps, reduce: val => val.value }
    }
  }
];

export { DSL_MATCHERS }