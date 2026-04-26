import { DSL_MATCHERS } from "../dsl/matchers";

export default function useParse() {

  /**
  * Converte uma string para camelCase.
  *
  * @param {string} str - A string a ser convertida.
  * @returns {string} - A string convertida para camelCase.
  */
  const toCamelCase = (str) => {
    return str
      .replace(/[-_ ](.)/g, (_, char) => char.toUpperCase()) // Converte traços, underscores e espaços para camelCase
      .replace(/^(.)/, (match) => match.toLowerCase()); // Garante que o primeiro caractere seja minúsculo
  };

  const formatData = (val, formatter) => {
    if (formatter) {
      return formatter(val)
    } 

    return val
  }

  /**
   * Converte um array em um objeto com base no tipo especificado.
   *
   * @param {Object} target - objeto alvo ao qual o grupo deve ser adicionado.
   * @param {Array} groupArray - Array contendo [nome do grupo, tipo do grupo, ...valores].
   * @param {Record<string, any>} formData - Objeto contendo os valores em camelCase.
   * @throws {Error} - Se a entrada for inválida ou o tipo não for um construtor válido.
   *
   * @example
   * parseGroup(["user", Object, "name", "age", "email"]);
   * // Retorna: { user: { name: "name", age: "age", email: "email" } }
   */
  const parseGroup = (target, groupArray, formData, options = {}) => {
    if (!Array.isArray(groupArray) || groupArray.length < 2 || typeof groupArray[0] !== "string") {
      throw new Error("Entrada inválida. O array deve ter um nome, um tipo e pelo menos um valor.");
    }
  
    const [groupName, groupType, ...values] = groupArray;
  
    if (typeof groupType !== "function") {
      throw new Error("O segundo elemento deve ser um construtor de tipo válido.");
    }

    if (groupType === Object) {
      target[groupName] = parseToDatabase(values, formData, options)
    } else if (groupType === Array) {
      target[groupName] = formData[groupName] //.map(item => formatData(item[camelKey], options.formatter(str)))
    }
  };

  /**
   * Converte um array em um objeto com base no tipo especificado.
   *
   * @param {Object} target - objeto alvo ao qual o grupo deve ser adicionado.
   * @param {Array} groupArray - Array contendo [nome do grupo, tipo do grupo, ...valores].
   * @param {Record<string, any>} formData - Objeto contendo os valores em camelCase.
   * @throws {Error} - Se a entrada for inválida ou o tipo não for um construtor válido.
   *
   * @example
   * parseGroup(["user", Object, "name", "age", "email"]);
   * // Retorna: { user: { name: "name", age: "age", email: "email" } }
   */
  const parseGroupEdit = (target, groupArray, formData, options = {}) => {
    if (!Array.isArray(groupArray) || groupArray.length < 2 || typeof groupArray[0] !== "string") {
      throw new Error("Entrada inválida. O array deve ter um nome, um tipo e pelo menos um valor.");
    }
  
    const [groupName, groupType, ...values] = groupArray;
  
    if (typeof groupType !== "function") {
      throw new Error("O segundo elemento deve ser um construtor de tipo válido.");
    }

    if (groupType === Object) {
      return { ...target, ...parseToEditData(values, formData[groupName], options) }
    } else if (groupType === Array) {
      return { ...target, [groupName]: formData[groupName] } //.map(item => formatData(item[camelKey], options.formatter(str)))
    }
  };

  /**
  * Converte um array de strings em um objeto onde as chaves estão em camelCase
  * e os valores vêm de um objeto `editData`.
  *
  * @param {string[]} backVars - Lista de chaves a serem convertidas para camelCase.
  * @param {Record<string, any>} editData - Objeto contendo os valores das chaves originais.
  * @returns {Record<string, any>} - Objeto com parse dos valores do `editData`.
  */
  const parseToEditData = (backVars, editData, options = {}) => {
    return backVars.reduce((acc, str) => {
      const camelKey = toCamelCase(str);
      if (editData.hasOwnProperty(str)) {
          acc[camelKey] = formatData(editData[str], options[str]);
      }
      return acc;
    }, {})
  }

  /**
  * Converte um array de strings em um objeto onde as chaves estão em camelCase
  * e os valores vêm de um objeto `editData`.
  *
  * @param {string[]} backVars - Lista de chaves a serem convertidas para camelCase.
  * @param {Record<string, any>} editData - Objeto contendo os valores das chaves originais.
  * @returns {Record<string, any>} - Objeto com parse dos valores do `editData`.
  */
  const parseToEditDataComplex = (backVars, editData, options = {}) => {
    return backVars.reduce((acc, str) => {
      if (Array.isArray(str) && str.length > 0) {
        acc = { ...acc, ...parseGroupEdit(acc, str, editData, options) }
      } else {
        const camelKey = toCamelCase(str)
        if (editData.hasOwnProperty(str)) {
          acc[camelKey] = formatData(editData[str], options?.formatter?.[str] ?? undefined);
        }
      }
      return acc;
    }, {});
  }

  /**
  * Converte um array de strings em um objeto onde as chaves são os nomes originais
  * e os valores são obtidos de um objeto `editData` utilizando a versão camelCase das chaves.
  *
  * @param {string[]} backVars - Lista de chaves originais.
  * @param {Record<string, any>} formData - Objeto contendo os valores em camelCase.
  * @returns {Record<string, any>} - Objeto com parse valores do `formData` mapeados a partir das versões camelCase.
  */
  function parseToDatabase(backVars, formData, options = {}) {
    return backVars.reduce((acc, str) => {
      const camelKey = toCamelCase(str);
      if (formData.hasOwnProperty(camelKey)) {
        acc[str] = formatData(formData[camelKey], options?.formatter?.[str] ?? undefined);
      }
      return acc;
    }, {});
  }

  /**
  * Converte um array de strings em um objeto onde as chaves são os nomes originais
  * e os valores são obtidos de um objeto `editData` utilizando a versão camelCase das chaves.
  *
  * @param {string[]} backVars - Lista de chaves originais.
  * @param {Record<string, any>} formData - Objeto contendo os valores em camelCase.
  * @returns {Record<string, any>} - Objeto com parse valores do `formData` mapeados a partir das versões camelCase.
  */
  function parseToDatabaseWithRepeater(backVars, formData, options = {}) {
    return backVars.reduce((acc, str) => {
      if (Array.isArray(str) && str.length > 0) {
        acc[str[0]] = formData[str[0]]
      } else {
        const camelKey = toCamelCase(str);
        if (formData.hasOwnProperty(camelKey)) {
          acc[str] = formatData(formData[camelKey], options[str]);
        }
      }
      return acc;
    }, {});
  }

  /**
  * Converte um array de strings em um objeto onde as chaves são os nomes originais
  * e os valores são obtidos de um objeto `editData` utilizando a versão camelCase das chaves.
  *
  * @param {string[]} backVars - Lista de chaves originais.
  * @param {Record<string, any>} formData - Objeto contendo os valores em camelCase.
  * @returns {Record<string, any>} - Objeto com parse valores do `formData` mapeados a partir das versões camelCase.
  */
  function parseToDatabaseComplex(backVars, formData, options = {}) {
    return backVars.reduce((acc, str) => {
      if (Array.isArray(str) && str.length > 0) {
        parseGroup(acc, str, formData, options)
      } else {
        const camelKey = toCamelCase(str);
        if (formData.hasOwnProperty(camelKey)) {
          acc[str] = formatData(formData[camelKey], options?.formatter?.[str] ?? undefined);
        }
      }
      return acc;
    }, {});
  }

  /**
  * Converte um array de strings em um objeto onde as chaves são `model[index]`
  * e os valores são as strings convertidas para camelCase.
  *
  * @param {string[]} backVars - Lista de strings a serem convertidas.
  * @returns {Record<string, string>} - Objeto formatado com a estrutura `model[index]: camelCaseString`.
  */
  const parseToModel = (backVars) => {
    return backVars.reduce((acc, str, index) => {
        acc[`model[${index}]`] = toCamelCase(str);
        return acc;
    }, {});
  }

  /**
  * Converte um array de strings em um array de objetos com estrutura específica,
  * usando um limite ou um range de índices.
  *
  * @param {Array<string | [string, Function, ...string[]]>} stringsArray - Lista de strings a serem convertidas.
  * - O segundo elemento do subarray representa o construtor do tipo (Array, Object, etc).
  * @param {number | [number, number]} limitOrRange - Valor limite ou intervalo de índices.
  * @returns {Array<{ model: string, back: string }>} - Array de objetos formatados.
  */
  const parseLimitProps = (stringsArray, limitOrRange = [0, stringsArray.length]) => {
    const toCamelCase = (str) => {
      return str
        .replace(/[-_ ](.)/g, (_, char) => char.toUpperCase()) // Converte traços, underscores e espaços para camelCase
        .replace(/^(.)/, (match) => match.toLowerCase()); // Garante que o primeiro caractere seja minúsculo
    };

    let start = 0, end = stringsArray.length;

    // Se for um número, define como limite máximo
    if (typeof limitOrRange === "number") {
      end = Math.min(limitOrRange, stringsArray.length);
    }
    // Se for um array [start, end]
    else if (Array.isArray(limitOrRange) && limitOrRange.length === 2) {
      [start, end] = limitOrRange;
      end = Math.min(end, stringsArray.length); // Evita ultrapassar o tamanho
    }

    return stringsArray.slice(start, end).flatMap(item => {
      if (Array.isArray(item) && item.length > 2) {
        const [groupName, _, ...values] = item
        return values.map(str => ({ model: toCamelCase(str), back: `${groupName}.${str}` }));
      } else if (typeof item === "string") {
        return { model: toCamelCase(item), back: item };
      }
      return [];
    });
  }

  /**
   * Transforma uma string formatada (DSL) em um objeto de configuração de input.
   * Suporta definição de tipo e responsividade via shorthands.
   * * @example
   * 'Senha::password:12:md4' => { label: 'Senha', iProps: { type: 'password' }, colProps: { cols: '12', md: '4' } }
   * * @param {string} inputString - A string vinda do array de forms (ex: 'Nome::md6').
   * @returns {Object} Objeto formatado com label, iProps e colProps.
   */
  const parseStringShorthand = (inputString) => {
    // 1. Separa o Label do restante da configuração
    const [label, ...configSegments] = inputString.split('::')
    const result = { label }

    if (configSegments.length > 0) {
      // Pega todos os segmentos após o :: (ex: password:6:md4 -> ['password', '6', 'md4'])
      const parts = configSegments[0].split(':')
      
      parts.forEach(part => {
        let matched = false;

        for (const matcher of DSL_MATCHERS) {
          const matchResult = matcher.test(part);
          
          if (matchResult) {
            matcher.apply(result, matchResult);
            matched = true;
            break; // Para no primeiro que encontrar
          }
        }

        // Caso padrão: Se nada capturou e não é vazio, assume que é uma prop booleana true
        // Ex: "Nome::text:disabled"
        if (!matched) {
          result.iProps = { ...result.iProps, [part]: true }
        }
      })
    }

    return result
  }

  /**
   * Converte uma string com sufixo de tipo para seu valor primitivo correspondente.
   * Suporta: |s (string), |b (boolean), |n (number), |g (bigint), |y (symbol), |u (undefined), |N (null).
   * * @param {string} value - O valor vindo da DSL (ex: "true|b", "100|n").
   * @returns {any} O valor convertido para o tipo primitivo.
   */
  const castPrimitive = (value) => {
    // Se não for string ou não tiver o pipe, retorna o valor original
    if (typeof value !== 'string' || !value.includes('|')) {
      return value;
    }

    const [raw, type] = value.split('|');

    const typeMap = {
      's': (v) => String(v),
      'b': (v) => v.toLowerCase() === 'true',
      'n': (v) => Number(v),
      'g': (v) => BigInt(v),
      'y': (v) => Symbol(v),
      'u': () => undefined,
      'N': () => null,
    };

    // Se o tipo existir no mapa, executa a conversão, senão retorna o raw
    return typeMap[type] ? typeMap[type](raw) : value;
  };

  return {
    parseToEditData,
    parseToDatabase,
    parseToModel,
    parseLimitProps,
    parseToDatabaseWithRepeater,
    parseToDatabaseComplex,
    parseToEditDataComplex,
    parseStringShorthand,
    castPrimitive,
  }
}