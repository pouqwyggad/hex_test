import copy from "clipboard-copy";

export const handleCopyClick = (data: string) => {
    const textToCopy = `https://front-test.hex.team/s/${data}`;
    copy(textToCopy);
    alert('Текст скопирован в буфер обмена!');
};