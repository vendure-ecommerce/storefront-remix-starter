export const htmlDecode = (str: string) => {
  // HTML entitások és azok dekódolt karakterei
  var entities: any = {
    '&lt;': '<',
    '&gt;': '>',
    '&amp;': '&',
    '&quot;': '"',
    '&#39;': "'",
    '&nbsp;': ' ',
  };

  // Dekódolás a megadott entitások alapján
  return str.replace(/&[a-zA-Z0-9#]+;/g, function (match) {
    return entities[match] || match;
  });
};