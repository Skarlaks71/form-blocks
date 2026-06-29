import { isValidInputType } from "../utils/useSearch";
import useParse from "../utils/useParse";
import { useCore } from "../composables/useCore";

const { castPrimitive, resolveTargetProperty } = useParse()

/**
 * Lista de estratégias para processar segmentos da DSL.
 * Cada matcher possui um teste de detecção e uma função de aplicação no objeto de resultado.
 */
const INTERNAL_MATCHERS = [
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
    // 🔥 Componentes Registrados Customizados ou Dinâmicos
    // Ele tenta ler o método getRegistry que você expôs no useCore
    test: (part) => {
      const registry = useCore().getRegistry();
      return registry && Object.prototype.hasOwnProperty.call(registry, part) ? part : null;
    },
    apply: (result, part) => {
      const registry = useCore().getRegistry();
      const registeredElement = registry[part];

      // Aplica a tag/instância do componente correspondente
      result.component = registeredElement.component;
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
    // chave@[contexto]: options@radioOptions, f.labelClass@myLabelClass
    test: (part) => part.match(/^(?<left>[\w.-]+)@(?<value>[\w.]+)$/),
    apply: (result, match) => {
      const { left, value } = match.groups
      // Salva o ponteiro temporário com '@' para ser resolvido depois na resolveDslContext
      resolveTargetProperty(result, left, `@${value}`)
    }
  },
  {
    // Chave=Valor: name=Pedro, age=30|n, formKey>f=myKey
    test: (part) => part.match(/^(?<left>[^=\s]+)=(?<value>.+)$/),
    apply: (result, match) => {
      const { left, value } = match.groups
      const cleanedValue = castPrimitive(value)

      resolveTargetProperty(result, left, cleanedValue)
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
  },
];

const customMatchers = [];

const DSL_MATCHERS = new Proxy(INTERNAL_MATCHERS, {
  get(target, prop) {
    if (prop === 'length') return target.length + customMatchers.length;
    
    // Une os arrays dinamicamente quando o parser rodar o .forEach ou loops
    const combined = [...customMatchers, ...target];
    return combined[prop];
  }
});

/**
 * registrar novos comportamentos na DSL
 * @param {Object} matcher - { test: Function, apply: Function }
 */
const registerCustomMatcher = (matcher) => {
  if (!matcher || typeof matcher.test !== 'function' || typeof matcher.apply !== 'function') {
    console.error('[FormBlocks Core]: O matcher customizado precisa conter as funções "test" e "apply".');
    return;
  }
  customMatchers.push(matcher);
};

export { DSL_MATCHERS, registerCustomMatcher }