import type { DateValue } from "@internationalized/date";

// Função para formatar a data do DatePicker para string no formato yyyy-MM-dd
export function formatDateFromDatePicker(datePickerValue: DateValue): string {
  if (!datePickerValue) return "";
  
  // Extrair os componentes da data diretamente do objeto DateValue
  // Isso evita problemas de fuso horário que podem ocorrer ao converter para Date
  const { year, month, day } = datePickerValue;
  
  // Mês no objeto do DatePicker é baseado em 1 (1-12), não precisamos ajustar
  const formattedMonth = month.toString().padStart(2, "0");
  const formattedDay = day.toString().padStart(2, "0");
  
  return `${year}-${formattedMonth}-${formattedDay}`;
}
