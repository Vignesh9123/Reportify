import { TextRun } from "docx";

const getIndentationLevel = (line) => {
    const match = line.match(/^(\s*)-/);
    return match ? Math.floor(match[1].length / 2) : 0;
  };
const parseTextWithBold = (text) => {
    const segments = text.split(/(\*\*.*?\*\*)/g); // Split by **text**
    return segments.map((segment) => {
      if (segment.startsWith("**") && segment.endsWith("**")) {
        return new TextRun({ text: segment.slice(2, -2), bold: true, size: 24, font: "Times New Roman" });
      } else {
        return new TextRun({ text: segment, size: 24, font: "Times New Roman" });
      }
    });
};

export {getIndentationLevel, parseTextWithBold}
  