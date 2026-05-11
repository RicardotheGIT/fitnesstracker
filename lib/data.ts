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
  ],
  2: [
    { name: 'Squat to Press', icon: '🏋️', poseKey: 'squatPress', cue: 'Squat down, drive up, press overhead. One fluid move.', steps: ['Feet shoulder width, weights at shoulders', 'Squat until thighs parallel', 'Drive through heels to stand', 'Press overhead at the top'] },
    { name: 'Lateral Shuffles', icon: '⚡', poseKey: 'lateralShuffle', cue: 'Stay low in half squat. Drive sideways with power.', steps: ['Drop into half squat', 'Push off outside foot explosively', 'Shuffle 3 to 4 steps sideways', 'Touch floor, shuffle back'] },
    { name: 'Glute Bridge March', icon: '🔥', poseKey: 'gluteBridge', cue: 'Hips up and locked. March one knee at a time.', steps: ['Lie on back, feet flat', 'Drive hips up, squeeze glutes', 'March one knee to 90°', 'Lower foot, march other knee'] },
  ],
  3: [
    { name: 'Mountain Climbers', icon: '🏔️', poseKey: 'mountainClimber', cue: 'High plank. Drive knees hard and fast. Hands elevated if needed.', steps: ['High plank, core tight', 'Drive one knee toward chest', 'Switch legs fast', 'Hands on chair for back safety'] },
    { name: 'Jumping Jacks', icon: '🌟', poseKey: 'jumpingJack', cue: 'Full arm extension overhead. Land soft.', steps: ['Feet together, arms at sides', 'Jump feet wide, arms overhead', 'Clap at the top', 'Land soft, feet together'] },
    { name: 'High Knees', icon: '🏃', poseKey: 'highKnees', cue: 'Drive knees to hip height. Pump opposite arms.', steps: ['Stand tall', 'Drive right knee to hip height', 'Pump left arm forward', 'Switch fast, running cadence'] },
    { name: 'Speed Skaters', icon: '⛸️', poseKey: 'speedSkater', cue: 'Lateral bound foot to foot. Reach to floor on landing.', steps: ['Balance on right foot', 'Bound left, reach right hand to left foot', 'Land soft on left foot', 'Bound back, alternate'] },
  ],
};

export type MealItem = { name: string; cal: number; protein: number; desc: string };

export const MEAL_LIBRARY: Record<string, MealItem[]> = {
  breakfast: [
    { name: 'Greek yoghurt parfait', cal: 300, protein: 28, desc: '200g full-fat Greek yoghurt, mixed berries, 2 tbsp walnuts, drizzle of honey' },
    { name: 'Smashed avo on wholegrain toast', cal: 300, protein: 14, desc: '2 slices wholegrain, 1 avo, 2 poached eggs, chilli flakes, lemon' },
    { name: 'Veggie omelette', cal: 295, protein: 26, desc: '3 eggs, spinach, capsicum, feta, olive oil. Serve with 1 slice rye toast' },
    { name: 'Overnight oats', cal: 300, protein: 20, desc: '60g oats, 200ml milk, 1 scoop protein powder, banana, chia seeds' },
    { name: 'Smoked salmon bagel', cal: 305, protein: 24, desc: 'Wholegrain bagel, 80g smoked salmon, cream cheese, capers, cucumber' },
    { name: 'Eggs on sourdough', cal: 300, protein: 22, desc: '2 eggs any style, 2 slices sourdough, sliced tomato, olive oil drizzle' },
    { name: 'Protein smoothie bowl', cal: 295, protein: 30, desc: 'Protein powder, frozen banana, almond milk, topped with granola and blueberries' },
    { name: 'Ricotta toast with fruit', cal: 300, protein: 18, desc: '2 slices wholegrain, 3 tbsp ricotta, sliced strawberries, honey, mint' },
  ],
  morningSnack: [
    { name: 'Apple with almond butter', cal: 100, protein: 3, desc: '1 medium apple, 1 tsp almond butter' },
    { name: 'Hard boiled egg', cal: 100, protein: 9, desc: '1 large egg, pinch of salt and pepper' },
    { name: 'Small Greek yoghurt', cal: 100, protein: 10, desc: '100g plain Greek yoghurt, dash of cinnamon' },
    { name: 'Rice cakes with vegemite', cal: 100, protein: 4, desc: '2 rice cakes, thin spread of vegemite and a scrape of butter' },
    { name: 'Handful of mixed nuts', cal: 100, protein: 3, desc: '15g almonds and walnuts — roughly 10 nuts' },
    { name: 'Cheese and crackers', cal: 100, protein: 6, desc: '2 Vita-Weat crackers, 20g cheddar' },
    { name: 'Blueberries and cottage cheese', cal: 100, protein: 9, desc: '100g cottage cheese, handful of blueberries' },
    { name: 'Celery and hummus', cal: 100, protein: 4, desc: '3 celery sticks, 2 tbsp hummus' },
  ],
  lunch: [
    { name: 'Tuna and chickpea salad', cal: 350, protein: 34, desc: '1 can tuna, 100g chickpeas, cherry tomatoes, cucumber, lemon, olive oil, herbs' },
    { name: 'Chicken and quinoa bowl', cal: 350, protein: 38, desc: '120g grilled chicken, 60g cooked quinoa, roasted capsicum, spinach, tahini dressing' },
    { name: 'Lentil and veg soup', cal: 345, protein: 20, desc: 'Red lentils, carrot, celery, onion, cumin, coriander. 2 slices rye bread' },
    { name: 'Grilled chicken wrap', cal: 350, protein: 36, desc: 'Wholegrain wrap, 120g chicken, lettuce, tomato, tzatziki, cucumber' },
    { name: 'Salmon and brown rice', cal: 355, protein: 32, desc: '100g pan-fried salmon, 80g brown rice, steamed broccolini, soy and ginger' },
    { name: 'Greek salad with halloumi', cal: 350, protein: 18, desc: 'Grilled halloumi, cucumber, tomato, olives, red onion, feta, oregano, olive oil' },
    { name: 'Turkey and avocado wrap', cal: 350, protein: 30, desc: 'Wholegrain wrap, 100g turkey breast, avo, spinach, mustard, tomato' },
    { name: 'Eggs and veg frittata slice', cal: 345, protein: 24, desc: '2 eggs, zucchini, onion, feta. Served with side salad and 1 slice toast' },
  ],
  afternoonSnack: [
    { name: 'Protein ball', cal: 100, protein: 6, desc: '1 bliss ball — oats, peanut butter, honey, chia seeds, dark choc chips' },
    { name: 'Edamame', cal: 100, protein: 8, desc: '80g edamame pods, pinch of sea salt' },
    { name: 'Carrot sticks and hummus', cal: 100, protein: 4, desc: '1 large carrot sliced, 2 tbsp hummus' },
    { name: 'String cheese', cal: 100, protein: 8, desc: '1 light string cheese stick' },
    { name: 'Boiled egg and cherry tomatoes', cal: 100, protein: 8, desc: '1 egg, 6 cherry tomatoes, salt and pepper' },
    { name: 'Small banana', cal: 100, protein: 1, desc: '1 small banana — good pre-dinner if training' },
    { name: 'Corn thins with avocado', cal: 100, protein: 2, desc: '2 corn thins, 2 tbsp smashed avo, lemon, chilli' },
    { name: 'Roasted chickpeas', cal: 100, protein: 5, desc: '40g oven-roasted chickpeas with paprika and cumin' },
  ],
  dinner: [
    { name: 'Baked salmon with veg', cal: 450, protein: 42, desc: '180g salmon, roasted sweet potato, asparagus, olive oil, lemon, dill' },
    { name: 'Chicken thigh and lentils', cal: 450, protein: 44, desc: '2 chicken thighs, 120g puy lentils, tomato, spinach, garlic, cumin' },
    { name: 'Prawn and zucchini pasta', cal: 445, protein: 36, desc: '150g prawns, zucchini noodles, cherry tomatoes, olive oil, chilli, garlic, 60g wholegrain pasta' },
    { name: 'Lamb and veggie tray bake', cal: 450, protein: 38, desc: '150g lean lamb, capsicum, eggplant, cherry tomatoes, olives, oregano, olive oil' },
    { name: 'Beef and veg stir fry', cal: 450, protein: 40, desc: '150g lean beef strips, broccolini, bok choy, carrot, 60g brown rice, soy, ginger' },
    { name: 'Baked barramundi', cal: 445, protein: 40, desc: '200g barramundi, roasted capsicum, olives, capers, cherry tomatoes, olive oil' },
    { name: 'Chicken and roasted veg bowl', cal: 450, protein: 42, desc: '180g chicken breast, roasted pumpkin, zucchini, red onion, feta, rocket, lemon tahini' },
    { name: 'Pork fillet with greens', cal: 450, protein: 44, desc: '180g pork fillet, steamed beans, broccolini, 80g sweet potato mash, herb sauce' },
  ],
  dessert: [
    { name: 'Dark chocolate and almonds', cal: 100, protein: 2, desc: '2 squares 70% dark chocolate, 6 almonds' },
    { name: 'Frozen yoghurt bark', cal: 100, protein: 6, desc: 'Greek yoghurt spread thin, frozen with berries and honey. Break into pieces' },
    { name: 'Stewed apple with cinnamon', cal: 100, protein: 1, desc: '1 apple stewed with cinnamon and a little water. No added sugar' },
    { name: 'Rice pudding', cal: 100, protein: 5, desc: 'Small serve rice pudding made with skim milk, vanilla, pinch of nutmeg' },
    { name: 'Banana nice cream', cal: 100, protein: 2, desc: '1 small frozen banana blended smooth. Top with a pinch of cinnamon' },
    { name: 'Berries and cream', cal: 100, protein: 2, desc: 'Mixed berries, 1 tbsp light whipped cream' },
    { name: 'Medjool date and nut butter', cal: 100, protein: 2, desc: '1 medjool date stuffed with 1 tsp almond butter' },
    { name: 'Chia pudding', cal: 100, protein: 5, desc: '2 tbsp chia seeds soaked in almond milk overnight, topped with kiwi' },
  ],
};
