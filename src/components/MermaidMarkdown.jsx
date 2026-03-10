import { useState, useEffect, useRef } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import mermaid from 'mermaid';

mermaid.initialize({ startOnLoad: false, theme: 'neutral' });

let mermaidCounter = 0;

function MermaidBlock({ children }) {
  const ref = useRef(null);
  const [svg, setSvg] = useState('');
  const code = String(children).trim();

  useEffect(() => {
    const id = `mermaid-${++mermaidCounter}`;
    mermaid.render(id, code).then(({ svg: rendered }) => {
      setSvg(rendered);
    }).catch(() => {
      if (ref.current) ref.current.textContent = code;
    });
  }, [code]);

  if (svg) return <div ref={ref} dangerouslySetInnerHTML={{ __html: svg }} />;
  return <pre ref={ref}>{code}</pre>;
}

export default function MermaidMarkdown({ children }) {
  return (
    <Markdown remarkPlugins={[remarkGfm]} components={{
      pre({ children: preChildren, ...props }) {
        const child = preChildren?.props;
        if (child?.className === 'language-mermaid') {
          return <MermaidBlock>{child.children}</MermaidBlock>;
        }
        return <pre {...props}>{preChildren}</pre>;
      },
    }}>{children}</Markdown>
  );
}
