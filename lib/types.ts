export type WorkoutEntry = {
  done: boolean;
  weightKg: number;
  calDuring: number;
  calTotal: number;
  ts: number;
};

export type DietEntry = {
  status: 'achieved' | 'nope';
  surplus: number;
  ts: number;
};

export type HistoryEntry = {
  date: string;
  workout?: WorkoutEntry;
  diet?: DietEntry;
};

export type WorkoutSession = {
  id: string;
  user_id: string;
  date: string;
  weight_kg: number;
  cal_during: number;
  cal_total: number;
  done: boolean;
  created_at: string;
};

export type DietLog = {
  id: string;
  user_id: string;
  date: string;
  status: 'achieved' | 'nope';
  surplus_cal: number;
  created_at: string;
};
