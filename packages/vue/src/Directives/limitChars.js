export default {
  beforeMount(el, binding) {
    const maxLength = binding.value || binding.arg || 11; // Define o limite de caracteres

    // Manipulador de evento
    const handler = (event) => {
      const value = event.target.value;
      if (value.length > maxLength) {
        event.target.value = value.substring(0, maxLength);
        // Dispara o evento 'input' para atualizar o v-model
        const inputEvent = new Event('input', { bubbles: true });
        event.target.dispatchEvent(inputEvent);
      }
    };

    // Adiciona o ouvinte ao elemento
    el.addEventListener('input', handler);

    // Armazena o manipulador para limpeza futura
    el._limitCharsHandler = handler;
  },
  unmounted(el) {
    // Remove o ouvinte de evento quando o elemento for desmontado
    el.removeEventListener('input', el._limitCharsHandler);
  },
}