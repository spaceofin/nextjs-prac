import { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    h1: ({ children }) => (
      <h1 style={{ color: "black", fontSize: "40px", marginBottom: "60px" }}>
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 style={{ color: "#444", fontSize: "36px" }}>{children}</h2>
    ),
    h3: ({ children }) => (
      <h3
        style={{
          color: "#409429",
          fontSize: "32px",
          marginBottom: "5px",
        }}>
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 style={{ color: "#6FB820", fontSize: "24px" }}>{children}</h4>
    ),
    h6: () => <h6 style={{ height: "1px" }} />,
    p: ({ children }) => (
      <p style={{ color: "black", fontSize: "18px", lineHeight: "30px" }}>
        {children}
      </p>
    ),
    ul: ({ children }) => (
      <ul
        style={{
          color: "black",
          fontSize: "18px",
          marginTop: "0px",
          marginBottom: "0px",
        }}>
        {children}
      </ul>
    ),
    li: ({ children }) => (
      <li
        style={{
          color: "black",
          fontSize: "18px",
          marginTop: "0px",
          marginBottom: "0px",
        }}>
        {children}
      </li>
    ),
    hr: ({ children }) => (
      <hr
        style={{
          color: "black",
          fontWeight: "bold",
          marginTop: "80px",
          marginBottom: "100px",
          borderTop: "1px solid rgba(75, 75, 75, 0.7)",
        }}>
        {children}
      </hr>
    ),
  };
}
