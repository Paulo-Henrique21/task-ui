export const responsibles = [
  {
    area: "Administrativo",
    responsibles: [{ name: "Karen Sato" }],
  },
  {
    area: "Backoffice",
    responsibles: [{ name: "Ricardo Lorencete" }, { name: "Guilherme Basso" }],
  },
  {
    area: "Presidência",
    responsibles: [{ name: "Karen Sato" }],
  },
  {
    area: "Comercial",
    responsibles: [{ name: "Thiago Ikuta" }, { name: "Gustavo Mendonça" }],
  },
  {
    area: "Compras",
    responsibles: [{ name: "Evelyn Menezes" }],
  },
  {
    area: "Contábil",
    responsibles: [{ name: "Denize Monteiro" }, { name: "Francielle Moreira" }],
  },
  {
    area: "Contas a Pagar",
    responsibles: [{ name: "Mônica Moreira" }],
  },
  {
    area: "Engenharia",
    responsibles: [{ name: "Rodrigo Sanchez" }],
  },
  {
    area: "Facilities",
    responsibles: [{ name: "Felipe Bazani" }],
  },
  {
    area: "Financeiro",
    responsibles: [{ name: "Scarlett Aires" }, { name: "Monica Moreira" }],
  },
  {
    area: "Fiscal",
    responsibles: [{ name: "Juliana Moreira" }, { name: "Rafaela Nunes" }],
  },
  {
    area: "Gente e Gestão",
    responsibles: [{ name: "Samara Menezes" }, { name: "Giulia Monastero" }],
  },
  {
    area: "Inovação",
    responsibles: [{ name: "Vitoria Alves" }],
  },
  {
    area: "Jurídico",
    responsibles: [{ name: "Hikelly Katienny" }, { name: "Giulia Oliveira" }],
  },
  {
    area: "Marketing",
    responsibles: [{ name: "Davi Vieira" }, { name: "Guilherme Cotta" }],
  },
  {
    area: "Mesa",
    responsibles: [{ name: "Felipe Brito" }, { name: "Henrique Bergamo" }],
  },
  {
    area: "Middle",
    responsibles: [{ name: "Nick Johny" }],
  },
  {
    area: "Portfólio",
    responsibles: [{ name: "André Sales" }],
  },
  {
    area: "Produto",
    responsibles: [{ name: "Flávia Maebara" }],
  },
  {
    area: "Solar",
    responsibles: [{ name: "Maiara Nunes" }, { name: "Jaguaci Ramos" }],
  },
  {
    area: "T.I",
    responsibles: [{ name: "Guilherme Fonseca" }, { name: "Thiago Matheus" }],
  },
  {
    area: "Risco e Dados",
    responsibles: [{ name: "Luís Cacciatori" }],
  }
];

// Função para gerar uma lista plana de responsáveis para o select
export const getResponsibleOptions = () => {
  const options: { value: string; label: string }[] = [];

  responsibles.forEach((area) => {
    area.responsibles.forEach((responsible) => {
      options.push({
        value: `${responsible.name} (${area.area})`, // Incluir área no valor para garantir unicidade
        label: `${responsible.name} (${area.area})`,
      });
    });
  });

  return options.sort((a, b) => a.label.localeCompare(b.label));
};

// Função para extrair apenas o nome do responsável de um valor que inclui a área
export const extractResponsibleName = (fullValue: string): string => {
  // Se o valor contém " (", extrai apenas a parte antes dos parênteses
  const match = fullValue.match(/^(.+?)\s*\(/);
  return match ? match[1] : fullValue;
};
