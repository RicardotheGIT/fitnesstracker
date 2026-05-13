export const POSES: Record<string, { head: number[]; body: number[]; lArm: number[]; rArm: number[]; lLeg: number[]; rLeg: number[] }[]> = {
  bandPullApart: [
    { head: [50, 18], body: [50, 25, 50, 50], lArm: [50, 32, 20, 32], rArm: [50, 32, 80, 32], lLeg: [50, 50, 35, 75], rLeg: [50, 50, 65, 75] },
    { head: [50, 18], body: [50, 25, 50, 50], lArm: [50, 32, 10, 28], rArm: [50, 32, 90, 28], lLeg: [50, 50, 35, 75], rLeg: [50, 50, 65, 75] },
  ],
  overheadPress: [
    { head: [50, 22], body: [50, 29, 50, 54], lArm: [50, 35, 30, 50], rArm: [50, 35, 70, 50], lLeg: [50, 54, 36, 78], rLeg: [50, 54, 64, 78] },
    { head: [50, 22], body: [50, 29, 50, 54], lArm: [50, 35, 28, 14], rArm: [50, 35, 72, 14], lLeg: [50, 54, 36, 78], rLeg: [50, 54, 64, 78] },
  ],
  plankTap: [
    { head: [18, 38], body: [18, 44, 62, 44], lArm: [28, 44, 18, 60], rArm: [52, 44, 62, 60], lLeg: [62, 44, 75, 58], rLeg: [62, 44, 82, 58] },
    { head: [18, 38], body: [18, 44, 62, 44], lArm: [28, 44, 14, 58], rArm: [52, 44, 62, 60], lLeg: [62, 44, 75, 58], rLeg: [62, 44, 82, 58] },
  ],
  deadBug: [
    { head: [50, 20], body: [50, 27, 50, 52], lArm: [50, 34, 26, 22], rArm: [50, 34, 74, 22], lLeg: [50, 52, 34, 68], rLeg: [50, 52, 66, 68] },
    { head: [50, 20], body: [50, 27, 50, 52], lArm: [50, 34, 20, 16], rArm: [50, 34, 74, 22], lLeg: [50, 52, 34, 68], rLeg: [50, 52, 72, 80] },
  ],
  squatPress: [
    { head: [50, 16], body: [50, 23, 50, 46], lArm: [50, 30, 30, 40], rArm: [50, 30, 70, 40], lLeg: [50, 46, 34, 68], rLeg: [50, 46, 66, 68] },
    { head: [50, 14], body: [50, 21, 50, 44], lArm: [50, 28, 26, 12], rArm: [50, 28, 74, 12], lLeg: [50, 44, 36, 68], rLeg: [50, 44, 64, 68] },
  ],
  lateralShuffle: [
    { head: [40, 18], body: [40, 25, 40, 48], lArm: [40, 34, 20, 44], rArm: [40, 34, 62, 44], lLeg: [40, 48, 24, 70], rLeg: [40, 48, 56, 70] },
    { head: [58, 18], body: [58, 25, 58, 48], lArm: [58, 34, 36, 44], rArm: [58, 34, 78, 44], lLeg: [58, 48, 42, 70], rLeg: [58, 48, 74, 70] },
  ],
  gluteBridge: [
    { head: [50, 62], body: [50, 55, 50, 38], lArm: [50, 50, 28, 58], rArm: [50, 50, 72, 58], lLeg: [50, 38, 32, 22], rLeg: [50, 38, 68, 22] },
    { head: [50, 62], body: [50, 55, 50, 34], lArm: [50, 50, 28, 58], rArm: [50, 50, 72, 58], lLeg: [50, 34, 28, 16], rLeg: [50, 34, 62, 16] },
  ],
  mountainClimber: [
    { head: [18, 34], body: [18, 40, 58, 40], lArm: [28, 40, 14, 52], rArm: [48, 40, 58, 52], lLeg: [58, 40, 46, 58], rLeg: [58, 40, 76, 54] },
    { head: [18, 34], body: [18, 40, 58, 40], lArm: [28, 40, 14, 52], rArm: [48, 40, 58, 52], lLeg: [58, 40, 76, 54], rLeg: [58, 40, 46, 58] },
  ],
  jumpingJack: [
    { head: [50, 16], body: [50, 23, 50, 48], lArm: [50, 32, 36, 44], rArm: [50, 32, 64, 44], lLeg: [50, 48, 38, 70], rLeg: [50, 48, 62, 70] },
    { head: [50, 16], body: [50, 23, 50, 48], lArm: [50, 32, 22, 18], rArm: [50, 32, 78, 18], lLeg: [50, 48, 28, 70], rLeg: [50, 48, 72, 70] },
  ],
  highKnees: [
    { head: [50, 16], body: [50, 23, 50, 48], lArm: [50, 32, 30, 44], rArm: [50, 32, 72, 42], lLeg: [50, 48, 36, 70], rLeg: [50, 48, 60, 56] },
    { head: [50, 16], body: [50, 23, 50, 48], lArm: [50, 32, 28, 42], rArm: [50, 32, 70, 44], lLeg: [50, 48, 40, 56], rLeg: [50, 48, 64, 70] },
  ],
  speedSkater: [
    { head: [40, 16], body: [40, 23, 40, 46], lArm: [40, 32, 20, 26], rArm: [40, 32, 60, 42], lLeg: [40, 46, 24, 68], rLeg: [40, 46, 58, 62] },
    { head: [60, 16], body: [60, 23, 60, 46], lArm: [60, 32, 40, 42], rArm: [60, 32, 80, 26], lLeg: [60, 46, 42, 62], rLeg: [60, 46, 76, 68] },
  ],
  lunge: [
    { head: [50, 18], body: [50, 25, 50, 48], lArm: [50, 33, 68, 43], rArm: [50, 33, 30, 44], lLeg: [50, 48, 40, 74], rLeg: [50, 48, 64, 72] },
    { head: [50, 18], body: [50, 25, 50, 48], lArm: [50, 33, 28, 43], rArm: [50, 33, 70, 44], lLeg: [50, 48, 38, 72], rLeg: [50, 48, 60, 74] },
  ],
  hipHinge: [
    { head: [28, 38], body: [34, 44, 60, 44], lArm: [43, 44, 38, 58], rArm: [43, 44, 50, 58], lLeg: [60, 44, 46, 74], rLeg: [60, 44, 70, 74] },
    { head: [50, 18], body: [50, 25, 50, 48], lArm: [50, 33, 34, 47], rArm: [50, 33, 66, 47], lLeg: [50, 48, 38, 74], rLeg: [50, 48, 62, 74] },
  ],
  buttKick: [
    { head: [50, 16], body: [50, 23, 50, 46], lArm: [50, 30, 28, 40], rArm: [50, 30, 72, 38], lLeg: [50, 46, 36, 72], rLeg: [50, 46, 62, 58] },
    { head: [50, 16], body: [50, 23, 50, 46], lArm: [50, 30, 30, 38], rArm: [50, 30, 70, 40], lLeg: [50, 46, 38, 58], rLeg: [50, 46, 64, 72] },
  ],
};

export type Exercise = {
  name: string;
  icon: string;
  poseKey: string;
  cue: string;
  steps: string[];
};

export const POOL: Record<number, Exercise[]> = {
  1: [
    { name: 'Band Pull-Aparts', icon: '💪', poseKey: 'bandPullApart', cue: 'Pull band apart until arms fully extended. Squeeze shoulder blades.', steps: ['Stand tall, band at chest height', 'Pull band apart with straight arms', 'Squeeze shoulder blades, hold 1 sec', 'Return controlled'] },
    { name: 'Overhead Band Press', icon: '🙌', poseKey: 'overheadPress', cue: 'Press band overhead. Core braced throughout.', steps: ['Band at shoulders, elbows bent', 'Brace your core', 'Press straight overhead to lockout', 'Lower slow, 3 counts'] },
    { name: 'Plank Shoulder Taps', icon: '🧱', poseKey: 'plankTap', cue: 'High plank. Tap opposite shoulder. Keep hips still.', steps: ['Hands under shoulders', 'Brace core and glutes', 'Lift hand, tap opposite shoulder', 'Hips dead still throughout'] },
    { name: 'Dead Bug', icon: '🐛', poseKey: 'deadBug', cue: 'Lower back flat on floor the entire time.', steps: ['Lie on back, arms up, knees 90°', 'Press lower back into floor', 'Extend opposite arm and leg', 'Return and switch sides'] },
    { name: 'Bird Dog', icon: '🦅', poseKey: 'deadBug', cue: 'From all-fours, extend opposite arm and leg. Keep back flat.', steps: ['Start on hands and knees', 'Brace your core tight', 'Extend right arm and left leg together', 'Hold 2 sec, return, switch sides'] },
  ],
  2: [
    { name: 'Squat to Press', icon: '🏋️', poseKey: 'squatPress', cue: 'Squat down, drive up, press overhead. One fluid move.', steps: ['Feet shoulder width, weights at shoulders', 'Squat until thighs parallel', 'Drive through heels to stand', 'Press overhead at the top'] },
    { name: 'Lateral Shuffles', icon: '⚡', poseKey: 'lateralShuffle', cue: 'Stay low in half squat. Drive sideways with power.', steps: ['Drop into half squat', 'Push off outside foot explosively', 'Shuffle 3 to 4 steps sideways', 'Touch floor, shuffle back'] },
    { name: 'Glute Bridge March', icon: '🔥', poseKey: 'gluteBridge', cue: 'Hips up and locked. March one knee at a time.', steps: ['Lie on back, feet flat', 'Drive hips up, squeeze glutes', 'March one knee to 90°', 'Lower foot, march other knee'] },
    { name: 'Reverse Lunge', icon: '🦵', poseKey: 'lunge', cue: 'Step back, lower back knee toward floor. Front knee stays behind toes.', steps: ['Stand feet hip-width apart', 'Step one foot back', 'Lower back knee toward the floor', 'Drive front foot down to return, alternate legs'] },
    { name: 'Hip Hinge Deadlift', icon: '💪', poseKey: 'hipHinge', cue: 'Push hips back, not down. Keep back flat throughout.', steps: ['Stand feet hip-width, soft knees', 'Push hips back and hinge forward', 'Keep back flat, hands slide down legs', 'Drive hips forward to stand, squeeze glutes'] },
  ],
  3: [
    { name: 'Mountain Climbers', icon: '🏔️', poseKey: 'mountainClimber', cue: 'High plank. Drive knees hard and fast. Hands elevated if needed.', steps: ['High plank, core tight', 'Drive one knee toward chest', 'Switch legs fast', 'Hands on chair for back safety'] },
    { name: 'Jumping Jacks', icon: '🌟', poseKey: 'jumpingJack', cue: 'Full arm extension overhead. Land soft.', steps: ['Feet together, arms at sides', 'Jump feet wide, arms overhead', 'Clap at the top', 'Land soft, feet together'] },
    { name: 'High Knees', icon: '🏃', poseKey: 'highKnees', cue: 'Drive knees to hip height. Pump opposite arms.', steps: ['Stand tall', 'Drive right knee to hip height', 'Pump left arm forward', 'Switch fast, running cadence'] },
    { name: 'Speed Skaters', icon: '⛸️', poseKey: 'speedSkater', cue: 'Lateral bound foot to foot. Reach to floor on landing.', steps: ['Balance on right foot', 'Bound left, reach right hand to left foot', 'Land soft on left foot', 'Bound back, alternate'] },
    { name: 'Butt Kicks', icon: '🏃', poseKey: 'buttKick', cue: 'Kick heels up to glutes. Stay on balls of feet. Quick cadence.', steps: ['Stand tall, slight forward lean', 'Kick right heel up toward glutes', 'Alternate legs at a running pace', 'Pump arms opposite to legs'] },
  ],
};

export type Stretch = {
  name: string;
  icon: string;
  target: string;
  cue: string;
  steps: string[];
};

export const STRETCHES: Stretch[] = [
  { name: "Child's Pose", icon: '🧘', target: 'Lower back', cue: 'Breathe into your lower back. Let it soften with each exhale.', steps: ['Kneel and sit back on your heels', 'Walk hands forward, lower chest toward floor', 'Arms extended or alongside body', 'Hold 30 seconds, breathe deeply'] },
  { name: 'Knees to Chest', icon: '🤲', target: 'Lower back', cue: 'Gently hug your knees. Rock side to side to massage the spine.', steps: ['Lie on your back', 'Draw both knees into your chest', 'Wrap arms around shins', 'Rock gently side to side for 30 seconds'] },
  { name: 'Supine Twist', icon: '🔄', target: 'Lower back & hips', cue: 'Keep both shoulders flat on the floor. Breathe into the rotation.', steps: ['Lie on your back', 'Draw right knee to chest, cross it left', 'Extend right arm out, look right', 'Hold 30 sec, then switch sides'] },
  { name: 'Figure Four', icon: '🦵', target: 'Glutes & piriformis', cue: 'Flex the top foot to protect your knee. Pull the bottom leg toward your chest.', steps: ['Lie on your back, feet flat', 'Cross right ankle over left knee', 'Flex right foot to protect the knee', 'Pull left thigh toward chest. Switch sides after 30 sec'] },
  { name: 'Pigeon Pose', icon: '🕊️', target: 'Glutes & hips', cue: 'Sink your hips toward the floor. Breathe and relax into it.', steps: ['From plank, bring right knee toward right wrist', 'Extend left leg straight back', 'Square your hips forward', 'Fold forward over front leg. Hold 30 sec, switch sides'] },
  { name: 'Seated Hip Stretch', icon: '🪑', target: 'Glutes & hips', cue: 'Stay tall and hinge forward from your hips, not your spine.', steps: ['Sit on floor or chair, cross right ankle over left knee', 'Flex right foot', 'Hinge forward from hips until you feel the stretch', 'Hold 30 sec, switch sides'] },
  { name: 'Standing Quad Stretch', icon: '🏃', target: 'Quads', cue: 'Keep knees together and stand tall. Squeeze the glute of the stretching leg.', steps: ['Stand on left foot, use wall for balance if needed', 'Bend right knee, pull heel to glute', 'Keep knees side by side', 'Hold 30 sec, switch sides'] },
  { name: 'Hamstring Fold', icon: '⬇️', target: 'Hamstrings & lower back', cue: 'Hinge from the hip, not the spine. Let gravity do the work.', steps: ['Stand with feet hip-width, soft knees', 'Hinge forward from hips, hands toward floor', 'Relax your neck and head completely', 'Breathe and sink deeper each exhale — hold 30 sec'] },
  { name: 'Calf Stretch', icon: '🦶', target: 'Calves', cue: 'Back heel pressed firmly into the floor. Both hips square forward.', steps: ['Step right foot back, split stance', 'Press right heel firmly into the floor', 'Bend front knee, lean toward wall', 'Hold 30 sec, switch sides'] },
  { name: 'Low Lunge Hip Flexor', icon: '🦵', target: 'Hip flexors', cue: 'Tuck your tailbone under to deepen the stretch. Squeeze the back glute.', steps: ['Kneel with right knee down, left foot forward', 'Shift hips forward gently', 'Tuck pelvis under, squeeze right glute', 'Raise arms overhead. Hold 30 sec, switch sides'] },
  { name: 'Butterfly Stretch', icon: '🦋', target: 'Inner thighs & groin', cue: 'Tall spine. Let gravity open your hips — no forcing or bouncing.', steps: ['Sit tall, bring soles of feet together', 'Let knees fall out to the sides', 'Hold feet, hinge gently forward from hips', 'Breathe and relax for 30 seconds'] },
  { name: 'Figure-4 Hip Opener', icon: '🔓', target: 'Hips & glutes', cue: 'Drive the knee away from your body to open the hip.', steps: ['Lie on back, cross right ankle over left knee', 'Thread right arm through to clasp hands behind left thigh', 'Gently pull left thigh toward chest', 'Drive right knee away. Hold 30 sec, switch sides'] },
];

