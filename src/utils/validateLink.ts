// @ts-ignore
import DOMPurify from 'dompurify';

export const validateHandler = (link: string) => {
    const urlPattern = /^(https?:\/\/)/;

    const trimmedLink = link.trim();

    if (!urlPattern.test(trimmedLink)) return false;

    const clearLink = DOMPurify.sanitize(trimmedLink);

    if (clearLink !== trimmedLink) return false;

    return true;
}
