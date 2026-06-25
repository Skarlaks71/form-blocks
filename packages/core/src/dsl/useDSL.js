import { registerCustomMatcher } from "./matchers"

export const useDSL = () =>  {
  /**
   * Acessa uma propriedade aninhada dentro de um objeto usando uma string de caminhos com pontos.
   * Ex: getDeepValue(context, 'carro.bola') => context.carro.bola
   */
  const getDeepValue = (obj, path) => {
    return path.split('.').reduce((acc, part) => {
      return acc && acc[part] !== undefined ? acc[part] : undefined;
    }, obj);
  };

  /**
   * Varre os grupos normalizados e substitui os ponteiros '@caminho.prop' pelos valores reais do contexto.
   */
  const resolveDslContext = (groups, context = {}) => {
    if (!context || Object.keys(context).length === 0) return groups;

    // Função auxiliar recursiva para varrer as propriedades de cada input (iProps, colProps, etc)
    const helperResolve = (obj) => {
      if (!obj || typeof obj !== 'object') return;

      Object.keys(obj).forEach(key => {
        const value = obj[key];

        // Se for uma string de contexto (ex: '@carro.bola' ou '@radioOptions')
        if (typeof value === 'string' && value.startsWith('@')) {
          const contextPath = value.slice(1); // Remove o '@'
          const resolvedValue = getDeepValue(context, contextPath);

          // Só substitui se o valor de fato existir no contexto para evitar quebrar dados legítimos
          if (resolvedValue !== undefined) {
            obj[key] = resolvedValue;
          }
        } 
        // Se for um sub-objeto ou array interno, continua a varredura profunda
        else if (value && typeof value === 'object') {
          helperResolve(value);
        }
      });
    };

    // Varre a árvore do Form Blocks: Grupos -> Inputs
    groups.forEach(group => {
      if (Array.isArray(group.forms)) {
        group.forms.forEach(form => helperResolve(form));
      }
    });

    return groups;
  };

  return {
    registerCustomMatcher,
    resolveDslContext,
  }
}