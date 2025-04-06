export interface PolicyMetadata {
  id: string;
  title: string;
  last_update: string;
  content: string;
}

export interface PolicyContentProps {
  children: React.ReactNode;
  className?: string;
}
