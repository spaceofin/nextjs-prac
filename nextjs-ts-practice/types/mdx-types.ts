export type PostFrontmatter = {
  title: string;
  description: string;
  date: string;
  tags: string[];
};

export type MemoFrontmatter = {
  title: string;
  date: string;
};

export type MDXPost = {
  frontmatter: PostFrontmatter;
  content: React.ReactElement;
};

export type MDXMemo = {
  frontmatter: MemoFrontmatter;
  content: React.ReactElement;
};
