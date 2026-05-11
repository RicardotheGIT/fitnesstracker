'use client';

type Pose = {
  head: number[];
  body: number[];
  lArm: number[];
  rArm: number[];
  lLeg: number[];
  rLeg: number[];
};

export default function StickFigure({ pose, color }: { pose: Pose; color: string }) {
  const s = { stroke: color, strokeWidth: 2.5, strokeLinecap: 'round' as const, fill: 'none' };
  return (
    <g>
      <circle cx={pose.head[0]} cy={pose.head[1]} r={7} stroke={color} strokeWidth={2.5} fill="none" />
      <line x1={pose.body[0]} y1={pose.body[1]} x2={pose.body[2]} y2={pose.body[3]} {...s} />
      <line x1={pose.lArm[0]} y1={pose.lArm[1]} x2={pose.lArm[2]} y2={pose.lArm[3]} {...s} />
      <line x1={pose.rArm[0]} y1={pose.rArm[1]} x2={pose.rArm[2]} y2={pose.rArm[3]} {...s} />
      <line x1={pose.lLeg[0]} y1={pose.lLeg[1]} x2={pose.lLeg[2]} y2={pose.lLeg[3]} {...s} />
      <line x1={pose.rLeg[0]} y1={pose.rLeg[1]} x2={pose.rLeg[2]} y2={pose.rLeg[3]} {...s} />
    </g>
  );
}
