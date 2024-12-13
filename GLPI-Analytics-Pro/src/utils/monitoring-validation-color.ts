export const getValidationColor = (validation: string) => {
  switch (validation) {
    case "Aguardando":
      return `text-sky-100 bg-sky-500`;
    case "Aprovado":
      return "text-green-100 bg-green-500";
    case "Recusado":
      return "text-red-100 bg-red-500";
    default:
      return "text-red-200";
  }
};
