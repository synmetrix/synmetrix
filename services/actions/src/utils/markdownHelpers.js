export const header = (text, { size }) => `${[...Array(size)].map(() => '#').join('')} ${text}\n\n`;

export const orderedList = (list) => `${list.map((item, index) => `${index + 1}. ${item}`).join(' \n ')}\n\n`;

export const unorderedList = (list) => `${list.map((item) => `- ${item}`).join('\n')}\n\n`;