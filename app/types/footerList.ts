interface ContentItem {
    text: string;
    href: string;
    src?: string;
  }
  
  interface ListItem {
    title: string;
    content: ContentItem[];
  }
  
  interface ListsProps {
    items: ListItem[];
  }
  