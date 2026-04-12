export default function useLoanedForms() {
  const groups = options => ([
    {
      title: 'Identificação do registro',
      forms: [
        {
          colProps: { md: '12', lg: '3' },
          label: 'Nº do Termo de Cessão',
          component: 'b-form-input',
          model: 'loanedTermNumber',
          back: 'assignment_term_number',
          limitChars: 15,
        },
        {
          colProps: { md: '12', lg: '3' },
          label: 'Data do Termo de Cessão',
          component: 'b-form-input',
          maska: '##/##/####',
          model: 'loanedDate',
          back: 'assignment_term_date',
          limitChars: 10,
        },
        {
          colProps: { md: '12', lg: '3' },
          label: 'Código RENAVAM *',
          component: 'v-select',
          model: 'renavam',
          back: 'vehicle_id',
          limitChars: 11,
          othersProps: {
            options: options.vehicleOptions,
            filterable: true,
            label: 'text',
            reduce: val => val.value,
          },
        },
      ],
    },
    {
      title: 'Dados do Termo de Cessão',
      forms: [
        {
          colProps: { md: '12', lg: '3' },
          label: 'Código do Município Cedente',
          component: 'v-select',
          model: 'municipalLoanedCode',
          back: 'assignor_city_code',
          othersProps: {
            options: options.municipalOptions,
            filterable: true,
            label: 'text',
            reduce: val => val.value,
          }
        },
        {
          colProps: { md: '12', lg: '2' },
          label: 'Data do Início',
          formGroupProps: {
            title: 'Data de Início da Vigência do Termo de Cessão',
          },
          component: 'b-form-input',
          maska: '##/##/####',
          model: 'loanedStartDate',
          back: 'assignment_term_start_date',
          limitChars: 10,
        },
        {
          colProps: { md: '12', lg: '2' },
          label: 'Data do Fim',
          formGroupProps: {
            title: 'Data Prevista para o Fim da Vigência do Termo de Cessão',
          },
          component: 'b-form-input',
          maska: '##/##/####',
          model: 'loanedEndDate',
          back: 'assignment_term_expected_end_date',
          limitChars: 10,
        },
        {
          colProps: { md: '12', lg: '2' },
          label: 'CPF do Responssavel',
          formGroupProps: {
            title: 'Número do CPF do Responsável Cessionário do Termo de Cessão',
          },
          component: 'b-form-input',
          maska: '###.###.###-##',
          model: 'responsableCPF',
          back: 'assignment_term_responsible_cpf',
          limitChars: 14,
        },
        {
          colProps: { md: '12', lg: '6', class: 'mt-2' },
          label: 'Nome do Responsavel',
          component: 'b-form-input',
          model: 'responsableName',
          back: 'assignment_term_responsible_name',
          limitChars: 60,
        },
        {
          colProps: { md: '12', class: 'mt-2' },
          label: 'Descrição do Objeto do Termo de Cessão',
          component: 'b-form-textarea',
          model: 'description',
          back: 'assignment_term_description_of_object',
          limitChars: 255,
        },
        {
          colProps: { md: '12', lg: '2', class: 'mt-2' },
          label: 'Referência',
          component: 'b-form-input',
          maska: '##/####',
          model: 'reference',
          back: 'reference_date_documentation',
          limitChars: 7,
        },
      ],
    },
  ])

  return {
    groups,
  }
}