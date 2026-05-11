import type { Channel } from '../types/channel';
import { restrictedChannels, restrictedCategories } from './restrictedChannels';

const getFallbackLogo = (_name: string) => {
  return ''; 
};

// LISTA MESTRA DE CANAIS (COM ASSETS LOCAIS CONFIGURADOS)
const rawChannels = [

];

// Lógica de exportação igual ao original para manter compatibilidade
export const categoryOrder = [
  'TV Aberta',
  'Filmes',
  'Series',
  'Esportes',
  'Noticias',
  'Infantil',
  'Documentarios',
  'Entretenimento',
  '24h',
  'Reality',
  'Streaming',
  'Internacionais',
  'Adulto',
  ...restrictedCategories,
];

// Ordenação
const sortedByCategory = [...rawChannels].sort((a, b) => {
  const catIndexA = categoryOrder.indexOf(a.category);
  const catIndexB = categoryOrder.indexOf(b.category);
  if (catIndexA !== catIndexB) return catIndexA - catIndexB;
  return a.name.localeCompare(b.name, 'pt-BR');
});

// Adiciona numeração
const allChannels: Channel[] = sortedByCategory.map((channel, index) => ({
  ...channel,
  channelNumber: index + 1,
}));

// Exportações filtradas
export const channels: Channel[] = allChannels.filter(ch => ch.category !== 'Adulto');
export const adultChannels: Channel[] = allChannels.filter(ch => ch.category === 'Adulto');

// Função principal de acesso
export const getAllChannels = (includeAdult: boolean): Channel[] => {
  if (includeAdult) {
    // Retorna a lista unificada e reordenada incluindo os adultos
    return [...allChannels]; 
  }
  return channels;
};
