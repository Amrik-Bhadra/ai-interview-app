import { useEffect } from "react";

const BASE_TITLE = "IntervueAI";

export function usePageTitle(title) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title ? `${title} | ${BASE_TITLE}` : BASE_TITLE;

    return () => {
      document.title = previousTitle;
    };
  }, [title]);
}