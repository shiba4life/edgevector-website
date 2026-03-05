import { useMemo } from 'react';
import {
  ReactFlow,
  MarkerType,
  Position,
} from '@xyflow/react';
import Dagre from '@dagrejs/dagre';
import '@xyflow/react/dist/style.css';

const FONT = "'IBM Plex Mono', monospace";
const NW = 190;
const NH = 44;

const baseStyle = {
  borderRadius: 0,
  fontFamily: FONT,
  fontSize: '11px',
  fontWeight: 700,
  letterSpacing: '1px',
  textTransform: 'uppercase',
  textAlign: 'center',
  width: NW,
};

const styles = {
  default: { ...baseStyle, background: '#f5f5f5', border: '2px solid #0a0a0a', color: '#0a0a0a', padding: '10px 16px' },
  heading: { ...baseStyle, background: '#0a0a0a', border: '2px solid #0a0a0a', color: '#e8e8e8', padding: '8px 16px', letterSpacing: '2px' },
};

const subtext = (main, sub) => (
  <div>
    <div>{main}</div>
    <div style={{ fontWeight: 400, fontSize: '9px', color: 'inherit', opacity: 0.6, textTransform: 'none', letterSpacing: 0, marginTop: 3 }}>{sub}</div>
  </div>
);

const rawNodes = [
  { id: 'title', data: { label: 'Your Data Store' }, style: styles.heading },
  { id: 'files', data: { label: 'Your Files' }, style: styles.default },
  { id: 'writes', data: { label: 'Third-Party Writes' }, style: styles.default },
  { id: 'ingestion', data: { label: 'Ingestion Engine' }, style: styles.default },
  { id: 'datastore', data: { label: subtext('Structured Data Store', 'Signed + Logged \u00b7 Append-Only') }, style: { ...styles.default, width: 210 } },
  { id: 'query', data: { label: 'Query Engine' }, style: styles.default },
  { id: 'perms', data: { label: 'Permission Controls' }, style: styles.default },
  { id: 'cloud', data: { label: subtext('Encrypted Cloud', 'Ciphertext only') }, style: styles.heading },
  { id: 'backup', data: { label: 'Backup & Sync' }, style: styles.default },
  { id: 'collective', data: { label: 'Collective Queries' }, style: styles.default },
  { id: 'marketplace', data: { label: 'Marketplace' }, style: styles.default },
  { id: 'other', data: { label: subtext('Other Data Stores', 'Answers, not data \u00b7 Opt-in only') }, style: styles.heading },
];

const solid = { stroke: '#0a0a0a', strokeWidth: 2 };
const dashed = { stroke: '#999', strokeWidth: 2, strokeDasharray: '6 4' };
const arrow = { type: MarkerType.ArrowClosed, color: '#0a0a0a', width: 14, height: 14 };
const arrowGray = { type: MarkerType.ArrowClosed, color: '#999', width: 14, height: 14 };

const rawEdges = [
  { id: 'e1', source: 'title', target: 'files', style: solid, markerEnd: arrow },
  { id: 'e2', source: 'title', target: 'writes', style: solid, markerEnd: arrow },
  { id: 'e3', source: 'files', target: 'ingestion', style: solid, markerEnd: arrow },
  { id: 'e4', source: 'writes', target: 'ingestion', style: solid, markerEnd: arrow },
  { id: 'e5', source: 'ingestion', target: 'datastore', style: solid, markerEnd: arrow },
  { id: 'e6', source: 'datastore', target: 'query', style: solid, markerEnd: arrow },
  { id: 'e7', source: 'datastore', target: 'perms', style: solid, markerEnd: arrow },
  { id: 'e8', source: 'query', target: 'cloud', style: dashed, markerEnd: arrowGray },
  { id: 'e9', source: 'perms', target: 'cloud', style: dashed, markerEnd: arrowGray },
  { id: 'e10', source: 'cloud', target: 'backup', style: solid, markerEnd: arrow },
  { id: 'e11', source: 'cloud', target: 'collective', style: solid, markerEnd: arrow },
  { id: 'e12', source: 'cloud', target: 'marketplace', style: solid, markerEnd: arrow },
  { id: 'e13', source: 'collective', target: 'other', style: solid, markerEnd: arrow },
];

function layoutGraph(nodes, edges) {
  const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
  g.setGraph({ rankdir: 'TB', nodesep: 40, ranksep: 70, marginx: 20, marginy: 20 });

  nodes.forEach((node) => {
    const w = node.style?.width || NW;
    g.setNode(node.id, { width: typeof w === 'number' ? w : NW, height: NH });
  });

  edges.forEach((edge) => {
    g.setEdge(edge.source, edge.target);
  });

  Dagre.layout(g);

  return nodes.map((node) => {
    const pos = g.node(node.id);
    const w = node.style?.width || NW;
    const numW = typeof w === 'number' ? w : NW;
    return {
      ...node,
      position: { x: pos.x - numW / 2, y: pos.y - NH / 2 },
      sourcePosition: Position.Bottom,
      targetPosition: Position.Top,
      draggable: false,
    };
  });
}

export default function ArchDiagram() {
  const { nodes, edges } = useMemo(() => {
    const laidOut = layoutGraph(rawNodes, rawEdges);
    return {
      nodes: laidOut,
      edges: rawEdges.map((e) => ({ ...e, type: 'smoothstep' })),
    };
  }, []);

  return (
    <div style={{ width: '100%', height: '700px' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        fitViewOptions={{ padding: 0.15 }}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        panOnDrag={false}
        zoomOnScroll={false}
        zoomOnPinch={false}
        zoomOnDoubleClick={false}
        preventScrolling={false}
        proOptions={{ hideAttribution: true }}
      />
    </div>
  );
}
