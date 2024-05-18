import { useEffect } from "react";
export const useDocumentTitle = (title) => {

    useEffect(() => {
        document.title = ` Shabbek Logistic:${title}`;
    }, [title]);

    return null;
}
