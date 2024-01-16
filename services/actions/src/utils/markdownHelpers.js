export const text = (
  text,
  { indent = 0, bold = false, italic = false, postNewLine = true }
) => {
  let resultText = text;
  const indentPrefix = `${[...Array(indent)].map(() => "&nbsp;").join("")}`;

  if (bold) {
    resultText = `**${resultText}**`;
  }

  if (italic) {
    resultText = `*${resultText}*`;
  }

  resultText = `${indentPrefix} ${resultText}`;

  if (postNewLine) {
    resultText += `\n\n`;
  }

  return resultText;
};

export const header = (header, { size, indent = 0 }) =>
  `${[...Array(size)].map(() => "#").join("")} ${text(`${header}`, {
    indent,
  })}`;

export const orderedList = (list) =>
  `${list.map((item, index) => `${index + 1}. ${item}`).join(" \n ")}\n\n`;

export const unorderedList = (list) =>
  `${list.map((item) => `- ${item}`).join("\n")}\n\n`;

export const divider = "---\n";
